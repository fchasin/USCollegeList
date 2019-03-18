import Field from './Field';

export default ({ school }) => {
  return (
    <div>
      {console.log(school)}
      {console.log(school.name)}
      <div className="header" />
      <h2>School name: {school['school.name']}</h2>
      <h4>School zip: {school['school.zip']}</h4>
      <h4>School size: {school['school.size']}</h4>
    </div>
  );
};
