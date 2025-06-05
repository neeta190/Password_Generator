import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)

  const passwordRef = useRef(0)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for(let i=1; i<length ; i++){
      const index = Math.floor(Math.random()*str.length +1)
      pass +=str.charAt(index)
    }

    setPassword(pass)
  },[length, numberAllowed, charAllowed])

  useEffect(() =>{
    generatePassword()
  },[length,numberAllowed, charAllowed])

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-300 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1> 
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="bg-white outline-none w-full py-1 px-3" ref={passwordRef} readOnly placeholder='Password'/>
        <button onClick ={copyPassword} className="bg-blue-700 outline-none px-3 py-1 shrink-0 text-white">Copy</button>
      </div> 
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100} name="" id="" value={length} 
          className="cursor-pointer" onChange={(e)=>setLength(e.target.value)}/>
          <label htmlFor="length">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="" defaultChecked={numberAllowed} onChange={()=>setNumberAllowed((prev) => !prev)}/>
          <label htmlFor="number">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" name="" id="" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev) => !prev)}/>
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
