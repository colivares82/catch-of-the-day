import React from 'react';
import FormAddFish from '../FormAddFish/FormAddFish';

class Invetory extends React.Component {
  constructor() {
    super();

    this.renderInventory = this.renderInventory.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
     <div className="fish-edit"
          key={key}>
       <input value={fish.name}
              type="text"
              name="name"
              placeholder="Fish Name"
              onChange={(e) => this.handleEvent(e, key)}/>
       <input value={fish.price}
              type="text"
              name="price"
              placeholder="Fish Price"
              onChange={(e) => this.handleEvent(e, key)}/>
       <select value={fish.status}
               name="status"
               onChange={(e) => this.handleEvent(e, key)}>
         <option value="available">Fresh</option>
         <option value="unavailable">SoldOut</option>
       </select>
       <textarea value={fish.desc}
                 type="text"
                 name="desc"
                 placeholder="Fish Desc"
                 onChange={(e) => this.handleEvent(e, key)}></textarea>
       <input value={fish.image}
              type="text"
              name="image"
              placeholder="Fish Image"
              onChange={(e) => this.handleEvent(e, key)}/>
       <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
     </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Invetory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <FormAddFish addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Fishes</button>
      </div>
    )
  }
}

Invetory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
}

export default Invetory;