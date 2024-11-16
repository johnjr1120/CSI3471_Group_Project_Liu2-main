package GRASP.Model;

import jakarta.persistence.*;
import java.util.Calendar;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id") // Changed from guest_id to user_id
    private User user;  // Changed from Guest to User

    @Column(name = "room_id")
    private int roomId;

    private Calendar checkInDate;
    private Calendar checkOutDate;

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public User getUser() {  // Changed from getGuest to getUser
        return user;
    }

    public void setUser(User user) {  // Changed from setGuest to setUser
        this.user = user;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public Calendar getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(Calendar checkInDate) {
        this.checkInDate = checkInDate;
    }

    public Calendar getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(Calendar checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
}
