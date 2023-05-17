import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, View } from 'native-base'
import { Home } from '../screens/Home'
import { Workout } from '../screens/Workout'
import Profile from '../screens/Profile'
import SavedWorkout from '../screens/SavedWorkout'
import HomeStackNav from '../screens/HomeStackNav'

const Tab = createBottomTabNavigator()

const UserStack = () => {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeStackNav}
          screenOptions={{ headerShown: false }}
        />
        <Tab.Screen name='New Workout' component={WorkoutScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
      </Tab.Navigator>
    </>
  )
}

const WorkoutScreen = ({ navigation }) => {
  return (
    <View>
      <Workout navigation={navigation} />
    </View>
  )
}

// const SavedWorkoutScreen = ({ navigation }) => {
//   return (
//     <View>
//       <SavedWorkout navigation={navigation} />
//     </View>
//   )
// }

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View>
//       <Home navigation={navigation} />
//     </View>
//   )
// }

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Profile navigation={navigation} />
    </View>
  )
}

export default UserStack
