export const Searchbar = ({ onSearch }) => {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.query.value);
    console.log(e.target.query.value);
    e.target.reset();
  };
  return (
    <>
      <form className="SearchForm" onSubmit={handleSearch}>
        <input className="" name="query" type="text" autoComplete="off" autoFocus />
        <button type="submit" className="">
          <span className="">Search</span>
        </button>
      </form>
    </>
  );
};
