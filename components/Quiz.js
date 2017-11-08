import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { gray, white, red, green } from '../colors'

export default class Quiz extends Component {
  state = {
    questions: [],
    index: 0,
    correctCount: 0,
    isShowingAnswer: false
  }

  questionsCount = () => (this.state.questions.length)

  gradeAnswer = (isCorrect = 0) => {
    this.setState((prevState) => {
      return {
        index: prevState.index + 1,
        correctCount: prevState.correctCount + isCorrect
      }
    })
  }

  toggleQuestionAnswer = () => {
    this.setState({
      isShowingAnswer: this.state.isShowingAnswer ? false : true
    })
  }

  componentDidMount() {
    const { questions } = this.props.navigation.state.params;
    this.setState({ questions })
  }

  render() {
    const {
      questions,
      index,
      isShowingAnswer,
      correctCount
    } = this.state
    const questionsCount = this.questionsCount()

    if (questionsCount > 0) {
      const { question, answer } = questions[index]

      const shown = isShowingAnswer ? answer : question
      const showButtonText = isShowingAnswer ? 'Show question' : 'Show answer'

      return (
        <View style={styles.quiz}>
          <Text>Question {index + 1} of {questionsCount}</Text>
          <Text>{correctCount} questions correct</Text>
          <Text style={styles.question}>{shown}</Text>
          <TouchableOpacity onPress={this.toggleQuestionAnswer}>
            <Text>{showButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: green }
            ]}
            onPress={() => this.gradeAnswer(1)}
          >
            <Text style={[styles.buttonText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
               styles.button,
              { backgroundColor: red }
            ]}
            onPress={() => this.gradeAnswer()}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.quiz}>
        <Text>No questions :(</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 200,
    borderRadius: 6,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: white
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
