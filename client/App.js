import React from 'react'
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box, Button, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { Register } from './screens/Register'
import { Workout } from './screens/Workout'
import RootNavigation from './navigation/auth'

const Stack = createNativeStackNavigator()

export default function App() {
  // 2. Use at the root of your app
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RootNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

{
  /* <Stack.Navigator>
          
        </Stack.Navigator>
      </NativeBaseProvider> */
}
