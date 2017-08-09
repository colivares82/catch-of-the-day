import React from 'react';
import Header from '../Header/Header';
import Order from '../Order/Order';
import Inventory from '../Inventory/Invetory';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh"/>
        </div>
        <Order/>
        <Inventory/>
      </div>
    )
  }
}

export default App;