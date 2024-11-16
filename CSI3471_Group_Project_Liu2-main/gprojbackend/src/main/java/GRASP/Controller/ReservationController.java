package GRASP.Controller;

import GRASP.Model.*;
import GRASP.Service.UserService;
import GRASP.Service.ReservationService;
import GRASP.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reservation")
@CrossOrigin
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private RoomService roomService; // Service to access room details

    @Autowired
    private UserService userService; // Service to retrieve Guest by username

    @PostMapping("/reserveRoom")
    public Map<String, String> reserveRoom(@RequestBody ReservationRequest request) {
        Map<String, String> response = new HashMap<>();

        // Fetch guest by username
        Optional<User> user = userService.findByUsername(request.getUsername());
        if (!user.isPresent()) {
            response.put("message", "Invalid username");
            response.put("status", "error");
            return response;
        }

        Integer userId = user.get().getId(); // Get guest ID from the found Guest

        // Fetch room details to check availability
        Room room = roomService.findByRoomId(request.getRoomId());
        if (room == null) {
            response.put("message", "Room not found");
            response.put("status", "error");
            return response;
        }

        // Check if requested dates overlap with unavailable dates
        boolean isAvailable = room.getDetails().getUnavailableList().stream().noneMatch(dateRange ->
                request.getCheckInDate().before(dateRange.getEndDate()) && request.getCheckOutDate().after(dateRange.getStartDate())
        );

        if (!isAvailable) {
            response.put("message", "Room is not available for the selected dates");
            response.put("status", "error");
            return response;
        }

        // Proceed with creating the reservation for the specified guest
        Reservation reservation = reservationService.createReservation(
                user.get().getId(),  // Pass the Guest object itself
                request.getRoomId(),
                request.getCheckInDate(),
                request.getCheckOutDate()
        );

        // Update room's unavailable getAllUsers with the new reservation dates
        room.getDetails().getUnavailableList().add(new DateRange(request.getCheckInDate(), request.getCheckOutDate()));
        roomService.updateRoom(room); // Save the updated room details

        response.put("message", "Reservation successful!");
        response.put("status", "success");
        return response;
    }

    @GetMapping("/getAllReservations")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }
}