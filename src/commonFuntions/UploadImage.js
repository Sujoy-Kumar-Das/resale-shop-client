import { toast } from "react-hot-toast";

const uploadImage = async (image, errors) => {
  const imageFile = image[0];
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_REACT_APP_imgApi_key
    }`,
    {
      method: "POST",
      body: formData,
    }
  );
  const imageData = await res.json();
  if (imageData.success) {
    return imageData.data.display_url;
  } else {
    toast.error(`${errors?.image?.message}`);
  }
};

export default uploadImage;
