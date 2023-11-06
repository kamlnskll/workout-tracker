import React from 'react'
import { Home } from './Home'
import SavedWorkout from './SavedWorkout'
import { Workout } from './Workout'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'native-base'

const HomeStackNav = ({ navigation }) => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Home Stack Home Screen'
        component={HomeScreen}
      />
      <Stack.Screen name='New Workout' component={WorkoutScreen} />
      <Stack.Screen name='Saved Workout' component={SavedWorkoutScreen} />
    </Stack.Navigator>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Home navigation={navigation} />
    </View>
  )
}

const WorkoutScreen = ({ navigation }) => {
  return (
    <View>
      <Workout navigation={navigation} />
    </View>
  )
}

const SavedWorkoutScreen = ({ route, navigation }) => {
  return (
    <View>
      <SavedWorkout route={route} navigation={navigation} id={''} />
    </View>
  )
}

export default HomeStackNav
