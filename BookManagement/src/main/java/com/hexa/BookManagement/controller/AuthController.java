package com.hexa.BookManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.BookManagement.JwtUtil;
import com.hexa.BookManagement.dto.JwtResponse;
import com.hexa.BookManagement.entities.User;
import com.hexa.BookManagement.service.MyUserDetailsService;



@RestController
@RequestMapping("/api/v1/bookmanagement")
@CrossOrigin(origins="*")
public class AuthController {
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;
 
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/auth/login")
    public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody User authenticationRequest) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String jwt = jwtUtil.generateToken(userDetails.getUsername());

        JwtResponse jwtResponse= new JwtResponse(jwt,authenticationRequest.getUsername(), authenticationRequest.getPassword(),authenticationRequest.getRole());
        
        return ResponseEntity.ok(jwtResponse);
        
    }

}
