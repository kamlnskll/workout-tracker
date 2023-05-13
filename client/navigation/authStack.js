import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'native-base'
import { Login } from '../screens/Login'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <Register navigation={navigation} />
    </View>
  )
}

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Login navigation={navigation} />
    </View>
  )
}

export default AuthStack
