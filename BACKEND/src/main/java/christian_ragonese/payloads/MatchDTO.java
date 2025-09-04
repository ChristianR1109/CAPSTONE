package christian_ragonese.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.aspectj.bridge.IMessage;

import java.time.LocalDate;
import java.util.UUID;

public record MatchDTO(
        @NotEmpty(message = "Match title is required.")
        @Size(message = "Match title must be between 3 and 40 characters.")
        String matchTitle,
        @NotEmpty(message = "Location is required.")
        @Size(message = "Location must be between 3 and 40 characters.")
        String location,
        @NotNull(message = "Date is required")
        LocalDate date,
        @NotNull(message = "Team1 Id is required. ")
        UUID team1Id,
        @NotNull(message = "Team2 Id is required. ")
        UUID team2Id

) {
}
