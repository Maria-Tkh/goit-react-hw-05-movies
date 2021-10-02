export const Searchbar = ({ onSearch }) => {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.value);
    console.log(e.target.value);
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
