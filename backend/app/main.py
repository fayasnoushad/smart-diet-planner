from . import schemas
from .helper import diet_plan
from fastapi import FastAPI, Response
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO


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
    result = diet_plan(details)
    return result


@app.post("/generate_pdf/")
def generate_pdf(diet_plan: dict):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    day = diet_plan.get("day", "unknown")
    pdf.setTitle("Diet Plan")
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(200, height - 50, day.capitalize() + " Diet Plan")

    y = height - 100
    food_list = diet_plan.get("food_list", [])

    # food_list is expected to be a list of dicts, each with 'type' and 'meals'
    if isinstance(food_list, list):
        for food in food_list:
            food_type = food.get("type", "Meal")
            meals = food.get("meals", [])

            if y < 100:
                pdf.showPage()
                y = height - 100
            y -= 20

            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString(70, y, f"{food_type.replace('_', ' ').capitalize()}:")
            y -= 15

            pdf.setFont("Helvetica", 11)
            for meal in meals:
                if y < 100:
                    pdf.showPage()
                    y = height - 100

                name = meal.get("name", "Unknown Meal")
                veg = meal.get("veg", False)
                ingredients = meal.get("ingredients", "")
                nutrition = meal.get("nutrition", {})

                pdf.drawString(90, y, f"- {name} ({'Veg' if veg else 'Non-Veg'})")
                y -= 12

                pdf.setFont("Helvetica-Oblique", 9)
                pdf.drawString(110, y, f"Ingredients: {ingredients[:80]}")
                y -= 12

                if nutrition:
                    nutrition_str = ", ".join(
                        [f"{k.capitalize()}: {v}" for k, v in nutrition.items()]
                    )
                    pdf.drawString(110, y, f"Nutrition: {nutrition_str}")
                    y -= 12

                pdf.setFont("Helvetica", 11)
                y -= 8

            y -= 10

    pdf.save()
    buffer.seek(0)

    return Response(
        content=buffer.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=diet_plan.pdf"},
    )
