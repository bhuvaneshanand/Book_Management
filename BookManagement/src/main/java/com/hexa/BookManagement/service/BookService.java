package com.hexa.BookManagement.service;

import java.util.List;
import com.hexa.BookManagement.dto.BookDTO;
import com.hexa.BookManagement.entities.Book;
import com.hexa.BookManagement.exception.ResourceNotFoundException;




public interface BookService {
	
	public Book createBook(BookDTO bookDtoObj);
	public Book findByBookID(Long bookId) throws ResourceNotFoundException;
	public List<Book> findAllBook() throws ResourceNotFoundException;
	public void deleteByBookId(Long bookId) throws ResourceNotFoundException;
	public Book updateBook(Long bookId, BookDTO bookDtoObj) throws ResourceNotFoundException;
	
}
