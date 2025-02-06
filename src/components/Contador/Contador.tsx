import { useState } from "react"

export const Contador = () => {
  const [contador, setContador] = useState(0)

  const incrementar = () => {
    setContador(contador + 1)
  }
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  )
}
