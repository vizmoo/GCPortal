import { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, ImageStyle, Platform, Pressable, Modal, Image, useWindowDimensions } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "../theme/colors"

interface GameHistoryItem {
  id: string
  status: "started" | "completed"
  date: string
  time: string
  levelName: string
  score?: number
}

interface DashboardScreenProps extends AppStackScreenProps<"Dashboard"> {}

type TabType = "gameHistory" | "playerInfo" | "placeholder"

export const DashboardScreen: FC<DashboardScreenProps> = observer(function DashboardScreen({
  route,
  navigation
}) {
  const { playerId, playerName, playerColor } = route.params
  const insets = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const [activeTab, setActiveTab] = useState<TabType>("gameHistory")
  const [selectedGame, setSelectedGame] = useState<GameHistoryItem | null>(null)
  
  const isWebLayout = Platform.OS === 'web' || width >= 768 // Use 768px as breakpoint

  
  // Sample data - replace with actual data from your store
  const gameHistory: GameHistoryItem[] = [
    {
      id: "1",
      status: "completed",
      date: "2024-03-21",
      time: "14:30",
      levelName: "Level 1",
      score: 1000,
    },
    {
      id: "2",
      status: "started",
      date: "2024-03-21",
      time: "15:45",
      levelName: "Level 2",
    },
  ]

  const TableHeader = () => (
    <View style={$headerRow}>
      <Text text="Event" style={[$headerCell, $eventColumn]} />
      <Text text="Date" style={[$headerCell, $dateColumn]} />
      <Text text="Time" style={[$headerCell, $timeColumn]} />
      <Text text="Level Name" style={[$headerCell, $levelColumn]} />
      <Text text="Score" style={[$headerCell, $scoreColumn]} />
    </View>
  )

  const ProfileSection = () => (
    <View style={$profileSection}>
      <ChangePlayerButton />
      <View 
        style={[
          $profilePicContainer, 
          { backgroundColor: playerColor }
        ]}
      >
        <Text style={$profileInitial} text={playerName.charAt(0)} />
      </View>
      <Text style={$profileName} text={playerName} />
    </View>
  )

  const ChangePlayerButton = () => (
    <Pressable 
      style={$changePlayerButton}
      onPress={() => navigation.navigate("PlayerSelection")}
    >
      <Text 
        text="Change Player" 
        style={$changePlayerButtonText}
      />
    </Pressable>
  )

  const NavbarTab = ({ title, isActive, onPress }: { title: string; isActive: boolean; onPress: () => void }) => (
    <Pressable 
      style={[
        $tab, 
        isActive && $activeTab,
        Platform.OS === 'web' && { cursor: 'pointer' }
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          $tabText,
          isActive && $activeTabText,
          { color: isActive ? colors.textDim : colors.text }
        ]} 
        text={title}
      />
    </Pressable>
  )

  const NavigationBar = () => (
    <View style={[$navBarContainer, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
      <View style={[$topRow, isWebLayout && $webTopRow]}>
        <Image
          source={require("../../assets/images/GrooveCatcher Logo.png")} 
          style={$logo}
          />
        {isWebLayout && (
          <View style={$tabsContainer}>
            <NavbarTab 
              title="Game History" 
              isActive={activeTab === "gameHistory"} 
              onPress={() => setActiveTab("gameHistory")} 
            />
            <NavbarTab 
              title="Player Info" 
              isActive={activeTab === "playerInfo"} 
              onPress={() => setActiveTab("playerInfo")} 
            />
            <NavbarTab 
              title="Placeholder" 
              isActive={activeTab === "placeholder"} 
              onPress={() => setActiveTab("placeholder")} 
            />
          </View>
        )}
        <ProfileSection />
      </View>
      
      {!isWebLayout && (
        <View style={$tabsContainer}>
          <NavbarTab 
            title="Game History" 
            isActive={activeTab === "gameHistory"} 
            onPress={() => setActiveTab("gameHistory")} 
          />
          <NavbarTab 
            title="Player Info" 
            isActive={activeTab === "playerInfo"} 
            onPress={() => setActiveTab("playerInfo")} 
          />
          <NavbarTab 
            title="Placeholder" 
            isActive={activeTab === "placeholder"} 
            onPress={() => setActiveTab("placeholder")} 
          />
        </View>
      )}
    </View>
  )

  const GameDetailsModal = () => (
    <Modal
      visible={!!selectedGame}
      transparent
      animationType="fade"
      onRequestClose={() => setSelectedGame(null)}
    >
      <View style={$modalOverlay}>
        <View style={$modalContent}>
          <View style={$modalHeader}>
            <Text text={`Game Details - ${selectedGame?.levelName}`} style={$modalTitle} />
            <Pressable onPress={() => setSelectedGame(null)} style={$closeButton}>
              <Text text="✕" style={$closeButtonText} />
            </Pressable>
          </View>
          <View style={$modalBody}>
            <Text text={`Status: ${selectedGame?.status}`} style={$modalText} />
            <Text text={`Date: ${selectedGame?.date}`} style={$modalText} />
            <Text text={`Time: ${selectedGame?.time}`} style={$modalText} />
            {selectedGame?.score && (
              <Text text={`Score: ${selectedGame.score}`} style={$modalText} />
            )}
            <View style={$graphContainer}>
              <Image 
                source={require("../../assets/images/graph.png")} 
                style={$graphImage} 
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )

  const GameHistoryContent = () => (
    <View style={$gameHistorySection}>
      <TableHeader />
      {gameHistory.map((game) => (
        <Pressable 
          key={game.id} 
          style={$gameHistoryItem}
          onPress={() => setSelectedGame(game)}
        >
          <View style={[$cell, $eventColumn]}>
            <View style={$gameStatusContainer}>
              <View 
                style={[
                  $statusIndicator, 
                  game.status === "completed" ? $statusCompleted : $statusStarted
                ]} 
              />
              <Text text={game.status} style={[$statusText, $darkText]} />
            </View>
          </View>
          
          <Text text={game.date} style={[$cell, $dateColumn, $darkText]} />
          <Text text={game.time} style={[$cell, $timeColumn, $darkText]} />
          <Text text={game.levelName} style={[$cell, $levelColumn, $darkText]} />
          <Text 
            text={game.score !== undefined ? game.score.toString() : "-"} 
            style={[$cell, $scoreColumn, $darkText]} 
          />
        </Pressable>
      ))}
    </View>
  )

  const PlayerInfoContent = () => (
    <View style={$contentContainer}>
      <Text text="Player Info Placeholder" style={$darkText} />
    </View>
  )

  const PlaceholderContent = () => (
    <View style={$contentContainer}>
      <Text text="Placeholder" style={$darkText} />
    </View>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "gameHistory":
        return <GameHistoryContent />
      case "playerInfo":
        return <PlayerInfoContent />
      case "placeholder":
        return <PlaceholderContent />
      default:
        return <GameHistoryContent />
    }
  }

  return (
    <Screen style={$root} preset="scroll">
      <NavigationBar />
      {renderContent()}
      <GameDetailsModal />
    </Screen>
  )
})

const $contentContainer: ViewStyle = {
  margin: 16,
  padding: 16,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  ...Platform.select({
    web: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    default: {
      elevation: 2,
    },
  }),
}

const $navBarContainer: ViewStyle = {
  backgroundColor: "#ffffff",
  ...Platform.select({
    web: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    default: {
      elevation: 4,
    },
  }),
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#f5f5f5",
}

const $navBar: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
}

