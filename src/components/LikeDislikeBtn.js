import React from "react";

const LikeDislikeBtn = ({ Icon, item }) => {
  return (
    <div className="flex">
      <Icon className="h-4 w-4" />
      <h3>{item}</h3>
    </div>
  );
};

export default LikeDislikeBtn;
