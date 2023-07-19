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

  const calculateTotalRepsAcrossExercises = () => {
    const totalReps = exerciseList?.reduce((acc, exercise) => {
      const reps = calculateTotalReps(exercise.sets)
      return acc + reps
    }, 0)
    return totalReps
  }

  // Output is NaN - will need to fix this likely because of the data type.
  const calculateTotalWeightLiftedAcrossExercises = () => {
    const totalWeight = exerciseList?.reduce((acc, exercise) => {
      const weight = calculateTotalWeightMoved(exercise.sets)
      return acc + weight
    }, 0)
    return totalWeight
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
            Total reps this session:{' '}
            {calculateTotalRepsAcrossExercises()}
          </Text>
          <Text>
            Total weight lifted this session:{' '}
            {calculateTotalWeightLiftedAcrossExercises()}
          </Text>
        </View>
      ) : (
        <VStack space='3' ml='4'>
          {exerciseList?.map((exercise) => (
            <View key={exercise.key}>
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

  </View>
  )
}

export default WorkoutStats
