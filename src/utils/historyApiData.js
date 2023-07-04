import { requestAPI } from "./connectionApi";

export const postHistory = async (value) => {
  const values = {
    historyVideo: value,
    videoId: value.id,
  };
  requestAPI("POST", "/history", values, null)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteHistory = async () => {
  requestAPI("delete", "/history", null, null)
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
