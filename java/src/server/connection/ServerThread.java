package api.connection;

import api.http.HTTPHandler;
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

  @Override
  public void run() {
    try {
      HttpRequest request = requestParser.parse();
      HttpResponse response = HTTPHandler.handleRequest(request);
      responseWriter.write(response);
      sessionOutputBuffer.flush();
      if (response.getEntity() != null){
        response.getEntity().writeTo(outputStream);
      }
      outputStream.close();

    } catch (IOException | HttpException e) {
      e.printStackTrace();
    }

    if (!clientSocket.isClosed()) {
      try {
        clientSocket.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

}
