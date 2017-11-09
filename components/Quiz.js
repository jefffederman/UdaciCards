import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { gray, white, red, green } from '../colors'

export default class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz'
  }

  defaultState = {
    questions: [],
    index: 0,
    correctCount: 0,
    isShowingAnswer: false
  }

  state = this.defaultState

  questionsCount = () => (this.state.questions.length)

  isFinished = () => (this.state.index === this.questionsCount())

  gradeAnswer = (isCorrect = 0) => {
    if (!this.isFinished()) {
      this.setState((prevState) => {
        return {
          index: prevState.index + 1,
          correctCount: prevState.correctCount + isCorrect
        }
      })
    }
  }

  toggleQuestionAnswer = () => {
    this.setState({
      isShowingAnswer: this.state.isShowingAnswer ? false : true
    })
  }

  restartQuiz = () => {
    const { navigation } = this.props
    const { title, questions } = navigation.state.params
    this.setState(
      {
        ...this.defaultState,
        questions: questions
      },
      () => {
        NavigationActions.setParams({
          key: 'Quiz',
          params: { questions }
        })
      }
    )
  }

  goBackToDeck = () => {
    const { navigation } = this.props
    const { title, questions } = navigation.state.params
    this.setState(
      {
        ...this.defaultState,
        questions: questions
      },
      () => navigation.goBack()
    )
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
      if (this.isFinished()) {
        return (
          <View style={styles.quiz}>
            <Text style={styles.question}>
              You finished with {correctCount} / {questionsCount} questions correct.
            </Text>

            <View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderColor: gray,
                    borderWidth: 2
                  }
                ]}
                onPress={this.restartQuiz}
              >
                <Text style={[styles.buttonText, { color: gray }]}>Restart Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                   styles.button,
                  { backgroundColor: gray }
                ]}
                onPress={this.goBackToDeck}
              >
                <Text style={styles.buttonText}>Back to Deck</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
      const { question, answer } = questions[index]
      const shown = isShowingAnswer ? answer : question
      const showButtonText = isShowingAnswer ? 'Show question' : 'Show answer'

      return (
        <View style={styles.quiz}>
          <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
            <Text>Question {index + 1} of {questionsCount}</Text>
            <Text>{correctCount} questions correct</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[styles.question, { marginBottom: 20 }]}>{shown}</Text>
            <TouchableOpacity onPress={this.toggleQuestionAnswer}>
              <Text style={{ color: gray }}>{showButtonText}</Text>
            </TouchableOpacity>
          </View>
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
        <Text style={styles.question}>No questions :(</Text>
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
  question: {
    textAlign: 'center',
    fontSize: 24
  },
  addCard: {
    backgroundColor: gray
  }
})
