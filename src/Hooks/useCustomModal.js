import { useState } from "react";

export const useCustomModal = () => {
  const [show, setShow] = useState(false);
  //   const toggleShow = (val) => setShow(val);

  return {
    show,
    setShow,
  };
};
