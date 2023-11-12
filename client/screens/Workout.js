import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Text,
  View,
  HStack,
  VStack,
  Flex,
  Pressable,
  AddIcon,
  ScrollView,
} from 'native-base'
import dayjs from 'dayjs'
import { getDocs, getDoc, addDoc, collection, query, where, doc } from 'firebase/firestore'
import { database, auth } from '../firebase/firebase'
import { SwipeListView } from 'react-native-swipe-list-view'
import uuid from 'react-native-uuid'
import { serverTimestamp } from 'firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker';
import { SpinningLoader } from '../components/SpinningLoader'

// Need to change it so that I can add reps to individual sets
// Maybe do an add set button that adds the current reps x set
// Can add multiple sets with the same rep range or individual
// with custom

export const Workout = ({ workoutData, navigation }) => {
  const currentUserID = auth.currentUser.uid
  const [setObject, setSetObject] = useState({ reps: 0, weight: 0 })
  const [workoutLabels, setWorkoutLabels] = useState([])
  const [userLabels, setUserLabels] = useState([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([])
  const [items, setItems] = useState([])
  const [exercises, setExercises] = useState([
    { key: uuid.v4(), name: '', sets: [], index: 0},
  ])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const currentUserId = auth.currentUser.uid
  const date = dayjs().format('MMMM DD')

  const getUserLabels = async () => {
    // Find user document in the database and fetch their labels.
        const userDoc = doc(database, "users", currentUserID)
        const docSnapshot = await getDoc(userDoc)
        if (docSnapshot.exists()){
          const data = docSnapshot.data()
          return data
        } else {
          console.log('No document found')
        }
      }

useEffect(() => {getUserLabels().then((res) => {
  setUserLabels(res.labels)
  // console.log('set user labels log', res.labels)
  // console.log('set user labels', userLabels)
}).catch((err) => console.log(err))

}, [])

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000)
  }, [error])

  const addExercise = () => {
    const newIndex = exercises.length
    setExercises([
      ...exercises,
      {
        key: uuid.v4(),
        name: '',
        sets: [],
        index: newIndex,
      },
    ])
  }


  const addSet = (exerciseIndex) => {
    const fetchExercise = exercises.map((exercise) => {
      if (exercise.index === exerciseIndex) {
        if (exercise.sets.length === 0) {
          return {
            ...exercise,
            sets: [setObject], // Add set
          }
        } else {
          return {
            ...exercise,
            sets: [...exercise.sets, setObject],
          }
        }
      }
      return exercise
    })
    setExercises(fetchExercise)
  }

  const updateSet = () => {}

  const deleteSet = () => {}

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
      labels: workoutLabels
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
          <DropDownPicker
        style={{
        backgroundColor: 'rgba(255, 255, 255, 0)',
       
        borderColor: 'rgba(255, 255, 255, 0)'
        }}
        dropDownContainerStyle={{
          backgroundColor: "rgba(255, 255, 255, 100)",
          borderColor: 'rgba(255, 255, 255, 0)'
        }}
        schema={{
          label: 'name',
          value: 'name',
        }} 
        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        min={0}
        max={6}
        open={open}
        items={userLabels}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
          <Text color='red.600'>{error}</Text>
        </View>
        <View>
          <HStack>
            <Text mx='8'>Exercise Name</Text>
            <HStack mx='auto' space='8'>
              <Text>Reps</Text>
              <Text>Weight</Text>
            </HStack>
          </HStack>
          <SwipeListView
            rightOpenValue={-130}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            data={exercises}
            renderItem={(exercise, rowMap) => (
              <View key={exercise.key} py='2' bgColor='blueGray.100' my='2'>
                <HStack
                  space={0}
                  justifyContent={'space-evenly'}
                  my='auto'
                  maxH={'32'}
                >
                  <Input
                    placeholder=''
                    value={exercise.name}
                    onChangeText={(value) =>
                      updateExercise(exercise.index, 'name', value)
                    }
                    h='30'
                    w='180'
                    my='auto'
                  />
                  <VStack my='2' space='4'>
                    <ScrollView px='6'>
                      {exercise.item.sets.length > 0
                        ? exercise.item.sets.map((set) => (
                            <>
                              <HStack space='2'>
                                <Input
                                  placeholder=''
                                  value={set.reps}
                                  onChangeText={(value) => {
                                    const updatedSets = exercise.item.sets.map(
                                      (item) => {
                                        if (item === set) {
                                          return {
                                            ...item,
                                            reps: value,
                                          }
                                        }
                                        return item
                                      }
                                    )

                                    const updatedExercises = exercises.map(
                                      (ex) => {
                                        if (ex.index === exercise.index) {
                                          return {
                                            ...ex,
                                            sets: updatedSets,
                                          }
                                        }
                                        return ex
                                      }
                                    )

                                    setExercises(updatedExercises)
                                  }}
                                  h='35'
                                  w='12'
                                />
                                <Input
                                  placeholder=''
                                  value={set.weight}
                                  onChangeText={(value) => {
                                    const updatedSets = exercise.item.sets.map(
                                      (item) => {
                                        if (item === set) {
                                          return {
                                            ...item,
                                            weight: value,
                                          }
                                        }
                                        return item
                                      }
                                    )

                                    const updatedExercises = exercises.map(
                                      (ex) => {
                                        if (ex.index === exercise.index) {
                                          return {
                                            ...ex,
                                            sets: updatedSets,
                                          }
                                        }
                                        return ex
                                      }
                                    )

                                    setExercises(updatedExercises)
                                  }}
                                  h='35'
                                  w='16'
                                />
                              </HStack>
                            </>
                          ))
                        : null}
                      <Button
                        onPress={() => addSet(exercise.index)}
                        w='8'
                        rounded={'full'}
                        pt='4'
                        pb='2'
                        mx='auto'
                        bgColor={'blueGray.100'}
                      >
                        <AddIcon color={'green.500'} />
                      </Button>
                    </ScrollView>
                  </VStack>
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

{
  /* <Button
                      onPress={() => console.log(exercise.item.sets.length)}
                      w='20'
                      mt='0'
                      mx='auto'
                    >
                      <Text fontSize='2xs'>TEST</Text>
                    </Button> */
}
