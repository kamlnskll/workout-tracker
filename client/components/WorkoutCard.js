import { View } from 'native-base'
import React from 'react'

// Shows a preview of each workout in a clickable UI form that will navigate them to the workout data.

export const WorkoutCard = ({ workoutData }) => {
  return (
    <View>
      <Text>
        This text is in a workout card, and will be used to show workouts in a
        card format.
      </Text>
    </View>
  )
}
