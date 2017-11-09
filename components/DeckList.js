import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { white, gray } from '../colors'
import { getDecks } from '../api'

export default class DeckList extends Component {
  state = {
    decks: []
  }

  cardsCount = (key) => {
    const count = this.state.decks.filter((deck) => deck.title === key)[0]
      .questions.length
    return count === 1 ? `${count} card` : `${count} cards`
  }

  isSet = false

  componentDidMount() {
    this.isSet = true
    getDecks().then((decks) => {
      this.setState({ decks })
    })
  }

  componentWillUnmount() {
    this.isSet = false
  }

  componentDidUpdate() {
    getDecks().then((decks) => {
      if (this.isSet) {
        this.setState({ decks })
      }
    })
  }

  render() {
    const { decks } = this.state
    if (!decks.length) {
      return (
        <View>
          <Text>No decks yet :(</Text>
          <Text>Use the tab bar to add one ;-)</Text>
        </View>
      )
    }
    return (
      <FlatList
        data={this.state.decks}
        keyExtractor={(item, index) => item.title}
        renderItem={({ item }) => {
          const { title } = item
          return (
            <View style={styles.deckItem}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate(
                    'DeckDetail',
                    { title }
                  )
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    styles.deckHeading
                  ]}
                >
                  {title}
                </Text>
                <Text
                  style={[
                    styles.buttonText,
                    styles.deckSubheading
                  ]}
                >
                  {this.cardsCount(title)}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  deckItem: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20
  },
  buttonText: {
    textAlign: 'center'
  },
  deckHeading: {
    fontSize: 24
  },
  deckSubheading: {
    fontSize: 16,
    color: gray
  }
})
