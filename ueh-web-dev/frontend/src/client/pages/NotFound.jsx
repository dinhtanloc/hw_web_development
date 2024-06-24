import React from "react";
import {Pagination} from "@nextui-org/react";

const NotFound = () => {
  return <div>NotFound
        <Pagination showShadow color="warning" total={10} initialPage={1} />
  </div>;
};

export default NotFound;


