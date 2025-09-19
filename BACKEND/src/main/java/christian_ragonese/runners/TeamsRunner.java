package christian_ragonese.runners;

import christian_ragonese.entities.Team;
import christian_ragonese.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamsRunner implements CommandLineRunner {
    @Autowired
    private TeamRepository teamRepository;

    public TeamsRunner(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (teamRepository.count() > 0) {
            return; // Il database è già popolato
        }

        List<Team> teams2026 = List.of(
                new Team("Napoli", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Atalanta", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Inter", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Lazio", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("AC Milan", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Roma", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Torino", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Fiorentina", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Spezia", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Udinese", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Monza", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Sassuolo", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Empoli", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Lecce", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Verona", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Cremonense", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Bologna", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Salernitana", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Sampdoria", 0, 0, 0, 0, 0, 0, 0, 0, 0),
                new Team("Juventus", 0, 0, 0, 0, 0, 0, 0, 0, 0)
        );

        teamRepository.saveAll(teams2026);

        System.out.println("Squadre Serie A 2025-2026 inserite nel database.");
    }
}
