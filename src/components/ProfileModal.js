import React from "react";
import avatar from "../assests/profile.png";
import styles from "../styles/Username.module.css";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { setCloseBtn, setUpdateProfileState } from "../utils/modalStateSlice";
import { setLogout } from "../utils/loginDataSlice";

const ProfileModal = () => {
  const profileModalState = useSelector(
    (store) => store.modalState.profileModalState
  );
  const userData = useSelector((store) => store.loginData.userData);

  const dispatch = useDispatch();
  const closeBtnHandler = () => {
    dispatch(setCloseBtn());
  };

  const updatehandler = () => {
    dispatch(setUpdateProfileState());
  };
  const logoutHandler = () => {
    dispatch(setLogout());
    dispatch(setCloseBtn());
  };

  return profileModalState ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen">
            <div
              className={styles.glass}
              style={{ width: "45%", paddingTop: "1em" }}
            >
              <div className="title flex flex-row justify-between items-center">
                <h4 className="text-2xl font-bold item-center">Profile</h4>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeBtnHandler}
                >
                  Close
                </button>
              </div>
              <div className="profile flex justify-center py-1">
                <label htmlFor="profile">
                  <img
                    src={`${userData?.user?.profileImg}` || `${avatar}`}
                    className={styles.profile_img}
                    alt="avatar"
                  />
                </label>
              </div>

              <div className="textbox flex flex-col items-center gap-2">
                <div className="text-center py-2">
                  <span className="text-gray-500">
                    Name{" : "}
                    <span className="text-blue-500" s>
                      {userData?.user?.firstName} {userData?.user?.lastName}
                    </span>
                  </span>
                </div>

                <div className="text-center py-2">
                  <span className="text-gray-500">
                    Email{" : "}
                    <span className="text-blue-500">
                      {userData?.user?.email}
                    </span>
                  </span>
                </div>
                <div className="text-center py-2">
                  <span className="text-gray-500">
                    Phone{" : "}
                    <span className="text-blue-500">
                      {userData?.user?.mobile}
                    </span>
                  </span>
                </div>

                <div className="text-center py-2">
                  <span className="text-gray-500">
                    Update Profile?{" "}
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={updatehandler}
                    >
                      Update
                    </span>
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500">
                    Logout?{" "}
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={logoutHandler}
                    >
                      Logout Now
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ProfileModal;
