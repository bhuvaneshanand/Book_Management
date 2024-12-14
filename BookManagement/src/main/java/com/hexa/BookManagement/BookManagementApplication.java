package com.hexa.BookManagement;



import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.WebSecurity;





@SpringBootApplication
public class BookManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookManagementApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	

	
	

}
