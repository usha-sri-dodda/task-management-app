from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import user, task


app = FastAPI(
    title="TaskFlow API",
    version="1.0.0",
    description="A simple To-Do List application built with FastAPI, PostgreSQL, React, and JWT Authentication."
)


# CORS Configuration

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include Routers
app.include_router(user.router)
app.include_router(task.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to TaskFlow API 🚀"
    }