const $tabsContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  gap: 12, 
  padding: 4, 
  flex: 1,
}

const $tab: ViewStyle = {
  paddingVertical: 6, 
  paddingHorizontal: 12, 
  borderRadius: 6, 
}

const $activeTab: ViewStyle = {
  backgroundColor: "#e3e3e3",
}

const $tabText: TextStyle = {
  fontSize: 16,
  color: "#666666",
}

const $activeTabText: TextStyle = {
  color: "#000000",
  fontWeight: "600",
}

const $logo: ImageStyle = {
  ...Platform.select({
    ios: {
      width: 60,  
      height: 60, 
    },
    android: {
      width: 60,  
      height: 60, 
    }, 
    default: {
      width: 80,  
      height: 80, 
    }
  }),
  resizeMode: "contain"
}

const $profilePicContainer: ViewStyle = {
  width: 40,  
  height: 40, 
  borderRadius: 20, 
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
}

const $profileSection: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 'auto',
  gap: 8,
}

const $profileInitial: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
  textAlign: 'center',
}

const $profileName: TextStyle = {
  fontSize: 16,
  color: 'black',
  fontWeight: '500',
}

const $gameHistorySection: ViewStyle = {
  margin: 16,
  padding: 16,
  backgroundColor: "#ffffff",
  borderRadius: 12,
  ...Platform.select({
    web: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    default: {
      elevation: 2,
    },
  }),
}

