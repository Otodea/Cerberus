package Users;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Scanner;

import javax.management.InvalidAttributeValueException;

public class UserList {

	public ArrayList<User> userList;
	private String databasePath;

	// Representation invariants: database file cannot hold invalid users.

	/**
	 * Create a user using a database that already exists in the directory. If the
	 * database does not exist, it creates a new empty data. Throw a NoDBException
	 * exception if unsuccessful.
	 * 
	 * @param databasePath
	 * @throws NoDBException
	 * @throws InvalidAttributeValueException
	 */
	public UserList(String databasePath) throws NoDBException, InvalidAttributeValueException {
		this.userList = new ArrayList<User>();
		this.databasePath = databasePath;
		try {
			initUserList();
		} catch (IOException e) {
			throw new NoDBException();
		}
	}

	/**
	 * Initialize the user list with the user database.
	 * 
	 * @return true if file exists and false if no file exists.
	 * @throws InvalidAttributeValueException
	 */
	private boolean initUserList() throws IOException, InvalidAttributeValueException {
		try {
			Scanner database = new Scanner(new File(this.databasePath));
			while (database.hasNextLine()) {
				Scanner user = new Scanner(database.nextLine());
				userList.add(new User(user.next(), user.next()));
				user.close();
			}
			database.close();
			return true;
		} catch (IOException e) {
			String path = "C:" + File.separator + "Users" + File.separator + "osama" + File.separator
					+ "eclipse-workspace" + File.separator + "UserDB" + File.separator + "src" + File.separator
					+ "UserDB.txt";
			File f = new File(path);
			f.getParentFile().mkdirs();
			f.createNewFile();
			return false;
		}
	}

	/**
	 * Add a user to user's list and save it in a database.
	 * 
	 * @param username
	 *            minimum of 1 character and maximum of 25 character
	 * @param password
	 *            minimum of 4 character and maximum of 16 character
	 * @return
	 * @throws IOException
	 * @throws InvalidAttributeValueException
	 */
	public boolean addUser(String username, String password) throws IOException, InvalidAttributeValueException {
		for (User u : userList) {
			if (u.getUsername().equals(username))
				return false;
		}
		User user = new User(username, password);
		userList.add(user);
		Writer output = new BufferedWriter(new FileWriter(databasePath, true));
		output.append(user.getUsername() + "    " + user.getPassword() + System.getProperty("line.separator"));
		output.close();
		return true;
	}

	/**
	 * @param username
	 * @param password
	 * @return true if the user is in the database and false if it is not
	 */
	public boolean isValidUser(String username, String password) {
		for (User user : userList) {
			if (user.getUsername().equals(username))
				if (user.getPassword().equals(password))
					return true;
		}
		return false;
	}
}
