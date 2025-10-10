import json
from . import schemas
from . import configs
from google import genai


def clean_json(text: str) -> dict:
    content = text.replace("```json", "").replace("```", "")
    return json.loads(content)


def calculate_bmi_index(height, weight, age):
    bmi = weight / (height**2)
    bmi = weight / (height**2)
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal weight"
    elif bmi < 30:
        return "Overweight"
    elif bmi < 35:
        return "Obesity Class I"
    elif bmi < 40:
        return "Obesity Class II"
    else:
        return "Obesity Class III (Extreme Obesity)"


async def diet_plan(details: schemas.DietRequest):
    bmi = calculate_bmi_index(details.height, details.weight, details.age)
    client = genai.Client(api_key=configs.GOOGLE_API_KEY)
    prompt = (
        f"Generate a {details.week.title()} diet plan in JSON format for a person with the following details:\n"
        f"Age: {details.age}\n"
        f"Gender: {details.gender}\n"
        f"BMI Status: {bmi}\n"
    )
    if details.preferences:
        prompt += f"Preferences: {str(details.preferences)}\n"
    if details.diseases:
        prompt += f"Diseases: {details.diseases}\n"
    if getattr(details, "goal", ""):
        prompt += f"Goal: {details.goal}\n"
    if getattr(details, "activity_level", ""):
        prompt += f"Activity Level: {details.activity_level}\n"
    prompt += (
        "Return only JSON matching this schema: ["
        " {'type': 'breakfast', 'meals': ["
        "   {'name': str, 'veg': bool, 'ingredients': str, "
        "    'nutrition': {'calories': float, 'protein': float, 'carbs': float, 'fat': float, 'sugar': float}"
        "   }"
        " ]}, "
        " {'type': 'lunch', 'meals': [ {...} ]}, {'type': 'dinner', 'meals': [ {...} ]}"
        "]"
        "\nEach meal must include nutritional information: calories, protein (g), carbs (g), fat (g), and sugar (g)."
        "\nGive at least three meals per type."
    )
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=prompt
        )

        if response.text:
            plan_details = clean_json(response.text)
        else:
            plan_details = {}
        return plan_details
    except Exception as e:
        if getattr(e, "status_code", None) == 503:
            return {"error": "The model is overloaded. Please try again later."}
        else:
            return {"error": str(e)}
