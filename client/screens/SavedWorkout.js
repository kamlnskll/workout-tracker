import { HStack, Heading, Text, View } from 'native-base'
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
    // Returning workoutData[0] because there should be only one result with that ID anyway.
    return workoutData[0]
  }

  useEffect(() => {
    // get workout details given id as prop from firestore and display it on a separate page.
    fetchWorkoutById().then((res) => {
      setWorkout(res)
    })
  }, [])

  return (
    <View>
      <View
        bg={'primary.50'}
        mx={'4'}
        my='1'
        borderWidth={'0.5'}
        borderColor='black'
        rounded='lg'
      >
        <Heading></Heading>
        <View pb='4'>
          {workout?.exercises?.map((exercise) => (
            <View>
              <HStack ml='4'>
                <Text>{exercise.name}</Text>
                <HStack>
                  <Text>{exercise.reps} reps</Text>
                  <Text> x {exercise.sets} sets</Text>
                </HStack>
              </HStack>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default SavedWorkout
