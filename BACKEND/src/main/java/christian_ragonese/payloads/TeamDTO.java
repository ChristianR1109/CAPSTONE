package christian_ragonese.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record TeamDTO(
        @NotEmpty(message = "Name is required.")
        @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters.")
        String name,

        @NotNull(message = "Played matches count is required.")
        @PositiveOrZero(message = "Played matches must be zero or positive.")
        Integer played,

        @NotNull(message = "Won matches count is required.")
        @PositiveOrZero(message = "Won matches must be zero or positive.")
        Integer won,

        @NotNull(message = "Drawn matches count is required.")
        @PositiveOrZero(message = "Drawn matches must be zero or positive.")
        Integer drawn,

        @NotNull(message = "Lost matches count is required.")
        @PositiveOrZero(message = "Lost matches must be zero or positive.")
        Integer lost,

        @NotNull(message = "Goals For is required.")
        @PositiveOrZero(message = "Goals For must be zero or positive.")
        Integer goalsFor,

        @NotNull(message = "Goals Against is required.")
        @PositiveOrZero(message = "Goals Against must be zero or positive.")
        Integer goalsAgainst,

        @NotNull(message = "last 5 are reqiored")
        String last5,

        @NotNull(message = "Logo is required.")

        String logo
) {
}
