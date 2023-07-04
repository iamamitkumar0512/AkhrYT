import React from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/Username.module.css";
import { setLoginModalState } from "../utils/modalStateSlice";

const OptionsPageTemp = ({ Icon, text1, text2 }) => {
  const dispatch = useDispatch();
  const loginHandler = () => {
    dispatch(setLoginModalState());
  };
  return (
    <div className="container mx-auto">
      <div className="profile flex justify-center py-5">
        <Icon className="h-24 w-24 mr-4" />
      </div>
      <div className="profile flex  justify-center py-1">
        <h1>{text1}</h1>
      </div>
      <div className="profile flex justify-center  py-1">
        <p>
          {text2}{" "}
          <span className="text-blue-800 cursor-pointer" onClick={loginHandler}>
            SignIn
          </span>
        </p>
      </div>
    </div>
  );
};

export default OptionsPageTemp;
