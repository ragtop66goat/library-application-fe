import {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import SpinnerLoading from "../utils/SpinnerLoading";

export default function BookCheckoutPage(){

  const [bok, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState(null);

  const bookId = (window.location.pathname).split('/')[2];

  useEffect(()=>{
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(baseUrl);
      if(!response.ok) throw new Error('Something went wrong fetching the book');
      const responseJson = await response.json();

      const loadedBook: BookModel =
      {
          id: responseJson.id,
          title: responseJson.title,
          author: responseJson.author,
          description: responseJson.description,
          copies: responseJson.copies,
          copiesAvailable: responseJson.copiesAvailable,
          category: responseJson.category,
          img: responseJson.img
      }
      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  })

  if (isLoading){
    return(
      <SpinnerLoading/>
    );
  }

  if (httpError){
    return(
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
    <h3>Hi World!</h3>
    </div>
  )
}