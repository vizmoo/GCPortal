import "@expo/metro-runtime"
import * as SplashScreen from "expo-splash-screen"
import App from "@/app"
import "setimmediate"

SplashScreen.preventAutoHideAsync()

//This is our app's entrypoint
//IgniteApp in App.tsx (uppercase A) imports app from app.tsx (lowercase a)
//...okay
function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
