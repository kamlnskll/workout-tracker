import { Text, View, Spinner, HStack, Heading, VStack } from 'native-base'
import React from 'react'

export const SpinningLoader = ({ isVisible }) => {
  return (
    <>
      {isVisible ? (
        <View h='100%' w='100%' bg='black' opacity={'80'} zIndex={'1'}>
          <VStack justifyContent={'center'} my='3/5' space='2' mx='auto'>
            <Heading color='gray.200' fontSize='xl'>
              Saving workout
            </Heading>
            <Spinner size='sm' color='gray.100' />
          </VStack>
        </View>
      ) : (
        <View></View>
      )}
    </>
  )
}
