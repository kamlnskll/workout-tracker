import React, { useState } from 'react'
import { Text, Button, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { WorkoutCard } from '../components/WorkoutCard'

export const Home = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([])

  return (
    <View>
      <View>
        <Text>Workouts</Text>
        <Button onPress={() => navigation.navigate('Register')}>+</Button>
      </View>
      <View>
        {workouts.map((workout) => (
          <WorkoutCard workoutData={workout} />
        ))}
      </View>
    </View>
  )
}
