import { HStack, Text, VStack, View } from 'native-base'
import React from 'react'
import dayjs from 'dayjs'

// Shows a preview of each workout in a clickable UI form that will navigate them to the workout data.

export const WorkoutCard = ({ workout, navigation }) => {
  const exercises = workout.exercises
  const date = dayjs
    .unix(workout.timestamp.seconds)
    .format('MMMM DD')
    .toString()

  const time = dayjs.unix(workout.timestamp.seconds).format('h:mm a').toString()

  return (
    <View py='4'>
      <VStack>
        <View>
          <HStack justifyContent={'space-between'} mb='5'>
            <Text fontSize='md' ml='4' fontWeight='bold'>
              {date}
            </Text>
            {/* <Text fontSize='xs' fontWeight='bold'>
              {time}
            </Text> */}
          </HStack>
        </View>
      </VStack>
             {/* {exercises.map((exercise) => (
          <HStack space={1}>
            <Text>{exercise.name}</Text>
            <Text>-</Text>
            <View>
              {exercise.sets.map((set) => (
                <>
                  <Text>
                    {set.reps} x {set.weight}
                  </Text>
                </>
              ))}
            </View>
          </HStack>
        ))} */}
    </View>

    
  )
}
