import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const UserStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Workout' component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const WorkoutScreen = ({ navigation }) => {
  return (
    <View>
      <Workout />
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

export default UserStack
