package christian_ragonese.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "teams")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Team {
    @Id
    @GeneratedValue
    @Column(name = "team_id", nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "name", nullable = false)
    private String name;
    private Integer pos;
    private Integer played;
    private Integer won;
    private Integer drawn;
    private Integer lost;
    private Integer goalsFor;
    private Integer goalsAgainst;
    private Integer diff;
    private Integer pts;

    @OneToMany(mappedBy = "team1")
    @JsonManagedReference(value = "team1-matches")
    private List<Match> matchesAsTeam1;

    @OneToMany(mappedBy = "team2")
    @JsonManagedReference(value = "team2-matches")
    private List<Match> matchesAsTeam2;

    public Team(String name, Integer pos, Integer played, Integer won, Integer drawn, Integer lost, Integer goalsFor, Integer goalsAgainst, Integer diff, Integer pts) {
        this.name = name;
        this.pos = pos;
        this.played = played;
        this.won = won;
        this.drawn = drawn;
        this.lost = lost;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.diff = diff;
        this.pts = pts;
    }

}
