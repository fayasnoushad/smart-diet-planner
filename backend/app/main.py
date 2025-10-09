from . import schemas
from .helper import diet_plan
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Smart Diet Planner",
    description="Smart Diet Planner",
)

allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return RedirectResponse("/docs")


@app.post("/diet_plan")
async def get_diet_plan(details: schemas.DietRequest):
    print(details)
    result = diet_plan(details)
    return result
