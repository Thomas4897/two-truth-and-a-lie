import React, { Component } from "react";

const serverURL = "http://ce44-108-53-232-66.ngrok.io";

export class GetPoll extends Component {
  state = {
    username: "",
    promptOne: "",
    promptTwo: "",
    promptThree: "",
    voteOne: 0,
    voteTwo: 0,
    voteThree: 0,
    isLie: [],
  };

  getPoll = async () => {
    const response = await poll(this.state);

    console.log("getPoll:", response);
    this.setState({
      username: response.currentPrompt.userName,
      promptOne: response.currentPrompt.prompts.promptOne.prompt,
      promptTwo: response.currentPrompt.prompts.promptTwo.prompt,
      promptThree: response.currentPrompt.prompts.promptThree.prompt,
      voteOne: response.promptVotes[1],
      voteTwo: response.promptVotes[2],
      voteThree: response.promptVotes[3],
      isLie: {
        promptOne: response.currentPrompt.prompts.promptOne.isLie,
        promptTwo: response.currentPrompt.prompts.promptTwo.isLie,
        promptThree: response.currentPrompt.prompts.promptThree.isLie,
      },
    });
    // console.log(this.state);
  };

  //   showLieChecked = (event) => {
  //     const isLieKeys = Object.keys(this.state.isLie);
  //     // console.log(this.state.isLie.promptOne);

  //     const findLie = isLieKeys.map((prompt) => {
  //       return this.state.isLie[prompt] === true;
  //     });
  //     // console.log(findLie.style.color);
  //   };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getPoll}
        >
          Get Poll
        </button>
        <label>showLie: </label>
        <input
          className="showLieie-checkbox"
          //   name="showLie"
          type="checkbox"
          //   checked={this.state.promptThree.isLie}
          onChange={this.showLieChecked}
        />
        <div>
          <p>User Name: {this.state.username}</p>
        </div>
        <div>
          <p className="promptOne">Prompt 1: {this.state.promptOne}</p>
        </div>
        <div>
          {/* <p className="promptTwo" style={{ color: "red" }}> */}
          <p className="promptTwo">Prompt 2: {this.state.promptTwo}</p>
        </div>
        <div>
          <p className="promptThree">Prompt 3: {this.state.promptThree}</p>
        </div>
        <div>
          <p>Vote 1: {this.state.voteOne}</p>
        </div>
        <div>
          <p>Vote 2: {this.state.voteTwo}</p>
        </div>
        <div>
          <p>Vote 3: {this.state.voteThree}</p>
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
