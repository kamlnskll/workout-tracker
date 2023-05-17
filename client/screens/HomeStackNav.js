import React from 'react'
import { Home } from './Home'
import SavedWorkout from './SavedWorkout'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'native-base'

const HomeStackNav = ({ navigation }) => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        screenOptions={{ headerShown: false }}
      />
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

const SavedWorkoutScreen = ({ route, navigation }) => {
  return (
    <View>
      <SavedWorkout route={route} navigation={navigation} id={''} />
    </View>
  )
}

export default HomeStackNav
