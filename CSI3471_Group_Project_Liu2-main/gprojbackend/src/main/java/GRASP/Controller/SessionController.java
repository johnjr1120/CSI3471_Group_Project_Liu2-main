package GRASP.Controller;

import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/session")
@CrossOrigin
public class SessionController {

    @GetMapping("/check")
    public Map<String, Boolean> checkSession(HttpSession session) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("isLoggedIn", session.getAttribute("userID") != null);
        return response;
    }
}


