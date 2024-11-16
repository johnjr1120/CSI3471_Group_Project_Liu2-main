package GRASP.Service;

import GRASP.Model.Room;
import GRASP.Model.RoomDetails;

import java.util.List;

public interface RoomService {
    Room saveRoom(Room room);
    List<Room> getAllRooms();
    List<Room> searchForRooms(RoomDetails roomDetails);
    Room findByRoomId(int id);
    void updateRoom(Room room);
}
