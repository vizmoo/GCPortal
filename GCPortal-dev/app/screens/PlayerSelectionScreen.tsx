import React, { FC, useState, useEffect, useRef } from "react"
import { View, FlatList, TouchableOpacity, Text as RNText, TextInput, ViewStyle, TextStyle, Dimensions, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text, Icon } from "@/components"
import { colors } from "../theme/colors"

interface PlayerSelectionScreenProps extends AppStackScreenProps<"PlayerSelection"> {}

interface Profile {
  id: number
  name: string
  color: string
}

export const profiles = [
  { id: 1, name: "Michael", color: colors.profileColors[0] },
  { id: 2, name: "David", color: colors.profileColors[1] },
  { id: 3, name: "Connor", color: colors.profileColors[2] },
  { id: 4, name: "Marina", color: colors.profileColors[1] },
  { id: 5, name: "Raeed", color: colors.profileColors[3] },
  { id: 6, name: "Maxwell", color: colors.profileColors[4] },
  { id: 7, name: "John", color: colors.profileColors[0] },
  { id: 8, name: "Bob", color: colors.profileColors[1] },
  { id: 9, name: "Jane", color: colors.profileColors[3] },
  { id: 10, name: "Sarah", color: colors.profileColors[4] },
  { id: 11, name: "Emily", color: colors.profileColors[2] },
]

export const PlayerSelectionScreen: FC<PlayerSelectionScreenProps> = observer(function PlayerSelectionScreen({
  navigation,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'))
  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  const calculateCircleSize = () => {
    const { width } = windowDimensions
    const isMobile = width < 770

    return Platform.select({
      ios: Math.min(width * 0.18, 120),
      android: Math.min(width * 0.18, 120),
      default: Math.min(width * 0.125, 150)
    })
  }

  const handleSelectedPlayer = (id: number) => {
    setSelectedPlayer(id)
  }

  const handleAddPlayer = () => {
    navigation.navigate("AddPlayer")
  }

  const handleContinue = () => {
    if (selectedPlayer) {
      const player = profiles.find(p => p.id === selectedPlayer)
      if (player) {
        navigation.navigate("Dashboard", {
          playerId: player.id,
          playerName: player.name,
          playerColor: player.color
        })
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = Math.max(0, currentIndex - 5)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true})
    }
  }

  const handleNext = () => {
    if (currentIndex + 5 < profiles.length) {
      const newIndex = Math.min(profiles.length - 5, currentIndex + 5)
      setCurrentIndex(newIndex)
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true })
    }
  }

  const circleSize = calculateCircleSize()
  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 5)
  const isMobile = windowDimensions.width < 770

  const renderPlayerCircle = (player: Profile, isSelected: boolean) => (
    <View key={`player-${player.id}`} style={$circleWrapper}>
      <TouchableOpacity 
        onPress={() => handleSelectedPlayer(player.id)} 
        style={[
          $circleContainer, 
          { 
            width: circleSize, 
            height: circleSize, 
            borderRadius: circleSize / 2,
            backgroundColor: player.color,
          },
          isSelected && $selectedCircle,
        ]}
      >
        <RNText style={[
          $circleText, 
          { fontSize: circleSize * 0.3 }
        ]}>
          {player.name.charAt(0)}
        </RNText>
      </TouchableOpacity>
      <RNText style={[
        $circleName, 
        { 
          fontSize: Math.max(circleSize * 0.15, 12),
          width: circleSize,
        }
      ]}>
        {player.name}
      </RNText>
    </View>
  )

  const renderCirclesContainer = () => {
    if (isMobile) {
      const topRow = visibleProfiles.slice(0, 2)
      const bottomRow = visibleProfiles.slice(2, 5)
      
      return (
        <View style={$mobileCirclesContainer}>
          <View style={$circleRow}>
            {topRow.map((profile) => renderPlayerCircle(profile, profile.id === selectedPlayer))}
          </View>
          <View style={$circleRow}>
            {bottomRow.map((profile) => renderPlayerCircle(profile, profile.id === selectedPlayer))}
          </View>
        </View>
      )
    }

    return (
      <View style={$circlesContainer}>
        {visibleProfiles.map((profile) => renderPlayerCircle(profile, profile.id === selectedPlayer))}
      </View>
    )
  }

  return (
    <Screen style={$root} contentContainerStyle={$screenContent}>
      <View style={$contentContainer}>
        <View style={$mainContent}>
          <View style={$titleContainer}>
            <Text 
              style={$title} 
              text="Select Player or" 
              preset="bold"
            />
            <TouchableOpacity 
              onPress={handleAddPlayer} 
              style={$addPlayerButton}
            >
              <Text 
                style={$addPlayerButtonText} 
                text="Add Player" 
                preset="bold"
              />
            </TouchableOpacity>
          </View>
          
          <View style={$scrollWrapper}>
            <TouchableOpacity 
              style={$navigateButton} 
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Icon 
                icon="caretLeft" 
                size={24} 
                color={currentIndex === 0 ? colors.unclickable : "black"}
              />
            </TouchableOpacity>

            {renderCirclesContainer()}

            <TouchableOpacity 
              style={$navigateButton} 
              onPress={handleNext}
              disabled={currentIndex + 5 >= profiles.length}
            >
              <Icon 
                icon="caretRight" 
                size={24} 
                color={currentIndex + 5 >= profiles.length ? colors.unclickable : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {selectedPlayer !== null && (
          <View style={$continueButtonContainer}>
            <TouchableOpacity 
              onPress={handleContinue} 
              style={$continueButton}
            >
              <RNText style={$continueButtonText}>
                Continue
              </RNText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
  // Removed padding as it was not in the new styles
}

const $contentContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  paddingHorizontal: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  paddingVertical: Platform.select({
    ios: "10%",
    android: "10%",
    default: "15%"
  }),
}

const $screenContent: ViewStyle = {
  flexGrow: 1,
}

const $mainContent: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $scrollWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: '100%',
  marginVertical: 20,
  minHeight: 120,
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

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
  flexWrap: "wrap",
  gap: 5,
}

const $title: TextStyle = {
  fontSize: Platform.select({
    ios: 16,
    android: 16,
    default: 18
  }),
  color: "black",
  textAlign: "center",
}

const $circleRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 16,
  marginVertical: 8,
}

