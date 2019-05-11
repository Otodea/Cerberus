package Users;

import javax.management.InvalidAttributeValueException;

public class User {
	private String username;
	private String password;
	private final int usernameMaxSize;
	private final int passwordMaxSize;
	private final int usernameMinSize;
	private final int passwordMinSize;

	/**
	 * @param username
	 *            minimum of 1 character and maximum of 25
	 * @param password
	 *            minimum of 4 character and maximum of 16
	 * @throws InvalidAttributeValueException
	 *             if invalid user name or password
	 */
	public User(String username, String password) throws InvalidAttributeValueException {
		usernameMaxSize = 25;
		passwordMaxSize = 16;
		usernameMinSize = 1;
		passwordMinSize = 4;
		initUsername(username);
		initPassword(password);
	}

	private void initPassword(String password) throws InvalidAttributeValueException {
		if (password.trim().length() < passwordMinSize || password.trim().length() > passwordMaxSize)
			throw new InvalidAttributeValueException();
		this.password = password.trim();
		for (int i = this.password.length(); i <= passwordMaxSize; i++) {
			this.password += " ";
		}
	}

	private void initUsername(String username) throws InvalidAttributeValueException {
		if (username.trim().length() < usernameMinSize || username.trim().length() > usernameMaxSize)
			throw new InvalidAttributeValueException();
		this.username = username.trim();
		for (int i = this.username.length(); i <= usernameMaxSize; i++) {
			this.username += " ";
		}
	}

	/**
	 * @return Password of the user
	 */
	public String getPassword() {
		return password.trim();
	}

	/**
	 * @return Username of the user
	 */
	public String getUsername() {
		return username.trim();
	}

	/**
	 * @return Max length a password can be
	 */
	public int getPasswordMaxSize() {
		return passwordMaxSize;
	}

	/**
	 * @return Max length a username can be
	 */
	public int getUsernameMaxSize() {
		return usernameMaxSize;
	}
	
}
