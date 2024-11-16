package GRASP.Controller;

import GRASP.DTO.CheckEmailUsernameRequest;
import GRASP.DTO.EmailUsernameCheckResponse;
import GRASP.Model.User;
import GRASP.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
class UserController {
    @Autowired
    private UserService userService;

    // POST endpoint to add a new user if email and username are not taken
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody User user) {
        if (userService.isEmailOrUsernameTaken(user.getEmail(), user.getUsername())) {
            return ResponseEntity.badRequest().body("Username or email is already taken.");
        }
        user.setIsLoggedIn(false);
        userService.saveUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "New user is added");
        return ResponseEntity.ok(response);
    }

    // GET endpoint to fetch all users
    @GetMapping("/getAll")
    public List<User> list() {
        return userService.getAllUsers();
    }

    // API endpoint to check if email or username is already in use
    @PostMapping("/checkEmailAndUsername")
    public ResponseEntity<?> checkEmailAndUsername(@RequestBody CheckEmailUsernameRequest request) {
        boolean exists = userService.isEmailOrUsernameTaken(request.getEmail(), request.getUsername());
        return ResponseEntity.ok(new EmailUsernameCheckResponse(exists));
    }
}
