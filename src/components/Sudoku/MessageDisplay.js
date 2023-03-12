import React from "react";

export default function MessageDisplay({ gridStatus }) {
  if (!gridStatus.isValid) {
    return <h1 className="danger">Invalid numbers</h1>;
  } else if (gridStatus.isFinished) {
    return <h1 className="success">Completed!</h1>;
  }
  return null;
}
