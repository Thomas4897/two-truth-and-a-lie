import React, { Component } from "react";

const serverURL = "http://ce44-108-53-232-66.ngrok.io";

export class GetPoll extends Component {
  state = {
    username: "",
    promptOne: "",
    promptTwo: "",
    promptThree: "",
    showLie: false,
    results: false,
    isLie: {
      promptOne: { lie: "", votes: 0 },
      promptTwo: { lie: "", votes: 0 },
      promptThree: { lie: "", votes: 0 },
    },
  };

  handleGetPoll = async () => {
    const response = await poll(this.state);

    console.log("handleGetPoll:", response);
    this.setState({
      username: response.currentPrompt.userName,
      promptOne: response.currentPrompt.prompts.promptOne.prompt,
      promptTwo: response.currentPrompt.prompts.promptTwo.prompt,
      promptThree: response.currentPrompt.prompts.promptThree.prompt,
      // voteOne: response.promptVotes[1],
      // voteTwo: response.promptVotes[2],
      // voteThree: response.promptVotes[3],
      isLie: {
        promptOne: {
          lie: response.currentPrompt.prompts.promptOne.isLie,
          votes: response.promptVotes[1],
        },
        promptTwo: {
          lie: response.currentPrompt.prompts.promptTwo.isLie,
          votes: response.promptVotes[2],
        },
        promptThree: {
          lie: response.currentPrompt.prompts.promptThree.isLie,
          votes: response.promptVotes[3],
        },
      },
    });
    // console.log(this.state);
  };

  handleShowLieChecked = () => {
    const newData = {
      showLie: !this.state.showLie,
    };
    this.setState(newData);
    this.handleShowResults();
  };

  handleShowResults = () => {
    const getKeys = Object.keys(this.state.isLie);
    let mostVotes = 0;
    let newData = {};

    for (let i = 0; i < getKeys.length; i++) {
      let votes = this.state.isLie[getKeys[i]].votes;
      let lie = this.state.isLie[getKeys[i]].lie;

      if (votes > mostVotes) {
        mostVotes = votes;
        newData = {
          results: lie,
        };
      }
    }

    this.setState(newData);
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleGetPoll}
        >
          Get Poll
        </button>
        <label>showLie: </label>
        <input
          className="showLie-checkbox"
          //   name="showLie"
          type="checkbox"
          //   checked={this.state.promptThree.isLie}
          onChange={this.handleShowLieChecked}
        />
        <div className="GetPoll-results">
          {this.state.showLie
            ? this.state.results
              ? "We figured it out!"
              : "You fooled us!"
            : ""}
        </div>
        <div className="GetPoll-prompts">
          <p>User Name: {this.state.username}</p>
        </div>
        <div className="GetPoll-prompts">
          <p
            className="promptOne"
            style={{
              color: this.state.showLie
                ? this.state.isLie.promptOne.lie
                  ? "red"
                  : "green"
                : "",
            }}
          >
            Prompt 1: {this.state.promptOne}
          </p>
        </div>
        <div className="GetPoll-prompts">
          <p
            className="promptTwo"
            style={{
              color: this.state.showLie
                ? this.state.isLie.promptTwo.lie
                  ? "red"
                  : "green"
                : "",
            }}
          >
            Prompt 2: {this.state.promptTwo}
          </p>
        </div>
        <div className="GetPoll-prompts">
          <p
            className="promptThree"
            style={{
              color: this.state.showLie
                ? this.state.isLie.promptThree.lie
                  ? "red"
                  : "green"
                : false,
            }}
          >
            Prompt 3: {this.state.promptThree}
          </p>
        </div>
        <div className="GetPoll-prompts">
          <p>Vote 1: {this.state.isLie.promptOne.votes}</p>
        </div>
        <div className="GetPoll-prompts">
          <p>Vote 2: {this.state.isLie.promptTwo.votes}</p>
        </div>
        <div className="GetPoll-prompts">
          <p>Vote 3: {this.state.isLie.promptThree.votes}</p>
        </div>
      </div>
    );
  }
}

async function poll() {
  // console.log(userName);
  const response = await fetch(`${serverURL}/prompt-poll`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
  });

  return response.json();
}

export default GetPoll;
