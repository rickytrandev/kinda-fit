import React from "react"
import Input from "./Input"

function ManualInput() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  return (
    <div className="w-full">
      <form action='' className="flex flex-col gap-2" onClick={handleSubmit}>
        <Input label="Food Name" type="text" />
        <div className="flex w-full space-x-4">
          <div className="flex-grow">
            <Input
              label="Protein (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
            />
          </div>
          <div className="flex-grow">
            <Input
              label="Carbohydrates (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
            />
          </div>
        </div>
        <div className="flex w-full space-x-4">
          <div className="flex-grow">
            <Input
              label="Fats (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
            />
          </div>
          <div className="flex-grow">
            <Input
              label="Calories (g)"
              type="text"
              className="p-2 border border-gray-200 rounded w-full"
            />
          </div>
        </div>
        <button type="submit" className="bg-black text-white text-xl p-4 mt-2 rounded">
          Add Food
        </button>
      </form>
    </div>
  )
}

export default ManualInput
