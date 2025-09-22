package christian_ragonese.runners;

import christian_ragonese.entities.Team;
import christian_ragonese.repositories.TeamRepository;
import christian_ragonese.services.StandingService;
import christian_ragonese.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class StatsUpdaterRunner implements CommandLineRunner {

    @Autowired
    private TeamService teamService;
    @Autowired
    private StandingService standingService;



    @Override
    public void run(String... args) throws Exception {
        List<Team> teams = teamService.findAll();

        for (Team team : teams) {
            Optional<Team> updatedStats = getUpdatedStatsForTeam(team.getName());
            if (updatedStats.isPresent()) {
                Team updated = updatedStats.get();
                team.setPos(updated.getPos());
                team.setPlayed(updated.getPlayed());
                team.setWon(updated.getWon());
                team.setDrawn(updated.getDrawn());
                team.setLost(updated.getLost());
                team.setGoalsFor(updated.getGoalsFor());
                team.setGoalsAgainst(updated.getGoalsAgainst());
                team.setDiff(updated.getDiff());
                team.setPts(updated.getPts());

                teamService.save(team);
            }
        }

        System.out.println("Statistiche squadre Serie A aggiornate.");
    }

    // Metodo di esempio per restituire dati aggiornati per una squadra
    private Optional<Team> getUpdatedStatsForTeam(String name) {
        // Simulazione dati aggiornati
        return switch (name) {
            case "Atalanta" -> Optional.of(new Team(name, 5, 4, 32, 2, 0, 9, 3, +6, 8));
            case "Bologna" -> Optional.of(new Team(name, 11, 4, 2, 0, 2, 3, 3, +0, 6));
            case "Cagliari" -> Optional.of(new Team(name, 7, 4, 2, 1, 1, 5, 3, +2, 7));
            case "Como" -> Optional.of(new Team(name, 8, 4, 2, 1, 1, 5, 3, +2, 7));
            case "Cremonese" -> Optional.of(new Team(name, 6, 4, 2, 2, 0, 5, 3, +2, 8));
            case "Fiorentina" -> Optional.of(new Team(name, 17, 4, 0, 2, 2, 3, 6, -3, 2));
            case "Genoa" -> Optional.of(new Team(name, 16, 4, 0, 2, 2, 2, 4, -2, 2));
            case "Verona" -> Optional.of(new Team(name, 15, 4, 0, 3, 1, 2, 6, -4, 3));
            case "Inter" -> Optional.of(new Team(name, 10, 4, 2, 0, 2, 11, 7, +4, 6));
            case "Juventus" -> Optional.of(new Team(name, 1, 4, 3, 1, 0, 8, 4, +4, 10));
            case "Lazio" -> Optional.of(new Team(name, 13, 4, 1, 0, 3, 4, 4, 0, 3));
            case "Lecce" -> Optional.of(new Team(name, 20, 4, 0, 1, 3, 2, 8, -6, 1));
            case "Milan" -> Optional.of(new Team(name, 2, 4, 3, 0, 1, 7, 2, +5, 9));
            case "Napoli" -> Optional.of(new Team(name, 3, 3, 3, 0, 0, 6, 1, +5, 9));
            case "Parma" -> Optional.of(new Team(name, 18, 4, 0, 2, 2, 1, 5, -4, 2));
            case "Pisa" -> Optional.of(new Team(name, 19, 3, 0, 1, 2, 1, 3, -2, 1));
            case "Roma" -> Optional.of(new Team(name, 4, 4, 3, 0, 1, 3, 1, +2, 9));
            case "Sassuolo" -> Optional.of(new Team(name, 14, 4, 1, 0, 3, 4, 7, -3, 3));
            case "Torino" -> Optional.of(new Team(name, 12, 4, 1, 1, 2, 1, 8, -7, 4));
            case "Udinese" -> Optional.of(new Team(name, 9, 4, 2, 1, 1, 4, 5, -1, 7));
            default -> Optional.empty();
        };
    }
}
