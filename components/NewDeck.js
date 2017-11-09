import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { gray, white } from '../colors'
import { saveDeckTitle } from '../api'

export default class NewDeck extends Component {
  state = {
    deckTitle: ''
  }

  resetAction = (title) => {
    return NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home'
        }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { title }
        })
      ]
    })
  }

  submit = () => {
    const title = this.state.deckTitle
    saveDeckTitle(title)
      .then(() => this.props.navigation.dispatch(this.resetAction(title)))
  }

  handleTextChange = (text) => {
    this.setState({ deckTitle: text })
  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          fontSize: 36,
          textAlign: 'center',
          padding: 20
        }}>
          What is the title of your new deck?
        </Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextInput
            onChangeText={this.handleTextChange}
            value={this.state.deckTitle}
            placeholder='Deck Title'
            autoCapitalize='words'
            autoFocus={true}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.submit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 200,
    backgroundColor: gray,
    borderColor: gray,
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 10
  },
  buttonText: {
    textAlign: 'center',
    color: white
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 24,
    padding: 5
  }
})
