import api from "./api";

/*
====================================
Get All Tasks
====================================
*/
export const getTasks = async ({
    search = "",
    status = "",
    priority = "",
    sort_by = "",
    order = "asc",
    page = 1,
    limit = 10,
} = {}) => {

    const response = await api.get("/tasks", {
        params: {
            search,
            status,
            priority,
            sort_by,
            order,
            page,
            limit,
        },
    });

    return response.data;
};


/*
====================================
Get Single Task
====================================
*/
export const getTask = async (taskId) => {

    const response = await api.get(`/tasks/${taskId}`);

    return response.data;
};


/*
====================================
Create Task
====================================
*/
export const createTask = async (taskData) => {

    const response = await api.post("/tasks", taskData);

    return response.data;
};


/*
====================================
Update Task
====================================
*/
export const updateTask = async (taskId, taskData) => {

    const response = await api.put(`/tasks/${taskId}`, taskData);

    return response.data;
};


/*
====================================
Delete Task
====================================
*/
export const deleteTask = async (taskId) => {

    const response = await api.delete(`/tasks/${taskId}`);

    return response.data;
};