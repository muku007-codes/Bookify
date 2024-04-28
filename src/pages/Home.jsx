import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import CardComponent from "../components/Card";
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';


function Home() {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => {
    //   const booksData = books.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
      setBooks(books.docs);
    });
  }, [firebase]);

  useEffect(()=>{
    console.log(books);
  },[books])

  return (
    <>
      <div className="container mt-5">
      <CardGroup>
        {books.length > 0 ? (
          books.map((book) => (
            <CardComponent link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>
          ))
        ) : (
            <Spinner animation="border" variant="info" />
        )}
        </CardGroup>
      </div>
    </>
  );
}

export default Home;
