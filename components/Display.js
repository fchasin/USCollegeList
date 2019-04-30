import { Component } from 'react';
import School from '../components/School';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { schools: [], search: '' };
  }

  componentWillUnmount() {
    sessionStorage.clear();
  }

  onChange = event => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
    console.log(event.currentTarget);
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
          //  button that loads all of the data
        }
        <button
          onClick={e => {
            e.preventDefault();
            const schools = JSON.parse(sessionStorage.getItem('schools'));
            let lessSchools = [];
            for (let i = 0; i < schools.results.length; i++) {
              if (schools.results[i][`2015.student.size`])
                lessSchools.push(schools.results[i]);
            }
            this.setState({ schools: lessSchools });
          }}
        />
        {
          // if there is nthing in the search boxes, render normally
          //!!!! the number sorting is still broken
        }
        {this.state.schools.map(school => {
          if (this.state.name || this.state.size) {
            if (this.state.name && this.state.size) {
              if (
                school['school.name']
                  .toLowerCase()
                  .includes(this.state.name.toLowerCase()) &&
                school.size < this.state.size
              ) {
                return <School school={school} />;
              }
            } else if (this.state.name && !this.state.size) {
              if (
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
