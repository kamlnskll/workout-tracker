import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'native-base'
import { Home } from '../screens/Home'
import { Workout } from '../screens/Workout'

const Stack = createNativeStackNavigator()

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Workout' component={WorkoutScreen} />
    </Stack.Navigator>
  )
}

const WorkoutScreen = ({ navigation }) => {
  return (
    <View>
      <Workout />
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Home navigation={navigation} />
    </View>
  )
}

export default UserStack
