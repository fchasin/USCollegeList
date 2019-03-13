import Field from './Field';

export default ({ school }) => {
  return (
    <div>
      <div className="header" />
      <h2>{school.name}</h2>
      <h4>{school.zip}</h4>>
      <div className="body">
        {school.info.map(field => (
          <Field field={field} />
        ))}
      </div>
    </div>
  );
};
