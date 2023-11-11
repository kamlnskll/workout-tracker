import React, { useState } from 'react'
import {
  View, VStack,Button,
} from 'native-base'

import { auth } from '../firebase/firebase'
import { signOut } from 'firebase/auth'

const Settings = ({ navigation }) => {

  return (
    <View my='1/4'>
      <VStack space='4' mx='16'>
      <Button onPress={() => {navigation.navigate('Edit Labels')}}>Edit Labels</Button>
      <Button>Edit Preferences</Button>
      <Button onPress={() => {navigation.navigate('Profile Screen')}}>Edit Profile</Button>
      <Button onPress={() => {
                signOut(auth)
                  .then(() => {
                    // Sign out successful
                    console.log('signed out')
                  })
                  .catch((err) => {
                    console.log('An error occurred when logging out', err)
                  })
              }}>Log Out</Button>
      </VStack>


    </View>
  )

}

export default Settings
