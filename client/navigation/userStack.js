import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, View } from 'native-base'
import { Home } from '../screens/Home'
import { Workout } from '../screens/Workout'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

const UserStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='New Workout' component={WorkoutScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />

      {/* <Tab.Screen name='Sign Out' /> */}
    </Tab.Navigator>
  )
}

const WorkoutScreen = ({ navigation }) => {
  return (
    <View>
      <Workout navigation={navigation} />
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

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Profile navigation={navigation} />
    </View>
  )
}

export default UserStack
