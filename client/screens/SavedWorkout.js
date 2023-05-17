import { Heading, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { database } from '../firebase/firebase'

const SavedWorkout = ({ route, navigation }) => {
  const [workout, setWorkout] = useState()
  const { id } = route.params

  const fetchWorkoutById = async () => {
    const workoutQuery = query(
      collection(database, 'workouts'),
      where('id', '==', id)
    )
    console.log(id)
    const fetchWorkout = await getDocs(workoutQuery)
    const workoutData = fetchWorkout.docs.map((doc) => doc.data())

    if (fetchWorkout) {
      console.log('document data:', workoutData)
    } else {
      console.log('Workout not found')
    }
    return workoutData
  }

  useEffect(() => {
    // get workout details given id as prop from firestore and display it on a separate page.
    fetchWorkoutById().then((res) => {
      setWorkout(res)
    })
  }, [])

  return (
    <View>
      <View bg={'primary.50'}>
        <Text onPress={() => console.log(workout)}>Saved Workout</Text>
        <Heading></Heading>
      </View>
    </View>
  )
}

export default SavedWorkout
