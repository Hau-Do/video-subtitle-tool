import React, { ChangeEvent, useState } from 'react';

interface IUseActions {
  defaultText?: string;
}
const useActions = ({ defaultText = '' }: IUseActions) => {
  const [text, setText] = useState(defaultText);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return { handleChange, text };
};

export default useActions;
