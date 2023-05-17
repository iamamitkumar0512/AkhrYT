import React from "react";

const Comment = (props) => {
  const name = props.data.authorDisplayName;
  const img = props.data.authorProfileImageUrl;
  const comment = props.data.textDisplay;
  return (
    <div className="flex p-2 my-2 shadow-sm bg-gray-100 rounded-md truncate">
      <img src={img} alt={name} className="h-6 w-6 mr-3" />
      <div>
        <p className="font-medium">{name}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
