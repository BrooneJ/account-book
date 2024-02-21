import * as React from "react";

function Arrow(props: any) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} {...props}>
      <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
    </svg>
  );
}

export default Arrow;
