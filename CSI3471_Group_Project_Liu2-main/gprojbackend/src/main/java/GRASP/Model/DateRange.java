package GRASP.Model;

import jakarta.persistence.Embeddable;

import java.util.Calendar;

@Embeddable
public class DateRange {
    private Calendar startDate;
    private Calendar endDate;

    public DateRange(Calendar startDate, Calendar endDate) {
        if (endDate.before(startDate)) {
            throw new IllegalArgumentException("End date must be after start date.");
        }
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public DateRange() {}

    public Calendar getStartDate() {
        return startDate;
    }

    public Calendar getEndDate() {
        return endDate;
    }

    // Method to check if this DateRange overlaps with another
    public boolean overlaps(DateRange other) {
        return !this.endDate.before(other.startDate) && !this.startDate.after(other.endDate);
    }

    // Method to check if a specific date is within this range
    public boolean includes(Calendar date) {
        return !date.before(startDate) && !date.after(endDate);
    }

    @Override
    public String toString() {
        return "DateRange{" +
                "startDate=" + startDate.getTime() +
                ", endDate=" + endDate.getTime() +
                '}';
    }
}
