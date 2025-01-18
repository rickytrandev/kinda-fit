"use client"

import { useState } from "react"
import { Tabs } from "./Tab"
import ManualInput from "./ManualInput"
import { MealCardProps } from "./Meals"

interface AddFoodProps {
  addMeal: (meal: MealCardProps) => void
}

function AddFood({ addMeal }: AddFoodProps) {
  const [enabledIndex, setEnabledIndex] = useState<number>(1)

  const handleTabClick = (index: number) => {
    setEnabledIndex(index)
  }

  return (
    <div className="border border-gray-200 rounded p-4 flex flex-col gap-4">
      <h1 className="text-2xl">Add Food</h1>
      <div className="self-start">
        <Tabs
          labels={["Search Food", "Manual Input"]}
          enabledIndex={enabledIndex}
          handleClick={handleTabClick}
        />
      </div>
      {enabledIndex === 1 && <ManualInput addMeal={addMeal} />}
    </div>
  )
}

export default AddFood
