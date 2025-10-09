import React from "react";

interface Meal {
  name: string;
  veg: boolean;
  reciepie: string;
}

interface Props {
  plan: object;
}

export default function DietPlan({ plan }: Props) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-14">
      {Array.isArray(plan) &&
        plan.map((foodType, index) => (
          <section key={index}>
            <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
              🥣{" "}
              {foodType.type.charAt(0).toUpperCase() + foodType.type.slice(1)}
            </h2>
            <div className="m-5 flex flex-row flex-wrap justify-center items-center">
              {foodType.meals.map((meal: Meal, mealIdx: number) => (
                <div
                  key={mealIdx}
                  className="card shadow-xl hover:shadow-2xl border border-emerald-100 w-[30%] mx-5"
                >
                  <div className="card-body">
                    <h3 className="card-title text-emerald-600">
                      {meal.name} {meal.veg ? "🌱" : "🍗"}
                    </h3>
                    <p>{meal.reciepie}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
