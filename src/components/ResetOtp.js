import React from "react";
import { useState } from "react";
import styles from "../styles/Username.module.css";
import avatar from "../assests/profile.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { requestAPI } from "../utils/connectionApi";
import { useFormik } from "formik";
import { resetOtpValidation } from "../utils/validate";
import {
  setCloseBtn,
  setResetPasswordState,
  setResetEmailState,
} from "../utils/modalStateSlice";

const ResetOtp = () => {
  const resetOtpModalState = useSelector(
    (store) => store.modalState.resetOtpState
  );

  const dispatch = useDispatch();

  const closeBtnHandler = () => {
    dispatch(setCloseBtn());
  };

  const resendHandler = async () => {
    const values = {
      email: localStorage.getItem("resetEmail"),
    };
    requestAPI("POST", "/resetPassword", values, null)
      .then((res) => {
        localStorage.setItem("otpToken", res.data.token);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setTimeout(() => {
          dispatch(setResetEmailState());
        }, 500);
      });
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: resetOtpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      requestAPI("POST", "/verifyOtp", values, null)
        .then((res) => {
          console.log(res);
          localStorage.setItem("resetToken", res.data.resetToken);
          if (res.status === 200) {
            setTimeout(() => {
              localStorage.removeItem("resetEmail");
              localStorage.removeItem("otpToken");
              dispatch(setResetPasswordState());
            }, 500);
          }
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  return resetOtpModalState ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>

          <div className="flex justify-center items-center h-screen">
            <div
              className={styles.glass}
              style={{ width: "45%", paddingTop: "1em" }}
            >
              <div className="title flex flex-row justify-between items-center">
                <h4 className="text-2xl font-bold item-center">Reset OTP</h4>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeBtnHandler}
                >
                  Close
                </button>
              </div>
              <div className="profile flex justify-center py-1">
                <img
                  src={avatar}
                  className={styles.lgprofile_img}
                  alt="avatar"
                />
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Please enter OTP to Reset Password
                </span>
              </div>

              <form className="pt-5" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-3">
                  <div className="input text-center">
                    <span className="py-4 text-sm text-left text-gray-500">
                      Enter 4 digit OTP sent to your email address.
                    </span>
                    <input
                      {...formik.getFieldProps("otp")}
                      className={styles.lgtextbox}
                      type="text"
                      placeholder="OTP"
                    />
                  </div>

                  <button className={styles.btn} type="submit">
                    Submit
                  </button>
                </div>
              </form>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Can't get OTP?{" "}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={resendHandler}
                  >
                    Resend
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ResetOtp;
