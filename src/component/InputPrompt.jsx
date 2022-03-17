export function InputPrompt(props) {
    return (
        <div className="prompt-div">
        <label>{props.nameProp}</label>
        <input
          name={props.nameProp}
          value={props.promptProp}
          onChange={props.handlePromptInputChange}
          placeholder={props.nameProp}
        />
        <label> isLie:</label>
        <input
          className="lie-checkbox"
          name={props.nameProp}
          type="checkbox"
          onChange={props.handleIsLieChecked}
        />
      </div>
    )
}
