import React, { useEffect, useState } from 'react'
import { View, Heading, Pressable, HStack, Button, VStack, Text, Select, CheckIcon } from 'native-base'
import { WorkoutCard } from '../components/WorkoutCard'
import { auth, database } from '../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'


export const Home = ({ navigation }) => {

  const [workouts, setWorkouts] = useState()
  const [timeframe, setTimeframe] = useState('30')
  const currentUserID = auth.currentUser.uid


  const getWorkoutsFromDB = async () => {
    // Create query for a certain condition aka for workouts created by the user and get the documents

    const dbQuery = query(
      collection(database, 'workouts'),
      where('uploaderID', '==', currentUserID)
    )

    const fetchData = await getDocs(dbQuery)
    const fetchWorkouts = fetchData.docs.map((doc) => doc.data())
    return fetchWorkouts
  }

  useEffect(() => {
    getWorkoutsFromDB()
      .then((res) => {
        const response = res
        if (response) {
          setWorkouts(response)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <View>
        <VStack ml='4' >
        <HStack mt='6' mb='3' space='4'>
          <Heading onPress={() => console.log(workouts)}>Your Workouts</Heading>
          <Button onPress={() => {navigation.navigate('New Workout')}}>New Workout</Button>
        </HStack>
        <Select selectedValue={timeframe} maxWidth="130" accessibilityLabel="Choose Date Range" placeholder="Last 30 days" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={e => setTimeframe(e)}>
          <Select.Item label="Last 7 Days" value="7" />
          <Select.Item label="Last 14 Days" value="14" />
          <Select.Item label="Last 30 Days" value="30" />
          <Select.Item label="Last 90 Days" value="90" />
          <Select.Item label="Last 1 Year" value="365" />
          <Select.Item label="Custom" value="custom" />
        </Select>
        
 
        </VStack>
        <View>
          {Array.isArray(workouts)
            ? workouts.map((workout) => (
                <Pressable
                  my='1'
                  bg='primary.50'
                  borderColor={'black'}
                  borderWidth={'0.5'}
                  onPress={() =>
                    navigation.navigate('Saved Workout', {
                      id: workout.id,
                    })
                  }
                  _pressed={{
                    bg: 'primary.100',
                  }}
                  rounded='lg'
                  w='75%'
                  ml='4'
                  mr='auto'
                  justifyContent='left'
                >
                  <WorkoutCard workout={workout} />
                </Pressable>
              ))
            : null}
        </View>
      </View>
    </>
  )
}
