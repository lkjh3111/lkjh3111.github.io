import React, { useState } from "react";
import TheNav from "./components/Header/TheNav";
// import TheNavbar from "./components/Header/TheNavbar";
import Sections from "./components/Sections/Sections";
import Login from "./components/Login/Login";
import CartProvider from "./components/store/CartProvider";
import TheFooter from "./components/Footer/TheFooter";
// import Swal from "sweetalert2";

const App = () => {
  //Using useState hook
  // const [loginIsShown, setLoginIsShown] = useState(false);
  //END

  //Managing the state of the cart component using useState
  // const onShowLoginHandler = () => {
  //   setLoginIsShown(true);
  // };

  // const onCloseLoginHandler = () => {
  //   setLoginIsShown(false);
  // };
  //END

  //EVent to occur on Order
  // const onOrderHandler = () => {
  //   setLoginIsShown(false);

  //   Swal.fire({
  //     title: "Successful!",
  //     text: "Your order is on the way",
  //     icon: "success",
  //   });
  // };

  //END

  //Rendering the cart and all the sections
  return (
    <CartProvider>
      {/* {loginIsShown && <Login onLogin={onCloseLoginHandler} />}
      <TheNav onShowLogin={onShowLoginHandler} /> */}
      <TheNav />
      <Sections />
      <TheFooter />
    </CartProvider>
  );
  //END
};

export default App;
