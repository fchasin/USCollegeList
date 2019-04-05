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

  onChange = currentTarget => {
    const { value } = currentTarget.currentTarget;
    this.setState({ search: value });
    console.log(this.state.search);
  };

  render() {
    return (
      <div>
        <h2>This is the index page</h2>
        <h4>Search by name</h4>
        <input type="text" name="search" onChange={this.onChange} />
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
        {this.state.schools.map(school => {
          if (this.state.search) {
            if (
              school['school.name']
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            ) {
              return <School school={school} />;
            }
          } else return <School school={school} />;
        })}
      </div>
    );
  }
}

export default Display;
