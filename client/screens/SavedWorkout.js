import { HStack, Heading, Text, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { database } from '../firebase/firebase'
import dayjs from 'dayjs'

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

  const date = dayjs
    .unix(workout?.timestamp?.seconds)
    .format('MMMM DD, YYYY')
    .toString()

  const time = dayjs
    .unix(workout?.timestamp?.seconds)
    .format('h:mm a')
    .toString()

  return (
    <View>
      <View
        bg={'primary.50'}
        mx={'4'}
        my='12'
        borderWidth={'0.5'}
        borderColor='black'
        rounded='lg'
        minH={'50%'}
        maxH={'80%'}
      >
        <HStack mx='4' my='4' justifyContent={'space-between'}>
          <Heading fontSize='md'>{date}</Heading>
          <Text fontSize='xs' my='auto'>
            Created at: <Text fontWeight='semibold'>{time}</Text>
          </Text>
        </HStack>
        <View pb='4'>
          {workout?.exercises?.map((exercise) => (
            <View>
              <HStack ml='4'>
                <Text>
                  {exercise.name}
                  {exercise.name !== '' ? ` - ` : null}
                </Text>
                <VStack>
                  {exercise.sets.map((set) => (
                    <>
                      <HStack>
                        <Text>
                          {set.reps}
                          {set.reps !== '' ? ` reps` : null}
                        </Text>
                        <Text>
                          {set.weight !== '' ? ` x ` : null}
                          {set.weight} {set.weight !== '' ? `pounds` : null}
                        </Text>
                      </HStack>
                    </>
                  ))}
                </VStack>
              </HStack>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default SavedWorkout
