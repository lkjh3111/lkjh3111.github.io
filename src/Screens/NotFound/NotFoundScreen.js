import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/test.svg";

const NotFoundScreen = () => (
  <div className='full-height flex flex-column flex-center'>
    <div className='logo-404'>
      <img src={Logo} alt='158 Forex Trading' draggable='false' />
      <span>158 Forex Trading</span>
    </div>
    <h1 className='title-404'>404</h1>
    <p className='paragraph-404'>Page Not Found</p>
    <Link to='/' className='button button-purple button-medium'>
      Back to home page
    </Link>
  </div>
);

export default NotFoundScreen;
