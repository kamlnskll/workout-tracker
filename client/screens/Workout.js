import React, { useState } from 'react'
import { Button, Input, Text, View } from 'native-base'
import dayjs from 'dayjs'
import { database } from '../firebase/firebase'
import { ref, set } from 'firebase/database'

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

  const saveWorkoutInDB = () => {
    // save workout to db in firebase here

    set(ref(database, ''), {
      exercises: exercises,
    })
  }

  const date = dayjs().format('MMMM DD')

  return (
    <View>
      <View>
        <Text my='4' ml='8' fontSize='xl' font='bold'>
          {date}
        </Text>
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
        <Button>
          <Text onPress={saveWorkoutInDB}>Save</Text>
        </Button>
      </View>
    </View>
  )
}
