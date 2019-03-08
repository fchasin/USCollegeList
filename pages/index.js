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

  submit = () => {
    // make the request
    // nav to the info page, where all of the schools will be rendered
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