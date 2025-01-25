"use client"

import React from "react"
import { useMealContext } from "../context/MealContext"
import DeleteBtn from "./DeleteBtn"

export interface MealCardProps {
  id: string
  timestamp: number
  carbs: number
  protein: number
  fats: number
  name: string
  portion: number
  calories: number
}

function MealCard({
  id,
  carbs,
  protein,
  fats,
  name,
  portion,
  calories,
  timestamp,
}: MealCardProps) {
  const { deleteMeal } = useMealContext()
  const formattedDate = new Date(timestamp).toLocaleString()

  return (
    <div>
      <div className="flex justify-between gap-2 bg-gray-200 rounded p-4">
        <div>
          <p>{`${name} - ${portion}g`}</p>
          <p>{`Calories: ${calories} | Protein: ${protein} | Carbs: ${carbs} | Fats: ${fats}`}</p>
          <p>{`${formattedDate}`}</p>
        </div>
        <DeleteBtn id={id} deleteMeal={deleteMeal} />
      </div>
    </div>
  )
}

function Meals() {
  const { meals } = useMealContext()

  return (
    <div className="border border-gray-200 rounded p-4 flex flex-col gap-4">
      <h1 className="text-2xl">Meals</h1>
      {meals.map((meal) => (
        <MealCard
          id={meal.id}
          key={meal.id}
          name={meal.name}
          calories={meal.calories}
          portion={meal.portion}
          protein={meal.protein}
          carbs={meal.carbs}
          fats={meal.fats}
          timestamp={meal.timestamp}
        />
      ))}
    </div>
  )
}

export default Meals
