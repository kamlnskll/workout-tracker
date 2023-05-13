import React, { useState } from 'react'
import { Button, Input, Text, View } from 'native-base'

// Need to change it so that I can add reps to individual sets
// Maybe do an add set button that adds the current reps x set
// Can add multiple sets with the same rep range or individual
// with custom

export const Workout = ({ workoutData }) => {
  const [exercises, setExercises] = useState([{ name: '', reps: '', sets: '' }])

  const addExercise = () => {
    setExercises([...exercises, { name: '', reps: '', sets: '' }])
  }

  const updateExercise = (index, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[index][field] = value
    setExercises(updatedExercises)
  }

  return (
    <View>
      <View>
        <Text>Build your workout.</Text>
      </View>
      <View>
        {exercises.map((exercise, index) => (
          <View key={index}>
            <Text>Exercise #{index + 1}</Text>
            <Input
              placeholder='Exercise name'
              value={exercise.name}
              onChangeText={(value) => updateExercise(index, 'name', value)}
            />
            <Input
              placeholder='Sets'
              value={exercise.sets}
              onChangeText={(value) => updateExercise(index, 'sets', value)}
            />
            <Input
              placeholder='Reps'
              value={exercise.reps}
              onChangeText={(value) => updateExercise(index, 'reps', value)}
            />
          </View>
        ))}
        <Button onPress={addExercise}>
          <Text>Add exercise</Text>
        </Button>
      </View>
    </View>
  )
}
