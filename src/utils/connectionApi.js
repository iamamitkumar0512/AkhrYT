import axios from "axios";
import { baseUrl } from "../App";

export const requestAPI = async (method, url, data, params) => {
  const AuthToken = localStorage.getItem("authToken");
  const OtpToken = localStorage.getItem("otpToken");
  const ResetToken = localStorage.getItem("resetToken");

  const promise = await axios({
    method: method,
    url: `${baseUrl}${url}`,
    params: params,
    data: data,
    headers: {
      authToken: AuthToken,
      OtpToken: OtpToken,
      resetToken: ResetToken,
    },
  });

  return promise;
};
