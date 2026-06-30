from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime


# User Registration
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


# User Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# User Response
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -----------------------------
# JWT Token Response
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str