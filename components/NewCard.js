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
import { addCardToDeck } from '../api'

export default class NewQuiz extends Component {
  defaultState = {
    question: '',
    answer: ''
  }

  state = this.defaultState

  submit = () => {
    const { title } = this.props.navigation.state.params
    addCardToDeck(title, this.state)
      .then(() => this.setState(this.defaultState))
      .then(() => this.props.navigation.goBack())
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
        <TextInput
          onChangeText={(text) => this.setState({ question: text })}
          value={this.state.question}
          placeholder='Question'
          autoFocus={true}
          style={styles.input}
        />
        <TextInput
          onChangeText={(text) => this.setState({ answer: text })}
          value={this.state.answer}
          placeholder='Answer'
          autoFocus={true}
          style={styles.input}
        />
        <TouchableOpacity onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    fontSize: 16,
    padding: 5,
    marginBottom: 10
  }
})
