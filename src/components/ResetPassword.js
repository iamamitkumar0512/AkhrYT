import React from "react";
import { useState } from "react";
import styles from "../styles/Username.module.css";
import avatar from "../assests/profile.png";
import { setCloseBtn, setLoginModalState } from "../utils/modalStateSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { requestAPI } from "../utils/connectionApi";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../utils/validate";

const ResetPassword = () => {
  const resetPasswordModalState = useSelector(
    (store) => store.modalState.resetPasswordState
  );

  const dispatch = useDispatch();

  const closeBtnHandler = () => {
    dispatch(setCloseBtn());
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const value = {
        password: values.password,
      };
      requestAPI("POST", "/resetpasswordset", value, null)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setTimeout(() => {
              localStorage.removeItem("resetToken");
              dispatch(setLoginModalState());
            }, 500);
          }
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  return resetPasswordModalState ? (
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
                <h4 className="text-2xl font-bold item-center">Reset</h4>
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
                <span className="text-gray-500">Enter new password.</span>
              </div>

              <form className="py-5" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-4">
                  <input
                    {...formik.getFieldProps("password")}
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="New Password*"
                  />
                  <input
                    {...formik.getFieldProps("confirm_pwd")}
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="Confirm Password*"
                  />
                  <button className={styles.btn} type="submit">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ResetPassword;
