package christian_ragonese.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class   Match {
    @Id
    @GeneratedValue
    @Column(name = "match_id", nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "match_title")
    private String matchTitle;
    private String location;
    private LocalDate date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team1")
    @JsonBackReference(value = "team1-matches")
    private Team team1;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team2")
    @JsonBackReference(value = "team2-matches")
    private Team team2;

    public Match(String matchTitle, String location, LocalDate date, Team team1, Team team2) {
        this.matchTitle = matchTitle;
        this.location = location;
        this.date = date;
        this.team1= team1;
        this.team2= team2;
    }

    public Match(String matchTitle, String location, LocalDate date) {
        this.matchTitle = matchTitle;
        this.location = location;
        this.date = date;
    }

    public void ifPresentOrElse(Object o, Object o1) {

    }
}
