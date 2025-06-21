import React from "react";
interface props {
  className?: string;
}
function Loader({ className }: props) {
  return <div className={`loader ${className}`}></div>;
}

export default Loader;
