package com.hexa.BookManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.hexa.BookManagement.entities.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}
