import React, { useContext } from "react";
import { AuthContextProvider } from "../../../contexts/authContext/AuthContext";
import { toast } from "react-hot-toast";
import storeUserInfo from "../../../commonFuntions/StoreUserInfo";

const Social = ({ children }) => {
  // auth context
  const { singUpWithGoogle, singUpWithGithub } =
    useContext(AuthContextProvider);

  // handle google singup
  const handleGoogleSingup = () => {
    singUpWithGoogle()
      .then((result) => {
        const user = result.user;
        // toast.success(`Wellcome ${user?.displayName} in our family`);
        const userData = {
          name: user.displayName,
          email: user.email,
          role: "buyer",
        };
        storeUserInfo(userData);
      })
      .catch((error) => console.log(error));
  };
  // handle github singup
  const handleGithubSingup = () => {
    singUpWithGithub()
      .then((result) => {
        const user = result.user;
        toast.success(`Wellcome ${user?.displayName} in our family`);
        console.log(user)
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <button onClick={handleGoogleSingup} className=" btn btn-outline w-full">
        {children} WITH GOOGLE
      </button>
      <button
        onClick={handleGithubSingup}
        className=" btn btn-outline w-full mt-3"
      >
        {children} WITH Github
      </button>
    </>
  );
};

export default Social;
