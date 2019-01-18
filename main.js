// api documentation lives at https://collegescorecard.ed.gov/data/documentation/

// get school data from fed
// required
// size > 1000 students
// primarily 4-year uni
// data fields
// school size
// name, city zip
// cost of attendance
// median family income
const getSchools = async () => {
  const response = await fetch(
    'https://api.data.gov/ed/collegescorecard/v1/schools?2015.student.size__range=1000..&_fields=id,school.name,school.city,2015.student.size,2015.student.enrollment.all,2015.cost.attendance.academic_year,school.degree_urbanization,school.zip,2015.student.demographics.median_family_income,2015.admissions.sat_scores.average.overall&api_key=aGm3481p0Yd5XxhagTDeIFQOEqQVhvx4p3uqtEyL'
  );
  const schools = await response.json();
  const pageSize = 20;

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

// webscraping real estate rents

// comapre to see if there are zips by schools
