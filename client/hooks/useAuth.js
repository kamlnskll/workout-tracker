import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'

export const useAuth = () => {
  const [user, setUser] = useState()
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      //
      // Sign in, else sign out
      if (user) {
        const uid = user.uid
        setUser(user)
      } else {
        setUser(undefined)
      }
    })
    return unsubscribeFromAuthStateChanged
  }, [])
  return {
    user,
  }
}
