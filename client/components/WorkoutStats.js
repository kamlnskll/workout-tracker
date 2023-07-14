import React, { useState } from 'react'
import { Text, View, Button, HStack, VStack } from 'native-base'

const WorkoutStats = ({ workoutData }) => {
  const exerciseList = workoutData?.exercises
  const [statTab, setStatTab] = useState('total')

  const calculateTotalWeightMoved = (sets) => {
    let totalWeight = 0
    sets.forEach((set) => {
      const { reps, weight } = set
      totalWeight += reps * weight
    })
    return totalWeight
  }

  const calculateTotalReps = (sets) => {
    let totalReps = 0
    sets.forEach((set) => {
      totalReps += parseInt(set.reps, 10)
    })
    return totalReps
  }

  // Create a solution here that avoids nested loops
  // Down the line.

  const calculateTotalRepsAcrossExercises = async () => {
    let totalReps = 0
    await exerciseList.forEach((exercise) => {
      totalReps += calculateTotalReps(exercise.sets)
    })
    return totalReps
  }

  return (
    <View>
      <Text mx='auto' fontSize={'lg'} fontStyle={'italic'}>
        Statistics
      </Text>
      <HStack mx='auto' my='4' space='2'>
        <Button bgColor={'tertiary.400'} onPress={() => setStatTab('foreach')}>
          <Text>Per exercise</Text>
        </Button>
        <Button bgColor={'primary.400'} onPress={() => setStatTab('total')}>
          <Text>Total</Text>
        </Button>
      </HStack>
      {statTab === 'total' ? (
        <View>
          <Text>Total Exercise Stats</Text>
          <Text>
            Total reps across all exercises:{' '}
            {calculateTotalRepsAcrossExercises().toString()}
          </Text>
        </View>
      ) : (
        <VStack space='3' ml='4'>
          {exerciseList?.map((exercise) => (
            <View>
              <Text fontSize='sm' fontWeight={'semibold'}>
                {exercise.name}
              </Text>
              <VStack>
                <Text>Total reps: {calculateTotalReps(exercise.sets)}</Text>
                <Text>
                  Total weight moved: {calculateTotalWeightMoved(exercise.sets)}
                  {''}
                  pounds
                </Text>
                {exercise.sets.map((set) => (
                  <VStack>
                    {/* <Text>{set.reps} reps</Text> */}
                    {/* <Text>{set.weight} pounds</Text> */}
                  </VStack>
                ))}
              </VStack>
            </View>
          ))}
        </VStack>
      )}

      {/* <Button onPress={() => console.log(exerciseList)}>Test</Button> */}
    </View>
  )
}

export default WorkoutStats
