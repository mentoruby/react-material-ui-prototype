import React, { Component } from 'react';
import Route from './Route'
import FooterBar from './component/Footer'

class App extends Component {
  render() {
    return (
      <div>
        <Route />
        <FooterBar />
      </div>
    )
  }
}

export default App;
