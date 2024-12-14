import React, { useEffect, useRef, useState } from 'react'
import BookService from '../services/BookService'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export const DisplayBooks = () => {
    console.log("Application rendered..")
    const navigate=useNavigate()
    //const[variable name,settermethod]=useStte(initialvalue of var)
    const [books, setBooks] = useState([])
    const[deleteStatus,setdeleteStatus]=useState([false])
    const [error,setError]=React.useState("")
    const errorRef=useRef()
    const {auth}= useAuth();
    const token=auth.token;
    //componentDidMount & componentDidUpdate

    const deleteBook=(isbn)=>{
        console.log("Employee id received in event handler"+isbn)
        BookService.deleteByIsbn(isbn,token).then((response)=>{

            console.log("data received from deleteByIsbn()" + JSON.stringify(response.data))
            navigate('/display')
            setdeleteStatus(!deleteStatus)

        }).catch((error)=>{
            if(error.response?.status===403){
                 console.log("error 403 occured")
                setError("You cannot delete the book")
            }
            else{
                setError("No Server Response")
            }

        })
    }
    //useEffect(arrowFunction, dependencyarray)
    useEffect(() => {
        console.log("useeffect fired")
        BookService.getAllBooks(token).then((response) => {
            console.log("data received from getAllBooks()" + JSON.stringify(response.data))
            console.log("type of data received from getAllBooks()" + typeof response.data)
            //setBooks(response.data)
            setBooks(JSON.parse(response.data))

        }).catch((error) => {

            console.log(error);

        }).finally(() => {

            // always executed

        });
    }, [deleteStatus])

    return (
        <div className='container'>
            <h2 className='text-center'>Book Data</h2>
            <p ref={errorRef} className={error?'errmsg':'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <table className="table  table-border table-striped">
                <thead>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {books.map((book, key) =>
                        <tr key={book.isbn}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>
                                <Link className='btn btn-info' to={`/edit-book/`+book.isbn} >Update</Link>
                                </td>
                                <td>
                                <button onClick={()=>{deleteBook(book.isbn)}} className='btn btn-danger'>Delete</button>
                                </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}
