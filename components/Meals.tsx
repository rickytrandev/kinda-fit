import React from "react"

export interface MealCardProps {
  timestamp: number
  carbs: number
  protein: number
  fats: number
  name: string
  portion: number
  calories: number
}

interface MealProps {
  meals: MealCardProps[]
}

function MealCard({
  carbs,
  protein,
  fats,
  name,
  portion,
  calories,
  timestamp
}: MealCardProps) {
  const formattedDate = new Date(timestamp).toLocaleString()

  return (
    <div>
      <div className="flex flex-col gap-2 bg-gray-200 rounded p-2">
        <p>{`${name} - ${portion}g`}</p>
        <p>{`Calories: ${calories} | Protein: ${protein} | Carbs: ${carbs} | Fats: ${fats}`}</p>
        <p>{`${formattedDate}`}</p>
      </div>
    </div>
  )
}

function Meals({ meals }: MealProps) {
  return (
    <div className="border border-gray-200 rounded p-4 flex flex-col gap-4">
      <h1 className="text-2xl">Meals</h1>
      {meals.map((meal) => (
        <MealCard
          key={meal.timestamp}
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
