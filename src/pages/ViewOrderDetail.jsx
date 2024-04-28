import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

function ViewOrderDetail() {
  const firebase = useFirebase();
  const params = useParams();
  const [order, setOrder] = useState([]);  

  useEffect(() => {
    firebase.getOrders(params.bookId).then((order) => {
        setOrder(order.docs);
    }).catch((err) => {
        console.log(err);
    });
  }, []);

  return <>
    <h1>Orders</h1>

    {order.map((order)=>{
        const data = order.data();
        return (
            <div className="m-5" key={data.id}>
                <h5>Name: {data.displayName || "Demo User"}</h5>
                <h6>Quantity: {data.qty}</h6>
                <h6>Email: {data.userEmail}</h6>
                <hr />
            </div>
        )
    })}
  </>;
}

export default ViewOrderDetail;
