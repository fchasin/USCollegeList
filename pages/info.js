import School from '../components/School';
export default () => (
  <div>
    <h2>This is the index page</h2>
    <button
      onClick={e => {
        e.preventDefault();
        const schools = sessionStorage.getItem('schools');
        let lessSchools = [];
        for (i = 0; i < 20; i++) {
          lessSchools.push(schools[i]);
        }
        lessSchools.map(school => <School school={school} />);
      }}
    />
  </div>
);
