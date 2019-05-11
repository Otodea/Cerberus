package Chat;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;


/**
 * FibonacciClient is a client that sends requests to the FibonacciServer
 * and interprets its replies.
 * A new FibonacciClient is "open" until the close() method is called,
 * at which point it is "closed" and may not be used further.
 */

public class unlockClient implements Runnable{
	

    private static final int messagesPort = 4005;
    private final static String newline = "\n";
	private Socket socket;
	private ServerSocket messages;
    private BufferedReader in;
    private PrintWriter out;
    
    // Rep invariant: socket, in, out != null
    
    /**
     * Make a FibonacciClient and connect it to a server running on
     * hostname at the specified port.
     * @throws IOException if can't connect
     */
    public unlockClient(String hostname, int port) throws IOException {

      	socket = new Socket(hostname, port);
    	messages = new ServerSocket(messagesPort);
        in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        out = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));

    }
    /**
     * Send a request to the server. Requires this is "open".
     * @param x to find Fibonacci(x)
     * @throws IOException if network or server failure
     */
    public void sendMessage(String x) throws IOException {
        System.out.println(x);
    	out.print(x + "\n");
        out.flush(); // important! make sure x actually gets sent
    }
    
    /**
     * Get a reply from the next request that was submitted.
     * Requires this is "open".
     * @return the requested Fibonacci number
     * @throws IOException if network or server failure
     */
    public void getReply() throws IOException {
       String text = in.readLine();
       System.out.println(text);
       Socket reply = new Socket("localhost", 4002);
       PrintWriter Out = new PrintWriter(new OutputStreamWriter(reply.getOutputStream()));
       Out.print(text + "\n");
       Out.flush();
       Out.close();
            
    }
    /**
     * Closes the client's connection to the server.
     * This client is now "closed". Requires this is "open".
     * @throws IOException if close fails
     */
    public void close() throws IOException {
        in.close();
        out.close();
        socket.close();
    }
    
    
    
    
    private static final int N = 100;
    
    /**
     * Use a FibonacciServer to find the first N Fibonacci numbers.
     * @throws InterruptedException 
     */
    public static void main(String[] args) throws InterruptedException {
            
        
    	//createAndShowGUI();
    	unlockClient client;
		try {
			client = new unlockClient("38.88.74.71", 9020);

			Thread t = new Thread(client,"msg");
			t.start();
                        client.sendMessage("A1B2C3D41");
			while(true) {
				client.getReply();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    }
    private void handleMsg(Socket socket) throws IOException {
		System.err.println("client Connected");

		// get the socket's input stream, and wrap converters around it
		// that convert it from a byte stream to a character stream,
		// and that buffer it so that we can read a line at a time
		BufferedReader in = new BufferedReader(new InputStreamReader(
				socket.getInputStream()));


		try {
			// each request is a single line containing a number
			for (String line = in.readLine(); line != null; line = in
					.readLine()) {
				sendMessage(line);
			}
		} finally {
			in.close();
		}
	}
	@Override
	public void run() {
		// TODO Auto-generated method stub
		while (true) {
			// block until a client connects
	        try {
	        	Socket Msgsocket = messages.accept();
				
				handleMsg(Msgsocket);
				Msgsocket.close();
			} catch (IOException ioe) {
				ioe.printStackTrace(); // but don't terminate serve()
			}
					
			
		}
	}
}
