import Inputs from '../components/Inputs';
import React from 'react';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: false,
      zip: false,
      income: false,
      cost: false,
      range: 0,
    };
  }

  checkBox = currentTarget => {
    this.setState({ [currentTarget.name]: currentTarget.checked });
  };

  onChange = currentTarget => {
    const { name, type, value } = currentTarget;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <div>
        <Inputs
          checkBox={this.checkBox}
          state={this.state}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Index;
