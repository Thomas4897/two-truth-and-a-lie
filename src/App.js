import React, { Component } from "react";
import "./App.css";
import GetPoll from "./GetPoll";
import { InputPrompt } from "./component";
// import { InputPrompt } from "./component";
// import { v4 as uuidv4 } from "uuid";

const serverURL = "http://ad4d-108-53-232-66.ngrok.io";

export class App extends Component {
  state = {
    userName: "",
    vote: 0,
    prompts: [
      {
        name: "promptOne",
        prompt: "",
        isLie: false,
      },
      {
        name: "promptTwo",
        prompt: "",
        isLie: false,
      },
      {
        name: "promptThree",
        prompt: "",
        isLie: false,
      },
    ],
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  handlePromptInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    let updatedPrompts = [...this.state.prompts];

    updatedPrompts = updatedPrompts.map((mappedPrompt) => {
      if (mappedPrompt.name === name) {
        return {
          ...mappedPrompt,
          prompt: value,
        };
      }
      return {
        ...mappedPrompt,
      };
    });
    this.setState(
      {
        prompts: updatedPrompts,
      },
      () => {
        console.log(this.state); //Runs after the state has updated
      }
    );
  };

  handleIsLieChecked = (e) => {
    const name = e.target.name;

    let updatedPrompts = [...this.state.prompts];

    updatedPrompts = updatedPrompts.map((mappedPrompt) => {
      if (mappedPrompt.name === name) {
        return {
          ...mappedPrompt,
          isLie: !mappedPrompt.isLie,
        };
      }
      return {
        ...mappedPrompt,
      };
    });
    this.setState(
      {
        prompts: updatedPrompts,
      },
      () => {
        console.log(this.state); //Runs after the state has updated
      }
    );
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
    const { userName } = this.state;
    const { vote } = this.state.prompts;

    return (
      <div className="App">
        <h1>Two Truths and a Lie</h1>

        <div className="userName-prompt-div">
          <label>User Name:</label>
          <input
            name="userName"
            value={userName}
            onChange={this.handleInputChange}
            placeholder=" User Name"
          />
        </div>

        {this.state.prompts.map(({ name, prompt, isLie }, idx) => {
          return (
            <InputPrompt
              key={`Input-prompt-${idx}`}
              nameProp={name}
              promptProp={prompt}
              isLieProp={isLie}
              handlePromptInputChange={this.handlePromptInputChange}
              handleIsLieChecked={this.handleIsLieChecked}
            />
          );
        })}

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

        <GetPoll />
      </div>
    );
  }
}

async function ping(userName) {
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
      userName: event.userName,
      prompts: {
        promptOne: {
          prompt: event.prompts[0].prompt,
          isLie: event.prompts[0].isLie,
        },
        promptTwo: {
          prompt: event.prompts[1].prompt,
          isLie: event.prompts[1].isLie,
        },
        promptThree: {
          prompt: event.prompts[2].prompt,
          isLie: event.prompts[2].isLie,
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
      userName: event.userName,
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
