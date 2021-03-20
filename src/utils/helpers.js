import { useEffect } from "react";

export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, ref]);
};

export const useKeyPress = (keyCode, callback) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === keyCode) {
        // console.log("Preferred key is pressed!");
        callback();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback, keyCode]);
};
