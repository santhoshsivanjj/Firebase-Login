import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import firebase from '../static/images/firebase.png'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase'; 

function Dashboard() {

  const [error, setError] = useState()
  const { currentUser, Logout } = useAuth()
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  useEffect(() => {
    // Fetch user name from Firestore based on the current user's UID
    if (currentUser) {
      const userDocRef = db.collection('users').doc(currentUser.uid);

      userDocRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.error('Error getting user document:', error);
        });
    }
  }, [currentUser]);

  async function handleLogout(){

    setError('')

    try{
      await Logout()
      navigate('/login');
    }catch{
      setError("Failed to Logout")
    }
  }

 

  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, {userName || 'User'} !</h1>

              <p className="mt-1.5 text-sm text-gray-500">Let's write a new blog post! 🎉</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-300 px-5 py-3 text-black-500 transition hover:bg-amber-100 hover:text-amber-700 focus:outline-none focus:ring"
                type="button"
              >
                <span className="text-sm font-medium"> Home </span>
              </button>

              <button onClick={handleLogout} className="block rounded-lg bg-orange-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-700 focus:outline-none focus:ring" type="button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
        <div className="text-center">
        <img className="mx-auto h-24 my-12 w-auto" src={firebase} alt="Your Company"/>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Firebase Dashboard</h1>
          <p className=" text-2xl font-bold text-gray-800 mt-8 sm:text-xl">E-Mail ID :  {currentUser && currentUser.email}</p>
          <p className="mt-6 text-base leading-7 text-gray-600">Your Posts will be listed here.</p>
        </div>
    </div>
  )
}

export default Dashboard