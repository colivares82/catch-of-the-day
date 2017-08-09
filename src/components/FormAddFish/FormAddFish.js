import React from 'react';

class FormAddFish extends React.Component {
  createFish(event) {
    event.preventDefault();
    console.log();
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }
    console.log(fish);
  }

  render() {
    return (
      <form onSubmit={(e) => this.createFish(e)}
            className="fish-edit">
        <input ref={(input) => this.name = input}
               type="text"
               placeholder="Fish Name"/>
        <input ref={(input) => this.price = input}
               type="text"
               placeholder="Fish Price"/>
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh</option>
          <option value="unavailable">SoldOut</option>
        </select>
        <textarea ref={(input) => this.desc = input}
                  type="text"
                  placeholder="Fish Desc"></textarea>
        <input ref={(input) => this.image = input}
               type="text"
               placeholder="Fish Image"/>
        <button type="submit"> Add Item</button>
      </form>
    )
  }
}

export default FormAddFish;