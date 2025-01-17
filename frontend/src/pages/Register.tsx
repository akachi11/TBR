import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios.post('https://tbr-backend-73lw.onrender.com/api/auth/register',
                {
                    email: email,
                    password: password,
                    firstName: firstname,
                    lastName: lastname
                }
            )
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            console.log(error.response)
            if (error.response.status === 403) {
                setError('Email already in use')
            } else {
                setError('Something went wrong')
            }
            setTimeout(() => {
                setError('')
            }, 3000);
        }
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
                            <label htmlFor='firstname' className='block font-baskervville text-zinc-400 text-sm'>Firstname</label>
                            <input onChange={(e) => {setFirstname(e.target.value)}} type='text' id='firstname' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <div className='my-4'>
                            <label htmlFor='lastname' className='block font-baskervville text-zinc-400 text-sm'>Lastname</label>
                            <input onChange={(e) => {setLastname(e.target.value)}} type='text' id='lastname' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <div className='my-4'>
                            <label htmlFor='email' className='block font-baskervville text-zinc-400 text-sm'>Email</label>
                            <input onChange={(e) => {setEmail(e.target.value)}} type='text' id='email' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <div className='my-4'>
                            <label htmlFor='password' className='block font-baskervville text-zinc-400 text-sm'>Password</label>
                            <input onChange={(e) => {setPassword(e.target.value)}} type='password' id='password' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <p className='text-zinc-500 text-xs'>* Password must be at least 8 characters</p>
                        {error !== '' && <p className='text-red-400 text-xs font-jakarta my-4'>{error}</p>}
                        <button disabled={(firstname === "" && lastname === "" && email === "" && password.length < 8)} onClick={handleSubmit} className={`w-full p-2 ${(firstname !== "" && lastname !== "" && email !== "" && password.length > 7) ? "bg-zinc-900" : "bg-zinc-500"} text-white rounded-md font-baskervville`}>
                            {loading ?
                                <div className="flex flex-row items-center justify-center">
                                    <PuffLoader
                                        color={"#a1a1aa"}
                                        loading={loading}
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                                : "Register"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register