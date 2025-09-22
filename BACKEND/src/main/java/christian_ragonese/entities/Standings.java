package christian_ragonese.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "standings")
@Getter
@Setter
@AllArgsConstructor
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
    @Column(name = "last5")
    private String last5;


    public Standings(Team team, Integer pos, Integer played, Integer won, Integer drawn, Integer lost, Integer goalsFor, Integer goalsAgainst, Integer diff, Integer pts, String last5) {
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
        this.last5=last5;
    }

}
