package christian_ragonese.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record TeamDTO(
        @NotEmpty(message = "Name is required.")
        @Size(min = 2, max = 30, message = "Username must be between 2 and  30 characters. ")
        String name
) {
}
