package GRASP.Controller;

import GRASP.Model.Room;
import GRASP.Model.RoomDetails;
import GRASP.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/room")
@CrossOrigin
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/add")
    public Map<String, String> add(@RequestBody Room room) {
        System.out.println("Received Room: " + room); // For debugging
        roomService.saveRoom(room);
        Map<String, String> response = new HashMap<>();
        response.put("message", "New room was added successfully with provided details");
        return response;
    }

    @GetMapping("/getAll")
    public List<Room> list() {
        List<Room> rooms = roomService.getAllRooms();
        rooms.forEach(System.out::println);
        return rooms;
    }
}
