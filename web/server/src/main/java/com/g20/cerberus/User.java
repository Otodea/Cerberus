package com.g20.cerberus;

import javax.management.InvalidAttributeValueException;

public class User {
	private String username;
	private String password;
	private String serialID;
	private String imageString;
	private String[] messageHistory;
	private int messageHistorySize;
	private int lockState;

	/**
	 * @param username
	 * @param password
	 */
	public User(String username, String password, String serialID) {
		this.username = username;
		this.password = password;
		this.serialID = serialID;
		this.messageHistory = new String[]{"","","","","","","","","",""};
		this.messageHistorySize = 10;
		this.imageString = "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";
		lockState = -1;
	}

	/**
	 * @return Password of the user
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @return Username of the user
	 */
	public String getUsername() {
		return username;
	}

	public boolean changePassword(String oldPassword, String newPassword) {
		if(!oldPassword.equals(this.password))
			return false;

	    this.password = newPassword;
	    return true;
	}

	public void setSerialID(String serialID) {
		this.serialID = serialID;
	}

	public String getSerialID() {
		return serialID;
	}

	public void setImageString(String byteString) {
		this.imageString = byteString;
	}

	public String getImageString() {
		return imageString;
	}

	public void addNewMessage(String message) {
		for (int i = 0; i < (messageHistorySize - 1); i++) {
			messageHistory[messageHistorySize - (i+1)] = messageHistory[messageHistorySize - (i+2)];
		}

		messageHistory[0] = message;
	}

	public String[] sendMessageArray() {
		return messageHistory;
	}

	public int getLockState() {
		return lockState;
	}

	public void setLockState(int state) {
		lockState = state;
	}

	public void clearChatArray() {
		this.messageHistory = new String[]{"","","","","","","","","",""};
	}
}
