import React from "react";
import styles from "../styles/Username.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { requestAPI } from "../utils/connectionApi";
import { feedbackValidation } from "../utils/validate";
import avatar from "../assests/profile.png";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      feedback: "",
    },
    validate: feedbackValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      requestAPI("POST", "/feedback", values, null)
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
          toast.success("Feedbck submitted");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div
            className={styles.glass}
            style={{ width: "45%", paddingTop: "1em" }}
          >
            <div className="title flex items-center">
              <h4 className="text-2xl font-bold item-center">Feedback</h4>
            </div>
            <div className="profile flex justify-center py-1">
              <img src={avatar} className={styles.lgprofile_img} alt="avatar" />
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
                  {...formik.getFieldProps("feedback")}
                  className={styles.lgtextbox}
                  type="text"
                  placeholder="Feedback*"
                />
                <button className={styles.btn} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
