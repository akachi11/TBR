import React from 'react'

const Register = () => {
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
                            <label htmlFor='email' className='block font-baskervville text-zinc-400 text-sm'>Firstname</label>
                            <input type='email' id='email' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <div className='my-4'>
                            <label htmlFor='email' className='block font-baskervville text-zinc-400 text-sm'>Lastname</label>
                            <input type='email' id='email' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <div className='my-4'>
                            <label htmlFor='email' className='block font-baskervville text-zinc-400 text-sm'>Email</label>
                            <input type='email' id='email' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <div className='my-4'>
                            <label htmlFor='password' className='block font-baskervville text-zinc-400 text-sm'>Password</label>
                            <input type='email' id='email' className="bg-zinc-700 w-[100%] text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg" />
                        </div>
                        <button type='submit' className='w-full p-2 bg-zinc-500 text-white rounded-md font-baskervville'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register