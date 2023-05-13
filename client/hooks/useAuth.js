import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'

const auth = getAuth()

export const useAuth = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      //
      // Sign in, else sign out
      if (user) {
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
