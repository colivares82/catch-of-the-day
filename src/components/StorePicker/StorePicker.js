import React from 'react';
import {getFunName} from "../../helpers";

class StorePicker extends React.Component {
  /***********************************************
   *    THIS IS A WAY TO DECLARE THE INPUT MODEL
   *             Video 11 Reference
   ***********************************************/
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this)
  }

  goToStore(event) {
    event.preventDefault();
    let storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector"
            onSubmit={(e) => this.goToStore(e)}>
        <h2> Please Enter a Store</h2>
        <input ref={(input) => {this.storeInput = input}}
               type="text"
               required
               placeholder="Enter Store Name"
               defaultValue={getFunName()}/>
        <button type="submit"> Visit Store</button>
      </form>
    )
  }
}

/************************************************************************
 *        This declaration allow to access to the contex which is
 *  a mean to pass attributes like props and states but more controlled
 * **********************************************************************/
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
