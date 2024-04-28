import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

function LoginPage() {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(null);

  console.log(firebase.isLoggedIn);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("Login a user...");
    const result = await firebase.signinWithEmailAndPassword(email, password);
    console.log("Successful", result);
  };

  useEffect(()=>{
    if(firebase.isLoggedIn){
      navigate('/');
    }
  },[firebase, navigate])

  return (
    <div className="container mt-5">
      <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
      <p className="mt-3 mb-3">OR</p>
      <Button
        onClick={firebase.signinWithGoogle}
        variant="danger"
        type="submit"
      >
        Sign In with Google
      </Button>
    </div>
  );
}

export default LoginPage;
