import React from 'react'
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

export const Login = ({ navigation }) => {
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
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input />
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type='password' />
          </FormControl>
          <Button mt='8' color='blue.600'>
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
