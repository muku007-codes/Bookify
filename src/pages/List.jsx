import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from '../context/Firebase';

function List() {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverpic, setCoverpic] = useState("");

    const handlesubmit = async (e) => {
      console.log("Hello");
        e.preventDefault();
        await firebase.handleCreateNewListing(name, isbnNumber, price, coverpic);
    }

  return (
    <div className="container mt-5">
    <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Book Name"
          value={name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          type="text"
          placeholder="ISBN Number"
          onChange={(e) => setIsbnNumber(e.target.value)}
          value={isbnNumber}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Choose Price</Form.Label>
        <Form.Control
          type="file"
          placeholder="Price"
          onChange={(e) => setCoverpic(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  </div>
  )
}

export default List