"use client"

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react"
import { MealCardProps } from "../components/Meals"
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../lib/firebase"

interface ContextProps {
  goals: GoalsProps
  meals: MealCardProps[]
  addMeal: (meal: AddMealProps) => Promise<void>
  deleteMeal: (id: string) => Promise<void>
  addGoal: (goal: GoalsProps) => Promise<void>
  updateGoal: (goal: GoalsProps, id: string) => Promise<void>
}

interface GoalsProps {
  dailyCalorie: null | number
  dailyProtein: null | number
  dailyFat: null | number
  dailyCarb: null | number
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

const initialGoals = {
  dailyCalorie: null,
  dailyProtein: null,
  dailyFat: null,
  dailyCarb: null
}

type Action = { type: "set_meals"; meals: MealCardProps[] }

const reducer = (
  state: { meals: MealCardProps[]; goals: GoalsProps },
  action: Action
) => {
  switch (action.type) {
    case "set_meals":
      return {...state , meals: action.meals}

    default:
      return state
  }
}

//create context
const AppContext = createContext<ContextProps | undefined>(undefined)

//provide the context - manages state and addMeal function
export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {meals : [], goals: initialGoals })

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

  const addGoal = async (goals: GoalsProps) => {
    try {
      const docRef = await addDoc(collection(db, 'goals'), goals)
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const updateGoal = async (goal: GoalsProps, id: string) => {
    try {
      const goalDoc = doc(db, "goals", id)
      await updateDoc(goalDoc, goal as any)
    } catch (e) {

    }
  }


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
      const docRef = doc(db, "meals", id)
      await deleteDoc(docRef)
      console.log("Document delete with ID: ", id)
    } catch (e) {
      console.error("Error deleting document: ", e)
    }
  }

  return (
    <AppContext.Provider value={{ meals: state.meals, goals: state.goals, addMeal, deleteMeal, addGoal, updateGoal }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error("useMealContext must be used within a MealProvider")

  return context
}
