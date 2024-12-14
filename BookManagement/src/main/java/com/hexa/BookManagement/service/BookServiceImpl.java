package com.hexa.BookManagement.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.BookManagement.dto.BookDTO;
import com.hexa.BookManagement.entities.Book;
import com.hexa.BookManagement.exception.ResourceNotFoundException;
import com.hexa.BookManagement.repository.BookRepository;


@Service
public class BookServiceImpl implements BookService {
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private BookRepository bookRepository;

	@Override
	public Book createBook(BookDTO bookDtoObj) {
		Book addBook=this.modelMapper.map(bookDtoObj, Book.class);
		return this.bookRepository.save(addBook);
	}

	@Override
	public Book findByBookID(Long bookId) throws ResourceNotFoundException {
		Book bookById=this.bookRepository.findById(bookId)
				.orElseThrow(()->new ResourceNotFoundException("Book","ID",bookId));
		
		return bookById;
	}

	@Override
	public List<Book> findAllBook() throws ResourceNotFoundException {
		List<Book> allBooks = this.bookRepository.findAll();
		return allBooks;
	}

	@Override
	public void deleteByBookId(Long bookId) throws ResourceNotFoundException {
		this.bookRepository.deleteById(bookId);
		
	}
	
	@Override
	public Book updateBook(Long bookId, BookDTO bookDtoObj) throws ResourceNotFoundException {

	    Book existingBook = this.bookRepository.findById(bookId)
	            .orElseThrow(() -> new ResourceNotFoundException("Book", "ID", bookId));
	    Long existingIsbn = existingBook.getIsbn();
	    this.modelMapper.map(bookDtoObj, existingBook);
	    existingBook.setIsbn(existingIsbn);
	    Book updatedBook = this.bookRepository.save(existingBook);

	    return updatedBook;
	}
	

}
