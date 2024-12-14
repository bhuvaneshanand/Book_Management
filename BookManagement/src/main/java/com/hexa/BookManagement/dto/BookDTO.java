package com.hexa.BookManagement.dto;

import jakarta.validation.constraints.NotNull;

public class BookDTO {
	
	private Long isbn;
	
	@NotNull
	private String title;

	@NotNull
	private String author;

	@NotNull(message = "Format DD-MM-YYYY")
	private String year;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}
	

	public Long getIsbn() {
		return isbn;
	}

	public void setIsbn(Long isbn) {
		this.isbn = isbn;
	}

	public BookDTO(Long isbn,@NotNull String title, @NotNull String author, @NotNull(message = "Format DD-MM-YYYY") String year) {
		super();
		this.isbn=isbn;
		this.title = title;
		this.author = author;
		this.year = year;
	}

	public BookDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
