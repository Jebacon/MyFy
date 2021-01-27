package com.csc.capstone;

import java.sql.*;
import javax.sql.*;

public class SQLTEST {

    private static final String CONNECTION = "jdbc:mysql://75.183.65.84/localhost";
    private static final String CLASSCONNECTIONDATA = "com.sqlserver.jdbc.Driver";

    public static void main(String[] args) throws ClassNotFoundException {
        createConnection();

    }

    public static void createConnection(){
        Connection sqlConnection = null;

        try {
            Class.forName(CLASSCONNECTIONDATA);
            sqlConnection = DriverManager.getConnection(CONNECTION,"root","");
            System.out.println("Succesful Connection!");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
