package Chat;


import java.io.*;

import java.net.ServerSocket;
import java.net.Socket;

import java.util.Scanner;


/**
 * FibonacciServer is a server that finds the n^th Fibonacci number given n. It
 * accepts requests of the form: Request ::= Number "\n" Number ::= [0-9]+ and
 * for each request, returns a reply of the form: Reply ::= (Number | "err")
 * "\n" where a Number is the requested Fibonacci number, or "err" is used to
 * indicate a misformatted request. FibonacciServer can handle only one client
 * at a time.
 */
public class ChatServer implements Runnable {
	/** Default port number where the server listens for connections. */
	public static final int FIBONACCI_PORT = 9001;
    
	private ServerSocket serverSocket;
	private Thread msgThread;
	public Socket socket;
	

	private final static String newline = "\n";
    
	// Rep invariant: serverSocket != null
    
	/**
	 * Make a FibonacciServer that listens for connections on port.
	 * 
	 * @param port
	 *            port number, requires 0 <= port <= 65535
	 */
	public ChatServer(int port) throws IOException {
		msgThread = new Thread(this, "thread");
		
		/*before*/
		serverSocket = new ServerSocket(port);
	}
    
	public void run() {
        Scanner sc = new Scanner(System.in);
        PrintWriter out;
        while(true) {
		try {
			out = new PrintWriter(new OutputStreamWriter(
					socket.getOutputStream()));
			String msg = sc.nextLine();
		    while(!msg.equals("1")) {
		 	  
	          out.println(msg);
	          out.flush();
	          msg = sc.nextLine();
	          
		    }
		    out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
		}
		catch(NullPointerException e) {}
	    }
       
    }
    
    private static void createAndShowGUI() {
        //Create and set up the window.
 
        //Add contents to the window.
        try {
        	ChatServer server = new ChatServer(9004);
			server.msgThread.start();
			System.out.println("what up");
            server.serve();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 
        //Display the window.
        
    }
	/**
	 * Run the server, listening for connections and handling them.
	 * 
	 * @throws IOException
	 *             if the main server socket is broken
	 */
	public void serve() throws IOException {
		while (true) {
			// block until a client connects
	        Socket socket = serverSocket.accept();
	        this.socket = socket;
			try {
				handle(socket);
			} catch (IOException ioe) {
				ioe.printStackTrace(); // but don't terminate serve()
			} finally {
				socket.close();
			}
		}
	}

	/**
	 * Handle one client connection. Returns when client disconnects.
	 * 
	 * @param socket
	 *            socket where client is connected
	 * @throws IOException
	 *             if connection encounters an error
	 */
	private void handle(Socket socket) throws IOException {
		System.err.println("client Connecteds");

		// get the socket's input stream, and wrap converters around it
		// that convert it from a byte stream to a character stream,
		// and that buffer it so that we can read a line at a time
		BufferedReader in = new BufferedReader(new InputStreamReader(
				socket.getInputStream()));

		// similarly, wrap character=>bytestream converter around the
		// socket output stream, and wrap a PrintWriter around that so
		// that we have more convenient ways to write Java primitive
		// types to it.

	    

		try {
			// each request is a single line containing a number
			for (String line = in.readLine(); line != null; line = in
					.readLine()) {
				System.out.println(line);
				
			}
		} finally {
			
			in.close();
		}
	}

	/**
	 * Start a FibonacciServer running on the default port.
	 */
	public static void main(String[] args) {
		createAndShowGUI();
	}
}
