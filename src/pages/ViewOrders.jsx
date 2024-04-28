import React, { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useState } from "react";
import CardComponent from "../components/Card";

function ViewOrders() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.user)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
  }, [firebase]);

  if (!firebase.isLoggedIn) {
    return <h1>Please Log In</h1>;
  }

  console.log(books);

  return (
    <div>
      {books.map((book) => (
        <CardComponent key={book.id} id={book.id} {...book.data()} link={`/book/orders/${book.id}`}/>
      ))}
    </div>
  );
}

export default ViewOrders;
