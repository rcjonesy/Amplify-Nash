import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 flex justify-center items-start" style={{ backgroundImage: `url('./bgphoto3.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="p-10 mt-20 bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-md shadow-md max-w-md w-full opacity-95">
        <h3 className="text-2xl mb-5 text-center font-bold text-white">Login</h3>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className="text-white">Email</Label>
            <Input
              className="hover:bg-slate-200"
              invalid={failedLogin}
              type="text"
              value={email}
              onChange={(e) => {
                setFailedLogin(false);
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-white">Password</Label>
            <Input
              className="hover:bg-blue-200"
              invalid={failedLogin}
              type="password"
              value={password}
              onChange={(e) => {
                setFailedLogin(false);
                setPassword(e.target.value);
              }}
            />
            {failedLogin && <FormFeedback>Login failed.</FormFeedback>}
          </FormGroup>

          <Button color="primary" className="w-full mt-5">
            Login
          </Button>
        </form>
        <p className="mt-3 text-center text-white">
          Not signed up? <Link to="/register" className="text-white">Register here</Link>
        </p>
      </div>
    </div>
  );
}
