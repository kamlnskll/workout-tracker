import React from 'react'
import 'react-native-gesture-handler'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import RootNavigation from './navigation/auth'

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <RootNavigation />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
