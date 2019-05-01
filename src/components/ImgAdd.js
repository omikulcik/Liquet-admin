import React from "react";

export default class imgAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }

handleChangeUrl = (e) =>{
    const url = e.target.value;
    this.setState(() => ({url}))
}

handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(
        this.state.url,
    )
}

  render() {
    return (
      <div>
      <label>Vložte url obrázku: <input type="text" onChange={this.handleChangeUrl}></input></label>
      </div>
    )
    }
}