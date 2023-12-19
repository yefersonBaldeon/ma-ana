import { useState } from "react"

export const UseForm = (initialState={}) => {
  const [formValues, setFormValues] = useState(initialState);
  const handleInputChange=(e)=>{
    setFormValues({
        ...formValues,
        [e.target.name]:e.target.value,
        id: new Date().toLocaleString()
    })
  }
  const reset=()=>{
    setFormValues(initialState)
  }
  return [formValues,handleInputChange,reset];
}