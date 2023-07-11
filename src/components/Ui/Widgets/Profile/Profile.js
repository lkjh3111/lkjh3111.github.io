import { memo, useEffect, useState } from "react";
import AuthService from "../../../../services/AuthService";

import Box from "../../Common/Box";
import Image from "../../../../assets/image/blank-profile.png";
import UserService from "../../../../services/UserService";
import { toast } from "react-toastify";

const Profile = memo(() => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const user = AuthService.getCurrentUser();
  const name = user.firstName + " " + user.lastName;
  const id = user.id;
  // const [menuOpened, setMenuOpened] = useState(false);

  // const handleMenuOpen = () => {
  //   setMenuOpened(!menuOpened);
  // };

  useEffect(() => {
    UserService.getImage(id).then((response) => {
      setPreview("data:image/jpeg;base64," + response.image);
    });
  }, [preview]);

  const successNotification = (e) => toast.success(e);
  const failNotification = (e) => toast.error(e);

  const onClick = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      // setPreview(URL.createObjectURL(img));
      setImage(img);
      handleUpload(img);
    }
  };

  const handleUpload = (img) => {
    UserService.uploadImage(id, img).then(
      (response) => {
        successNotification(response);
        window.location.reload();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.result) ||
          error.result ||
          error.toString();
        failNotification(message);
      }
    );
  };

  return (
    <Box>
      <div className="box-title box-vertical-padding box-horizontal-padding no-select">
        <div className="flex flex-center flex-space-between">
          <p>My Profile</p>
          {/* <button
            type="button"
            className="box-icon pointer"
            onClick={() => handleMenuOpen()}
          >
            <i className="material-icons">more_vert</i>
          </button>

          {menuOpened && (
            <div className="box-dropdown">
              <ul>
                <li>
                  <button type="button">
                    <i className="material-icons">settings</i>
                    Button 1
                  </button>
                </li>
                <li>
                  <button type="button">
                    <i className="material-icons">favorite</i>
                    Button 2
                  </button>
                </li>
                <li>
                  <button type="button">
                    <i className="material-icons">info</i>
                    Button 3
                  </button>
                </li>
              </ul>
            </div>
          )} */}
        </div>
      </div>
      <div className="widget-profile box-content box-content-height-nobutton">
        <div className="center">
          <form className="upload no-select" noValidate>
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpg, .jpeg"
              onChange={onClick}
            />
            {/* <input accept="image/*" type="file" onChange={onClick} /> */}
            <label htmlFor="file">
              {/* <div
                className="icon cover pointer"
                style={{
                  backgroundImage: { preview },
                }}
              /> */}
              <img
                className="icon cover pointer"
                src={preview}
                alt="User avatar"
              />
              <div className="edit pointer">
                <i className="material-icons">edit</i>
              </div>
            </label>
          </form>
        </div>
        <div className="box-horizontal-padding">
          <div className="center">
            <h3>{name}</h3>
            <strong>ID: {id}</strong>
            {/* <strong>Level 1</strong> */}
            {/* <p>You must be level 2 to increase your limits.</p> */}
            {/* <Link to='/members/application'>Level 2 application</Link> */}
          </div>
        </div>
      </div>
    </Box>
  );
});

export default Profile;
