import React, { useEffect, useState } from 'react'
import {
  Text,
  Button,
  View,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  Input,
} from 'native-base'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../firebase/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import uuid from 'react-native-uuid'

export const Register = ({ navigation }) => {
  const [field, setField] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  })

  useEffect(() => {
    setTimeout(() => {
      setField({
        ...field,
        error: '',
      })
    }, 5000)
  }, [field.error])

  const handleRegister = async () => {
    if (field.email == '' || field.password == '' || field.username == '') {
      setField({
        ...field,
        error: 'All fields must be filled to register.',
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, field.email, field.password)
        .then((userCredentials) => {
          const user = userCredentials.user
          console.log('User successfully registered', console.log(user))

          // User data for other collection
          const userDocRef = doc(database, 'users', auth.currentUser.uid)
          const userData = {
            profilePic: null,
            dateOfBirth: '',
            weight: '',
            units: 'pounds',
            height: '',
            sex: '',
            labels: [{id: uuid.v4(), name: 'Push', color: '#0082fc'}, {id: uuid.v4(), name: 'Pull', color: '#a000fc'}, {id: uuid.v4(), name: 'Legs', color: '#fc002a'}, {id: uuid.v4(), name: 'Arms', color: '#fc9700'}, {id: uuid.v4(), name: 'Shoulders', color: '#2efc00'}, {id: uuid.v4(), name: 'Cardio', color: '#00fcd2'}, {id: uuid.v4(), name: 'Abs', color: '#fcf000'}, {id: uuid.v4(), name: 'Biceps', color: '#cbc8fa'}, {id: uuid.v4(), name: 'Triceps', color: '#ff9cc2'}, ],
            
          }

          setDoc(userDocRef, userData).then((res) =>
            console.log('User collection created')
          )
        })
        .catch((err) =>
          console.log('Error when creating user in users collection', err)
        )
    } catch (error) {
      setField({
        ...field,
        error: error.message,
      })
    }
  }

  return (
    <Center w='100%'>
      <Box safeArea p='2' w='90%' maxW='290' py='8'>
        <Heading
          size='lg'
          color='coolGray.800'
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight='semibold'
        >
          Register
        </Heading>
        <Heading
          mt='1'
          color='coolGray.600'
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight='medium'
          size='xs'
        >
          Fill in your details to create an account.
        </Heading>

        <VStack space={3} mt='4'>
          <Text color='red.600'>{field.error}</Text>
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input
              onChangeText={(text) => setField({ ...field, username: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={(text) => setField({ ...field, email: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type='password'
              onChangeText={(text) => setField({ ...field, password: text })}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type='password'
              onChangeText={(text) =>
                setField({ ...field, confirmPassword: text })
              }
            />
          </FormControl>
          <Button mt='8' color='blue.600' onPress={handleRegister}>
            Sign up
          </Button>
        </VStack>
        <Heading
          mt='8'
          color='coolGray.600'
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight='medium'
          size='xs'
        >
          Have an account?{' '}
          <Text color='blue.600' onPress={() => navigation.navigate('Login')}>
            Login here.
          </Text>
        </Heading>
      </Box>
    </Center>
  )
}
