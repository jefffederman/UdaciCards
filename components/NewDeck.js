import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

export default class NewDeck extends Component {
  state = {
    deckTitle: ''
  }

  submit = () => {
    alert('Submitted')
    // Add to local storage
  }

  handleTextChange = (text) => {
    this.setState({ deckTitle: text })
  }

  render() {
    return (
      <View>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          onChangeText={this.handleTextChange}
          value={this.state.deckTitle}
          placeholder='Deck Title'
          autoCapitalize='words'
          autoFocus={true}
        />
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
