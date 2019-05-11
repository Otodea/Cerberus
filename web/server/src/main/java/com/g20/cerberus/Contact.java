package com.g20.cerberus;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.FileWriter;

public class Contact {
  public static void writeComment(String name, String email, String comment) {
    try {
      BufferedWriter output = new BufferedWriter(new FileWriter("./customer-comments/customerComments.txt", true));
  		output.append("Name: " + name);
      output.newLine();
      output.newLine();
      output.append("Email: " + email);
      output.newLine();
      output.newLine();
      output.append("Comment: " + comment);
      output.newLine();
      output.newLine();
      output.newLine();
      output.newLine();
  		output.close();
    } catch (IOException e) {
      System.err.println("Error writing comment to the file");
    }
  }
}
