import { Component } from 'react';
import School from '../components/School';

function addNames(name, value) {
  return previousState => {
    return { ...previousState, [name]: value };
  };
}

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { schools: [], search: '' };
  }

  componentDidMount() {
    let schools = sessionStorage.getItem('schools');
    let schools1 = JSON.parse(schools);

    console.log(schools);
    console.log(schools1);
    this.setState({
      schools: Object.keys(schools1).map(key => schools1[key]),
    });
  }

  componentWillUnmount() {
    sessionStorage.clear();
  }

  onChange = event => {
    const { name, value } = event.currentTarget;
    console.log(name, value);
    // the problem is right here- state isn't correctly being set by the following function
    // breaks when I type into name but not into size
    this.setState({ [name]: value }, () => {
      console.log(this.state.name);
    });
  };

  render() {
    return (
      <div>
        <h2>This is the index page</h2>
        <h4>Search by name</h4>
        <input type="text" name="name" onChange={this.onChange} />
        <h4>Search by Size: greater than:</h4>
        <input type="text" name="size" onChange={this.onChange} />
        {
          // if there is nthing in the search boxes, render normally
          //!!!! the number sorting is still broken
          // this looks at state set from onChange event
        }
        {this.state.schools.map(school => {
          if (this.state.name || this.state.size) {
            if (this.state.name && this.state.size) {
              if (
                school['school.name'] &&
                school['school.name']
                  .toLowerCase()
                  .includes(this.state.name.toLowerCase()) &&
                school.size < this.state.size
              ) {
                return <School school={school} />;
              }
            } else if (this.state.name && !this.state.size) {
              if (
                school['school.name'] &&
                school['school.name']
                  .toLowerCase()
                  .includes(this.state.name.toLowerCase())
              ) {
                return <School school={school} />;
              }
            } else {
              if (school.size < this.state.size) {
                return <School school={school} />;
              }
            }
          } else return <School school={school} />;
        })}
      </div>
    );
  }
}

export default Display;
