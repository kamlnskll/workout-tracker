import { HStack, Heading, Text, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { getDocs, getDoc, collection, query, where, doc } from 'firebase/firestore'
import { database, auth } from '../firebase/firebase'
import dayjs from 'dayjs'
import DropDownPicker from 'react-native-dropdown-picker';

const SavedWorkout = ({ route, navigation }) => {
  const [workout, setWorkout] = useState()
  const [userLabels, setUserLabels] = useState([])
  const [workoutLabels, setWorkoutLabels] = useState([])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([])
  const [items, setItems] = useState([])
  const { id } = route.params
  const currentUserID = auth.currentUser.uid


  ///
  ///
  ///
  ///
  ///

  const fetchWorkoutById = async () => {
    const workoutQuery = query(
      collection(database, 'workouts'),
      where('id', '==', id)
    )
    console.log(id)
    const fetchWorkout = await getDocs(workoutQuery)
    const workoutData = fetchWorkout.docs.map((doc) => doc.data())

    if (fetchWorkout) {
      // console.log('document data:', workoutData)
    } else {
      console.log('Workout not found')
    }
    // Returning workoutData[0] because there should be only one result with that ID anyway.
    return workoutData[0]
  }

  ///
  ///
  ///
  ///
  ///

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

///
///
///
///
///


  useEffect(() => {
    // get workout details given id as prop from firestore and display it on a separate page.
    
    fetchWorkoutById().then((res) => {
      setWorkout(res)
    }).catch(err => console.log(err))

    // also fetch labels in case you decide to edit them

    getUserLabels().then((res) => {
      setUserLabels(res.labels)
      // console.log('set user labels log', res.labels)
      // console.log('set user labels', userLabels)
    }).catch((err) => console.log(err))


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
        pb='4'
      >
        <Text>Add Label</Text>

        <HStack mx='4' my='4' justifyContent={'space-between'}>
          <Heading fontSize='md'>{date}</Heading>
          <Text fontSize='xs' my='auto'>
            Created at: <Text fontWeight='semibold'>{time}</Text>
          </Text>
        </HStack>
        <View pb='8'>
        <DropDownPicker 
        multiple={true}
        min={0}
        max={6}
        open={open}
        items={items}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
          {workout?.exercises?.map((exercise) => (
            <View pb='4'>
              <HStack ml='8'>
                <Text my='auto' fontSize='md'>
                  {exercise.name}
                  {/* {exercise.name !== '' ? ` - ` : null} */}
                </Text>
                <VStack ml='4'>
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
