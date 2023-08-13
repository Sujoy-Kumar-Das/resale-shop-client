// validate image file type
export const validateImage = (file) => {
  const allowedExtantions = ["image/png", "image/jpg", "image/jpeg"];
  if (!allowedExtantions.includes(file[0].type)) {
    return "File does not support. You must use .png or .jpg or jpeg";
  } else {
    return true;
  }
};
