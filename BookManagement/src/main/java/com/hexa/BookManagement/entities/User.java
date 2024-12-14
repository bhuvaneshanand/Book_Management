package com.hexa.BookManagement.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class User{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id; 

	@Column(nullable = false,unique=true)
	private String username;

	private String password; 

	
	@Enumerated(EnumType.STRING)
	private Role role =Role.EMPLOYEE;

	private boolean isEnabled = true;

	public User(int id, String username, String password, Role role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}


	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public boolean isEnabled() {
		return isEnabled;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", isEnabled=" + isEnabled + "]";
	}


	
	

}