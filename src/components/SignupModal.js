import React from "react";
import { useState } from "react";
import avatar from "../assests/profile.png";
import styles from "../styles/Username.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import convertToBase64 from "../utils/convert";
import { registerValidation } from "../utils/validate";
import { requestAPI } from "../utils/connectionApi";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { setCloseBtn, setLoginModalState } from "../utils/modalStateSlice";

const SignupModal = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const closeBtnHandler = () => {
    dispatch(setCloseBtn());
  };

  const loginHandler = () => {
    dispatch(setLoginModalState());
  };
  const registerModalState = useSelector(
    (store) => store.modalState.registerModalState
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profileImg: file || "" });

      requestAPI("POST", "/register", values, null)
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              loginHandler();
            }, 500);
          }
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    },
  });

  const onUpload = async (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpg"
    ) {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    } else {
      toast.error("we support jpg,png,jpeg format only");
      setFile(avatar);
    }
  };

  return registerModalState ? (
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
                <h4 className="text-2xl font-bold item-center">Register</h4>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeBtnHandler}
                >
                  Close
                </button>
              </div>

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-1">
                  <label htmlFor="profile">
                    <img
                      src={file || avatar}
                      className={styles.profile_img}
                      alt="avatar"
                    />
                  </label>

                  <input
                    type="file"
                    onChange={onUpload}
                    id="profile"
                    name="profile"
                  />
                </div>

                <div className="textbox flex flex-col items-center gap-2">
                  <input
                    {...formik.getFieldProps("firstName")}
                    className={styles.textbox}
                    type="text"
                    placeholder="First Name*"
                  />
                  <input
                    {...formik.getFieldProps("lastName")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Last Name*"
                  />
                  <input
                    {...formik.getFieldProps("mobile")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Phone Number*"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Email*"
                  />

                  <input
                    {...formik.getFieldProps("password")}
                    className={styles.textbox}
                    type="password"
                    placeholder="Password*"
                  />
                  <button className={styles.btn} type="submit">
                    Register
                  </button>
                </div>
              </form>
              <div className="text-center py-2">
                <span className="text-gray-500">
                  Already Register?{" "}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={loginHandler}
                  >
                    Login Now
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

export default SignupModal;
