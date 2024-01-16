import React, { useState } from 'react'
import { useRef } from 'react'
import firebase from '../static/images/firebase.png'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function SignUp() {

    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { SignUp } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    async function handleSubmit(e){
        e.preventDefault()

        if ( passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try{
            setError('')
            setLoading(true)
            await SignUp(emailRef.current.value, nameRef.current.value, passwordRef.current.value)
            navigate('/');
        } catch {
            setError('Failed to create an Account')
        }

        setLoading(false)
    }

  return (
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={firebase} alt="Your Company"/>
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your Account
          </h2>
        </div>
 
        {error && <div class="relative self-center mt-6 py-3 max-w-72 px-10 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
            <p>{error}</p> </div>
        }

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={handleSubmit} method='POST'>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input id="name" name="name" type="text" placeholder="Enter Name" required ref={nameRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" name="email" type="email" placeholder="Enter e-Mail" autoComplete="email" required ref={emailRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" required ref={passwordRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                
              </div>
              <div className="mt-2">
                <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" required ref={passwordConfirmRef}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="text-sm mt-2">
                  <a href="#" className="font-semibold text-amber-600 hover:text-amber-500">
                    Forgot password?
                  </a>
            </div>

            <div>
              <button disabled={loading} type="submit" className="flex w-full justify-center disabled:opacity-75 rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have Account ?{' '}
            <a className="font-semibold leading-6 text-amber-600 hover:text-amber-500">
                  <Link to='/login'>Login</Link>
                </a>
          </p>
        </div>
      </div>

    </div>
  )
}

export default SignUp