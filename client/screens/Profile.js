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
import { auth, database } from '../firebase/firebase'
import React, { useState, useEffect } from 'react'
import { signOut, updateProfile } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker'

const Profile = ({ navigation }) => {
  const currentUser = auth.currentUser
  const [editing, setEditing] = useState(false)
  const [existingData, setExistingData] = useState(null)
  const [image, setImage] = useState(null)
  const [userData, setUserData] = useState({
    displayName: null,
    photoURL: null,
    phoneNumber: null,
    weight: '',
    height: '',
    dateOfBirth: '',
    sex: '',
  })
  const userDocRef = doc(database, 'users', currentUser.uid)

  useEffect(() => {
    const fetchData = async () => {
      const userSnapshot = await getDoc(userDocRef)
      const fetchedData = userSnapshot.data()
      setUserData({
        weight: fetchedData.weight,
        height: fetchedData.height,
        dateOfBirth: fetchedData.dateOfBirth,
        sex: fetchedData.sex,
      })
      setExistingData(fetchedData)
    }

    fetchData()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const saveProfileEdits = async () => {
    const newDataForUserCollection = {}
    const newDataForUserObject = {}

    console.log(existingData)
    // Compare and update the fields only if they are different
    if (userData?.displayName !== currentUser?.displayName) {
      newDataForUserObject.displayName = userData.displayName
    }

    if (userData?.photoURL !== currentUser?.photoURL) {
      newDataForUserObject.photoURL = userData.photoURL
    }

    if (userData?.phoneNumber !== currentUser?.phoneNumber) {
      newDataForUserObject.phoneNumber = userData.phoneNumber
    }

    if (userData?.weight !== existingData?.weight) {
      newDataForUserCollection.weight = userData.weight
    }

    if (userData?.height !== existingData?.height) {
      newDataForUserCollection.height = userData.height
    }

    if (userData?.dateOfBirth !== existingData?.dateOfBirth) {
      newDataForUserCollection.dateOfBirth = userData.dateOfBirth
    }

    // Update the user document only if there are changes
    if (Object.keys(newDataForUserCollection).length > 0) {
      try {
        await updateDoc(userDocRef, newDataForUserCollection).then(() => {
          console.log('Profile in User Collection updated')
          setEditing(false)
        })
      } catch (error) {
        console.log('Error occurred: ', error)
      }
    } else {
      console.log('No changes to update in User Collection')
    }

    // For editing info in the user object
    if (Object.keys(newDataForUserObject).length > 0) {
      try {
        updateProfile(currentUser, {
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        })
          .then(() => {
            console.log('Profile Updated in User Object')
            setEditing(false)
          })
          .catch((error) => {
            console.log('Error occurred while updating profile: ', error)
          })
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  const handleInputChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

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
      <View
        mx='auto'
        p={editing ? `0` : `6`}
        px={editing ? `6` : `0`}
        pt='6'
        pb={editing ? `2` : `0`}
      >
        <Image
          size='120'
          borderColor='gray.500'
          rounded='full'
          borderWidth={'0.25'}
          source={{ uri: image }}
          // ={
          //   currentUser.photoURL !== null
          //     ? {
          //         uri: currentUser.photoURL,
          //       }
          //     : require('../assets/defaultPfppng.png')
          // }
          alt='Profile Picture of User'
        />
      </View>
      {editing ? (
        <Button variant='ghost' onPress={pickImage} w='1/2' mx='auto'>
          <Text fontSize='xs' fontWeight='semibold'>
            Change profile picture
          </Text>
        </Button>
      ) : null}
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
              onChangeText={(value) => handleInputChange('displayName', value)}
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
              isDisabled={!editing ? true : false}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
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
              placeholder={userData.weight !== '' ? userData.weight : 'Weight'}
              isDisabled={!editing ? true : false}
              onChangeText={(value) => handleInputChange('weight', value)}
            />
          </View>
          <View>
            <Text fontSize='xs'>Height</Text>
            <Input
              placeholder={userData.height !== '' ? userData.height : 'Height'}
              isDisabled={!editing ? true : false}
              onChangeText={(value) => handleInputChange('height', value)}
            />
          </View>
          <View>
            <Text fontSize='xs'>Age</Text>
            <Input
              placeholder={
                userData.dateOfBirth !== '' ? userData.dateOfBirth : 'Age'
              }
              isDisabled={!editing ? true : false}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
            />
          </View>
          <View>
            <Text fontSize='xs'>Sex</Text>
            <Input
              placeholder={userData.sex !== '' ? userData.sex : 'Sex'}
              isDisabled={!editing ? true : false}
              onChangeText={(value) => handleInputChange('sex', value)}
            />
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
            <Button w='1/3' bg='tertiary.500' onPress={saveProfileEdits}>
              Save Changes
            </Button>
          )}
        </HStack>
      </View>
    </ScrollView>
  )
}

export default Profile
