import React, { useEffect, useState } from 'react'
import {View, VStack,Button, Text, Heading, HStack} from 'native-base'
import { auth, database } from '../firebase/firebase'
import { collection, query, where, getDoc, doc } from 'firebase/firestore'




const EditLabels = ({ navigation }) => {

  const currentUserID = auth.currentUser.uid
  const [labels, setLabels] = useState([])
  const [color, setColor] = useState('')
  const [labelName, setLabelName] = useState('')
  const [editing, setEditing] = useState(false)
  
  const getUserLabels = async () => {
// Find user document in the database and fetch their labels.
    const userDoc = doc(database, "users", currentUserID)
    const docSnapshot = await getDoc(userDoc)
    if (docSnapshot.exists()){
      const data = docSnapshot.data()
      return data
    } else {
      console.log('No document found')
    }
  }

  useEffect(() => {
    getUserLabels().then((res) => {
      const response = res
      if (response && response.labels) {
        setLabels(response.labels)
      }
    })
    .catch((err) => console.log(err))
  }, [])





  return (
    <View my='1/6'>
<Heading pl='4'>Labels - {labels.length}</Heading>
  {/* <Button onPress={() => console.log(labels)}>Fetch Labels</Button> */}

<View mt='4'>
{labels.map((label) => (
  <View bgColor={label.color} my='1' py='2' w='1/2' mx='auto' opacity={'100'} rounded='lg'>
    <Text fontSize={'lg'} mx='auto' bg={'rgba(0, 0, 0, 0.2)'} color='white' fontWeight={'bold'}>{label.name}</Text>
  </View>
))}
 </View>
 <HStack mx='auto' space='4' mt='8'>
 <Button>Add Label</Button>
 <Button onPress={() => {
  setEditing(!editing)
  console.log(editing)
 }}>Delete Labels</Button>
 </HStack>


    </View>
  )

}

export default EditLabels
