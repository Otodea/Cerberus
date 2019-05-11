package com.g20.cerberus;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

import java.util.Scanner;
import java.util.Map;
import java.util.HashMap;

public class LockControl implements Runnable {
    private UserList userlist;
    private ServerSocket serverSocket;
    private Thread lockThread;
    public Map<String, Socket> socketMap;


    public LockControl (int port, UserList userlist) {
      socketMap = new HashMap<String, Socket>();
      this.userlist = userlist;

      try {
        serverSocket = new ServerSocket(port);
        System.out.println("Lock server is running");
      } catch(IOException e) {
        e.printStackTrace();
      }
      lockThread = new Thread(this, "chat");
      lockThread.start();
    }

    public void run() {
      try {
        serve();
      } catch (IOException e) {
      }

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
        Thread handler = new Thread(new Runnable() {
				public void run() {
					try {
						try {

							handle(socket);
						} finally {

							socket.close();
						}
					} catch (IOException ioe) {
						// this exception wouldn't terminate serve(),
						// since we're now on a different thread, but
						// we still need to handle it
						ioe.printStackTrace();
					}
				}
			});

      handler.start();
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
  		// get the socket's input stream, and wrap converters around it
  		// that convert it from a byte stream to a character stream,
  		// and that buffer it so that we can read a line at a time
  		BufferedReader in = new BufferedReader(new InputStreamReader(
  				socket.getInputStream()));

  		// similarly, wrap character=>bytestream converter around the
  		// socket output stream, and wrap a PrintWriter around that so
  		// that we have more convenient ways to write Java primitive
  		// types to it.
      String id = "";
  		try {
  			// each request is a single line containing a number
  			for (String line = in.readLine(); line != null; line = in
  					.readLine()) {
                id = line.substring(0,8);
                socketMap.put(id, socket);
                for(User u: this.userlist.getUserList()) {
                	if(u.getSerialID().equals(id)) {
                		u.setLockState(Integer.parseInt(line.substring(8)));
                	    break;
                	}
                }
  			}
  		} finally {
        socketMap.remove(id);
        for(User u: this.userlist.getUserList()) {
          if(u.getSerialID().equals(id)) {
            u.setLockState(-1);
              break;
          }
        }
  			in.close();
  		}
  	}

    public boolean lockDoor (String serialID) {
System.out.println(serialID + " lock");
      PrintWriter out;
      Socket curSocket = socketMap.get(serialID);
      try {
        out = new PrintWriter(new OutputStreamWriter(
            curSocket.getOutputStream()));
        out.println('0');
        out.flush();
      } catch (IOException e) {

      } catch (NullPointerException e) {
        return false;
      }

      return true;
    }

    public boolean unlockDoor (String serialID) {
	System.out.println(serialID + " unlock");
      PrintWriter out;
      Socket curSocket = socketMap.get(serialID);
      try {
        out = new PrintWriter(new OutputStreamWriter(
            curSocket.getOutputStream()));
        out.println('1');
        out.flush();
      } catch (IOException e) {

      } catch (NullPointerException e) {
        return false;
      }

      return true;
    }

}
