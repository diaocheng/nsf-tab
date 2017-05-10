import React, { Component } from 'react'

import View from '../container/View'
import Grid from '../components/Grid'
import Search from '../components/Search'

export default class Container extends Component {
  render() {
    return (
      <View>
        <Grid />
        <Search />
      </View>
    )
  }
}