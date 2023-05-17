import React, { useEffect, useState } from 'react'
import { Button, Input, Text, View, HStack, Flex, Pressable } from 'native-base'
import dayjs from 'dayjs'
import { collection, addDoc } from 'firebase/firestore'
import { database, auth } from '../firebase/firebase'
import { SwipeListView } from 'react-native-swipe-list-view'
import uuid from 'react-native-uuid'
import { serverTimestamp } from 'firebase/firestore'
import { SpinningLoader } from '../components/SpinningLoader'

// Need to change it so that I can add reps to individual sets
// Maybe do an add set button that adds the current reps x set
// Can add multiple sets with the same rep range or individual
// with custom

export const Workout = ({ workoutData, navigation }) => {
  const [exercises, setExercises] = useState([
    { key: uuid.v4(), name: '', reps: '', sets: '', index: 0 },
  ])

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const currentUserId = auth.currentUser.uid
  // const currentUserID = currentUser.uid
  const date = dayjs().format('MMMM DD')

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [error])

  const addExercise = () => {
    const newIndex = exercises.length
    setExercises([
      ...exercises,
      { key: uuid.v4(), name: '', reps: '', sets: '', index: newIndex },
    ])
  }

  const updateExercise = (exerciseIndex, field, value) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.index === exerciseIndex) {
        return {
          ...exercise,
          [field]: value,
        }
      }
      return exercise
    })
    setExercises(updatedExercises)
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...exercises]
    const prevIndex = exercises.findIndex((item) => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setExercises(newData)
  }

  const saveWorkoutInDB = async () => {
    // attach timestamp
    const timestamp = serverTimestamp()
    const id = uuid.v4()
    const dbPayload = {
      timestamp,
      exercises,
      uploaderID: currentUserId,
      id,
    }
    // save workout to Firestore

    setLoading(true)
    await addDoc(collection(database, 'workouts'), dbPayload)
      .then((res) => {
        setLoading(false)
        console.log('New workout created in Firestore')
        navigation.navigate('Home')
      })
      .catch((err) => setError(err))
  }

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} py='0' my='2'>
      <Pressable
        px={4}
        ml='auto'
        cursor='pointer'
        bg='dark.500'
        justifyContent='center'
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
        h='16'
      >
        <Text fontSize='xs'>Close</Text>
      </Pressable>
      <Pressable
        px={4}
        cursor='pointer'
        bg='red.500'
        justifyContent='center'
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Text fontSize='xs'>Delete</Text>
      </Pressable>
    </HStack>
  )

  return (
    <View position='relative' minHeight={'100%'}>
      <SpinningLoader isVisible={loading} />
      <Flex>
        <View>
          <Text my='4' ml='8' fontSize='xl' fontWeight='bold'>
            {date}
          </Text>

          <Text color='red.600'>{error}</Text>
        </View>
        <View>
          <SwipeListView
            rightOpenValue={-130}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            data={exercises}
            renderItem={(exercise, rowMap) => (
              <View key={exercise.key} h='16' bg='gray.100' my='2'>
                <Text ml='8' fontSize={'xs'} fontWeight={'semibold'}>
                  Exercise
                </Text>
                <HStack justifyContent='center' space={3}>
                  <Input
                    placeholder='Exercise name'
                    value={exercise.name}
                    onChangeText={(value) =>
                      updateExercise(exercise.index, 'name', value)
                    }
                    h='35'
                    w='180'
                  />
                  <Input
                    placeholder='Sets'
                    value={exercise.sets}
                    onChangeText={(value) =>
                      updateExercise(exercise.index, 'sets', value)
                    }
                    h='35'
                    w='20'
                    // mr='4'
                  />
                  <Input
                    placeholder='Reps'
                    value={exercise.reps}
                    onChangeText={(value) =>
                      updateExercise(exercise.index, 'reps', value)
                    }
                    h='35'
                    w='20'
                    // mr='4'
                  />
                </HStack>
              </View>
            )}
            renderHiddenItem={renderHiddenItem}
            disableRightSwipe={true}
          />

          <Button onPress={addExercise} w='16' mt='0' mx='auto'>
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
