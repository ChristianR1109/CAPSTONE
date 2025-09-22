package christian_ragonese.runners;

import christian_ragonese.entities.Standings;
import christian_ragonese.payloads.StatsDTO;
import christian_ragonese.services.StandingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StandingsUpdaterRunner implements CommandLineRunner {

    @Autowired
    private StandingService standingService;

    @Override
    public void run(String... args) throws Exception {
        List<Standings> standingsList = standingService.findAll();

        for (Standings standings : standingsList) {
            var updated = getUpdatedStatsForTeam(standings.getTeam().getName());

            standings.setPos(updated.pos());
            standings.setPlayed(updated.played());
            standings.setWon(updated.won());
            standings.setDrawn(updated.drawn());
            standings.setLost(updated.lost());
            standings.setGoalsFor(updated.goalsFor());
            standings.setGoalsAgainst(updated.goalsAgainst());
            standings.setDiff(updated.diff());
            standings.setPts(updated.pts());
            standings.setLast5(updated.last5());

            standingService.save(standings);
        }
        System.out.println("Classifica Serie A aggiornata.");
    }

    private StatsDTO getUpdatedStatsForTeam(String name) {
        // Sostituisci con i dati reali quando disponibili
        return switch (name) {

            case "Atalanta" -> new StatsDTO(5, 4, 32, 2, 0, 9, 3, +6, 8, "DDWW");
            case "Bologna" -> new StatsDTO(11, 4, 2, 0, 2, 3, 3, +0, 6, "LWLW");
            case "Cagliari" -> new StatsDTO(7, 4, 2, 1, 1, 5, 3, +2, 7, "DLWW");
            case "Como" -> new StatsDTO(8, 4, 2, 1, 1, 5, 3, +2, 7, "WLDW");
            case "Cremonese" -> new StatsDTO(6, 4, 2, 2, 0, 5, 3, +2, 8, "WWDD");
            case "Fiorentina" -> new StatsDTO(17, 4, 0, 2, 2, 3, 6, -3, 2, "DDLL");
            case "Genoa" -> new StatsDTO(16, 4, 0, 2, 2, 2, 4, -2, 2, "DLDL");
            case "Verona" -> new StatsDTO(15, 4, 0, 3, 1, 2, 6, -4, 3, "DLDD");
            case "Inter" -> new StatsDTO(10, 4, 2, 0, 2, 11, 7, +4, 6, "WLLW");
            case "Juventus" -> new StatsDTO(1, 4, 3, 1, 0, 8, 4, +4, 10, "WWWD");
            case "Lazio" -> new StatsDTO(13, 4, 1, 0, 3, 4, 4, 0, 3, "LWLL");
            case "Lecce" -> new StatsDTO(20, 4, 0, 1, 3, 2, 8, -6, 1, "DLLL");
            case "Milan" -> new StatsDTO(2, 4, 3, 0, 1, 7, 2, +5, 9, "LWWW");
            case "Napoli" -> new StatsDTO(3, 3, 3, 0, 0, 6, 1, +5, 9, "WWW");
            case "Parma" -> new StatsDTO(18, 4, 0, 2, 2, 1, 5, -4, 2, "LDLD");
            case "Pisa" -> new StatsDTO(19, 3, 0, 1, 2, 1, 3, -2, 1, "DLL");
            case "Roma" -> new StatsDTO(4, 4, 3, 0, 1, 3, 1, +2, 9, "WWLW");
            case "Sassuolo" -> new StatsDTO(14, 4, 1, 0, 3, 4, 7, -3, 3, "LLWL");
            case "Torino" -> new StatsDTO(12, 4, 1, 1, 2, 1, 8, -7, 4, "LDWL");
            case "Udinese" -> new StatsDTO(9, 4, 2, 1, 1, 4, 5, -1, 7, "DWWL");

            default -> new StatsDTO(0, 0, 0, 0, 0, 0, 0, 0, 0, "");

        };
    }

}
    // Record di supporto per i dati aggiornati



