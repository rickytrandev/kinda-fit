'use client'
import { useState } from "react";
import AddFood from "../../components/AddFood";
import Meals, { MealCardProps } from "../../components/Meals";

export default function Home() {
  const [meals, setMeals] = useState<MealCardProps[]>([]);

  const addMeal = (meal: MealCardProps) => {
    setMeals((prevMeals) => [...prevMeals, meal])
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium mb-4">Meal Tracker</h1>
      <AddFood addMeal={addMeal}/>
      <Meals meals={meals} />
    </div>
  );
}
