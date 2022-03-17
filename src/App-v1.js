import React, { Component } from "react";
import "./App.css";
import GetPoll from "./GetPoll";
// import { v4 as uuidv4 } from "uuid";

const serverURL = "http://ad4d-108-53-232-66.ngrok.ioZ";

export class App extends Component {
  state = {
    username: "",
    promptOne: { text: "", isLie: false },
    promptTwo: { text: "", isLie: false },
    promptThree: { text: "", isLie: false },
    vote: "",
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
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
      // ...this.state,
      [event.target.name]: {
        ...this.state[event.target.name],
        isLie: !this.state[event.target.name].isLie,
      },
    };
    // console.log(this.state);
    this.setState(newData);
  };

  sendPromptClick = async () => {
    const response = await sendPrompt(this.state);
    console.log("sendPromptClick:", response);
  };

  sendVoteClick = async () => {
    const response = await sendVote(this.state);
    console.log("sendVoteClick:", response);
  };

  pingServer = async () => {
    const response = await ping(this.state.username);
    console.log("pingServer:", response);
  };

  render() {
    const { username, promptOne, promptTwo, promptThree, vote } = this.state;

    return (
      <div className="App">
        <h1>Two Truths and a Lie</h1>
        {/* <form onSubmit={this.handleOnSubmit}> */}
        <div className="username-prompt-div">
          <label>User Name:</label>
          <input
            name="username"
            value={username}
            onChange={this.handleInputChange}
            placeholder=" User Name"
          />
        </div>
        <div className="prompt-div">
          <label>Propmt 1:</label>
          <input
            name="promptOne"
            value={promptOne.text}
            onChange={this.handlePromptInputChange}
            placeholder=" Prompt 1"
          />
          <label> isLie:</label>
          <input
            className="lie-checkbox"
            name="promptOne"
            type="checkbox"
            onChange={this.handleIsLieChecked}
          />
        </div>
        <div className="prompt-div">
          <label>Propmt 2:</label>
          <input
            name="promptTwo"
            value={promptTwo.text}
            onChange={this.handlePromptInputChange}
            placeholder=" Prompt 2"
          />
          <label> isLie:</label>
          <input
            className="lie-checkbox"
            name="promptTwo"
            type="checkbox"
            onChange={this.handleIsLieChecked}
          />
        </div>
        <div className="prompt-div">
          <label>Propmt 3:</label>
          <input
            name="promptThree"
            value={promptThree.text}
            onChange={this.handlePromptInputChange}
            placeholder=" Prompt 3"
          />
          <label>isLie:</label>
          <input
            className="lie-checkbox"
            name="promptThree"
            type="checkbox"
            onChange={this.handleIsLieChecked}
          />
        </div>
        <div className="vote-prompt-div">
          <label>Vote:</label>
          <input
            name="vote"
            value={vote}
            onChange={this.handleInputChange}
            placeholder=" Vote"
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.sendPromptClick}
        >
          Send Prompt
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.sendVoteClick}
        >
          Send vote
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={this.pingServer}
        >
          Ping Server
        </button>

        {/* </form> */}

        <GetPoll />
      </div>
    );
  }
}

async function ping(userName) {
  // console.log(userName);
  const response = await fetch(`${serverURL}/ping`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify({
      userName,
    }),
  });
  const pingResponse = await response.text();
  return pingResponse;
}

async function sendPrompt(event) {
  const response = await fetch(`${serverURL}/prompt-submit`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },

    body: JSON.stringify({
      userName: event.username,
      prompts: {
        promptOne: {
          prompt: event.promptOne.text,
          isLie: event.promptOne.isLie,
        },
        promptTwo: {
          prompt: event.promptTwo.text,
          isLie: event.promptTwo.isLie,
        },
        promptThree: {
          prompt: event.promptThree.text,
          isLie: event.promptThree.isLie,
        },
      },
    }),
  });
  const pingResponse = await response.text();

  return pingResponse;
}

async function sendVote(event) {
  const response = await fetch(`${serverURL}/prompt-vote`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify({
      userName: event.username,
      promptVote: Number(event.vote), //Has to be type "number" and between 1 and 3
    }),
  });
  const pingResponse = await response.text();

  return pingResponse;
}

export default App;

//! POST to /prompt-submit
// body: {
//     userName: "James",
//     prompts: {
//         promptOne: {
//             prompt: "lie",
//             isLie: true,
//         },
//         promptTwo: {
//             prompt: "truth",
//             isLie: false,
//         },
//         promptThree: {
//             prompt: "truth",
//             isLie: false,
//         },
//     }
// }

//! POST to /prompt-vote
// body: {
//     userName: "James Nissenbaum"
//     promptVote: 2 //Has to be type "number" and between 1 and 3
// }

// GET to /prompt-poll
