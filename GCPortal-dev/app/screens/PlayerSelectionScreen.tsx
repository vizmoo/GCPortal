import React, { FC, useState, useEffect } from "react"
import { View, FlatList, TouchableOpacity, Text as RNText, TextInput, ViewStyle, TextStyle, Dimensions, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
//import { LinearGradient } from 'expo-linear-gradient'

interface PlayerSelectionScreenProps extends AppStackScreenProps<"PlayerSelection"> {}

export const colors = ['#9D85FF', '#05C756', '#1b9aaa', '#ef476f', '#ffc43d']

interface Profile {
  id: number
  name: string
  color: string
  pin: string
}

const profilesData = [
  { id: 1, name: "Michael", pin: "1234" },
  { id: 2, name: "David", pin: "1234" },
  { id: 3, name: "Connor", pin: "1234" },
  { id: 4, name: "Marina", pin: "1234" },
  { id: 5, name: "Raeed", pin: "1234" },
  { id: 6, name: "Maxwell", pin: "1234" },
  { id: 7, name: "John", pin: "1234" },
  { id: 8, name: "Bob", pin: "1234" },
  { id: 9, name: "Jane", pin: "1234" },
  { id: 10, name: "Sarah", pin: "1234" },
  { id: 11, name: "Emily", pin: "1234" },
  { id: Number.MAX_SAFE_INTEGER, name: "Add Player", pin: "" }
]

export const profiles = profilesData.map((profile, index): Profile => ({
  ...profile,
  color: index === profilesData.length - 1 ? '#FFFAE6' : colors[index % colors.length],
}))

export const PlayerSelectionScreen: FC<PlayerSelectionScreenProps> = observer(function PlayerSelectionScreen({
  navigation,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const [pin, setPin] = useState<string>("")
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)
  const [isWeb] = useState(Platform.OS === 'web')

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width)
    })

    return () => subscription?.remove()
  }, [])

  const getCircleSize = () => {
    if (isWeb) {
      return 160
    }
    return 80
  }

  const getItemWidth = () => {
    const circleSize = getCircleSize()
    const marginWidth = 30
    return circleSize + marginWidth
  }

  const handleSelectedPlayer = (id: number) => {
    if (id === Number.MAX_SAFE_INTEGER) {
      navigation.navigate("AddPlayer")
    } else {
      setSelectedPlayer(id)
      setPin("")
      console.log("Selected Player ID: ", id)
    }
  }

  const handlePinSubmit = () => {
    if (pin) {
      const player = profiles.find(p => p.id === selectedPlayer)
      if (player && player.pin === pin) {
        console.log("Pin correct for player:", selectedPlayer)
        // Handle successful login here
        alert(`Welcome, ${player.name}!`)
      } else {
        console.log("Incorrect PIN")
        // Handle incorrect PIN here
        alert("Incorrect PIN")
      }
    }
  }

  const selectedPlayerName = selectedPlayer ? profiles.find(player => player.id === selectedPlayer)?.name : ""
  const circleSize = getCircleSize()

  return (
    <Screen style={$root}>
      <View style={$contentContainer}>
        <Text style={$title} text="Select Player" />
        
        <View style={[$scrollWrapper, { width: getItemWidth() * 5 }]}>
          {/* <LinearGradient
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.1, y: 0.5 }}
            style={$gradientLeft}
          /> */}
          
          <FlatList
            data={profiles}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={$scrollContainer}
            renderItem={({ item }) => (
              <View style={$circleWrapper}>
                <TouchableOpacity 
                  onPress={() => handleSelectedPlayer(item.id)} 
                  style={[
                    $circleContainer, 
                    { 
                      width: circleSize, 
                      height: circleSize, 
                      borderRadius: circleSize / 2,
                      backgroundColor: item.color,
                    }
                  ]}
                >
                  {item.id === Number.MAX_SAFE_INTEGER ? (
                    <RNText style={[$circleText, { fontSize: circleSize * 0.3 }]}>+</RNText>
                  ) : (
                    <RNText style={[$circleText, { fontSize: circleSize * 0.3 }]}>{item.name.charAt(0)}</RNText>
                  )}
                </TouchableOpacity>
                <RNText style={$circleName}>{item.name}</RNText>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            snapToInterval={getItemWidth()}
            decelerationRate="fast"
          />
          
          {/* <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            start={{ x: 0.9, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={$gradientRight}
          /> */}
        </View>

        {selectedPlayer !== null && selectedPlayer !== Number.MAX_SAFE_INTEGER && (
          <View style={$pinWrapper}>
            <TextInput
              style={$pinInput}
              placeholder={`PIN for ${selectedPlayerName}`}
              placeholderTextColor={'#D3D3D3'}
              secureTextEntry
              keyboardType="numeric"
              value={pin}
              onChangeText={setPin}
              maxLength={4}
            />
            <TouchableOpacity onPress={handlePinSubmit} style={$submitButton}>
              <RNText style={$submitButtonText}>Submit</RNText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
  backgroundColor: "white",
}

const $contentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: "10%",
}

const $scrollWrapper: ViewStyle = {
  position: "relative",
  overflow: "hidden",
}

const $gradientLeft: ViewStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  width: 75,
  zIndex: 1,
}

const $gradientRight: ViewStyle = {
  position: "absolute",
  right: 0,
  top: 0,
  bottom: 0,
  width: 75,
  zIndex: 1,
}

const $scrollContainer: ViewStyle = {
  alignItems: "center",
  paddingVertical: 10,
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: "black",
  textAlign: "center",
  marginBottom: 20,
}

const $circleWrapper: ViewStyle = {
  alignItems: "center",
  marginHorizontal: 15,
}

const $circleContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}

const $circleText: TextStyle = {
  fontWeight: "bold",
  color: "black",
}

const $circleName: TextStyle = {
  fontSize: 12,
  color: "black",
  marginTop: 5,
  textAlign: "center",
}

const $pinWrapper: ViewStyle = {
  marginTop: 20,
  alignItems: "center",
}

const $pinInput: TextStyle = {
  width: 200,
  height: 40,
  borderColor: "gray",
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
  backgroundColor: "white",
}

const $submitButton: ViewStyle = {
  backgroundColor: "#007bff",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
}

const $submitButtonText: TextStyle = {
  color: "white",
  fontSize: 16,
}