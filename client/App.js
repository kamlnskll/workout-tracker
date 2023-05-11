import React from 'react'
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box, Button, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Register } from './screens/Register'
import { Workout } from './screens/Workout'

const Stack = createNativeStackNavigator()

export default function App() {
  // 2. Use at the root of your app
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Workout' component={WorkoutScreen} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Home navigation={navigation} />
    </View>
  )
}

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Login />
    </View>
  )
}

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Register />
    </View>
  )
}

const WorkoutScreen = ({ navigation }) => {
  return (
    <View>
      <Workout />
    </View>
  )
}
