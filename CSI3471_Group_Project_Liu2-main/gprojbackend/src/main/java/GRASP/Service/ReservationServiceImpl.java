package GRASP.Service;

import GRASP.Model.User;  // Changed from Guest to User
import GRASP.Model.Reservation;
import GRASP.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserService userService;  // Changed from GuestService to UserService

    @Override
    public Reservation createReservation(Integer userId, int roomId, Calendar checkInDate, Calendar checkOutDate) {
        // Retrieve the User based on userId
        User user = userService.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create and save the reservation
        Reservation reservation = new Reservation();
        reservation.setUser(user);  // Changed from setGuest to setUser
        reservation.setRoomId(roomId);
        reservation.setCheckInDate(checkInDate);
        reservation.setCheckOutDate(checkOutDate);

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
