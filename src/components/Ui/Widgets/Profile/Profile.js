import { memo, useEffect, useState } from "react";
import AuthService from "../../../../services/AuthService";

import Box from "../../Common/Box";
import Image from "../../../../assets/image/blank-profile.png";
import UserService from "../../../../services/UserService";
import { toast } from "react-toastify";

const Profile = memo(() => {
  const [preview, setPreview] = useState(null);
  const user = AuthService.getCurrentUser();
  const name = user.firstName + " " + user.lastName;
  const id = user.id;

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
            <label htmlFor="file">
              <img
                className="icon cover pointer"
                src={preview ? preview : Image}
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
