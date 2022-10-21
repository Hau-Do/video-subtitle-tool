import React from 'react'

interface IErrorLayout {
  children?: React.ReactNode
}
const ErrorLayout: React.FC<IErrorLayout> = ({ children }) => {
  return (
    <div>
      <h2>Error layout</h2>
      {children}
    </div>
  )
}

export default ErrorLayout
