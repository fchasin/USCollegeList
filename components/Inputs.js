export default props => {
  const handleCheck = e => {
    props.checkBox(e.currentTarget);
    console.log(e.currentTarget.checked);
    console.log(props.state);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <form>
      <div>
        <p>choose what values you would like to display</p>
        <label>
          School City
          <input type="checkbox" name="city" id="city" onChange={handleCheck} />
        </label>
        <label>
          School Zip
          <input type="checkbox" name="zip" id="zip" onChange={handleCheck} />
        </label>
        <label>
          Median Family income
          <input
            type="checkbox"
            name="income"
            id="income"
            onChange={handleCheck}
          />
        </label>
        <label>
          Cost of Attendance
          <input type="checkbox" name="cost" id="cost" onChange={handleCheck} />
        </label>
      </div>
      <div>
        <label>
          School Size
          <input type="text" name="size" id="size" />
        </label>
      </div>
      <button type="submit" onSubmit={onSubmit}>
        Submit
      </button>
    </form>
  );
};
