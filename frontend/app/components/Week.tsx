import { API_URL } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import DietPlan from "./DietPlan";

interface Props {
  data: object;
}

export default function Weeks({ data }: Props) {
  const [dietPlan, setDietPlan] = useState<Record<number, object>>({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(-1);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (selected !== -1 && dietPlan[selected]) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      const response = await axios.post(API_URL + "diet_plan", {
        ...data,
        week: days[selected],
      });
      console.log(response);
      setDietPlan((prevDietPlan) => ({
        ...prevDietPlan,
        [selected]: response.data,
      }));
      setLoading(false);
    };
    if (selected !== -1) {
      setLoading(true);
      fetchData();
    }
  }, [selected]);

  return (
    <div className="text-center space-y-6 my-10">
      <h2 className="text-2xl md:text-3xl font-medium">
        Start meal plan each week on:
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            className={`btn rounded-md ${
              selected !== index ? "btn-outline hover:" : ""
            }bg-emerald-500 shadow-md`}
            onClick={() => setSelected(index)}
          >
            {day}
          </button>
        ))}
      </div>
      {loading && <Loading />}
      {!loading && dietPlan[selected] && <DietPlan plan={dietPlan[selected]} />}
    </div>
  );
}