const $circlesContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  gap: Platform.select({
    ios: 8,
    android: 8,
    default: 30
  }),
  marginHorizontal: 8,
}

const $mobileCirclesContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 8,
}

const $circleWrapper: ViewStyle = {
  alignItems: "center",
}

const $circleContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
    default: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
  }),
}

const $selectedCircle: ViewStyle = {
  borderWidth: 3,
  borderColor: '#000',
}

const $circleText: TextStyle = {
  fontWeight: "bold",
  color: "black",
}

const $circleName: TextStyle = {
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
  backgroundColor: "#007BFF",
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 5,
  minWidth: 100,
}

const $submitButtonText: TextStyle = {
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
  color: "white",
  textAlign: "center",
}

const $addPlayerButton: ViewStyle = {
  backgroundColor: "#007BFF",
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 5,
  minWidth: 100,
}

const $addPlayerButtonText: TextStyle = {
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
  color: "white",
  textAlign: "center",
}

const $continueButtonContainer: ViewStyle = {
  position: "absolute",
  alignItems: 'center',
  bottom: Platform.select({
    ios: "30%",
    android: "30%",
    default: "20%"
  }),
  left: 0,
  right: 0,
}

const $continueButton: ViewStyle = {
  backgroundColor: "#007BFF",
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 5,
  minWidth: 120,
}

const $continueButtonText: TextStyle = {
  color: "white",
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
  textAlign: "center",
}

const $navigateButton: ViewStyle = {
  padding: 6,
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
}