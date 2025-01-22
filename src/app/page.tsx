import AddFood from "../../components/AddFood"
import Meals from "../../components/Meals"

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium mb-4">Meal Tracker</h1>
      <AddFood />
      <Meals/>
    </div>
  )
}
