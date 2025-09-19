package christian_ragonese.runners;

import christian_ragonese.entities.Team;
import christian_ragonese.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class StatsUpdaterRunner implements CommandLineRunner {

    @Autowired
    private TeamRepository teamRepository;

    public StatsUpdaterRunner(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Team> teams = teamRepository.findAll();

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

                teamRepository.save(team);
            }
        }

        System.out.println("Statistiche squadre Serie A aggiornate.");
    }

    // Metodo di esempio per restituire dati aggiornati per una squadra
    private Optional<Team> getUpdatedStatsForTeam(String name) {
        // Simulazione dati aggiornati
        return switch (name) {
            case "Napoli" -> Optional.of(new Team(name, 1, 38, 28, 6, 4, 85, 30, 55, 90));
            case "Atalanta" -> Optional.of(new Team(name, 2, 38, 25, 7, 6, 75, 40, 35, 82));
            case "Inter" -> Optional.of(new Team(name, 3, 38, 24, 8, 6, 70, 35, 35, 80));
            case "Lazio" -> Optional.of(new Team(name, 4, 38, 20, 10, 8, 60, 45, 15, 70));
            case "AC Milan" -> Optional.of(new Team(name, 5, 38, 19, 9, 10, 58, 50, 8, 66));
            case "Roma" -> Optional.of(new Team(name, 6, 38, 18, 8, 12, 54, 48, 6, 62));
            case "Torino" -> Optional.of(new Team(name, 7, 38, 16, 9, 13, 50, 52, -2, 57));
            case "Fiorentina" -> Optional.of(new Team(name, 8, 38, 15, 10, 13, 48, 50, -2, 55));
            case "Spezia" -> Optional.of(new Team(name, 9, 38, 14, 11, 13, 46, 52, -6, 53));
            case "Udinese" -> Optional.of(new Team(name, 10, 38, 12, 12, 14, 42, 48, -6, 48));
            case "Monza" -> Optional.of(new Team(name, 11, 38, 12, 10, 16, 45, 60, -15, 46));
            case "Sassuolo" -> Optional.of(new Team(name, 12, 38, 11, 11, 16, 40, 50, -10, 44));
            case "Pisa" -> Optional.of(new Team(name, 13, 38, 10, 10, 18, 38, 55, -17, 40));
            case "Lecce" -> Optional.of(new Team(name, 14, 38, 9, 11, 18, 35, 58, -23, 38));
            case "Verona" -> Optional.of(new Team(name, 15, 38, 8, 12, 18, 33, 57, -24, 36));
            case "Cremonense" -> Optional.of(new Team(name, 16, 38, 7, 11, 20, 30, 60, -30, 32));
            case "Bologna" -> Optional.of(new Team(name, 17, 38, 7, 8, 23, 28, 65, -37, 29));
            case "" -> Optional.of(new Team(name, 18, 38, 6, 10, 22, 27, 62, -35, 28));
            case "" -> Optional.of(new Team(name, 19, 38, 5, 11, 22, 25, 63, -38, 26));
            case "Juventus" -> Optional.of(new Team(name, 20, 38, 4, 12, 22, 22, 60, -38, 24));
            default -> Optional.empty();
        };
    }
}
