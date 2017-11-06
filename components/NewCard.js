import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

export default class NewQuiz extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    alert('Submitted')
    // Add to local storage
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(text) => this.setState({ question: text })}
          value={this.state.question}
          placeholder='Question'
          autoFocus={true}
        />
        <TextInput
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.answer}
          placeholder='Answer'
          autoFocus={true}
        />
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
