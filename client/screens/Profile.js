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
import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'

const Profile = ({ navigation }) => {
  const currentUser = auth.currentUser
  const [editing, setEditing] = useState(false)

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
              isDisabled={!editing ? true : false}
            />
          </View>
          <View>
            <Text fontSize='xs'>Email</Text>
            <Input
              placeholder={currentUser.email}
              isDisabled={!editing ? true : false}
            />
          </View>
          <View>
            <Text fontSize='xs'>Phone Number</Text>
            <Input
              placeholder={
                currentUser.phoneNumber !== null
                  ? currentUser.phoneNumber
                  : `No number given`
              }
              isDisabled={!editing ? true : false}
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
            <Input
              placeholder={'Weight'}
              isDisabled={!editing ? true : false}
            />
          </View>
          <View>
            <Text fontSize='xs'>Height</Text>
            <Input
              placeholder={'Height'}
              isDisabled={!editing ? true : false}
            />
          </View>
          <View>
            <Text fontSize='xs'>Age</Text>
            <Input placeholder={'Age'} isDisabled={!editing ? true : false} />
          </View>
          <View>
            <Text fontSize='xs'>Sex</Text>
            <Input placeholder={'Sex'} isDisabled={!editing ? true : false} />
          </View>
        </VStack>
      </View>
      <View mt='12' pb='12'>
        {!editing ? (
          <Button mx='12' mb='4' bg='info.500' onPress={() => setEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <Button
            mx='12'
            mb='4'
            bg='coolGray.400'
            borderWidth='1'
            isDisabled='true'
          >
            <Text color='black' fontWeight={'bold'}>
              Editing
            </Text>
          </Button>
        )}
        <HStack space='5' mx='auto'>
          {!editing ? (
            <Button
              w='1/3'
              bg='blueGray.400'
              onPress={() => navigation.navigate('Settings')}
            >
              Settings
            </Button>
          ) : (
            <Button w='1/3' bg='danger.500' onPress={() => setEditing(false)}>
              Cancel Edit
            </Button>
          )}
          {!editing ? (
            <Button
              w='1/3'
              bg='warning.400'
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    // Sign out successful
                    console.log('signed out')
                  })
                  .catch((err) => {
                    console.log('An error occurred when logging out', err)
                  })
              }}
            >
              Logout
            </Button>
          ) : (
            <Button w='1/3' bg='tertiary.500'>
              Save Changes
            </Button>
          )}
          {/* <Button
            w='1/3'
            bg='warning.400'
            onPress={() => {
              signOut(auth)
                .then(() => {
                  // Sign out successful
                  console.log('signed out')
                })
                .catch((err) => {
                  console.log('An error occurred when logging out', err)
                })
            }}
          >
            Logout
          </Button> */}
        </HStack>
      </View>
    </ScrollView>
  )
}

export default Profile
