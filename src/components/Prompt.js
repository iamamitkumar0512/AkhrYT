import React, { useEffect } from "react";
import { useState } from "react";

const Prompt = () => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("firstTime")) {
      setShowModal(false);
    } else {
      localStorage.setItem("firstTime", true);
    }
  }, []);

  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Reminder 🙃</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Sorry for disturbance 🥲.But as I am using Googel API for
                fetching data, I would request you all to download "Allow CORS"
                extesion and trun it on for better experience.
              </p>
              <p>
                <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf">
                  Download
                </a>
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};

export default Prompt;
