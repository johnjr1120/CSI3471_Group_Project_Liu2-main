package GRASP.Model;

import jakarta.persistence.*;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import java.util.List;
import java.util.ArrayList;

@Embeddable
public class RoomDetails {
    private int numBeds;
    private String bedType;
    private String roomType;
    private boolean smokingStatus;
    @ElementCollection
    private List<DateRange> unavailableList;
    private int floor;

    public RoomDetails(int numBeds, String bedType, String roomType, boolean smokingStatus, List<DateRange> unavailableList, int floor) {
        this.numBeds = numBeds;
        this.bedType = bedType;
        this.roomType = roomType;
        this.smokingStatus = smokingStatus;
        this.unavailableList = unavailableList;
        this.floor = floor;
    }

    public RoomDetails() {
        numBeds = 0;
        bedType = "";
        roomType = "";
        smokingStatus = false;
        unavailableList = new ArrayList<>();
        floor = 0;
    }

    public int getNumBeds() {
        return numBeds;
    }

    public void setNumBeds(int numBeds) {
        this.numBeds = numBeds;
    }

    public String getBedType() {
        return bedType;
    }

    public void setBedType(String bedType) {
        this.bedType = bedType;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public boolean isSmokingStatus() {
        return smokingStatus;
    }

    public void setSmokingStatus(boolean smokingStatus) {
        this.smokingStatus = smokingStatus;
    }

    public List<DateRange> getUnavailableList() {
        return unavailableList;
    }

    public void setUnavailableList(List<DateRange> unavailableList) {
        this.unavailableList = unavailableList;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    @Override
    public String toString() {
        return "RoomDetails{" +
                "numBeds=" + numBeds +
                ", bedType='" + bedType + '\'' +
                ", roomType='" + roomType + '\'' +
                ", smokingStatus=" + smokingStatus +
                //currently skipping availabilityMap
                ", floor=" + floor +
                '}';
    }
}
