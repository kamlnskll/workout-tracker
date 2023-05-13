import React from 'react'
import { Input, Text, View } from 'native-base'

export const Workout = ({ workoutData }) => {
  return (
    <View>
      <View>
        <Text>Build your workout.</Text>
      </View>
      <View>
        <View>
          <Text>Exercise #1</Text>
          <Input />
        </View>
      </View>
    </View>
  )
}
