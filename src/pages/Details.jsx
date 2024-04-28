import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BookDetails() {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [num, setNum] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      firebase.getImageURL(data.imageURL).then((url) => setURL(url));
    }
  }, [data]);

  function placeOrder(){
    console.table([params.bookId, num]);
    const result = firebase.placeOrder(params.bookId, num);
    console.log("order", result);
  }

  if (data == null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img src={url} style={{ width: "400px" }} alt="" />
      <br />
      <h1>Details</h1>
      <p>Price: {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName || "Anoymous User"}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          onChange={(e) => setNum(e.target.value)}
          value={num}
          min={1}
        />
      </Form.Group>
      <Button onClick={placeOrder} variant="success" type="submit">
        Buy Now
      </Button>
    </div>
  );
}

export default BookDetails;
