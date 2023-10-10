import React from "react";
import { Placeholder } from "react-bootstrap";
import "./ShimmerEffect.css";

const ShimmerTableRow = ({ headers }) => {
  return (
    <div className="tabular-placeholder">
      <div>
        {headers.map((column, index) => {
          return (
            <Placeholder
              as="div"
              key={index}
              style={{ height: 15, width: column.width || "auto" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShimmerTableRow;
