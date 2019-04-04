import { Component } from 'react';
import Router from 'next/router';

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = { schools: '' };
  }

  render() {
    return <div> {this.props.value}</div>;
  }
}

export default Inputs;
