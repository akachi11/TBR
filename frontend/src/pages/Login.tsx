import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext.tsx'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setUserState} = useAuthContext()

  const handleSubmit = async () => {
    console.log(email)
    const response = await axios.post('http://localhost:5000/api/auth/login',
      {
        email,
        password
      }
    )
    setUserState(response.data)
  }

  return (
    <div className='h-screen relative'>
      <div className="text-white basis-2/3 font-baskervville font-extrabold p-4 text-lg md:text-2xl h-full">
        TBR
      </div>
      <div className='top-0 absolute w-[100%] h-[100%] flex justify-center items-center'>
        <div className='w-[80%] md:w-[500px] p-4 bg-zinc-800 rounded-lg shadow-xl'>
          <h1 className='text-2xl font-bold text-center font-baskervville text-zinc-200'>Login</h1>
          <div>
            <div className='my-4'>
              <label htmlFor='email' className='block font-baskervville text-zinc-400 text-sm'>Email</label>
              <input onChange={(e) => {setEmail(e.target.value)}} type='email' id='email' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
            </div>
            <div className='my-4'>
              <label htmlFor='password' className='block font-baskervville text-zinc-400 text-sm'>Password</label>
              <input onChange={(e) => {setPassword(e.target.value)}} type='password' id='password' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
            </div>
            <button onClick={handleSubmit} className={`w-full p-2 ${(password !== "" && email !== "") ? "bg-zinc-900" : "bg-zinc-500"} text-white rounded-md font-baskervville`}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login