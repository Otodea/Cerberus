package Users;

public class NoDBException extends Exception {
	private static final long serialVersionUID = 1L;
	public NoDBException() { super(); }
	  public NoDBException(String message) { super(message); }
	  public NoDBException(String message, Throwable cause) { super(message, cause); }
	  public NoDBException(Throwable cause) { super(cause); }
}