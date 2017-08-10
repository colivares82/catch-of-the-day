import React from 'react';
import sampleFishes from '../../sample-fishes';
import Header from '../Header/Header';
import Order from '../Order/Order';
import Inventory from '../Inventory/Invetory';
import Fish from '../Fish/Fish';

class App extends React.Component {
  constructor() {
    super();

    /********************************
     *  Expose methods to the scope
     ******************+************/
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    /***********************
     *  Get Initial States
     ******************+****/
    this.state = {
      fishes: {},
      order: {}
    };
  }

  loadSamples() {
    this.setState({
      fishes : sampleFishes
      })
  }

  addFish(fish) {
     /******************+*********+*********+*********
     *   is a good practice to copy the prev state
     ***********************+*********+*********+****/
    const fishes = {...this.state.fishes}
    /******************
     *   Add New Fish
     ******************/
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    /******************************************
     *       Set State with New Fish
     *  ({ fishes }) == ({ fishes: fishes })
     ******************************************/
    this.setState({ fishes })
  }

  addToOrder(key) {
    const order = {...this.state.order}

    order[key] = order[key] + 1 || 1;
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh"/>
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key =>
                  <Fish key={key}
                        index={key}
                        details={this.state.fishes[key]}
                        addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes}
               order={this.state.order}/>
        <Inventory addFish={this.addFish}
                   loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;