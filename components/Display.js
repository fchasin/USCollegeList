import { Component } from 'react';
import School from '../components/School';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { schools: [] };
  }

  componentWillUnmount() {
    sessionStorage.clear();
  }

  render() {
    return (
      <div>
        <h2>This is the index page</h2>
        <button
          onClick={e => {
            e.preventDefault();
            const schools = JSON.parse(sessionStorage.getItem('schools'));
            console.log(schools.range);
            console.log(schools);
            let lessSchools = [];
            for (let i = 0; i < schools.results.length; i++) {
              lessSchools.push(schools.results[i]);
            }
            this.setState({ schools: lessSchools });
          }}
        />
        {this.state.schools.map(school => (
          <School school={school} />
        ))}
      </div>
    );
  }
}

export default Display;
