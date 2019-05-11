package test;

import static org.junit.Assert.fail;

import org.junit.Test;

import Users.UserList;

public class TestUserList {
	@Test
	public void initUserList() {
		try {
			UserList users = new UserList("UserDB.txt");
			users.addUser("Try1", "PWPW");
			users.addUser("TryTry1", "PWPWPW");
			users.addUser("TryTryTry1", "PWPWPWPW");
			users.addUser("TryTryTryTry1", "PWPWPWPWPW");
			users.addUser("TryTryTryTryTryTryTryTry1", "PWPWPWPWPWPW");
			System.out.println(users.userList.toString());
		} catch (Exception NoDBException) {
			fail("Unexpected Exception");
		}
	}

	@Test
	public void isValidUserList() {
		try {
			UserList users = new UserList("UserDB.txt");
			assert (users.isValidUser("Try1", "PWPW"));
		} catch (Exception NoDBException) {
			fail("Unexpected Exception");
		}
	}
}
