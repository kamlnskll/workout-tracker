import { Text, View } from 'native-base'
import React, { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { database } from '../firebase/firebase'

const SavedWorkout = ({ id, navigation }) => {
  // const fetchWorkoutById = async () => {
  //   const workoutDocument = doc(database, 'workouts', id)
  //   const fetchWorkout = await getDoc(workoutDocument)

  //   if (fetchWorkout.exists()) {
  //     console.log('document data:', fetchWorkout.data)
  //   } else {
  //     console.log('Workout not found')
  //   }
  // }

  useEffect(() => {
    // get workout details given id as prop from firestore and display it on a separate page.
    // fetchWorkoutById()
  }, [])

  return (
    <View>
      <Text>I am a saved workout component and should be in a stack...</Text>
    </View>
  )
}

export default SavedWorkout
