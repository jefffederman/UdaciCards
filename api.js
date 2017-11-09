// Example data structure:
// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }

import { AsyncStorage } from 'react-native';
export const DECKS_KEY = 'decks'

// return all of the decks along with their titles, questions, and answers
export function getDecks() {
  return AsyncStorage.getItem(DECKS_KEY)
    .catch(() => {
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify({}))
    })
    .then((rawResult) => JSON.parse(rawResult))
    .then((result) => {
      const keys = Object.keys(result)
      return keys.map((key) => result[key])
    })
    .catch(() => [])
}

// take in a single id argument and return the deck associated with that id
export function getDeck(id) {
  return getDecks()
    .then((results) => results.filter((result) => result.title === id)[0])
}

// take in a single title argument and add it to the decks
export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

// take in two arguments, title and card, and will
// add the card to the list of questions for the deck
// with the associated title
export function addCardToDeck(title, card) {
  return getDeck(title)
    .then((deck) => {
      return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [title]: {
          ...deck,
          questions: deck.questions.concat(card)
        }
      }))
    })
}
