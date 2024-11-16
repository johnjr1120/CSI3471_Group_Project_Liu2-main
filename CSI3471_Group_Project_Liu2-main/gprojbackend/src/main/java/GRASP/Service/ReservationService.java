package GRASP.Service;

import GRASP.Model.Reservation;

import java.util.Calendar;
import java.util.List;

public interface ReservationService {
    Reservation createReservation(Integer userId, int roomId, Calendar checkInDate, Calendar checkOutDate);
    List<Reservation> getAllReservations();
}
