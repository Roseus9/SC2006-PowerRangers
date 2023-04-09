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
import { getUserProfileView, updateUserProfile } from "../actions/userLoginActions";
import InputGroup from 'react-bootstrap/InputGroup';


function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { username } = useParams();
  const userDetails = useSelector(state => state.userDetails);
  const {userObj} = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  var{ ...success } = userUpdate;
  console.log(success)

  const [file, setFile] = useState();
  const [telegramHandle, setTelegramHandle] = useState(userObj?.profile?.telegram || '');
  const [bio, setBio] = useState(userObj?.profile?.bio || '');
  const [firstName, setFirstName] = useState(userObj?.user?.name || '');
  const [newUsername, setnewUsername] = useState(userObj?.user?.username || '');
  const [email, setEmail] = useState(userObj?.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [previewURL, setPreviewURL] = useState(userObj?.profile?.image || null);
  
  useEffect(() => {
    dispatch(getUserProfileView(username));
  }, [username])

  console.log(userObj)
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

    if(!firstName){
        toast.error("Name cannot be blank!")
      }
      else if (!newUsername){
        toast.error("Username cannot be blank!")
      } else if(!email){
        toast.error("Email cannot be blank!")
      } else if(telegramHandle && !telegramHandle.match("^(?=\\w{5,32}\\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$")) {
        toast.error("Invalid Telegram Username")
      }else if(password && !confirmPassword){
        toast.error("Please fill in confirm password")
      }else if(password && (password != confirmPassword)){
        toast.error("Passwords do not match")
      }
        else {
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
                placeholder="Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setnewUsername(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
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
                defaultValue={''}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </Form.Group>

          <Form.Group className="mb-3" controlId = 'passwordId'>
            <Form.Label>
                Password
            </Form.Label>
            <Form.Control
                type = 'password'
                placeholder='Enter new password'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId = 'confirmPasswordId'>
            <Form.Label>
                Confirm Password
            </Form.Label>
            <Form.Control
                type='password'
                placeholder='Confirm Password'
                value = {confirmPassword}
                onChange = {(e) => setConfirmPassword(e.target.value)}
            >
            </Form.Control>
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
