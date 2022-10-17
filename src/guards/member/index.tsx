import React from 'react'
import { Redirect } from 'react-router-dom'
import { RoutesString } from 'routes/routesString'
import useAuthStore from 'stores/auth.store'

const MemberGuard: React.FC<any> = ({ children }) => {
  const auth = useAuthStore()

  // eslint-disable-next-line
  if (false) {
    return <Redirect to={RoutesString.AccessDenied} />
  }

  return children
}

export default MemberGuard
