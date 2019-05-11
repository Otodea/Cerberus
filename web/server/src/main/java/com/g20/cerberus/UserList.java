package com.g20.cerberus;

import java.io.FileReader;
import java.io.BufferedReader;
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
	 */
	public UserList(String databasePath) {
		this.userList = new ArrayList<User>();
		this.databasePath = databasePath;
		initUserList();
	}

	/**
	 * Initialize the user list with the user database.
	 */
	private void initUserList() {
		try {
			BufferedReader br = new BufferedReader(new FileReader(new File(databasePath)));
      String line;
      while ((line = br.readLine()) != null) {
        String[] userPass = line.split(", ", 3);
        User userToAdd = new User(userPass[0], userPass[1], userPass[2]);
        userList.add(userToAdd);
      }
		} catch (IOException e) {
      System.err.println("Error creating database");
		}
	}

	/**
	 * Add a user to user's list and save it in a database.
	 *
	 * @param username
	 *            minimum of 1 character and maximum of 25 character
	 * @param password
	 *            minimum of 4 character and maximum of 16 character
	 * @return true if user added, false if user already exists
	 */
	public boolean addUser(String username, String password) {
		for (User u : userList) {
			if (u.getUsername().equals(username))
				return false;
		}
		User user = new User(username, password, "NOT SET");
		userList.add(user);
    try {
      BufferedWriter output = new BufferedWriter(new FileWriter(databasePath, true));
  		output.append(username + ", " + password + ", NOT SET");
      output.newLine();
  		output.close();
    } catch (IOException e) {
      System.err.println("Error writing user to the file");
      return false;
    }
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

  public String login (String username, String password) {
    for (User u : userList) {
      if (u.getUsername().equals(username)) {
        if (u.getPassword().equals(password)) {
          return username;
        } else {
          return "ERR: INVALID PASS";
        }
      }
    }

    return "ERR: NO USER";
  }

	public ArrayList<User> getUserList() {
		return userList;
	}

	public boolean changePassword(String username, String oldPassword, String newPassword) {
           for(User u: userList) {
        	   if(u.getUsername().equals(username)) {
        		   if( u.changePassword(oldPassword, newPassword)) {
        		      updateFile();
        		      return true;
        		   }
        		   //if changing password was unsuccessful
        		   return false;
        	   }
           }
           //if user was not found
           return false;
	}

	public boolean changeSerialID(String username, String serialID) {
		for(User u: userList) {
     	   if(u.getUsername().equals(username)) {
     		   u.setSerialID(serialID);
     		   updateFile();
     		   return true;
     	   }
        }
        return false;
	}

  private void updateFile() {
  	File databaseFile = new File(databasePath);
  	FileWriter databaseWriter;
		try {
			databaseWriter = new FileWriter(databaseFile, false);
			for(User u: userList) {
	    	   databaseWriter.write(u.getUsername() + ", " + u.getPassword() + ", " + u.getSerialID() + '\n');
	    	}
			databaseWriter.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // true to append
  }
}
