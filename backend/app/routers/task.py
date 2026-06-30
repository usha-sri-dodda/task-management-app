from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import asc, desc, or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskListResponse, TaskUpdate, TaskResponse
from app.utils.auth import get_current_user

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# Create Task
@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_task = Task(
        title=task.title,
        description=task.description,
        status=task.status.value,
        priority=task.priority.value,
        due_date=task.due_date,
        user_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# Get All Tasks
# @router.get(
#     "/",
#     response_model=TaskListResponse
# )
# def get_tasks(
#     search: Optional[str] = Query(None),
#     status: Optional[str] = Query(None),
#     priority: Optional[str] = Query(None),
#     sort_by: Optional[str] = Query(None),
#     order: str = Query("asc"),
#     page: int = Query(1, ge=1),
#     limit: int = Query(10, ge=1, le=100),

#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):

#     query = db.query(Task).filter(
#         Task.user_id == current_user.id
#     )

#     # Search
#     if search:
#         query = query.filter(
#             or_(
#                 Task.title.ilike(f"%{search}%"),
#                 Task.description.ilike(f"%{search}%")
#             )
#         )

#     # Filter
#     if status:
#         query = query.filter(Task.status == status)

#     if priority:
#         query = query.filter(Task.priority == priority)

#     # Sort
#     allowed_sort_fields = [
#         "created_at",
#         "updated_at",
#         "due_date",
#         "priority",
#         "status",
#         "title"
#     ]

#     if sort_by in allowed_sort_fields:

#         column = getattr(Task, sort_by)

#         if order.lower() == "desc":
#             query = query.order_by(desc(column))
#         else:
#             query = query.order_by(asc(column))

#     # Pagination
#     offset = (page - 1) * limit

#     tasks = (
#         query
#         .offset(offset)
#         .limit(limit)
#         .all()
#     )

#     return TaskListResponse(
#         items=tasks,
#         total=len(tasks),
#         page=page,
#         limit=limit,
#         total_pages=(len(tasks) + limit - 1) // limit
#     )


@router.get(
    "/",
    response_model=TaskListResponse
)
def get_tasks(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    sort_by: Optional[str] = Query(None),
    order: str = Query("asc"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),

    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Task).filter(
        Task.user_id == current_user.id
    )

    # ---------------- Search ----------------
    if search:
        query = query.filter(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%")
            )
        )

    # ---------------- Filter ----------------
    if status:
        query = query.filter(Task.status == status)

    if priority:
        query = query.filter(Task.priority == priority)

    # ---------------- Sort ----------------
    allowed_sort_fields = [
        "created_at",
        "updated_at",
        "due_date",
        "priority",
        "status",
        "title"
    ]

    if sort_by in allowed_sort_fields:
        column = getattr(Task, sort_by)

        if order.lower() == "desc":
            query = query.order_by(desc(column))
        else:
            query = query.order_by(asc(column))

    # ---------------- Count ----------------
    total = query.count()

    # ---------------- Pagination ----------------
    offset = (page - 1) * limit

    tasks = (
        query
        .offset(offset)
        .limit(limit)
        .all()
    )

    total_pages = (total + limit - 1) // limit

    return {
        "items": tasks,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }



# Get Task By ID
@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == current_user.id
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


# Update Task
@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    updated_task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == current_user.id
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    update_data = updated_task.model_dump(exclude_unset=True)

    for key, value in update_data.items():

        if hasattr(value, "value"):
            value = value.value

        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task


# Delete Task
@router.delete(
    "/{task_id}"
)
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == current_user.id
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully"
    }   