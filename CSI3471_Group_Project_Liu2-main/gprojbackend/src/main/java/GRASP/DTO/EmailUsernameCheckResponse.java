package GRASP.DTO;

public class EmailUsernameCheckResponse {
    private boolean exists;

    // Constructor
    public EmailUsernameCheckResponse(boolean exists) {
        this.exists = exists;
    }

    // Getter and Setter
    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }
}
