package GRASP.Service;

import GRASP.Model.User;
import GRASP.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository; // Repository to interact with the database

    @Override
    public User saveUser(User user) { // Save a user
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() { // Get all users
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) { // Find user by username
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findById(long id) { // Find user by ID
        return userRepository.findById(id);
    }
    // Check if the email or username is already taken
    public boolean isEmailOrUsernameTaken(String email, String username) {
        // Check if email exists
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isPresent()) {
            return true;  // Email is taken
        }

        // Check if username exists
        Optional<User> userByUsername = userRepository.findByUsername(username);
        if (userByUsername.isPresent()) {
            return true;  // Username is taken
        }

        // Neither email nor username is taken
        return false;
    }

    // Validate user by username and password
    // UserService.java
    public Optional<User> validateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password) ? user : Optional.empty();
    }

    @Override
    public boolean logoutUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && user.get().getIsLoggedIn()) {
            User loggedOutUser = user.get();
            loggedOutUser.setIsLoggedIn(false); // Mark as logged out
            userRepository.save(loggedOutUser); // Save updated status
            return true;
        }
        return false;
    }


}
