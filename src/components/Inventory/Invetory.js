import React from 'react';
import FormAddFish from '../FormAddFish/FormAddFish';

class Invetory extends React.Component {
  render() {
    return (
      <div>
        <h2>Invetory</h2>
        <FormAddFish addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Fishes</button>
      </div>
    )
  }
}

export default Invetory;