import { useState, useEffect, useReducer } from 'react'
import './App.css'

const getRandomNumberFromApi = async():Promise<number> => {
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();

  // throw new Error("Error");
  return +numberString;
}

export const App = () => {
  const [number, setNumber] = useState<number>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true)
  const [key, forceRefetch] = useReducer((x)=> x+1,0)

  useEffect(() => {
    setIsLoading(true);
    getRandomNumberFromApi().then(setNumber)
    .catch(err => setError(err.message))
  }, [key])
  
  useEffect(() => {
    if(number){
      setIsLoading(false);
    }
  },[number]);

  useEffect(() => {
    if(error){
      setIsLoading(false);
    }
  },[error])

  return (
    <div className='App App-header'>
      {isLoading  ? (<h2>Cargando...</h2>) :
      error ? <h2>{error}</h2> :
      <h2>Número aleatorio: {number}</h2>}
      <button onClick={forceRefetch} disabled={isLoading}>{
        isLoading ? "Cargando..." :
      'Nuevo número'}</button>
    </div>
  )
}
