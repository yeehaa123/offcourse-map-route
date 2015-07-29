import React, { PropTypes } from "react";
import R from "ramda";
import Stop from "offcourse-map-stop";
import classnames from "classnames";

class Route extends React.Component {

  static propTypes = {
    collection: PropTypes.array.isRequired,
    handlers: PropTypes.object.isRequired,
    baseLine: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired
  };

  static defaultProps = {
    baseLine: 122,
    interval: 100,
    radius: 20
  }

  constructor(props){
    super(props);
    this.name = "route";
  }

  classes(){
    return classnames({
      [this.name]: true
    });
  }

  drawStops(){
    const { interval, baseLine, radius, handlers, collection } = this.props;
    const mapIndexed = R.addIndex(R.map);
    return mapIndexed((item, index) => {
      const x = interval + (index * interval);
      const y = baseLine;
      const params = { x, y, radius, collection: item.resources };
      return <Stop key={ index } { ...params } {...handlers}/>;
    }, collection);
  }

  render() {
    const stops = this.drawStops();
    return <g className={ this.classes() }>{ stops }</g>;
  };
}

export default Route;
