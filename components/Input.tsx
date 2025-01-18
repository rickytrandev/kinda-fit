import React from "react"

interface InputProps {
  label: string
  type: string
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ label, type, className, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        className={`${
          className ? className : `border border-gray-200 rounded p-2`
        }`}
        type={type}
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
