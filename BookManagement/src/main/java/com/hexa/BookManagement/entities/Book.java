package com.hexa.BookManagement.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "book")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long isbn;

	@NotNull
	private String title;

	@NotNull
	private String author;

	@NotNull(message = "Format DD-MM-YYYY")
	private String year;

	public Long getIsbn() {
		return isbn;
	}

	public void setIsbn(Long isbn) {
		this.isbn = isbn;
	}

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

	public Book(Long isbn, @NotNull String title, @NotNull String author,
			@NotNull(message = "Format DD-MM-YYYY") String year) {
		super();
		this.isbn = isbn;
		this.title = title;
		this.author = author;
		this.year = year;
	}


	public Book(@NotNull String title, @NotNull String author, @NotNull(message = "Format DD-MM-YYYY") String year) {
		super();
		this.title = title;
		this.author = author;
		this.year = year;
	}
	
	

	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Book [isbn=" + isbn + ", title=" + title + ", author=" + author + ", year=" + year + "]";
	}

}
