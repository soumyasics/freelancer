
const getDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("freelancerData")) || null;
  if (data && data.userId) {
    let loggedInObj = {
      isUserLoggedIn: true,
      userId: data.userId,
      userType: data.userType,
      userData: data.userData,
    };

    return loggedInObj;
  }
  return null;
};



export { getDataFromLocalStorage };
