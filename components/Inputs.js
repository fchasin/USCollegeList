import { Component } from 'react';

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
