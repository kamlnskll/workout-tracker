import React, { useEffect, useState } from 'react'
import { Button, Input, Text, View, HStack, Flex } from 'native-base'
import dayjs from 'dayjs'
import { collection, addDoc } from 'firebase/firestore'
import { database } from '../firebase/firebase'
import { SwipeListView } from 'react-native-swipe-list-view'

// Need to change it so that I can add reps to individual sets
// Maybe do an add set button that adds the current reps x set
// Can add multiple sets with the same rep range or individual
// with custom

export const Workout = ({ workoutData }) => {
  const [exercises, setExercises] = useState([{ name: '', reps: '', sets: '' }])

  const [error, setError] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [error])

  const addExercise = () => {
    setExercises([...exercises, { name: '', reps: '', sets: '' }])
  }

  const updateExercise = (index, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value
    setExercises(updatedExercises)
  }

  const saveWorkoutInDB = async () => {
    // save workout to Firestore
    await addDoc(collection(database, 'workouts'), { exercises })
      .then((res) => console.log('New document created', res))
      .catch((err) => setError(err))
  }

  const date = dayjs().format('MMMM DD')

  return (
    <View position='relative' minHeight={'100%'}>
      <Flex>
        <View>
          <Text my='4' ml='8' fontSize='xl' fontWeight='bold'>
            {date}
          </Text>
          <Text color='red.600'>{error}</Text>
        </View>
        <View>
          <SwipeListView
            data={exercises}
            renderItem={(exercise, index) => (
              <View key={index} mb='3'>
                <Text ml='8' fontSize={'xs'} fontWeight={'semibold'}>
                  Exercise #{index + 1}
                </Text>
                <HStack justifyContent='center' space={3}>
                  <Input
                    placeholder='Exercise name'
                    value={exercise.name}
                    onChangeText={(value) =>
                      updateExercise(index, 'name', value)
                    }
                    h='35'
                    w='180'
                  />
                  <Input
                    placeholder='Sets'
                    value={exercise.sets}
                    onChangeText={(value) =>
                      updateExercise(index, 'sets', value)
                    }
                    h='35'
                    w='20'
                    // mr='4'
                  />
                  <Input
                    placeholder='Reps'
                    value={exercise.reps}
                    onChangeText={(value) =>
                      updateExercise(index, 'reps', value)
                    }
                    h='35'
                    w='20'
                    // mr='4'
                  />
                </HStack>
              </View>
            )}
          />
          {exercises.map((exercise, index) => (
            <View key={index} mb='3'>
              <Text ml='8' fontSize={'xs'} fontWeight={'semibold'}>
                Exercise #{index + 1}
              </Text>
              <HStack justifyContent='center' space={3}>
                <Input
                  placeholder='Exercise name'
                  value={exercise.name}
                  onChangeText={(value) => updateExercise(index, 'name', value)}
                  h='35'
                  w='180'
                />
                <Input
                  placeholder='Sets'
                  value={exercise.sets}
                  onChangeText={(value) => updateExercise(index, 'sets', value)}
                  h='35'
                  w='20'
                  // mr='4'
                />
                <Input
                  placeholder='Reps'
                  value={exercise.reps}
                  onChangeText={(value) => updateExercise(index, 'reps', value)}
                  h='35'
                  w='20'
                  // mr='4'
                />
              </HStack>
            </View>
          ))}
          <Button onPress={addExercise} w='16' mt='4' mx='auto'>
            <Text>+</Text>
          </Button>
        </View>
      </Flex>
      <Flex position='absolute' bottom='12' right='8'>
        <Button w='16' onPress={saveWorkoutInDB}>
          <Text color='white'>Save</Text>
        </Button>
      </Flex>
    </View>
  )
}
