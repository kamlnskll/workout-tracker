import React, { useEffect, useState } from 'react'
import { Text, Button, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { WorkoutCard } from '../components/WorkoutCard'
import { auth, database } from '../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const Home = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([])
  const currentUserID = auth.currentUser.uid

  const getWorkoutsFromDB = async () => {
    // Create query for a certain condition aka for workouts created by the user and get the documents

    const dbQuery = query(
      collection(database, 'workouts'),
      where('uploaderID', '==', currentUserID)
    )

    const fetchData = await getDocs(dbQuery)
    const fetchWorkouts = fetchData.docs
    return fetchWorkouts
  }

  useEffect(() => {
    getWorkoutsFromDB()
      .then((res) => {
        const response = res
        if (response) {
          const data = response
          data.forEach((doc) => {
            const docData = doc.data()
            console.log(docData)
            setWorkouts(docData.exercises)
            // return docData
          })
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <View>
      <View>
        <Text onPress={() => console.log(workouts)}>Workouts</Text>
      </View>
      <View>
        {workouts.map((workout) => (
          <WorkoutCard workoutData={workout} />
        ))}
      </View>
    </View>
  )
}
