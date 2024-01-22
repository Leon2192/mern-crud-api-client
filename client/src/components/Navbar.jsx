import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
            <Link to='/'>
                <h1 className='text-2-xl font-bold'>Tasks manager</h1>
            </Link>
            <ul className='flex gap-x-3 font-bold '>
                {isAuthenticated ? (
                    <>
                        <li >
                            Welcome user
                        </li>
                        <li >
                            <Link to='/tasks'>Tasks</Link>
                        </li>
                        <li >
                            <Link to='/addTask'>Add task</Link>
                        </li>
                        <li >
                            <Link to='/' onClick={() => logout()} >Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li >
                            <Link to='/login' className='bg-indigo-500 px-4 py-2 rounded-sm'>Login</Link>
                        </li>
                        <li >
                            <Link to='/register' className='bg-indigo-500 px-4 py-2 rounded-sm'>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar