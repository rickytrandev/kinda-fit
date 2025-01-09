import React, { ReactNode } from "react"

interface TabProps {
  label: string
  children?: ReactNode
  onClick: () => void
  isEnabled: boolean
}

interface TabsProps {
  labels: string[],
  enabledIndex: number,
  handleClick: (index: number) => void
}

function Tab({ label, onClick, isEnabled }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 ${isEnabled ? "bg-white" : ""} rounded`}
    >
      {label}
    </button>
  )
}

function Tabs({ labels, handleClick, enabledIndex }: TabsProps) {

  return (
    <div className="inline-flex w-auto bg-gray-200 rounded p-2">
      {labels.map((label, index) => (
        <Tab
          key={label}
          label={label}
          onClick={() => handleClick(index)}
          isEnabled={enabledIndex !== null && enabledIndex === index}
        ></Tab>
      ))}
    </div>
  )
}

export { Tab, Tabs }
