package server.connection;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.impl.io.DefaultHttpRequestParser;
import org.apache.http.impl.io.DefaultHttpResponseWriter;
import org.apache.http.impl.io.HttpTransportMetricsImpl;
import org.apache.http.impl.io.SessionInputBufferImpl;
import org.apache.http.impl.io.SessionOutputBufferImpl;
import org.apache.http.message.BasicHeader;
import server.http.HTTPHandler;

/**
 * A server thread handling a single request from a client
 */
public class ServerThread extends Thread {

  private Socket clientSocket;
  private DefaultHttpRequestParser requestParser;
  private DefaultHttpResponseWriter responseWriter;
  private SessionOutputBufferImpl sessionOutputBuffer;
  private OutputStream outputStream;

  public ServerThread(Socket clientSocket) throws IOException {
    this.clientSocket = clientSocket;

    // Initiate input buffers
    SessionInputBufferImpl sessionInputBuffer = new SessionInputBufferImpl(
        new HttpTransportMetricsImpl(), 8192);
    sessionInputBuffer.bind(clientSocket.getInputStream());
    requestParser = new DefaultHttpRequestParser(sessionInputBuffer);

    // Initiate output streams and handlers
    outputStream = clientSocket.getOutputStream();
    sessionOutputBuffer = new SessionOutputBufferImpl(
        new HttpTransportMetricsImpl(), 8192);
    sessionOutputBuffer.bind(outputStream);
    responseWriter = new DefaultHttpResponseWriter(sessionOutputBuffer);
  }

  /**
   * The thread run method parsing a HttpRequest from the client and handling it using the
   * HTTPHandler. Sends a response to the client
   */
  @Override
  public void run() {
    try {
      // Get and handle the request
      HttpRequest request = requestParser.parse();
      HttpResponse response = HTTPHandler.handleRequest(request);

      // Set content headers if there is content
      if (response.getEntity() != null) {
        response.setHeader(response.getEntity().getContentType());
        response.setHeader(response.getEntity().getContentEncoding());
        response.setHeader(new BasicHeader("Content-Length",
            String.valueOf(response.getEntity().getContentLength())));
      }

      // Write the headers to the client
      responseWriter.write(response);
      sessionOutputBuffer.flush();

      // Write content to the client if it exists
      if (response.getEntity() != null) {
        response.getEntity().writeTo(outputStream);
      }
      outputStream.close();

    } catch (IOException | HttpException ignored) {
      // Ignore exceptions. They come from a malformed Http request or the client closing its socket.
    }

    // The socket opened for the client should be closed when the communication is finished
    if (!clientSocket.isClosed()) {
      try {
        clientSocket.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

}