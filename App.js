// TabNavigation betw DeckList <-> New Deck
import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import { TabNavigator, StackNavigator } from 'react-navigation'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor: backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    }
  }
})

const MainNav = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
  Quiz: {
    screen: Quiz
  },
  NewCard: {
    screen: NewCard
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <UdaciStatusBar />
        <MainNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
