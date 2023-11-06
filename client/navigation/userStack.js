import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'native-base'
import { Workout } from '../screens/Workout'
import Profile from '../screens/Profile'
import HomeStackNav from '../screens/HomeStackNav'
import ProfileStackNav from '../screens/ProfileStackNav'

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
        {/* <Tab.Screen name='New Workout' component={WorkoutScreen} /> */}
        <Tab.Screen name='Profile' component={ProfileStackNav} />
      </Tab.Navigator>
    </>
  )
}

// const WorkoutScreen = ({ navigation }) => {
//   return (
//     <View>
//       <Workout navigation={navigation} />
//     </View>
//   )
// }

export default UserStack