const $headerRow: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 12,
  borderBottomWidth: 2,
  borderBottomColor: "#e0e0e0",
  marginBottom: 8,
}

const $headerCell: TextStyle = {
  fontWeight: "bold",
  fontSize: 16,
  color: "#333333",
}

const $gameHistoryItem: ViewStyle = {
  flexDirection: "row",
  padding: 12,
  borderRadius: 8,
  backgroundColor: "#f8f8f8",
  marginBottom: 8,
  alignItems: "center",
}

const $cell: TextStyle = {
  fontSize: 14,
}

const $eventColumn: ViewStyle = {
  width: "20%",
  minWidth: 100,
}

const $dateColumn: TextStyle = {
  width: "15%",
  minWidth: 80,
  color: "black",
}

const $timeColumn: TextStyle = {
  width: "15%",
  minWidth: 70,
  color: "black",
}

const $levelColumn: TextStyle = {
  width: "30%",
  minWidth: 100,
  color: "black",
}

const $scoreColumn: TextStyle = {
  width: "20%",
  minWidth: 70,
  color: "black",
}

const $gameStatusContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $statusIndicator: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginRight: 8,
}

const $statusCompleted: ViewStyle = {
  backgroundColor: "#4ED02E",
}

const $statusStarted: ViewStyle = {
  backgroundColor: "#ECD017",
}

const $statusText: TextStyle = {
  fontSize: 14,
  textTransform: "capitalize",
  color: "black"
}

const $topRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 8, // Reduced from 16
  paddingBottom: 4, // Reduced from 8
}

const $darkText: TextStyle = {
  color: "#000000",
}

const $modalOverlay: ViewStyle = {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
}

const $modalContent: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 20,
  width: '90%',
  maxWidth: 500,
  maxHeight: '80%',
}

const $modalHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
}

const $modalTitle: TextStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000000',
}

const $modalBody: ViewStyle = {
  flex: 1,
}

const $modalText: TextStyle = {
  fontSize: 16,
  marginBottom: 8,
  color: '#000000',
}

const $closeButton: ViewStyle = {
  padding: 8,
}

const $closeButtonText: TextStyle = {
  fontSize: 20,
  color: '#666666',
}

const $graphContainer: ViewStyle = {
  marginTop: 16,
  height: 200,
  width: '100%',
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  overflow: 'hidden',
}

const $graphImage: ImageStyle = {
  width: '100%',
  height: '100%',
}

const $webTopRow: ViewStyle = {
  paddingBottom: 16,
}

const $changePlayerButton: ViewStyle = {
  backgroundColor: "#007BFF",
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6,
  marginRight: 12,
  ...Platform.select({
    web: {
      cursor: 'pointer',
    },
  }),
}

const $changePlayerButtonText: TextStyle = {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '500',
}

