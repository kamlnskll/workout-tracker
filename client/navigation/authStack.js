import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
