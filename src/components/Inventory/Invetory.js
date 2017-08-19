import React from 'react';
import FormAddFish from '../FormAddFish/FormAddFish';
import base from '../../base/base';

class Invetory extends React.Component {
  constructor() {
    super();

    this.renderInventory = this.renderInventory.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user})
      }
    });
  }

  handleEvent(event, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  logout() {
    base.unauth();
    this.setState({uid: null});
  }

  authenticate(provider) {
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.log(err);
      return;
    }
    // Grab the store info
    const storeRef = base.database().ref(this.props.storeId);
    // query the firebase once for the sotre data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
    // claim it as as our own if there no others already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });

      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });

    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your stores</p>
        <button className="github"
                onClick={() => this.authenticate('github')}>
          Login With GitHub
        </button>
        <button className="facebook"
                onClick={() => this.authenticate('facebook')}>
          Login With GitHub
        </button>
      </nav>
    )
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
    const logout = <button onClick={this.logout}>Log Out!</button>

    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Invetory</h2>
        {logout}
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
  storeId: React.PropTypes.string.isRequired,
}

export default Invetory;