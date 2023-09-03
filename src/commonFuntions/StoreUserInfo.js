import { toast } from "react-hot-toast";

const storeUserInfo = async (userInfo) => {
  const res = fetch(
    `https://resell-shop-server-sujoy-kumar-das.vercel.app/store/user/info?email=${userInfo.email}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("Access_Token")}`,
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
