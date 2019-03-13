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
      size: 0,
    };
  }

  checkBox = currentTarget => {
    this.setState({ [currentTarget.name]: currentTarget.checked });
  };

  render() {
    return (
      <div>
        <Inputs checkBox={this.checkBox} state={this.state} />
      </div>
    );
  }
}

export default Index;
