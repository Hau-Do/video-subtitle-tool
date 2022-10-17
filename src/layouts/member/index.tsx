import Header from 'components/molecules/header'
import React from 'react'

interface IMemberLayout {
  children?: React.ReactNode
}
const MemberLayout: React.FC<IMemberLayout> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MemberLayout
