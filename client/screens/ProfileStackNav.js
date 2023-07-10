import React from 'react'
import { Home } from './Home'
import Profile from './Profile'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'native-base'
import Settings from './Settings'

const ProfileStackNav = ({ navigation }) => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Profile Screen'
        component={ProfileScreen}
        screenOptions={{ headerShown: false }}
      />
      <Stack.Screen name='Settings' component={SettingsScreen} />
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

const SettingsScreen = ({ navigation }) => {
  return (
    <View>
      <Settings navigation={navigation} />
    </View>
  )
}

export default ProfileStackNav
