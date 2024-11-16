package GRASP.Service;

import GRASP.Model.Room;
import GRASP.Model.RoomDetails;
import GRASP.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    @Transactional
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room findByRoomId(int roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        return room.orElse(null); // Return the room if found, otherwise return null
    }

    @Override
    public List<Room> searchForRooms(RoomDetails roomDetails) {
        List<Room> allRooms = roomRepository.findAll(); // Retrieve all rooms from repository

        return allRooms.stream()
                .filter(room -> {
                    RoomDetails details = room.getDetails();
                    // Check each attribute; only keep rooms that match all criteria
                    boolean matchesBeds = roomDetails.getNumBeds() == 0 || details.getNumBeds() == roomDetails.getNumBeds();
                    boolean matchesBedType = roomDetails.getBedType().isEmpty() || details.getBedType().equals(roomDetails.getBedType());
                    boolean matchesRoomType = roomDetails.getRoomType().isEmpty() || details.getRoomType().equals(roomDetails.getRoomType());
                    boolean matchesSmokingStatus = details.isSmokingStatus() == roomDetails.isSmokingStatus();
                    boolean matchesFloor = roomDetails.getFloor() == 0 || details.getFloor() == roomDetails.getFloor();

                    return matchesBeds && matchesBedType && matchesRoomType && matchesSmokingStatus && matchesFloor;
                })
                .collect(Collectors.toList()); // Collect and return the matching rooms

    }

    @Override
    public void updateRoom(Room room) {
        roomRepository.save(room); // Save or update room details
    }
}
