import React, { useEffect, useState } from 'react'
import { View, Heading, Pressable, HStack, ScrollView, Button, Text, Select, CheckIcon } from 'native-base'
import { WorkoutCard } from '../components/WorkoutCard'
import { auth, database } from '../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const Home = ({ navigation }) => {
  const [workouts, setWorkouts] = useState()
  const [dateRange, setDateRange] = useState('7d')
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
        <HStack mx='8' mt='6' mb='3'>
          <Heading>Workouts</Heading>
          <Button ml='auto' bgColor={'green.500'} onPress={() => {}}>
            <Text fontWeight={'bold'} color='white'>
              Add New</Text></Button>
        </HStack>
        <ScrollView horizontal={true}>
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
        </ScrollView>
        <View  mx='8' mt='6' mb='3'>
        <HStack>
          <Heading my='auto'>Your Stats</Heading>
          <Select defaultValue={dateRange} selectedValue={dateRange} ml='auto' maxHeight='32px' minWidth="120" accessibilityLabel="Range" placeholder="Date Range" _selectedItem={{
        bg: "tertiary.200",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={(value) => {setDateRange(value)}}>
          <Select.Item label="7 Days" value="7d" />
          <Select.Item label="14 Days" value="14d" />
          <Select.Item label="30 Days" value="30d" />
          {/* <Select.Item label="Last 90 Days" value="90d" />
          <Select.Item label="Last 6 months" value="180d" />
          <Select.Item label="Last 1 year" value="365d" /> 
          Implement these date ranges later on.
          */}
        </Select>
        </HStack>
        <Text># of Workouts This Week/Month</Text>

        </View>
      </View>
    </>
    // This can be represented with a simple bar chart that will compare up to 3 weeks prior.
  )
}
