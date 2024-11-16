package GRASP.Service;

import GRASP.Model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user); // Method to save a user
    List<User> getAllUsers(); // Method to get all users

    Optional<User> findByUsername(String username); // Find user by username
    Optional<User> findById(long id); // Find user by ID

    boolean isEmailOrUsernameTaken(String email, String username);

    Optional<User> validateUser(String username, String password);
    boolean logoutUser(String username);

}
