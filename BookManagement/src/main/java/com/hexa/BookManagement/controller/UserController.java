package com.hexa.BookManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.BookManagement.entities.User;
import com.hexa.BookManagement.repository.UserRepository;


@RestController
@RequestMapping("/api/v1/bookmanagement")
@CrossOrigin(origins="*")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
 
	 @GetMapping("/user/hello")
	    public String userHello() {
	        return "Hello, User!";
	    }
	 
	    @GetMapping("/admin/hello")
	    public String adminHello() {
	        return "Hello, Admin!";
	    }
	    
	    @PostMapping("/auth/signup")
	    public String signupAdmin(@RequestBody User userInfo) {
	    	userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
	    	userRepository.save(userInfo);
	    	return " Registration successful!";
	    }

}

