package webcam;

import com.github.sarxos.webcam.Webcam;
import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigInteger;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

  private Socket socket;
	private BufferedImage bimg;
	private PrintWriter out;
	static Webcam webcam;

	private static final int N = 100;

	public Application(String hostname, int port) throws IOException {
		socket = new Socket(hostname, port);

		out = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));
		// new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));
	}

	public void sendRequest() throws IOException {
		bimg = webcam.getImage();

		//out.close();
	}


	public void close() throws IOException {
        socket.close();
    }

    public static void main(String[] args) throws InterruptedException, UnknownHostException, IOException {
      String serverName = "38.88.74.71";
      int port = 9004;
      webcam = Webcam.getWebcams().get(0);
      webcam.setViewSize(new Dimension(320, 240));
      webcam.open();
      /*
       * Robot bot; bot = new Robot(); bimg = bot.createScreenCapture(new Rectangle(0,
       * 0, 200, 100));
       */
      int count = 0;
      while (true) {
        Application client = new Application(serverName, port);
        client.sendRequest();
        client.socket.getOutputStream().write('A');
        client.socket.getOutputStream().write(1);
        client.socket.getOutputStream().write('B');
        client.socket.getOutputStream().write(2);
        client.socket.getOutputStream().write('C');
        client.socket.getOutputStream().write(3);
        client.socket.getOutputStream().write('D');
        client.socket.getOutputStream().write(4);
        ImageIO.write(client.bimg,"JPG",client.socket.getOutputStream());
        try {
          TimeUnit.MILLISECONDS.sleep(20);
        } catch (InterruptedException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
        //System.out.println("salam sending photo");

        try {
          TimeUnit.MILLISECONDS.sleep(20);
        } catch (InterruptedException e) {
          // TODO Auto-generated catch block
          e.printStackTrace();
        }
        count++;
        client.close();
      }
    }
}
