'use client'

import { useState } from "react"
import Input from "../../../components/Input"
import { useAppContext } from "../../../context/MealContext"

function page() {
  const { goals, updateGoal, addGoal } = useAppContext()
  const [dailyCalorie, setDailyCalorie] = useState<number>(0)
  const [dailyProtein, setDailyProtein] = useState<number>(0)
  const [dailyFat, setDailyFat] = useState<number>(0)
  const [dailyCarb, setDailyCarb] = useState<number>(0)

  return (
    <div className="w-full border border-gray-200 rounded p-4">
      <h1 className="text-2xl font-medium mb-4">Adjust Your Daily Goals</h1>

      <form action="" className="flex flex-col gap-2">
        <Input
          label="Calories"
          type="text"
          className="p-2 border border-gray-200 rounded w-full"
          value={dailyCalorie.toString()}
          onChange={(e) => setDailyCalorie(Number(e.target.value))}
        />
        <Input
          label="Protein"
          type="text"
          className="p-2 border border-gray-200 rounded w-full"
          value={dailyProtein.toString()}
          onChange={(e) => setDailyProtein(Number(e.target.value))}
        />
        <Input
          label="Fats"
          type="text"
          className="p-2 border border-gray-200 rounded w-full"
          value={dailyFat.toString()}
          onChange={(e) => setDailyFat(Number(e.target.value))}
        />
        <Input
          label="Carbs"
          type="text"
          className="p-2 border border-gray-200 rounded w-full"
          value={dailyCarb.toString()}
          onChange={(e) => setDailyCarb(Number(e.target.value))}
        />
      </form>
      <button
          type="submit"
          className="bg-black text-white text-xl p-4 mt-2 rounded"
        >
          Submit Goals
        </button>
    </div>
  )
}

export default page
