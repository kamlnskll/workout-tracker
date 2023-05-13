import React, { useState } from 'react'
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
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const Register = ({ navigation }) => {
  const [field, setField] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
  })

  const handleRegister = async () => {
    if (field.email === '' || field.password === '' || field.username === '') {
      setField({
        ...field,
        error: 'Enter both email and password.',
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        field.email,
        field.password
      ).then((userCredentials) => {
        const user = userCredentials.user
        console.log('User successfully registered', console.log(user))
      })
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
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type='password' />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type='password' />
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
