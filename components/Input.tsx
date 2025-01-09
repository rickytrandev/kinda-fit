import React from "react"

interface InputProps {
  label: string,
  type: string,
  className?: string
}

function Input({ label, type, className }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input className={`${className ? className : `border border-gray-200 rounded p-2`}`} type={type} id={label} />
    </div>
  )
}

export default Input
