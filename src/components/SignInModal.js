import React from "react";
import { useState } from "react";
import styles from "../styles/Username.module.css";
import { Link } from "react-router-dom";
import avatar from "../assests/profile.png";

const SignInModal = () => {
  const [showModal, setShowModal] = useState(true);

  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
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
                  onClick={() => setShowModal(false)}
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

              <form className="py-1">
                <div className="textbox flex flex-col items-center gap-6">
                  <input
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="Email*"
                  />

                  <input
                    className={styles.lgtextbox}
                    type="text"
                    placeholder="Password*"
                  />
                  <button className={styles.btn} type="submit">
                    Login
                  </button>
                </div>

                <div className="text-center py-2">
                  <span className="text-gray-500">
                    Forget Password?{" "}
                    <Link className="text-red-500" to="/">
                      Reset Password
                    </Link>
                  </span>
                </div>
                <div className="text-center py-1">
                  <span className="text-gray-500">
                    New User?{" "}
                    <Link className="text-red-500" to="/">
                      Register
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default SignInModal;
