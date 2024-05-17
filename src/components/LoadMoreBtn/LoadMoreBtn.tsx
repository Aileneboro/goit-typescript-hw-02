import React from "react";

type LoadMoreBtnProps = {
  onClick: () => void;
  show: boolean;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, show }) => {
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
