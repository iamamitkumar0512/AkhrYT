import { requestAPI } from "./connectionApi";

export const postSubscription = async (value) => {
  const values = {
    subscribeChannel: value,
  };
  requestAPI("POST", "/subscription", values, null)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSubscription = async (value) => {
  const values = {
    subscribeChannel: value,
  };
  requestAPI("delete", "/subscription", values, null)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
