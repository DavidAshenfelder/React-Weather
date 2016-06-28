import React, { Component, PropTypes } from 'react';
import DayWeather from './DayWeather.jsx';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../constants/constants.js';
import HTML5Backend from 'react-dnd-html5-backend';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const cityTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Time to actually perform the action
    props.moveCity(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class ForecastWrapper extends Component {
  render() {
    const { connectDropTarget, city, forecast, color, index, id} = this.props;
    return connectDropTarget(<div><DayWeather city={city} forecast={forecast} color={color} index={index} id={id}/></div>);
  }
}

export default DropTarget(ItemTypes.CITY, cityTarget, collect)(ForecastWrapper);
