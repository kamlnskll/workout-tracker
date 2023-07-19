import { HStack, Text, VStack, View } from 'native-base'
import React from 'react'
import dayjs from 'dayjs'

// Shows a preview of each workout in a clickable UI form that will navigate them to the workout data.

export const WorkoutCard = ({ workout, navigation }) => {
  const exercises = workout.exercises
  const workoutId = workout.id
  const date = dayjs
    .unix(workout.timestamp.seconds)
    .format('MMMM DD, YYYY')
    .toString()

  const time = dayjs.unix(workout.timestamp.seconds).format('h:mm a').toString()

  return (
    <View key={workoutId}>
      <VStack mx='2' py='2'>
        <View>
          <HStack justifyContent={'space-between'} mb='5'>
            <Text fontSize='xs' fontWeight='bold'>
              {date}
            </Text>
            <Text fontSize='xs' fontWeight='bold'>
              {time}
            </Text>
          </HStack>
        </View>
        {exercises.map((exercise) => (
          <HStack space={1} key={exercise.key}>
            <Text>{exercise.name}</Text>
            <Text>-</Text>
            <View>
              {exercise.sets.map((set) => (
                <View key={set.index}>
                  <Text>
                    {set.reps} x {set.weight}
                  </Text>
                </View>
              ))}
            </View>
          </HStack>
        ))}
      </VStack>
    </View>
  )
}
