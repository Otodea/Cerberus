package video;

import java.io.File;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.sql.SQLException;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class VideoServer extends Thread {
	private ServerSocket serverSocket;
    private JFrame frame;
	public VideoServer(int port) throws IOException, SQLException, ClassNotFoundException, Exception {
		serverSocket = new ServerSocket(port);
		serverSocket.setSoTimeout(180000);
		frame = new JFrame();
		
	}

	public void serve() throws IOException {
		while (true) {
			// block until a client connects
			Socket socket = serverSocket.accept();
			try {
				handle(socket);
			} catch (IOException ioe) {
				ioe.printStackTrace(); // but don't terminate serve()
			} finally {
				socket.close();
			}
		}
	}

	public void handle(Socket server) throws IOException {
		System.out.println("client connected");
		System.out.println("trying to get the photo");
		BufferedImage img = ImageIO.read(ImageIO.createImageInputStream(server.getInputStream()));
		System.out.println("received new imagess");
		
		//server.getInputStream().close();
	    frame.getContentPane().removeAll();
	    frame.getContentPane().add(new JLabel(new ImageIcon(img)));
		frame.pack();
		frame.setVisible(true);
		
		// ImageIO.write(img, "jpg" , new File("C:\\Users\\Sina
		// Saleh\\eclipse-workspace\\VideoServer\\photo.jpg"));
	    // JFrame frame = new JFrame();
		// frame.getContentPane().add(new JLabel(new ImageIcon(img)));
		// frame.pack();
		// frame.setVisible(true);

	}

	public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException, Exception {
		System.out.println("server started bros");
		VideoServer server = new VideoServer(6066);
		server.serve();
	}
}