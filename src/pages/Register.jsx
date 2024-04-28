import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

function Register() {
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(null);


  const handlesubmit = async (e) =>{
    e.preventDefault();
    console.log("Signin up a user...")
    const result = await firebase.signupUserWithEmailAndPassword(email, password);
    console.log("Successful", result);
  }

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
          <Form.Control type="email" placeholder="Enter email" onChange={(e) =>setEmail(e.target.value)} value={email}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)} value={password}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default Register;
