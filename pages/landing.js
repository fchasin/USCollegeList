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
                onChange={this.checkBox}
              />
            </label>
            <label>
              School Zip
              <input
                type="checkbox"
                name="zip"
                id="zip"
                onChange={this.checkBox}
              />
            </label>
            <label>
              Median Family income
              <input
                type="checkbox"
                name="income"
                id="income"
                onChange={this.checkBox}
              />
            </label>
            <label>
              Cost of Attendance
              <input
                type="checkbox"
                name="cost"
                id="cost"
                onChange={this.checkBox}
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
    sessionStorage.clear();
    e.preventDefault();
    this.setState({
      value: (
        <div>
          We're loading your results! Depending on how many schools you
          selected, this could take anywhere from a few seconds to 2 minutes.
          Please don't refresh the page.
        </div>
      ),
    });
    const schools = await this.getSchools(this.props.state);
    this.setState(schools);

    // assign school data to sessionstorage.
    sessionStorage.setItem('schools', JSON.stringify(this.state));
    Router.push({
      pathname: '/info',
      query: {
        city: this.state.city,
        zip: this.state.zip,
        cost: this.state.cost,
        income: this.state.income,
      },
    });
  };

  // backend side
  getSchools = async state => {
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

    if (this.state.size) {
      size = '2015.student.size';
    } else size = '';

    let range = this.state.range;

    // test if there's a correct response back from db for the first page
    // how we find the metadata from the response
    const res = await fetch(
      `https://api.data.gov/ed/collegescorecard/v1/schools?2015.student.size__range=${range}..&_fields=id,school.name,${city}2015.student.enrollment.all,${cost}school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL`
    );
    const firstPage = await res.json();
    // always the same pagesize from metadata
    const PAGESIZE = 20;
    const requests = [];

    // then request all of the pages
    const getPage = async function(pageNumber) {
      const url = `https://api.data.gov/ed/collegescorecard/v1/schools?_page=${pageNumber}&2015.student.size__range=${range}..&_fields=id,school.name,school.city,2015.student.size,2015.student.enrollment.all,2015.cost.attendance.academic_year,school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    };

    if (res.status === 200) {
      for (let i = 0; i < firstPage.metadata.total / PAGESIZE; i++) {
        requests.push(getPage(i));
      }
    } else {
      throw Error(
        `Something happened with the request. The status of the HTTP request is ${
          res.status
        }`
      );
    }

    const schools = await Promise.all(requests);
    console.log(schools);

    const flattenedSchools = schools.reduce(
      (res, next) =>
        res.concat(
          next.results.reduce(
            (schoolsPerPage, eachSchool) => schoolsPerPage.concat(eachSchool),
            []
          )
        ),
      []
    );

    return flattenedSchools;
  };

  checkBox = currentTarget => {
    const { checked, name } = currentTarget.currentTarget;
    this.setState({ [name]: checked });
  };

  onChange = currentTarget => {
    const { value } = currentTarget.currentTarget;
    this.setState({ range: parseFloat(value) });
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
