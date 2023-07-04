import { requestAPI } from "./connectionApi";

export const postLikeVideo = async (value) => {
  const values = {
    likeVideo: value,
    videoId: value.id,
  };
  requestAPI("POST", "/likeVideo", values, null)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const dislikeVideo = async (value) => {
  const values = {
    videoId: value.id,
  };

  requestAPI("delete", "/likeVideo", values, null)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
