import React from "react";
import avatar from "../assests/profile.png";
import styles from "../styles/Username.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCloseBtn,
  setRegisterModalState,
  setLoginModalState,
  setResetOtpState,
} from "../utils/modalStateSlice";
import { toast, Toaster } from "react-hot-toast";
import { requestAPI } from "../utils/connectionApi";
import { useFormik } from "formik";
import { resetEmailValidation } from "../utils/validate";

const ResetEmail = () => {
  const resetEmailModalState = useSelector(
    (store) => store.modalState.resetEmailState
  );

  const dispatch = useDispatch();

  const closeBtnHandler = () => {
    dispatch(setCloseBtn());
  };

  const registerHandler = () => {
    dispatch(setRegisterModalState());
  };

  const loginHandler = () => {
    dispatch(setLoginModalState());
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: resetEmailValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      requestAPI("POST", "/resetPassword", values, null)
        .then((res) => {
          localStorage.setItem("resetEmail", values.email);
          localStorage.setItem("otpToken", res.data.token);
          if (res.status === 200) {
            setTimeout(() => {
              dispatch(setResetOtpState());
            }, 500);
          }
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  return resetEmailModalState ? (
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
                <span className="text-gray-500">
                  Please enter your registered Email
                </span>
              </div>

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-6">
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="Email*"
                  />

                  <button className={styles.btn} type="submit">
                    Send Otp
                  </button>
                </div>
              </form>
              <div className="text-center py-3">
                <span className="text-gray-500">
                  Already Registered?{" "}
                  <span className="text-red-500" onClick={loginHandler}>
                    Login
                  </span>
                </span>
              </div>
              <div className="text-center py-1">
                <span className="text-gray-500">
                  New User?{" "}
                  <span className="text-red-500" onClick={registerHandler}>
                    Register
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

export default ResetEmail;
