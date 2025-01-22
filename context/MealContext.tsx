'use client'

import { createContext, ReactNode, useContext, useState } from "react"
import { MealCardProps } from "../components/Meals"

interface MealContextProps {
  meals: MealCardProps[]
  addMeal: (meal: MealCardProps) => void
}

//create context
const MealContext = createContext<MealContextProps | undefined>(undefined) 

//provide the context - manages state and addMeal function
export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<MealCardProps[]>([])

  const addMeal = (meal: MealCardProps) => {
    setMeals((prevMeals) => [...prevMeals, meal])
  }

  return (
    <MealContext.Provider value={{ meals, addMeal }}>
      {children}
    </MealContext.Provider>
  )
}

export const useMealContext = () => {
  const context = useContext(MealContext)
  if(!context) throw new Error('useMealContext must be used within a MealProvider')
  
  return context
}
