import { useState } from "react";
import { register } from "../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState();
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        address,
        password,
      };
      register(newUser).then((user) => {
        if (user) {
          setLoggedInUser(user);
          navigate("/");
        } else {
          setRegistrationFailure(true);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 flex justify-center items-start" style={{ backgroundImage: `url('./bgphoto3.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="p-10 mt-20 bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-md shadow-md max-w-md w-full opacity-95">
        <h3 className="text-white">Sign Up</h3>
        <FormGroup>
          <Label className="text-white">First Name</Label>
          <Input
            className="hover:bg-slate-200"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>

          <Label className="text-white">Last Name</Label>
          <Input
            className="hover:bg-slate-200"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

        </FormGroup>
        <FormGroup>
          <Label className="text-white">Email</Label>
          <Input
            className="hover:bg-slate-200"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label className="text-white" >User Name</Label>
          <Input
            className="hover:bg-slate-200"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

        </FormGroup>
        <FormGroup>
          <Label className="text-white">Address</Label>
          <Input
            className="hover:bg-slate-200"
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

        </FormGroup>
        <FormGroup>
          <Label className="text-white">Password</Label>
          <Input
            className="hover:bg-slate-200"
            invalid={passwordMismatch}
            type="password"
            value={password}
            onChange={(e) => {
              setPasswordMismatch(false);
              setPassword(e.target.value);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label className="text-white"> Confirm Password</Label>
          <Input
            className="hover:bg-slate-200"
            invalid={passwordMismatch}
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setPasswordMismatch(false);
              setConfirmPassword(e.target.value);
            }}
          />
          <FormFeedback>Passwords do not match!</FormFeedback>
        </FormGroup>
        <p style={{ color: "red" }} hidden={!registrationFailure}>
          Registration Failure
        </p>
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={passwordMismatch}
          className="mt-2 mb-3 mx-auto block"
        >
          Register
        </Button>
        <p className="text-white">
          Already signed up? Log in <Link to="/login" className="text-white">here</Link>
        </p>
      </div>
    </div>
  );
}
