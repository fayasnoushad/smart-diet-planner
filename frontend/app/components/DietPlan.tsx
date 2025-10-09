import { API_URL } from "@/config";
import axios from "axios";
import React from "react";

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
}

interface Meal {
  name: string;
  veg: boolean;
  ingredients: string;
  nutrition: Nutrition;
}

interface Props {
  plan: any[]; // Change to array type for consistency
  day: string;
  dayIndex: number;
}

export default function DietPlan({ plan, day, dayIndex }: Props) {
  const handleDownloadPDF = async () => {
    const response = await axios.post(
      API_URL + "generate_pdf/",
      { day, food_list: plan[dayIndex] },
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${day}_diet_plan.pdf`;
    a.click();
  };
  return (
    <div className="max-w-7xl mx-auto my-10">
      {Array.isArray(plan) &&
        plan.map((foodType, index) => (
          <section key={index}>
            <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
              🥣{" "}
              {foodType.type.charAt(0).toUpperCase() + foodType.type.slice(1)}
            </h2>
            <div className="m-5 flex flex-row flex-wrap justify-center items-center w-[100%] gap-2">
              {foodType.meals.map((meal: Meal, mealIdx: number) => (
                <div
                  key={mealIdx}
                  className="card shadow-xl hover:shadow-2xl border border-emerald-100 md:w-[40%] lg:w-[25%] mx-[2%] mb-5"
                >
                  <div className="card-body text-left">
                    <h3 className="card-title text-emerald-600">{meal.name}</h3>
                    <div>
                      <span className="font-semibold">Type:</span>{" "}
                      {meal.veg ? "Veg 🌱" : "Non-Veg 🍗"}
                    </div>
                    <p>{meal.ingredients}</p>
                    {meal.nutrition && (
                      <div className="mt-3 text-sm">
                        <div>
                          <span className="font-semibold">Calories:</span>{" "}
                          {meal.nutrition.calories || undefined} kcal
                        </div>
                        <div>
                          <span className="font-semibold">Protein:</span>{" "}
                          {meal.nutrition.protein} g
                        </div>
                        <div>
                          <span className="font-semibold">Carbs:</span>{" "}
                          {meal.nutrition.carbs} g
                        </div>
                        <div>
                          <span className="font-semibold">Fat:</span>{" "}
                          {meal.nutrition.fat} g
                        </div>
                        <div>
                          <span className="font-semibold">Sugar:</span>{" "}
                          {meal.nutrition.sugar} g
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      <button onClick={handleDownloadPDF} className="btn btn-emerald">
        Download {day} Plan as PDF
      </button>
    </div>
  );
}
