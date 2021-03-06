import React from 'react';
import sampleFishes from '../../sample-fishes';
import Header from '../Header/Header';
import Order from '../Order/Order';
import Inventory from '../Inventory/Invetory';
import Fish from '../Fish/Fish';
import base from '../../base/base';



class App extends React.Component {
  constructor() {
    super();

    /********************************
     *  Expose methods to the scope
     ******************+************/
    this.addFish = this.addFish.bind(this);
    /***********************
     *  this.loadSamples Commented
     *  The this.X = this.X.bind(this) will be change in near future
     *  But is not still defined, go to the method in line #75 to
     *  see how it works (arrow functions)
     ******************+****/
    // this.loadSamples = this.loadSamples.bind(this);

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    /***********************
     *  Get Initial States
     ******************+****/
    this.state = {
      fishes: {},
      order: {}
    };
  }

  /***************************************************************
   *          This are Hooks among many others
   *  https://facebook.github.io/react/docs/react-component.html
   ******************+*******************************************/

  componentWillMount() {
    // This runs before App renders
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
            {
              context: this,
              state: 'fishes'
            });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Somethins Changed');
    console.log({nextProps, nextState});

    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
  }


  loadSamples = () => {
    this.setState({
      fishes : sampleFishes
      })
  };

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

  updateFish(key, updatedFishes) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFishes;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  }

  // THE DIFFERENCE ON DELETE and NULL
  // is that Delete is not taken by FireBase
  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
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
               order={this.state.order}
               params={this.props.params}
               removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish}
                   loadSamples={this.loadSamples}
                   fishes={this.state.fishes}
                   updateFish={this.updateFish}
                   removeFish={this.removeFish}
                   storeId={this.props.params.storeId}/>
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;