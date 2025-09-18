package christian_ragonese.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Entity
@Table(name = "standings")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Standings {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private Team team;

    private Integer pos;
    private Integer played;
    private Integer won;
    private Integer drawn;
    private Integer lost;
    private Integer goalsFor;
    private Integer goalsAgainst;
    private Integer diff;
    private Integer pts;

    public Standings(UUID id, Team team, Integer pos, Integer played, Integer won, Integer drawn, Integer lost, Integer goalsFor, Integer goalsAgainst, Integer diff, Integer pts) {
        this.id = id;
        this.team = team;
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
