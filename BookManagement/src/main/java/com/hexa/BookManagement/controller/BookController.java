package com.hexa.BookManagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.BookManagement.dto.BookDTO;
import com.hexa.BookManagement.entities.Book;
import com.hexa.BookManagement.exception.ResourceNotFoundException;
import com.hexa.BookManagement.service.BookServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bookmanagement")
@ResponseBody
@CrossOrigin("*")
public class BookController {
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private BookServiceImpl bookServiceImpl;
	
	//@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/createBook")
	public ResponseEntity<BookDTO> createBook(@Valid @RequestBody BookDTO bookDtoObj) {

		Book book = this.bookServiceImpl.createBook(bookDtoObj);
		BookDTO bookDTO = this.modelMapper.map(book, BookDTO.class);
		return ResponseEntity.ok(bookDTO);
	}

	@GetMapping("/findByBookId")
	public ResponseEntity<BookDTO> findByBookID(@RequestParam("isbn") Long bookId) throws ResourceNotFoundException {
		Book book = this.bookServiceImpl.findByBookID(bookId);
		BookDTO bookDTO = this.modelMapper.map(book, BookDTO.class);
		return ResponseEntity.ok(bookDTO);
	}
	
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@GetMapping("/findallbook")
	public ResponseEntity<List<BookDTO>> findAllBook() throws ResourceNotFoundException {
		List<Book> book = this.bookServiceImpl.findAllBook();
		List<BookDTO> bookDTO = new ArrayList<BookDTO>();
		for (Book b : book) {
			BookDTO bookDto = this.modelMapper.map(b, BookDTO.class);
			bookDTO.add(bookDto);
		}
		return ResponseEntity.ok(bookDTO);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/deleteByBookId")
	public ResponseEntity<String> deleteByBookId(@RequestParam("isbn") Long bookId) throws ResourceNotFoundException {
		this.bookServiceImpl.deleteByBookId(bookId);
		return ResponseEntity.ok("Book ID " + bookId + " deleted.");
	}

	@PutMapping("/updateBook")
	public ResponseEntity<BookDTO> updateBook(@RequestParam("isbn") Long bookId, @RequestBody BookDTO bookDtoObj)
			throws ResourceNotFoundException {
		Book updatedBook = this.bookServiceImpl.updateBook(bookId, bookDtoObj);
		BookDTO bookDTO = this.modelMapper.map(updatedBook, BookDTO.class);
		return ResponseEntity.ok(bookDTO);
	}

}
