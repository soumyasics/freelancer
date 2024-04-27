import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
const useLocalStorage = () => {
  const dispatch = useDispatch();
  const getDataFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("freelancerData")) || null;
    if (data && data.userId) {
      return {
        isUserLoggedIn: true,
        userId: data.userId,
        userType: data.userType,
        userData: data.userData,
      };
    }
    return null;
  };

  const setDataToRedux = () => {
    const loggedInData = getDataFromLocalStorage();
    if (loggedInData) {
      dispatch(loginSuccess(loggedInData));
    }
  };

  useEffect(() => {
    setDataToRedux();
  }, [dispatch]);

  return {
    setDataToRedux,
    getDataFromLocalStorage,
  };
};

export default useLocalStorage;