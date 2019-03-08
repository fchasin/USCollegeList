// api documentation lives at https://collegescorecard.ed.gov/data/documentation/

// orig request
// //     'https://api.data.gov/ed/collegescorecard/v1/schools?2015.student.size__range=1000..&_fields=id,school.name,school.city,2015.student.size,2015.student.enrollment.all,2015.cost.attendance.academic_year,school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL'

// get school data from fed
// required
// size > 1000 students
// primarily 4-year uni
// data fields
// school size
// name, city zip
// cost of attendance
// median family income
const getSchools = async state => {
  let city, size, cost;

  if (state.city) {
    city = 'school.city,';
  } else city = '';

  if (state.size) {
    size = 'school';
  } else size = '2015.student.size,';

  if (state.cost) {
    cost = '2015.cost.attendance.academic_year,';
  } else cost = '';

  const response = await fetch(
    `https://api.data.gov/ed/collegescorecard/v1/schools?2015.student.size__range=1000..&_fields=id,school.name,${city}2015.student.enrollment.all,${cost}school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL`
  );
  const schools = await response.json();
  const pageSize = 20;

  // determine what will be requested based on input

  if (response.status === 200) {
    for (let i = 0; i < schools.metadata.total / pageSize; i++) {
      const response = await fetch(
        `https://api.data.gov/ed/collegescorecard/v1/schools?_page=${i +
          1}&2015.student.size__range=1000..&_fields=id,school.name,school.city,2015.student.size,2015.student.enrollment.all,2015.cost.attendance.academic_year,school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL`
      );
      const { results: newResults } = await response.json();
      schools.results.push(...newResults);
    }
  } else {
    throw Error('unable to fetch puzzle');
  }
  return schools;
};

const schools = await getSchools();

// find schools by zip code
const returnByZip = (schools, zip) => {
  return schools.filter(school => school['school.zip'] === zip);
};

const returnByName = (schools, name) => {
  return schools.filter(school => school['school.name'] === name);
};

// // sort by income highest to lowest
// const sortByIncome = schools => {
//   return schools.sort( (a,b) => {
//     if (a.)
//   });
// };
