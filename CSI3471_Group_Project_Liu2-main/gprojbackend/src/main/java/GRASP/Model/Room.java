package GRASP.Model;

import jakarta.persistence.*;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Embedded
    private RoomDetails details;

    public Room() {
        details = new RoomDetails();
    }

    public Room(RoomDetails details) {
        this.details = details;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoomDetails getDetails() {
        return details;
    }

    public void setDetails(RoomDetails details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", details=" + details +
                '}';
    }
}
