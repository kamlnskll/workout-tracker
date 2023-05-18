import React from 'react'
import { Home } from './Home'
import Profile from './Profile'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'native-base'

const ProfileStackNav = ({ navigation }) => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen name='Settings' component={SavedWorkoutScreen} />
    </Stack.Navigator>
  )
}

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Profile navigation={navigation} />
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
