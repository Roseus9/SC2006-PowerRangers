import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getUserProfileView,
  updateUserProfile,
} from "../actions/userLoginActions";
import InputGroup from "react-bootstrap/InputGroup";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { username } = useParams();
  const userDetails = useSelector((state) => state.userDetails);
  const { userObj } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  var { ...success } = userUpdate;
  console.log(success);

  const [file, setFile] = useState(null);
  const [telegramHandle, setTelegramHandle] = useState(
    userObj?.profile?.telegram || ""
  );
  const [bio, setBio] = useState(userObj?.profile?.bio || "");
  const [firstName, setFirstName] = useState(userObj?.user?.name || "");
  const [newUsername, setnewUsername] = useState(userObj?.user?.username || "");
  const [email, setEmail] = useState(userObj?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewURL, setPreviewURL] = useState(userObj?.profile?.image || null);

  useEffect(() => {
    dispatch(getUserProfileView(username));
  }, [username]);

  console.log(userObj);
  useEffect(() => {
    if (userDetails.done) {
      setTelegramHandle(userObj?.profile.telegram);
      setBio(userObj?.profile?.bio);
      setFirstName(userObj?.user?.name);
      setnewUsername(userObj?.user.username);
      setPreviewURL(userObj?.profile.image);
      setEmail(userObj?.user.email);
    }
  }, [userDetails]);

  const cancelClicked = () => {
    console.log("cancel");
    navigate(`/profile/${username}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let profile = new FormData();
    profile.append("image", file);
    profile.append("telegramHandle", telegramHandle);
    profile.append("bio", bio);
    profile.append("name", firstName);
    profile.append("username", newUsername);
    profile.append("email", email);
    profile.append("password", password);
    console.log("profile", profile);

    if (!firstName.match("^[a-zA-Zs.'-,]{1,50}$")) {
      toast.error("Invalid name, name can only contain letters and spaces");
      return;
    } else if (!username.match("^[a-zA-Z0-9_-]{3,16}$")) {
      if (username.length < 3 || username.length > 16) {
        toast.error(
          "Invalid Username length, Username needs to be 3-16 characters long"
        );
        return;
      } else {
        toast.error(
          "Invalid Username, Username can only contain letters, numbers, hyphens and underscores"
        );
        return;
      } 
    } else if (!email) {
      toast.error("Email cannot be blank!");
      return;
    } else if (
      telegramHandle &&
      !telegramHandle.match("^(?=\\w{5,32}\\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$")
    ) {
      toast.error("Invalid Telegram Username. Username can only contain alphanumeric letters or underscore symbol. Minimum length of 5 is required.");
      return;
    } else if (password && !confirmPassword) {
      toast.error("Please fill in confirm password");
      return;
    } else if (password && password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else if (password && !password.match("^[a-zA-Z0-9@$!%*?&]{8,32}$")) {
      if (password.length < 8 || password.length > 32) {
        toast.error(
          "Invalid Password length, Passwords needs to be 8-32 characters long"
        );
        return;
      } else {
        toast.error(
          "Invalid Password, Password can only contain alphanumeric characters or special characters"
        );
        return;
      } 
    } else {
      dispatch(updateUserProfile(profile));
      if (success) {
        navigate(`/profile/${newUsername}`);
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Form onSubmit={submitHandler}>
        <h4>Edit Profile</h4>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "50%" }}>
            <Form.Group controlId="formFile" className="mb-3">
              <Col>
                <Form.Label>Profile Picture</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="file"
                  placeholder="Upload Photo(s)"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPreviewURL(reader.result);
                    };
                    reader.readAsDataURL(selectedFile);
                  }}
                />
              </Col>
            </Form.Group>
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                style={{ maxWidth: "100%", marginBottom: "1rem" }}
              />
            )}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                placeholder="Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setnewUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telegram Handle</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  required
                  placeholder="Telegram Handle"
                  value={telegramHandle}
                  onChange={(e) => setTelegramHandle(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Describe yourself..."
                style={{ height: "200px", marginTop: "0px" }}
                value={bio}
                defaultValue={""}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="passwordId">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPasswordId">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button
                type="submit"
                variant="secondary"
                style={{
                  backgroundColor: "#F24E1E",
                  marginRight: "8px",
                  marginTop: "5px",
                }}
              >
                Submit
              </Button>
              <Button
                onClick={cancelClicked}
                variant="outline-secondary"
                style={{ marginTop: "5px" }}
              >
                Cancel
              </Button>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;
