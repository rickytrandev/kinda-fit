"use client"

import React, { useState } from "react"
import Input from "./Input"
import { useMealContext } from "../context/MealContext"


function ManualInput() {
  const [foodName, setFoodName] = useState<string>("")
  const [protein, setProtein] = useState<number>(0)
  const [carbs, setCarbs] = useState<number>(0)
  const [fats, setFats] = useState<number>(0)
  const [calories, setCalories] = useState<number>(0)
  const [portion, setPortion] = useState<number>(0)
  const { addMeal } = useMealContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const timestamp = new Date()

    addMeal({
      name: foodName,
      protein,
      carbs,
      fats,
      calories,
      portion,
      timestamp: timestamp.getTime(),
    })

    setCalories(0)
    setProtein(0)
    setCarbs(0)
    setFats(0)
    setPortion(0)
    setFoodName("")
  }

  return (
    <div className="w-full">
      <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          label="Food Name"
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <div className="flex w-full space-x-4">
          <div className="flex-grow">
            <Input
              label="Protein (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
              value={protein.toString()}
              onChange={(e) => setProtein(Number(e.target.value))}
            />
          </div>
          <div className="flex-grow">
            <Input
              label="Carbohydrates (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
              value={carbs.toString()}
              onChange={(e) => setCarbs(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex w-full space-x-4">
          <div className="flex-grow">
            <Input
              label="Fats (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
              value={fats.toString()}
              onChange={(e) => setFats(Number(e.target.value))}
            />
          </div>
          <div className="flex-grow">
            <Input
              label="Calories (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
              value={calories.toString()}
              onChange={(e) => setCalories(Number(e.target.value))}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-black text-white text-xl p-4 mt-2 rounded"
        >
          Add Food
        </button>
      </form>
    </div>
  )
}

export default ManualInput
