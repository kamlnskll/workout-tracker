{
    const [units, setUnits] = useState('lbs')
    const { toggleColorMode } = useColorMode()
  
    return (
      <View
        my='2'
        bg='primary.50'
        rounded='lg'
        w='90%'
        mx='auto'
        p='2'
        minH='50%'
      >
        <VStack space='8' mt='8' mx='12'>
          <HStack justifyContent={'space-between'}>
            <View my='auto'>
              <Text fontSize={'md'} fontWeight={'semibold'}>
                Toggle Dark Mode
              </Text>
            </View>
            <View mx='auto'>
              <Switch size='sm' onPress={toggleColorMode} />
            </View>
          </HStack>
          <HStack justifyContent={'space-between'}>
            <View my='auto'>
              <Text fontSize={'md'} fontWeight={'semibold'}>
                Preferred Units
              </Text>
            </View>
            <View>
              <Select
                selectedValue={units}
                minWidth='110'
                accessibilityLabel='Choose Units'
                placeholder='lbs / kg'
                _selectedItem={{
                  bg: 'tertiary.500',
                  endIcon: <CheckIcon size='5' />,
                }}
                mt={1}
                onValueChange={(itemValue) => setUnits(itemValue)}
              >
                <Select.Item label='Pounds' value='lbs' />
                <Select.Item label='Kilograms' value='kg' />
              </Select>
            </View>
          </HStack>
        </VStack>
      </View>
    )
  }