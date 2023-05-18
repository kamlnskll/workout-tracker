import { HStack, Image, Text, VStack, View } from 'native-base'
import { auth } from '../firebase/firebase'
import React from 'react'

const Profile = ({ navigation }) => {
  const currentUser = auth.currentUser

  return (
    <View
      my='1'
      bg='primary.50'
      borderColor={'black'}
      borderWidth={'0.5'}
      rounded='lg'
      w='75%'
      ml='4'
      mr='auto'
      justifyContent='left'
    >
      <View>
        <Image
          source={{ uri: `${currentUser.photoURL}` }}
          alt='Profile Picture of User'
        />
        <Text onPress={() => console.log(currentUser)}>Profile</Text>
      </View>
      <View>
        <VStack>
          <Text>{currentUser.email}</Text>
          <HStack></HStack>
        </VStack>
      </View>
    </View>
  )
}

export default Profile
