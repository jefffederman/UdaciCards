import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { gray, white } from '../colors'
import { getDeck } from '../api'

export default class DeckDetail extends Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.state.params.title
    }
  }

  state = {
    deck: {
      title: '',
      questions: []
    }
  }

  cardsCount = () => {
    const count = this.state.deck.questions.length
    return count === 1 ? `${count} card` : `${count} cards`
  }

  updateDeck = () => {
    const { title } = this.props.navigation.state.params
    getDeck(title).then((deck) => {
      if (this.isSet) {
        this.setState({ deck })
      }
    })
  }

  isSet = false

  componentDidMount() {
    this.isSet = true
    this.updateDeck()
  }

  // I need this coming back from Quiz or NewCard,
  // but it gives a warning going back to DeckList :/
  componentDidUpdate() {
    this.updateDeck()
  }

  componentWillUnmount() {
    this.isSet = false
  }

  render() {
    if (this.state.deck) {
      const { title, questions } = this.state.deck
      return (
        <View style={styles.deckItem}>
          <View>
            <Text style={styles.deckHeading}>{title}</Text>
            <Text style={styles.deckSubheading}>{this.cardsCount()}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate(
                'NewCard',
                { title }
              )}
            >
              <Text
                style={styles.buttonText}
              >
                Add Card
              </Text>
            </TouchableOpacity>
            { questions.length > 0
              ? <TouchableOpacity
                  style={[styles.button, styles.addCard]}
                  onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    { questions }
                  )}
                >
                  <Text
                    style={[styles.buttonText, { color: white }]}
                  >
                    Start Quiz
                  </Text>
                </TouchableOpacity>
              : null
            }
          </View>
        </View>
      )
    }
    return (
      <View><Text>Loading...</Text></View>
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
