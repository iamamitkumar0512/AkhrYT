import React from "react";
import { useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionPage = () => {
  const subscribeArray = useSelector(
    (store) => store.subscription.subscriptionArray
  );
  return (
    <div className="m-2 p-2 ml-14">
      <h2 className="font-bold">Subscription</h2>
      <br></br>
      {subscribeArray.length > 0 ? (
        subscribeArray?.map((id) => {
          return <SubscriptionCard id={id} key={id} />;
        })
      ) : (
        <h1 className="font-medium px-96">
          This list has no subscribed channel
        </h1>
      )}
    </div>
  );
};

export default SubscriptionPage;
