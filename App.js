import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { Constants } from 'expo'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import { TabNavigator, StackNavigator } from 'react-navigation'
import fakeData from './fakeData'
import { DECKS_KEY } from './api'
import { setLocalNotification } from './notifications'

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
      tabBarLabel: 'My Decks',
      tabBarIcon: <MaterialCommunityIcons
                    name='cards'
                    size={24}
                  />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: <MaterialIcons
                    name='library-add'
                    size={24}
                  />
    }
  }
})

const MainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'My Decks'
    }
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
  componentDidMount() {
    AsyncStorage.getItem(DECKS_KEY)
      .catch(() => {
        return AsyncStorage.setItem(DECKS_KEY, JSON.stringify({}))
      })
      .then(() => {
        Object.keys(fakeData).forEach((key) => {
          AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
            [key]: fakeData[key]
          }))
        })
      })

    setLocalNotification()
  }

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
