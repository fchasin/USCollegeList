import { Component } from 'react';
import Router from 'next/router';

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = { schools: '' };
  }

  handleCheck = e => {
    this.props.checkBox(e.target);
  };

  onChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  onSubmit = async e => {
    e.preventDefault();

    const schools = await this.getSchools(this.props.state);
    this.setState(schools);
    console.log(this.state);
    console.log(sessionStorage);
    sessionStorage.setItem('schools', JSON.stringify(this.state));
    Router.push({
      pathname: '/info',
    });
  };

  getSchools = async state => {
    const cachedHits = sessionStorage.getItem(this.state);
    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      return;
    }

    let city, size, cost, income, range;

    // assign variables based on input
    if (state.city) {
      city = 'school.city,';
    } else city = '';

    if (state.size) {
      size = '2015.student.size,';
    } else size = '';

    if (state.cost) {
      cost = '2015.cost.attendance.academic_year,';
    } else cost = '';

    if (state.income) {
      income = '2015.student.demographics.median_family_income,';
    } else income = '';

    if (state.range) {
      range = state.range;
    } else range = 25000;
    // test if there's a correct response back from db for the first page
    const response = await fetch(
      `https://api.data.gov/ed/collegescorecard/v1/schools?2015.student.size__range=${range}..&_fields=id,school.name,${city}2015.student.enrollment.all,${cost}school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL`
    );
    const schools = await response.json();
    const pageSize = 20;

    // then request all of the pages
    // there's probably a better way to do this thru promise.all()
    if (response.status === 200) {
      for (let i = 0; i < schools.metadata.total / pageSize; i++) {
        const response = await fetch(
          `https://api.data.gov/ed/collegescorecard/v1/schools?_page=${i +
            1}&2015.student.size__range=${range}..&_fields=id,school.name,school.city,2015.student.size,2015.student.enrollment.all,2015.cost.attendance.academic_year,school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL`
        );
        const { results: newResults } = await response.json();
        schools.results.push(...newResults);
      }
    } else {
      throw Error('unable to fetch puzzle');
    }
    // set the state, then set the local session storage with the data
    return schools;
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <p>choose what values you would like to display</p>
          <label>
            School City
            <input
              type="checkbox"
              name="city"
              id="city"
              onChange={this.handleCheck}
            />
          </label>
          <label>
            School Zip
            <input
              type="checkbox"
              name="zip"
              id="zip"
              onChange={this.handleCheck}
            />
          </label>
          <label>
            Median Family income
            <input
              type="checkbox"
              name="income"
              id="income"
              onChange={this.handleCheck}
            />
          </label>
          <label>
            Cost of Attendance
            <input
              type="checkbox"
              name="cost"
              id="cost"
              onChange={this.handleCheck}
            />
          </label>
        </div>
        <div>
          <label>
            Schools Greater than:
            <input
              type="text"
              name="range"
              id="range"
              required
              onChange={this.onChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Inputs;
