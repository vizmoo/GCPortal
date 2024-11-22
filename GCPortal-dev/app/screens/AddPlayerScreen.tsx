import { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, TouchableOpacity, Text as RNText, ViewStyle, TextStyle, ScrollView, Platform } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useNavigation } from "@react-navigation/native"
import { profiles } from "./PlayerSelectionScreen"
import { colors } from "../theme/colors"

interface AddPlayerScreenProps extends AppStackScreenProps<"AddPlayer"> {}

export const AddPlayerScreen: FC<AddPlayerScreenProps> = observer(function AddPlayerScreen() {
  const navigation = useNavigation()
  const [playerName, setPlayerName] = useState("")
  const [selectedColor, setSelectedColor] = useState<(typeof colors.profileColors)[number]>(colors.profileColors[0])
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!playerName.trim()) {
      setError("Please enter a player name")
      return false
    }
    return true
  }

  const handleAddPlayer = () => {
    if (validateForm()) {
      profiles.push({
        id: profiles.length + 2,
        name: playerName,
        color: selectedColor,
      })
      navigation.goBack()
    }
  }

  return (
    <Screen style={$root} preset="scroll">
      <View style={$contentContainer}>
        <Text text="Add New Player" style={$title} />
        
        {error ? <Text text={error} style={$errorText} /> : null}

        <View style={$inputWrapper}>
          <Text text="Player Name" style={$label} />
          <TextInput
            style={$input}
            placeholder="Enter name"
            placeholderTextColor={'#D3D3D3'}
            value={playerName}
            onChangeText={(text) => {
              setPlayerName(text)
              setError("")
            }}
          />
        </View>

        <View style={$inputWrapper}>
          <Text text="Choose Color" style={$label} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={$colorContainer}>
            {colors.profileColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  $colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && $selectedColorCircle,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={$buttonContainer}>
          <TouchableOpacity onPress={handleAddPlayer} style={$addButton}>
            <RNText style={$addButtonText}>Add Player</RNText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={$cancelButton}>
            <RNText style={$cancelButtonText}>Cancel</RNText>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  backgroundColor: "white",
}

const $contentContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  paddingTop: Platform.select({
    ios: "15%",
    android: "15%",
    default: "5%"
  }),
}

const $title: TextStyle = {
  fontSize: Platform.select({
    ios: 20,
    android: 20,
    default: 24
  }),
  fontWeight: "bold",
  marginBottom: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  color: "black",
}

const $errorText: TextStyle = {
  color: "red",
  marginBottom: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
  textAlign: "center",
}

const $inputWrapper: ViewStyle = {
  marginBottom: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  width: "100%",
  maxWidth: Platform.select({
    ios: 280,
    android: 280,
    default: 300
  }),
}

const $label: TextStyle = {
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
  marginBottom: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
  color: "black",
}

const $input: TextStyle = {
  width: "100%",
  height: Platform.select({
    ios: 36,
    android: 36,
    default: 40
  }),
  borderColor: "gray",
  borderWidth: 1,
  borderRadius: 5,
  paddingLeft: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
}

const $colorContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
}

const $colorCircle: ViewStyle = {
  width: Platform.select({
    ios: 36,
    android: 36,
    default: 40
  }),
  height: Platform.select({
    ios: 36,
    android: 36,
    default: 40
  }),
  borderRadius: Platform.select({
    ios: 18,
    android: 18,
    default: 20
  }),
  marginRight: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
  borderWidth: 1,
  borderColor: "#ddd",
}

const $selectedColorCircle: ViewStyle = {
  borderWidth: 2,
  borderColor: "#000",
}

const $buttonContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  width: Platform.select({
    ios: "100%",
    android: "100%",
    default: "10%"
  }),
}

const $addButton: ViewStyle = {
  backgroundColor: "#007bff",
  paddingVertical: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
  height: Platform.select({
    ios: 36,
    android: 36,
    default: 40
  }),
  paddingHorizontal: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  width: Platform.select({
    ios: 170,
    android: 170,
    default: 190
  }),
  borderRadius: 5,
  marginTop: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  marginHorizontal: Platform.select({
    ios: 4,
    android: 4,
    default: 6
  }),
}

const $cancelButton: ViewStyle = {
  backgroundColor: colors.unclickable,
  paddingVertical: Platform.select({
    ios: 8,
    android: 8,
    default: 10
  }),
  height: Platform.select({
    ios: 36,
    android: 36,
    default: 40
  }),
  paddingHorizontal: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  width: Platform.select({
    ios: 90,
    android: 90,
    default: 100
  }),
  borderRadius: 5,
  marginTop: Platform.select({
    ios: 16,
    android: 16,
    default: 20
  }),
  marginHorizontal: Platform.select({
    ios: 4,
    android: 4,
    default: 6
  }),
}

const $addButtonText: TextStyle = {
  color: "white",
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
  textAlign: "center",
}

const $cancelButtonText: TextStyle = {
  color: "black",
  fontSize: Platform.select({
    ios: 14,
    android: 14,
    default: 16
  }),
  textAlign: "center",
}
