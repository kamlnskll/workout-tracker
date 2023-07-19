import React, { useEffect, useState } from 'react'
import { View, Heading, Pressable, HStack, ScrollView, Button, Text, Select, CheckIcon } from 'native-base'
import { WorkoutCard } from '../components/WorkoutCard'
import { auth, database } from '../firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { Dimensions } from "react-native";
import { BarChart } from 'react-native-chart-kit'
import dayjs from 'dayjs'
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);


export const Home = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([])
  const [filteredWorkouts, setFilteredWorkouts] = useState([])
  const [dateRange, setDateRange] = useState(7)
  const screenWidth = Dimensions.get("window").width
  const currentUserID = auth.currentUser.uid

  const getWorkoutsFromDB = async () => {
    // Create query for a certain condition aka for workouts created by the user and get the documents

    const dbQuery = query(
      collection(database, 'workouts'),
      where('uploaderID', '==', currentUserID)
    )

    const fetchData = await getDocs(dbQuery)
    const fetchWorkouts = fetchData.docs.map((doc) => doc.data())
    return fetchWorkouts
  }

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.8,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 100, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
  
  }

  const getFilteredWorkouts = (workoutArray, range) => {
    const endDate = dayjs();
    const startDate = endDate.subtract(range - 1, 'day');
  
    const filteredWorkouts = workoutArray.filter((workout) => {
      const targetDate = workout?.timestamp?.seconds * 1000;
      const isBetweenDate = dayjs(targetDate).isBetween(startDate, endDate);
      return isBetweenDate;
    });
  
    return filteredWorkouts;
  };

  const countWorkoutsInDateRange = (workoutArray, range) => {
    const endDate = dayjs();
    const startDate = endDate.subtract(range - 1, 'day');

    const filteredArray = workoutArray?.filter((workout) => {
      const targetDate = workout?.timestamp?.seconds * 1000
      const isBetweenDate = dayjs(targetDate).isBetween(startDate, endDate)
      const isBetweenCount = isBetweenDate.count()
      return isBetweenCount  
    })

    return filteredArray
   

  
  };



  useEffect(() => {
    getWorkoutsFromDB()
      .then((res) => {
        const response = res
        if (response) {
          setWorkouts(response)
       
        }
      }).then(() => {
        const filtered = getFilteredWorkouts(workouts, dateRange);
        setFilteredWorkouts(filtered);
        console.log(filteredWorkouts);
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const filtered = getFilteredWorkouts(workouts, dateRange);
    setFilteredWorkouts(filtered);
  }, [dateRange]);



  return (
    <>
      <ScrollView mx='auto'>
        <HStack mx='8' mt='6' mb='3'>
          <Heading>Workouts</Heading>
          <Button ml='auto' bgColor={'green.500'} onPress={() => {}}>
            <Text fontWeight={'bold'} color='white'>
              Add New</Text></Button>
        </HStack>
        <ScrollView horizontal={true}>
          {Array.isArray(filteredWorkouts)
            ? filteredWorkouts.map((workout) => (
                <Pressable
                key={workout.id}
                  my='1'
                  bg='primary.50'
                  borderColor={'black'}
                  borderWidth={'0.5'}
                  onPress={() =>
                    navigation.navigate('Saved Workout', {
                      id: workout.id,
                    })
                  }
                  _pressed={{
                    bg: 'primary.100',
                  }}
                  rounded='lg'
                  w='75%'
                  mr='auto'
                  justifyContent='left'
                >
                  <WorkoutCard workout={workout} />
                </Pressable>
              ))
            : null}
        </ScrollView>
        <View mt='6' mb='3'>
        <HStack mx='6'>
          <Heading my='auto'>Your Stats</Heading>
          <Select defaultValue={dateRange} selectedValue={dateRange} ml='auto' maxHeight='32px' minWidth="120" accessibilityLabel="Range" placeholder="Date Range" _selectedItem={{
        bg: "tertiary.200",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={(value) => {
        setDateRange(value)

        }}>
          <Select.Item label="7 Days" value={7} />
          <Select.Item label="14 Days" value={14} />
          <Select.Item label="30 Days" value={30} />
       
        </Select>
        </HStack>
        <View>
        <BarChart
        data={{
          labels: [...Array(4)].map((_, index) => {
            const rangeIndex = 3 - index;
            const endDate = dayjs().subtract((3 - rangeIndex) * dateRange, 'day');
            const startDate = endDate.subtract(dateRange - 1, 'day');
            return `${startDate.format('MMMM D')}-${endDate.format('MMM D')}`;
          }),
          datasets: [
            {
              data: [1, 4, 6, 7]
            }
          ]
        }
        }
        width={screenWidth}
        height={240}
        chartConfig={chartConfig}
        fromZero={true}
        withInnerLines={false}
        yAxisInterval={1}
        showBarTops={false}
        showValuesOnTopOfBars={true}
        style={{borderRadius: 16,
          marginVertical: 12,
        }}
        />
      
      </View>
        </View>
      </ScrollView>
    </>
  )
}

// workouts.forEach((workout) => {
          // This block of code works for checking inBetween dates.
          // If workout creation date falls within range, it is true.
        //   const endDate = dayjs();
        //   const startDate = endDate.subtract(dateRange - 1, 'day');
        //   const targetDate = workout?.timestamp?.seconds * 1000
        //   const isBetweenDate = dayjs(targetDate).isBetween(startDate, endDate)
        //   console.log('isBetween', isBetweenDate)
        // })

///