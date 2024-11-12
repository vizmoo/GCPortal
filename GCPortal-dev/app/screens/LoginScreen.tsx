import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  ImageStyle,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScaledSize,
} from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

// this is the code for the login screen
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()
  const [hasEmailBeenFocused, setHasEmailBeenFocused] = useState(false)
  const [hasPasswordBeenFocused, setHasPasswordBeenFocused] = useState(false)
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  useEffect(() => {
    setIsAuthPasswordHidden(() => (hasPasswordBeenFocused ? true : false))
  }, [hasPasswordBeenFocused])

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => setScreenWidth(window.width)
    const subscription = Dimensions.addEventListener("change", onChange)
    return () => subscription?.remove()
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  const $screenContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    display: "flex",
    flexDirection: screenWidth > 900 ? "row" : "column",
    width: "100%",
    height: "100%",
  })
  const $loginContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: screenWidth > 900 ? "50%" : "100%",
    height: screenWidth > 900 ? "100%" : "80%",
  })
  const $welcome: ThemedStyle<TextStyle> = ({ spacing }) => ({})
  const $subheading: ThemedStyle<TextStyle> = ({ spacing }) => ({})
  const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    marginBottom: spacing.md,
    width: "75%",
  })
  const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    width: "50%",
  })
  const $logo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
    marginBottom: spacing.md,
    resizeMode: "contain",
    height: 100,
  })
  const $ssoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    width: "75%",
  })
  const $ssoLogo: ThemedStyle<ImageStyle> = ({}) => ({
    resizeMode: "contain",
    height: 25,
    width: 25,
  })
  const $ssoRow: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
    marginTop: spacing.md,
    width: "100%",
    backgroundColor: colors.palette.darkWhite,
    height: 40,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    display: "flex",
    flexDirection: "row",
    borderRadius: 64,
  })
  const $ssoText = {
    color: "black",
  }
  const $divider: ThemedStyle<ViewStyle> = ({ spacing }) => ({
    display: "flex",
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginVertical: spacing.md,
  })
  const $dividerLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
    backgroundColor: colors.palette.darkGrey,
    height: 1,
    flex: 1,
  })
  const $heroImgContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
    backgroundColor: colors.palette.yellowAccent,
    width: screenWidth > 900 ? "50%" : "100%",
    height: screenWidth > 900 ? "100%" : "20%",
  })
  const $heroImage: ThemedStyle<ImageStyle> = ({}) => ({})

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={themed($loginContainer)}>
        <Image style={themed($logo)} source={require("assets/images/GrooveCatcher Logo.png")} />
        <Text testID="login-heading" preset="heading" style={themed($welcome)}>
          Welcome Back!
        </Text>
        <Text preset="subheading" style={themed($subheading)}>
          Sign in to your account using
        </Text>

        <View style={themed($ssoContainer)}>
          <TouchableOpacity style={themed($ssoRow)}>
            <Image style={themed($ssoLogo)} source={require("assets/images/Google-Logo.png")} />
            <Text style={$ssoText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themed($ssoRow)}>
            <Image style={themed($ssoLogo)} source={require("assets/images/Google-Logo.png")} />
            <Text style={$ssoText}>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={themed($divider)}>
          <View style={themed($dividerLine)} />
          <Text style={themed($subheading)}> or </Text>
          <View style={themed($dividerLine)} />
        </View>

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
          onFocus={() => setHasEmailBeenFocused(true)}
          placeholder={hasEmailBeenFocused ? "" : "Email"}
        />
        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
          onFocus={() => setHasPasswordBeenFocused(true)}
          placeholder={hasPasswordBeenFocused ? "" : "Password"}
        />
        <Button testID="login-button" style={themed($tapButton)} preset="reversed" onPress={login}>
          Sign in
        </Button>
      </View>
      <View style={themed($heroImgContainer)}></View>
    </Screen>
  )
})
