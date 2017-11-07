import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { gray, white } from '../colors'

export default class DeckDetail extends Component {
  render() {
    const { title, cardsCount } = this.props
    return (
      <View style={styles.deckItem}>
        <View>
          <Text style={styles.deckHeading}>First Deck</Text>
          <Text style={styles.deckSubheading}>7 cards</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate(
              'NewCard'
            )}
          >
            <Text
              style={styles.buttonText}
            >
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addCard]}
            onPress={() => this.props.navigation.navigate(
              'Quiz'
            )}
          >
            <Text
              style={[styles.buttonText, { color: white }]}
            >
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 200,
    borderColor: gray,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center'
  },
  deckHeading: {
    textAlign: 'center',
    fontSize: 36
  },
  deckSubheading: {
    textAlign: 'center',
    fontSize: 24,
    color: gray
  },
  addCard: {
    backgroundColor: gray
  }
})
