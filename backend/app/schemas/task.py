from pydantic import BaseModel, ConfigDict
from typing import List
from datetime import date, datetime
from typing import Optional
from enum import Enum


# Task Status Enum
class TaskStatus(str, Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"


# Task Priority Enum
class TaskPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


# Create Task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.PENDING
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: Optional[date] = None


# Update Task
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    due_date: Optional[date] = None


# Task Response
class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: TaskStatus
    priority: TaskPriority
    due_date: Optional[date]
    created_at: datetime
    updated_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)
    

class TaskListResponse(BaseModel):
    items: List[TaskResponse]
    total: int
    page: int
    limit: int
    total_pages: int