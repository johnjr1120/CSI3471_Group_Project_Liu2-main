package GRASP.Controller;

import GRASP.Model.LoginRequest;
import GRASP.Model.User;
import GRASP.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")  // Adjust CORS as needed
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userID");

        // If no user is logged in, return guest user (ID 1)
        if (userId == null) {
            userId = 1L; // Guest user ID
        }

        Optional<User> user = userService.findById(userId);
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "userId", user.get().getId(),
                    "username", user.get().getUsername(),
                    "isLoggedIn", user.get().getIsLoggedIn()
            ));
        } else {
            return ResponseEntity.status(400).body(Map.of("message", "User not found"));
        }
    }


    @PostMapping
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        // Validate user credentials
        Optional<User> userOpt = userService.validateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Check if user is already logged in
            if (user.getIsLoggedIn()) {
                response.put("success", false);
                response.put("message", String.format("User '%s' is already logged in with ID: %d", user.getUsername(), user.getId()));
                return response; // Exit early since the user is already logged in
            }

            // If not logged in, proceed with login
            user.setIsLoggedIn(true); // Set logged-in status to true
            userService.saveUser(user); // Save updated user status

            // Store user ID in session
            session.setAttribute("userID", user.getId());

            response.put("success", true);
            response.put("userID", user.getId());
            response.put("message", String.format("Login successful for user '%s' with ID: %d", user.getUsername(), user.getId()));
        } else {
            response.put("success", false);
            response.put("message", "Invalid username or password.");
        }

        return response;
    }

    /**
     * Logout Endpoint
     * Logs out the user and clears session data.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request, HttpSession session) {
        String username = request.get("username");
        // Check if the user exists
        Optional<User> userOpt = userService.findByUsername(username);
        if (!userOpt.isPresent()) {
            // User does not exist
            return ResponseEntity.status(400).body(Map.of("message", "User with username '" + username + "' does not exist."));
        }
        // Attempt to log out the user
        boolean success = userService.logoutUser(username);

        if (success) {
            session.invalidate();  // Clear the session
            return ResponseEntity.ok(Map.of("message", "Logout successful!"));
        }

        return ResponseEntity.status(400).body(Map.of("message", "User " + username +  " is already logged out."));
    }

}
