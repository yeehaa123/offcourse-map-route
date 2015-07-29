import React from "react";
import Route from "../src/index.jsx";

class Example extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500,
    radius: 30
  }

  constructor(props){
    super(props);
    this.handlers = {
      handleHover: this.handleHover.bind(this),
      handleClick: this.handleClick.bind(this)
    };
    this.state = {
      click: {},
      highlight: {}
    };
  }

  handleHover(status, { type, id }){
    this.setState({ highlight: { type, id, status } });
  }

  handleClick({ type, id }){
    this.setState({ click: { type, id } });
  }

  render() {
    const { width, height, radius } = this.props;
    const { click, highlight } = this.state;
    const collection = [
      {id: "1", resources: [{id: "1"}, {id: "2"}, {id: "3"}]},
      {id: "2", resources: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}, {id: "5"}]},
      {id: "3", resources: [{id: "1"}, {id: "2"}]},
      {id: "4", resources: [{id: "1"}, {id: "2"}, {id: "3"}, {id: "4"}]}
    ];
    const interval = width / (collection.length + 1);
    const baseLine = height / 2;
    const props = { interval, baseLine, radius, collection, handlers: this.handlers };
    return (
      <div>
        <svg width={ width } height={ height }>
            <Route {...props}/>
        </svg>

        <h2>Last Clicked</h2>
        <p>Type: { `${click.type}` }</p>
        <p>Id: { `${click.id}` }</p>

        <h2>Last Highlighted</h2>
        <p>Status: { `${highlight.status}` }</p>
        <p>Type: { `${highlight.type}` }</p>
        <p>Id: { `${highlight.id}` }</p>
      </div>
    );
  }
}

export default Example;
