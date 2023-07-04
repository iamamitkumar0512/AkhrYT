import React from "react";
import styles from "../styles/Username.module.css";
import { Link } from "react-router-dom";
import avatar from "../assests/profile.png";
import { useSelector } from "react-redux";
import store from "../utils/store";
import {
  setCloseBtn,
  setRegisterModalState,
  setResetEmailState,
} from "../utils/modalStateSlice";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { signInValidation } from "../utils/validate";
import { requestAPI } from "../utils/connectionApi";
import { setUserData, setIsLoggedIn } from "../utils/loginDataSlice";

const SignInModal = () => {
  const signInModalState = useSelector(
    (store) => store.modalState.loginModalState
  );
  const dispatch = useDispatch();
  const closeBtnHandler = () => {
    dispatch(setCloseBtn());
  };
  const registerHandler = () => {
    dispatch(setRegisterModalState());
  };
  const resetEmailHandler = () => {
    dispatch(setResetEmailState());
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: signInValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      requestAPI("POST", "/login", values, null)
        .then((res) => {
          localStorage.setItem("authToken", res.data.token);
          if (res.status === 200) {
            setTimeout(() => {
              dispatch(setUserData(res.data));
              dispatch(setIsLoggedIn());
              closeBtnHandler();
            }, 500);
          }
          toast.success("Login sucessfully ");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  return signInModalState ? (
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
                <h4 className="text-2xl font-bold item-center">Login</h4>
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

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-6">
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="Email*"
                  />

                  <input
                    {...formik.getFieldProps("password")}
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="Password*"
                  />
                  <button className={styles.btn} type="submit">
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center py-2">
                <span className="text-gray-500">
                  Forget Password?{" "}
                  <Link className="text-red-500" onClick={resetEmailHandler}>
                    Reset Password
                  </Link>
                </span>
              </div>
              <div className="text-center py-1">
                <span className="text-gray-500">
                  New User?{" "}
                  <Link className="text-red-500" onClick={registerHandler}>
                    Register
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default SignInModal;
