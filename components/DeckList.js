import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

export default class DeckList extends Component {
  render() {
    const data = [
      { title: 'First deck', count: 5 },
      { title: 'Second deck', count: 18 },
      { title: 'Third deck', count: 3 },
      { title: 'Fourth deck', count: 12 },
      { title: 'Fifth deck', count: 11 }
    ]

    return (
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.count} cards</Text>
            </View>
          )
        }}
      />
    )
  }
}
