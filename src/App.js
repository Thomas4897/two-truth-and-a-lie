import React, { Component } from "react";
import "./App.css";
// import { v4 as uuidv4 } from "uuid";

export class App extends Component {
  state = {
    // usersArray: [
    //   {
    //     id: uuidv4(),
    //     username: "zeroCrash",
    //     promptOne: {text: "truth", isLie: false}
    //     promptTwo: "truth",
    //     promptThree: "lie",
    //   },
    // ],

    newUsername: "",
    newPromptOne: { text: "", isLie: false },
    newPromptTwo: { text: "", isLie: false },
    newPromptThree: { text: "", isLie: false },
    newVote: "",
  };

  handleInputChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handlePromptInputChange = (event) => {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        text: event.target.value,
      },
    });
  };

  handleIsLieChecked = (event) => {
    const newData = {
      ...this.state,
      [event.target.name]: {
        ...this.state[event.target.name],
        isLie: !this.state[event.target.name].isLie,
      },
    };
    this.setState(newData);
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    // const { newUsername, newPromptOne, newPromptTwo, newPromptThree } =
    //   this.state;

    // let newUsersArray = [
    //   {
    //     // id: uuidv4(),
    //     username: this.state.newUsername,
    //     promptOne: this.state.newPromptOne,
    //     promptTwo: this.state.newPromptTwo,
    //     promptThree: this.state.newPromptThree,
    //   },
    // ];

    this.setState({
      newUsername: this.state.newUsername,
      newPromptOne: this.state.newPromptOne,
      newPromptTwo: this.state.newPromptTwo,
      newPromptThree: this.state.newPromptThree,
      newVote: "",
    });
  };

  render() {
    const { newUsername, newPromptOne, newPromptTwo, newPromptThree, newVote } =
      this.state;

    // console.log(this.state);
    console.log(this.state);

    return (
      <div className="App">
        <h1>Two Truths and a Lie</h1>
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <label>User Name:</label>
            <input
              name="newUsername"
              value={newUsername}
              onChange={this.handleInputChange}
              placeholder=" User Name"
            />
          </div>
          <div>
            <label>Propmt 1:</label>
            <input
              name="newPromptOne"
              value={newPromptOne.text}
              onChange={this.handlePromptInputChange}
              placeholder=" Prompt 1"
            />
            <label> isLie:</label>
            <input
              name="newPromptOne"
              type="checkbox"
              checked={this.state.newPromptOne.isLie}
              onChange={this.handleIsLieChecked}
            />
          </div>
          <div>
            <label>Propmt 2:</label>
            <input
              name="newPromptTwo"
              value={newPromptTwo.text}
              onChange={this.handlePromptInputChange}
              placeholder=" Prompt 2"
            />
            <label> isLie:</label>
            <input
              name="newPromptTwo"
              type="checkbox"
              checked={this.state.newPromptTwo.isLie}
              onChange={this.handleIsLieChecked}
            />
          </div>
          <div>
            <label>Propmt 3:</label>
            <input
              name="newPromptThree"
              value={newPromptThree.text}
              onChange={this.handlePromptInputChange}
              placeholder=" Prompt 3"
            />
            <label> isLie:</label>
            <input
              name="newPromptThree"
              type="checkbox"
              checked={this.state.newPromptThree.isLie}
              onChange={this.handleIsLieChecked}
            />
          </div>
          <div>
            <label>Vote</label>
            <input
              name="newVote"
              value={newVote}
              onChange={this.handleInputChange}
              placeholder=" Vote"
            />
          </div>

          <button>Send Prompt</button>
          <button>Send Vote</button>
        </form>
      </div>
    );
  }
}

export default App;
