import TheNavbar from "./Header/TheNavbar";
import Sections from "./Sections/Sections";
import TheFooter from "./Footer/TheFooter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const LandingPage = () => {
  return (
    <>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick
        theme="colored"
      />
      <TheNavbar />
      <Sections />
      <TheFooter />
    </>
  );
};

export default LandingPage;
