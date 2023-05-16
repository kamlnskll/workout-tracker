import React, { useState } from 'react'
import { Text, Button, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { WorkoutCard } from '../components/WorkoutCard'
import { auth, database } from '../firebase/firebase'

export const Home = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([])
  const user = auth.currentUser
  const currentUserID = user.uid

  return (
    <View>
      <View>
        <Text onPress={() => console.log(currentUserID)}>Workouts</Text>
      </View>
      <View>
        {workouts.map((workout) => (
          <WorkoutCard workoutData={workout} />
        ))}
      </View>
    </View>
  )
}
