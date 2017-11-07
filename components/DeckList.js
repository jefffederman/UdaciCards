import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { white, gray } from '../colors'

export default class DeckList extends Component {
  render() {
    const data = [
      { id: 1, title: 'First deck', count: 5 },
      { id: 2, title: 'Second deck', count: 18 },
      { id: 3, title: 'Third deck', count: 3 },
      { id: 4, title: 'Fourth deck', count: 12 },
      { id: 5, title: 'Fifth deck', count: 11 }
    ]

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.deckItem}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate(
                    'DeckDetail',
                    {}
                  )
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    styles.deckHeading
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.buttonText,
                    styles.deckSubheading
                  ]}
                >
                  {item.count} cards
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
