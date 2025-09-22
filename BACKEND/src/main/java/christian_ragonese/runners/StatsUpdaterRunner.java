package christian_ragonese.runners;

import christian_ragonese.entities.Team;
import christian_ragonese.payloads.StatsDTO;
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
            StatsDTO updatedStats = getUpdatedStatsForTeam(team.getName());

                if(updatedStats !=null) {
                    team.setWon(updatedStats.won());
                    team.setDrawn(updatedStats.drawn());
                    team.setLost(updatedStats.lost());
                    team.setGoalsFor(updatedStats.goalsFor());
                    team.setGoalsAgainst(updatedStats.goalsAgainst());
                    team.setLast5(updatedStats.last5());
                    team.setLogo(updatedStats.logo());

                    teamService.save(team);
                }
        }

        System.out.println("Statistiche squadre Serie A aggiornate.");
    }

    // Metodo di esempio per restituire dati aggiornati per una squadra
    private StatsDTO getUpdatedStatsForTeam(String name) {
        // Simulazione dati aggiornati
        return switch (name) {
            case "Atalanta" -> new StatsDTO( 2, 2, 0, 9, 3,  "DDWW", "DDWW");
            case "Bologna" -> new StatsDTO( 2, 0, 2, 3, 3, "LWLW", "LWLW");
            case "Cagliari" -> new StatsDTO( 2, 1, 1, 5, 3,  "DLWW", "DLWW");
            case "Como" -> new StatsDTO( 2, 1, 1, 5, 3,  "WLDN", "WLDW");
            case "Cremonese" -> new StatsDTO( 2, 2, 0, 5, 3,  "WWDD", "WWDD");
            case "Fiorentina" -> new StatsDTO( 0, 2, 2, 3, 6,  "DDLL", "DDLL");
            case "Genoa" -> new StatsDTO( 0, 2, 2, 2, 4,  "DLDL", "DLDL");
            case "Verona" -> new StatsDTO( 0, 3, 1, 2, 6,  "DLDD", "DLDD");
            case "Inter" -> new StatsDTO(2, 0, 2, 11, 7,  "WLLW", "WLLW");
            case "Juventus" -> new StatsDTO( 3, 1, 0, 8, 4, "WWWD", "WWWD");
            case "Lazio" -> new StatsDTO( 1, 0, 3, 4, 4, "LWLL", "LWLL");
            case "Lecce" -> new StatsDTO( 0, 1, 3, 2, 8,  "DLLL", "DLLL");
            case "Milan" -> new StatsDTO( 3, 0, 1, 7, 2,  "LWWW", "LWWW");
            case "Napoli" -> new StatsDTO( 4, 0, 0, 9, 3,  "WWWW", "WWWW");
            case "Parma" -> new StatsDTO( 0, 2, 2, 1, 5,  "LDLD", "LDLD");
            case "Pisa" -> new StatsDTO( 0, 1, 3, 3, 6,  "DLLL", "DLLL");
            case "Roma" -> new StatsDTO( 3, 0, 1, 3, 1,  "WWLW", "WWLW");
            case "Sassuolo" -> new StatsDTO( 1, 0, 3, 4, 7,  "LLWL", "LLWL");
            case "Torino" -> new StatsDTO( 1, 1, 2, 1, 8,  "LDWL", "LDWL");
            case "Udinese" -> new StatsDTO( 2, 1, 1, 4, 5,  "DWWL", "DWWL");

            default -> new StatsDTO( 0, 0, 0, 0, 0,  "", "");
        };
    }
}
