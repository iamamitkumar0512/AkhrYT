import React from "react";
import { useState } from "react";
import avatar from "../assests/profile.png";

import styles from "../styles/Username.module.css";
import { Link } from "react-router-dom";

const SignupModal = () => {
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
                <h4 className="text-2xl font-bold item-center">Register</h4>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>

              <form className="py-1">
                <div className="profile flex justify-center py-1">
                  <label htmlFor="profile">
                    <img
                      src={avatar}
                      className={styles.profile_img}
                      alt="avatar"
                    />
                  </label>

                  <input type="file" id="profile" name="profile" />
                </div>

                <div className="textbox flex flex-col items-center gap-2">
                  <input
                    className={styles.textbox}
                    type="text"
                    placeholder="First Name*"
                  />
                  <input
                    className={styles.textbox}
                    type="text"
                    placeholder="Last Name*"
                  />
                  <input
                    className={styles.textbox}
                    type="text"
                    placeholder="Phone Number"
                  />
                  <input
                    className={styles.textbox}
                    type="text"
                    placeholder="Email*"
                  />

                  <input
                    className={styles.textbox}
                    type="text"
                    placeholder="Password*"
                  />
                  <button className={styles.btn} type="submit">
                    Register
                  </button>
                </div>

                <div className="text-center py-4">
                  <span className="text-gray-500">
                    Already Register?{" "}
                    <Link className="text-red-500" to="/">
                      Login Now
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

export default SignupModal;
