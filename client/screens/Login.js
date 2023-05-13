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
  Link,
} from 'native-base'
import { auth } from '../firebase/firebase'

import { signInWithEmailAndPassword } from 'firebase/auth'

export const Login = ({ navigation }) => {
  const [field, setField] = useState({
    email: '',
    password: '',
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

  const handleLogin = async () => {
    if (field.email === '' || field.password === '') {
      setField({
        ...field,
        error: 'Enter both email and password.',
      })
      return
    }

    try {
      await signInWithEmailAndPassword(auth, field.email, field.password).then(
        (userCredentials) => {
          const user = userCredentials.user
          console.log('User logged in successfully', console.log(user))
        }
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
          Login
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
          Please enter your credentials.
        </Heading>

        <VStack space={3} mt='4'>
          <Text color='red.600'>{field.error}</Text>
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
          <Button mt='8' color='blue.600' onPress={handleLogin}>
            Login
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
          New user?{' '}
          <Text
            color='blue.600'
            onPress={() => navigation.navigate('Register')}
          >
            Create an account.
          </Text>
        </Heading>
      </Box>
    </Center>
  )
}
