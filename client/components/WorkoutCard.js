import { Text, View } from 'native-base'
import React from 'react'

// Shows a preview of each workout in a clickable UI form that will navigate them to the workout data.

export const WorkoutCard = ({ workoutData }) => {
  const exercises = workoutData.exercises

  return (
    <View>
      {exercises?.map((exercise) => (
        <View>
          <Text>{exercise.key}</Text>
        </View>
      ))}
      <Text>This is a workout card and will contain all your workouts</Text>
      <Text>{workoutData.uploaderID}</Text>
    </View>
  )
}
