const getJwtToken = async (email) => {
  const res = await fetch(
    `https://resell-shop-server-sujoy-kumar-das.vercel.app/jwt?email=${email}`
  );
  const data = await res.json();
  if (data.jwt_secret) {
    localStorage.setItem("Access_Token", data.jwt_secret);
  }
};

export default getJwtToken;
