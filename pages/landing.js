import Inputs from '../components/Inputs';
import React from 'react';
import Router from 'next/router';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: false,
      zip: false,
      income: false,
      cost: false,
      range: 0,
      value: (
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
      ),
    };
  }

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ value: <div>This is loading! </div> });
    console.log(this.state);
    const schools = await this.getSchools(this.props.state);
    this.setState(schools);
    console.log(sessionStorage);
    // assign school data to sessionstorage.
    sessionStorage.setItem('scho  ols', JSON.stringify(this.state));
    Router.push({
      pathname: '/info',
    });
  };

  // backend side
  getSchools = async state => {
    sessionStorage.clear();

    // const cachedHits = sessionStorage.getItem(this.state);
    // if (cachedHits) {
    //   this.setState({ hits: JSON.parse(cachedHits) });
    //   return;
    // }

    let city, size, cost, income;

    // assign variables based on input
    if (this.state.city) {
      city = 'school.city,';
    } else city = '';

    if (this.state.size) {
      size = '2015.student.size,';
    } else size = '';

    if (this.state.cost) {
      cost = '2015.cost.attendance.academic_year,';
    } else cost = '';

    if (this.state.income) {
      income = '2015.student.demographics.median_family_income,';
    } else income = '';

    let range = this.state.range;

    // test if there's a correct response back from db for the first page
    // how we find the metadata from the response
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
      throw Error(
        `Something happened with the request. The status of the HTTP request is ${
          response.status
        }`
      );
    }
    // set the state, then set the local session storage with the data
    return schools;
  };

  checkBox = currentTarget => {
    this.setState({ [currentTarget.name]: currentTarget.checked });
    console.log(this.state);
  };

  onChange = currentTarget => {
    const { name, type, value } = currentTarget;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <div>
        <Inputs value={this.state.value} />
      </div>
    );
  }
}

export default Index;
