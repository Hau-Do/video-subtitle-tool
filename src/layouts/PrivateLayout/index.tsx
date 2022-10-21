import Header from 'components/molecules/Header'
import React from 'react'

interface IPrivateLayout {
  children?: React.ReactNode
}
const PrivateLayout: React.FC<IPrivateLayout> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default PrivateLayout
