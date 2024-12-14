package com.hexa.BookManagement.dto;

import com.hexa.BookManagement.entities.Role;

public class JwtResponse {

		private String token;
	    private String username;
	    private String password;
	    private Role role;

	    public JwtResponse(String token, String username, String password,Role role) {
	        this.token = token;
	        this.username = username;
	        this.password = password;
	        this.role=role;
	    }

	    public String getToken() {
	        return token;
	    }

	    public void setToken(String token) {
	        this.token = token;
	    }

	    public String getUsername() {
	        return username;
	    }

	    public void setUsername(String username) {
	        this.username = username;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

		public Role getRole() {
			return role;
		}

		public void setRole(Role role) {
			this.role = role;
		}
	    
}
