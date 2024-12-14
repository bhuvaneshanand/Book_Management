package com.hexa.BookManagement.exception;

public class ResourceNotFoundException extends Exception {
	
	private String resourceName;
	private String fieldName;
	private Long fieldValue;

	
	public ResourceNotFoundException(String resourceName, String fieldName, Long fieldValue) {
		super();
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}
	
	public ResourceNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public String getMessage() {
		return this.resourceName+" is not found with " +this.fieldName+" value "+this.fieldValue;
	}
	
}
