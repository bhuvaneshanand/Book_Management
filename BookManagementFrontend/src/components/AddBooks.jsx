import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import BookService from '../services/BookService';
import { Link, useNavigate, useParams } from 'react-router-dom';

function AddBooks() {

    const[title,setTitle]=React.useState('');
    const[author,setAuthor]=React.useState('');
    const[year,setYear]=React.useState('');
    const navigate=useNavigate();
    const{isbn}=useParams();
    const changeTitle=()=>{
      if(isbn){
        return  <h2 className='text-center'>Update Book record</h2>
      }
      else{
        return  <h2 className='text-center'>Add Book record</h2>
      }
    }
    useEffect(()=>{
      console.log("useEffect fired....")
      if(isbn){
        console.log("isbn received from url"+isbn)
        BookService.findByIsbn(isbn).then((response=>{
          console.log("Response from findbyIsbn() api"+JSON.stringify(response.data))
          setTitle(response.data.title)
          setAuthor(response.data.author)
          setYear(response.data.year)
        }))}
    },[])

    const saveorupdateBook=(e)=>{
        console.log("saveBook() Triggered")
        e.preventDefault();
        const bookObj={title,author,year}
       //const obj= {'title':title,'author':author,'year':year}
       console.log("Book object received from the form:" +JSON.stringify(bookObj))
       if(isbn){
        console.log("isbn received from url"+isbn)
        BookService.updateBook(bookObj,isbn).then((response=>{
          console.log("Response from findbyIsbn() api"+JSON.stringify(response.data))
          setTitle(response.data.title)
          setAuthor(response.data.author)
          setYear(response.data.year)
          navigate('/display')
        })
      ).catch((error)=>{
        console.log("Error from findbyIsb"+error)
      })}
        else{
       BookService.saveBook(bookObj).then(
        (response)=>{
            console.log("Data received from saveBook()"+response.data)
            navigate('/display')
        }
       ).catch((error)=>{
        console.log("Error from Api "+error)
      })
    }
  }
  
  return (
    <div>
       
    <Form>
      {changeTitle()}
      <Row>
        <Form.Label column lg={2}>
        Title
        </Form.Label>
        <Col>
          <Form.Control type="text"  value={title}  onChange={(e)=>{setTitle(e.target.value)}} placeholder="Enter title of book" />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2}>
        Author
        </Form.Label>
        <Col>
          <Form.Control type="text"  value={author} onChange={(e)=>{setAuthor(e.target.value)}}ange placeholder="Enter name of author" />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2}>
        Year
        </Form.Label>
        <Col>
          <Form.Control type="text"  value={year} onChange={(e)=>{setYear(e.target.value)}} placeholder="Enter the year" />
        </Col>
      </Row>
      <Button onClick={(e)=>saveorupdateBook(e)}>
        Submit
      </Button>
      &nbsp; &nbsp; &nbsp; &nbsp; <Link to='/display' className='btn btn-danger'>Cancel</Link>
      </Form>
      </div>
  );
}

export default AddBooks;
