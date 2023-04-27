import React from "react";

const VideoPlayer = () => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/twCHVhk8iMU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
