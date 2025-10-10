import React, { Dispatch, SetStateAction, useState } from "react";

interface FormProps {
  setData: Dispatch<SetStateAction<object>>;
}

export default function Form({ setData }: FormProps) {
  const [age, setAge] = useState(-1);
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(-1);
  const [weight, setWeight] = useState(-1);
  const [activityLevel, setActivityLevel] = useState("");
  const goals = [
    "Maintain weight",
    "Lose weight",
    "Gain muscles",
    "Lose fat",
    "Gain weight",
    "Improve endurance",
    "Improve overall health",
    "Nothing",
  ];
  const [goal, setGoal] = useState("");
  const prefs = [
    "Vegetarian",
    "Vegan",
    "Indian food",
    "Gluten-free",
    "Dairy-free",
    "Low-carb",
    "High-protein",
    "No seafood",
    "No nuts",
    "No eggs",
    "No soy",
  ];
  const [preferences, setPreferences] = useState<string[]>([]);
  const [diseases, setDiseases] = useState("");

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (height < 50 || height > 300) return alert("Height is invalid");
    if (weight < 2 || weight > 1000) return alert("Weight is invalid");
    if (age < 1 || age > 150) return alert("Age is invalid");
    setData({
      height,
      weight,
      age,
      gender,
      diseases: diseases || undefined,
      preferences,
      activity_level: activityLevel,
      goal,
    });
  };

  return (
    <div className="card bg-base-100/90 backdrop-blur-xl shadow-2xl w-full max-w-lg my-5 p-8 border border-white/10">
      <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
        What kind of diet you want?
      </h2>

      <form id="personal-form">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="label-text text-sm">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={height > 0 ? height : ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHeight(val > 0 ? Math.round(val) : -1);
              }}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-5">
            <label className="label-text text-sm">Gender</label>
            <select
              id="gender"
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male" onClick={() => setGender("male")}>
                Male
              </option>
              <option value="female" onClick={() => setGender("female")}>
                Female
              </option>
              <option value="other" onClick={() => setGender("other")}>
                Other
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-5">
            <label className="label-text text-sm">Height (cm)</label>
            <input
              id="height"
              type="number"
              placeholder="e.g. 170"
              className="input input-bordered w-full"
              value={age > 0 ? age : ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAge(val > 0 ? Math.round(val) : -1);
              }}
            />
          </div>
          <div>
            <label className="label-text text-sm">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              placeholder="e.g. 70"
              className="input input-bordered w-full"
              value={weight > 0 ? weight : ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWeight(val > 0 ? Math.round(val) : -1);
              }}
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="label-text text-sm">Activity Level</label>
          <select
            id="activity"
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option disabled value="">
              Select activity level
            </option>
            <option onClick={() => setActivityLevel("1.2")}>
              Sedentary (desk job)
            </option>
            <option onClick={() => setActivityLevel("1.375")}>
              Lightly active
            </option>
            <option onClick={() => setActivityLevel("1.55")}>
              Moderately active
            </option>
            <option onClick={() => setActivityLevel("1.725")}>
              Very active
            </option>
          </select>
        </div>

        <div className="mb-5">
          <label className="label-text text-sm">Goal</label>
          <select
            id="goal"
            className="select select-bordered w-full"
            defaultValue={""}
          >
            <option disabled value="">
              Select your goal
            </option>
            {goals.map((goalName, index) => (
              <option
                key={index}
                value={goalName}
                onClick={() => {
                  setGoal(goalName);
                }}
              >
                {goalName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-text text-sm">Preferences</label>
          <div className="flex flex-wrap gap-2 mt-2 mb-5">
            {prefs.map((pref, index) => (
              <div
                key={index}
                className={`badge badge-outline cursor-pointer ${
                  preferences.includes(pref)
                    ? "bg-emerald-500 text-white"
                    : "hover:bg-emerald-500 hover:text-white"
                } transition`}
                data-val={pref}
                onClick={() =>
                  setPreferences((prevPrefs) => [...prevPrefs, pref])
                }
              >
                {pref}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="label-text text-sm">
            Do you have any type of diseases?
          </label>
          <textarea
            id="diseases"
            className="textarea textarea-bordered w-full mb-5"
            placeholder="E.g., diabetes, thyroid, hypertension..."
            onChange={(e) => setDiseases(e.target.value)}
          ></textarea>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            id="generate"
            onClick={(e) => submit(e)}
            className="btn bg-gradient-to-r from-emerald-500 to-indigo-500 border-none text-white flex-1 hover:opacity-90 rounded-lg"
          >
            Generate Plan
          </button>
          <button
            type="reset"
            id="clear"
            className="btn btn-outline flex-1 hover:bg-white/10 rounded-lg"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
