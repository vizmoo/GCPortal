import { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, TextInput, TouchableOpacity, Text as RNText, ViewStyle, TextStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useNavigation } from "@react-navigation/native"
import { profiles, colors } from "./PlayerSelectionScreen"

interface AddPlayerScreenProps extends AppStackScreenProps<"AddPlayer"> {}

export const AddPlayerScreen: FC<AddPlayerScreenProps> = observer(function AddPlayerScreen() {
  const navigation = useNavigation()
  const [playerName, setPlayerName] = useState("")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!playerName.trim()) {
      setError("Please enter a player name")
      return false
    }
    if (pin.length < 4) {
      setError("PIN must be at least 4 digits")
      return false
    }
    if (pin !== confirmPin) {
      setError("PINs do not match")
      return false
    }
    return true
  }

  const handleAddPlayer = () => {
    if (validateForm()) {
      profiles.splice(profiles.length - 1, 0, {
        id: profiles.length + 2,
        name: playerName,
        color: selectedColor,
        pin: pin,
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
          <Text text="PIN" style={$label} />
          <TextInput
            style={$input}
            placeholder="Enter PIN"
            placeholderTextColor={'#D3D3D3'}
            value={pin}
            onChangeText={(text) => {
              setPin(text)
              setError("")
            }}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
          />
        </View>

        <View style={$inputWrapper}>
          <Text text="Confirm PIN" style={$label} />
          <TextInput
            style={$input}
            placeholder="Confirm PIN"
            placeholderTextColor={'#D3D3D3'}
            value={confirmPin}
            onChangeText={(text) => {
              setConfirmPin(text)
              setError("")
            }}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
          />
        </View>

        <View style={$inputWrapper}>
          <Text text="Choose Color" style={$label} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={$colorContainer}>
            {colors.map((color) => (
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

        <TouchableOpacity onPress={handleAddPlayer} style={$button}>
          <RNText style={$buttonText}>Add Player</RNText>
        </TouchableOpacity>
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
  alignItems: "center",
  paddingTop: 20,
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
  color: "black",
}

const $errorText: TextStyle = {
  color: "red",
  marginBottom: 10,
  textAlign: "center",
}

const $inputWrapper: ViewStyle = {
  marginBottom: 20,
  width: "100%",
  maxWidth: 300,
}

const $label: TextStyle = {
  fontSize: 16,
  marginBottom: 10,
  color: "black",
}

const $input: TextStyle = {
  width: "100%",
  height: 40,
  borderColor: "gray",
  borderWidth: 1,
  borderRadius: 5,
  paddingLeft: 10,
}

const $colorContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: 10,
}

const $colorCircle: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 10,
  borderWidth: 1,
  borderColor: "#ddd",
}

const $selectedColorCircle: ViewStyle = {
  borderWidth: 2,
  borderColor: "#000",
}

const $button: ViewStyle = {
  backgroundColor: "#007bff",
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 5,
  marginTop: 20,
}

const $buttonText: TextStyle = {
  color: "white",
  fontSize: 16,
  textAlign: "center",
}