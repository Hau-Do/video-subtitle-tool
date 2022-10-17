import React, { ChangeEvent } from 'react'
import useLifecycleOperations from './useLifecycleOperations'
interface ILifecycleOperations {
  defaultText?: string
}
function useEventHandlers({ defaultText }: ILifecycleOperations) {
  const { handleChangeText, text } = useLifecycleOperations({ defaultText })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeText(e.target.value)
  }
  return { handleChange, text }
}

export default useEventHandlers
