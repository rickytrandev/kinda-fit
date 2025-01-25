"use client"

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react"
import { MealCardProps } from "../components/Meals"
import { collection, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore"
import { db } from "../lib/firebase"

interface MealContextProps {
  meals: MealCardProps[]
  addMeal: (meal: AddMealProps) => Promise<void>
  deleteMeal: (id: string) => void
}

interface AddMealProps {
  timestamp: number
  carbs: number
  protein: number
  fats: number
  name: string
  portion: number
  calories: number
}

type Action =
  | { type: "set_meals"; meals: MealCardProps[] }

const reducer = (state: MealCardProps[], action: Action) => {
  switch (action.type) {
    case "set_meals":
      return action.meals

    default:
      return state
  }
}

//create context
const MealContext = createContext<MealContextProps | undefined>(undefined)

//provide the context - manages state and addMeal function
export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [meals, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "meals"), (snapshot) => {
      const mealsData = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          protein: data.protein,
          carbs: data.carbs,
          fats: data.fats,
          calories: data.calories,
          portion: data.portion,
          timestamp: data.timestamp,
        } as MealCardProps
      })
      dispatch({ type: "set_meals", meals: mealsData })
    })
    return () => unsubscribe()
  }, [])

  // TO-DO implement firebase function to add, delete meals
  const addMeal = async (meal: AddMealProps) => {
    try {
      const docRef = await addDoc(collection(db, "meals"), meal)
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

    const deleteMeal = async (id: string) => {
      try {
        const docRef = doc(db, 'meals', id)
        await deleteDoc(docRef)
        console.log('Document delete with ID: ', id)
      } catch (e) {
        console.error('Error deleting document: ', e)
      }
    }
  
    return (
      <MealContext.Provider value={{ meals, addMeal, deleteMeal }}>
        {children}
      </MealContext.Provider>
    )
}

export const useMealContext = () => {
  const context = useContext(MealContext)
  if (!context)
    throw new Error("useMealContext must be used within a MealProvider")

  return context
}
