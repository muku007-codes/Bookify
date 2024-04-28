import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";


function CardComponent(props) {

    const firebase = useFirebase();
    const [url, setUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then((url) => setUrl(url));
    },[])

    console.log(props.price);

  return (
    <Card style={{ width: "18rem" }} key={props.id}>
      <Card.Img variant="top" src={url}/>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.displayName}</Card.Text>
        <Card.Text>{props.price}</Card.Text>
        <Button variant="primary" onClick={()=> navigate(props.link)}>View</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
