import React, { useState } from 'react'
interface ILifecycleOperations {
  defaultText?: string
}
const useLifecycleOperations = ({ defaultText }: ILifecycleOperations) => {
  const [text, setText] = useState(defaultText)
  const handleChangeText = (text: string) => {
    setText(text)
  }
  return { text, handleChangeText }
}

export default useLifecycleOperations
