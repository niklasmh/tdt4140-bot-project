package api.handlers.user;

import static api.helpers.JSONCheckerHelper.getJSONField;
import static api.helpers.RequestMethodHelper.checkRequestMethod;

import api.exceptions.APIBadRequestException;
import data.dao.UserDAO;
import data.user.User;
import data.user.UserTypeConverter;
import org.apache.http.HttpRequest;
import org.json.JSONObject;

public class APILoginHandler {

  /**
   * An API handler method for handling login of a user. Requires the following data:
   *        username (String): the username
   *        password (String): the password
   *
   * @param httpRequest The request to handle
   * @return A JSON string containing the following data
   *        username (String): the username
   *        token (String): the session token
   *        type (String): the user type
   */
  public static String handleLoginRequest(HttpRequest httpRequest) {
    checkRequestMethod("POST", httpRequest);

    User user = UserDAO.getInstance().findUserByUsername(getJSONField(httpRequest, String.class, "username"));
    String password = getJSONField(httpRequest, String.class, "password");

    if (user == null) {
      throw new APIBadRequestException("User not found");
    }

    if (!user.checkPassword(password)) {
      throw new APIBadRequestException("Password incorrect");
    }

    if (user.getSessionToken() == null) {
      user.createSessionToken();
    } else{
      user.generateSessionTokenExpireDate();
    }

    String token = user.getSessionToken();

    user.update();

    JSONObject loginResponse = new JSONObject();
    loginResponse.put("username", user.getUsername());
    loginResponse.put("token", token);
    loginResponse.put("type", UserTypeConverter.userTypeToString(user.getUserType()));

    return loginResponse.toString();
  }

}
