package data.user;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

import base.BaseTest;
import data.DataAccessObjects.UserDAO;
import java.util.Calendar;
import java.util.Date;
import org.junit.Test;

public class UserTests extends BaseTest {

  @Test(expected = IllegalArgumentException.class)
  public void testWrongEmail1() throws Exception {
    User user = new User();
    user.setEmail("this_is_not_valid");
  }

  @Test(expected = IllegalArgumentException.class)
  public void testWrongEmail2() throws Exception {
    User user = new User();
    user.setEmail("this_is_not_valid@email");
  }

  @Test(expected = IllegalArgumentException.class)
  public void testWrongEmail3() throws Exception {
    User user = new User();
    user.setEmail("#@%^%#$@#$@#.com");
  }

  @Test
  public void testCorrectEmail() throws Exception {
    User user = new User();
    user.setEmail("user@mail.com");
    assertEquals(user.getEmail(), "user@mail.com");
  }

  @Test
  public void testPassword() throws Exception {
    User user = new User();
    user.setPassword("hunter2");
    assertTrue(user.checkPassword("hunter2"));
    assertFalse(user.checkPassword("password123"));
  }

  @Test
  public void testGenerateSessionToken() throws Exception {
    User user = new User();
    user.createSessionToken();
    assertEquals(64, user.getSessionToken().length());
  }

  @Test
  public void testGenerateSessionTokenExpireDate() throws Exception {
    User user = new User();
    user.generateSessionTokenExpireDate();
    assertTrue(user.getSessionTokenExpireDate().after(new Date()));
  }

  @Test
  public void testCheckUserSessionToken1() throws Exception {
    User user = new User();
    assertFalse(user.checkUserSessionToken("garbage"));
  }

  @Test
  public void testCheckUserSessionToken2() throws Exception {
    User user = new User();
    user.createSessionToken();
    assertTrue(user.checkUserSessionToken(user.getSessionToken()));
  }

  @Test
  public void testCheckUserSessionToken3() throws Exception {
    User user = new User();
    user.createSessionToken();

    Calendar calendar = Calendar.getInstance();
    calendar.setTime(new Date());
    calendar.add(Calendar.DATE, -1);
    user.setSessionTokenExpireDate(calendar.getTime());

    assertFalse(user.checkUserSessionToken(user.getSessionToken()));
    assertEquals(null, user.getSessionTokenExpireDate());
    assertEquals(null, user.getSessionToken());
  }

  @Test
  public void testCreate() throws Exception {
    User user = new User("user", "dad@dad.com", "adad");

    user.create();

    User user1 = UserDAO.getInstance().findById(user.getId());
    assertEquals(user, user1);
  }

  @Test
  public void testDelete() throws Exception {
    User user = new User("user", "dad@dad.com", "adad");
    user.create();

    user.delete();

    User user1 = UserDAO.getInstance().findById(user.getId());
    assertEquals(null, user1);
  }

  @Test
  public void testUpdate() throws Exception {
    User user = new User("user", "dad@dad.com", "adad");
    user.create();

    user.setUsername("other user");
    user.update();

    User user1 = UserDAO.getInstance().findById(user.getId());
    assertEquals("other user", user1.getUsername());
  }

}
