package christian_ragonese.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record MatchUpdateDTO(
        @NotNull(message = "Match ID is required for update")
        UUID id,

        @NotEmpty(message = "Match title is required")
        @Size(min = 3, max = 40, message = "Match title must be between 3 and 40 characters")
        String matchTitle,

        @NotEmpty(message = "Location is required")
        @Size(min = 3, max = 40, message = "Location must be between 3 and 40 characters")
        String location,

        @NotNull(message = "Date is required")
        LocalDate date,

        @NotNull(message = "Team1 Id is required")
        UUID team1Id,

        @NotNull(message = "Team2 Id is required")
        UUID team2Id)
{
    @Override
    public UUID id() {
        return id;
    }

    @Override
    public String matchTitle() {
        return matchTitle;
    }

    @Override
    public String location() {
        return location;
    }

    @Override
    public LocalDate date() {
        return date;
    }

    @Override
    public UUID team1Id() {
        return team1Id;
    }

    @Override
    public UUID team2Id() {
        return team2Id;
    }

    public UUID getId() {
        return id;
    }
}
