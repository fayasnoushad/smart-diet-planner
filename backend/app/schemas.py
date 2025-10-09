from pydantic import BaseModel
from typing import Optional, List


class DietRequest(BaseModel):
    height: int
    weight: int
    age: int
    gender: str
    diseases: Optional[str] = ""
    preferences: List[str]
    week: str
    goal: Optional[str] = ""
    activity_level: Optional[str] = ""


class Food(BaseModel):
    name: str
    veg: bool
    reciepie: str


class DietPlan(BaseModel):
    breakfast: List[Food]
    # morning_lightfood: List[Food]
    lunch: List[Food]
    # evening_lightfood: List[Food]
    dinner: List[Food]
