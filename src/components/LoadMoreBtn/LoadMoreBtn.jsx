const LoadMoreBtn = ({ onClick, show }) => {
  return (
    <>
      {show && (
        <div>
          <button type="button" onClick={onClick}>
            Load more...
          </button>
        </div>
      )}
    </>
  );
};

export default LoadMoreBtn;
