import React from "react";

function MenuItems({ Icon, item }) {
  return (
    <div className="flex m-2 mb-5">
      <Icon className="h-6 w-6 mr-4" />
      <h3 className="text-lg">{item}</h3>
    </div>
  );
}

export default MenuItems;
