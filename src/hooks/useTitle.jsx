import { useEffect } from "react";

const useTitle = ({ title }) => {
  useEffect(() => {
    document.title(`${title} || resale station`);
  }, [title]);
};

export default useTitle;
