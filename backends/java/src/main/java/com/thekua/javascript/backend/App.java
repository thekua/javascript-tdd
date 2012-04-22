package com.thekua.javascript.backend;

import org.simpleframework.http.Request;
import org.simpleframework.http.Response;
import org.simpleframework.http.core.Container;
import org.simpleframework.transport.connect.Connection;
import org.simpleframework.transport.connect.SocketConnection;

import java.io.PrintStream;
import java.net.InetSocketAddress;
import java.net.SocketAddress;

import static com.thekua.javascript.backend.Questions.random;

public class App implements Container {

    public void handle(Request request, Response response) {
        try {
            PrintStream body = response.getPrintStream();
            response.set("Content-Type", "application/json");
            body.println(json());
            body.close();
        } catch (Exception e) {
            throw new RuntimeException("Wrapping to get over checked exception", e);
        } 
    } 

    private String json() {
        Questions.Question random = random();
        return String.format("{\"question\":\"%s\", \"answer\":\"%s\"}", random.question, random.answer);
    }

    public static void main( String[] args ) throws Exception {
        Container container = new App();
        Connection connection = new SocketConnection(container);
        SocketAddress address = new InetSocketAddress(8080);
        connection.connect(address);
        System.out.println("Backend available on http://localhost:8080");
    }
}
