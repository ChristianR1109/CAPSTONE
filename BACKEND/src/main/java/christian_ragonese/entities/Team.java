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

    @OneToMany(mappedBy = "team1")
    @JsonManagedReference(value = "team1-matches")
    private List<Match> matchesAsTeam1;

    @OneToMany(mappedBy = "team2")
    @JsonManagedReference(value = "team2-matches")
    private List<Match> matchesAsTeam2;


    public Team(String name){
this.name=name;
    }
}
