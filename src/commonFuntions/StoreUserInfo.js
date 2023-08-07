import { toast } from "react-hot-toast";

const storeUserInfo = async (userInfo) => {
  const res = fetch(
    `http://localhost:5000/store/user/info?email=${userInfo.email}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }
  );
  const data = await (await res).json();
  if (data.success) {
    toast.success(`Wellcome ${userInfo.name} in our family`);
  }
};

export default storeUserInfo;
