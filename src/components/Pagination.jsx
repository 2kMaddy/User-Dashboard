const Pagination = (props) => {
  const { currentPage, totalPage, onClick } = props;
  let values = [];
  for (let i = 1; i <= totalPage; i++) {
    values.push(i);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((each) => (
        <button
          type="button"
          key={each}
          onClick={() => onClick(each)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          {each}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
