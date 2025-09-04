package christian_ragonese.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Match {
    @Id
    @GeneratedValue
    @Column(name = "match_id", nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "match_title")
    private String matchTitle;
    private String location;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "team1")
    private Team team1;

    @ManyToOne
    @JoinColumn(name = "team2")
    private Team team2;

    public Match(String matchTitle, String location, LocalDate date, UUID team1Id, UUID team2Id) {
        this.matchTitle = matchTitle;
        this.location = location;
        this.date = date;

    }
}
