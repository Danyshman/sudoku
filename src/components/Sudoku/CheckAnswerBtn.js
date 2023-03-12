import React from "react";

const CheckAnswerBtn = ({ onClick }) => {
  return (
    <div className="test-wrapper">
      <div className="test-button" onClick={onClick}>
        Check answer
      </div>
    </div>
  );
};

export default CheckAnswerBtn;
