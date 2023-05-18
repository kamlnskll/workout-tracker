import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base'
import { auth } from '../firebase/firebase'
import React from 'react'
import defaultPfp from '../assets/defaultPfppng.png'

const Profile = ({ navigation }) => {
  const currentUser = auth.currentUser

  return (
    <ScrollView
      my='2'
      bg='primary.50'
      borderColor={'black'}
      borderWidth={'0.1'}
      rounded='lg'
      w='90%'
      mx='auto'
      p='2'
    >
      <View mx='auto' p='6'>
        <Image
          size='120'
          borderColor='gray.500'
          rounded='full'
          borderWidth={'0.25'}
          source={
            currentUser.photoURL !== null
              ? {
                  uri: currentUser.photoURL,
                }
              : require('../assets/defaultPfppng.png')
          }
          alt='Profile Picture of User'
        />
      </View>
      <View w='75%' mx='auto'>
        <Text mt='4' mb='2' fontWeight={'semibold'}>
          Account Details
        </Text>
        <VStack space='2'>
          <View>
            <Text fontSize='xs'>Full Name</Text>
            <Input
              placeholder={
                currentUser.displayName !== null
                  ? currentUser.displayName
                  : `No name given`
              }
              isDisabled='true'
            />
          </View>
          <View>
            <Text fontSize='xs'>Email</Text>
            <Input placeholder={currentUser.email} isDisabled='true' />
          </View>
          <View>
            <Text fontSize='xs'>Phone Number</Text>
            <Input
              placeholder={
                currentUser.phoneNumber !== null
                  ? currentUser.phoneNumber
                  : `No number given`
              }
              isDisabled='true'
            />
          </View>
        </VStack>

        <Text mt='6' fontWeight={'semibold'}>
          Personal Details
        </Text>
        <VStack space='2'>
          <View></View>
          <View>
            <Text fontSize='xs'>Weight</Text>
            <Input placeholder={'Weight'} isDisabled='true' />
          </View>
          <View>
            <Text fontSize='xs'>Height</Text>
            <Input placeholder={'Height'} isDisabled='true' />
          </View>
          <View>
            <Text fontSize='xs'>Age</Text>
            <Input placeholder={'Age'} isDisabled='true' />
          </View>
          <View>
            <Text fontSize='xs'>Sex</Text>
            <Input placeholder={'Sex'} isDisabled='true' />
          </View>
        </VStack>
      </View>
      <View mt='12' pb='12'>
        <Button mx='12' mb='4' bg='info.500'>
          Edit Profile
        </Button>
        <HStack space='5' mx='auto'>
          <Button w='1/3' bg='blueGray.400'>
            Settings
          </Button>
          <Button w='1/3' bg='warning.400'>
            Logout
          </Button>
        </HStack>
      </View>
    </ScrollView>
  )
}

export default Profile
