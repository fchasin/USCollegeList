export default ({ school }) => {
  return (
    <div className="school">
      <div className="header" />
      <h2>School name: {school['school.name']}</h2>
      <h4>School zip: {school['school.zip']}</h4>
      <h4>School size: {school['2015.student.size']}</h4>
      <h4>School city: {school['school.city']}</h4>{' '}
      <style jsx>
        {`
          .school {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>
    </div>
  );
};
