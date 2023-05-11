import React from 'react'
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box, Button, View } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Hello This is home page</Text>
      <Button title='Home' />
    </View>
  )
}

const LoginScreen = ({ navigation }) => {
  return <Button title='Login' />
}

const RegisterScreen = ({ navigation }) => {
  return <Button title='Register Page' />
}
