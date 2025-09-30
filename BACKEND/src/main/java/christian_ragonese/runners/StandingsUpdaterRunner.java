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
           if(standings.getTeam() == null){
               System.out.println("standings senza team, id =" + standings.getId());
               continue;
           }

    var updated = getUpdatedStatsForTeam(standings.getTeam().getName());
            standings.setWon(updated.won());
            standings.setDrawn(updated.drawn());
            standings.setLost(updated.lost());
            standings.setGoalsFor(updated.goalsFor());
            standings.setGoalsAgainst(updated.goalsAgainst());
            standings.setLast5(updated.last5());

            standingService.save(standings);
        }
        System.out.println("Classifica Serie A aggiornata.");
    }

    private StatsDTO getUpdatedStatsForTeam(String name) {
        // Sostituisci con i dati reali quando disponibili
        return switch (name) {

            case "Atalanta" -> new StatsDTO( 2, 3, 0, 10, 4,  "DDWWD", "https://upload.wikimedia.org/wikipedia/it/thumb/8/81/Logo_Atalanta_Bergamo.svg/800px-Logo_Atalanta_Bergamo.svg.png");
            case "Bologna" -> new StatsDTO( 2, 1, 2, 5, 5, "LWLWD", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bologna_F.C._1909_logo.svg/244px-Bologna_F.C._1909_logo.svg.png");
            case "Cagliari" -> new StatsDTO( 2, 1, 2, 5, 5,  "DLWWL", "https://upload.wikimedia.org/wikipedia/it/thumb/8/88/Cagliari_calcio.svg/800px-Cagliari_calcio.svg.png");
            case "Como" -> new StatsDTO( 2, 2, 1, 1, 1,  "WLDWD", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg/726px-Calcio_Como_-_logo_%28Italy%2C_2019-%29.svg.png");
            case "Cremonese" -> new StatsDTO( 2, 3, 0, 6, 4,  "WWDDD", "https://upload.wikimedia.org/wikipedia/it/thumb/2/23/Unione_Sportiva_Cremonese_logo.svg/330px-Unione_Sportiva_Cremonese_logo.svg.png");
            case "Fiorentina" -> new StatsDTO( 0, 3, 2, 3, 6,  "DDLLD", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg/1024px-ACF_Fiorentina_-_logo_%28Italy%2C_2022%29.svg.png");
            case "Genoa" -> new StatsDTO( 0, 2, 3, 2, 7,  "DLDLL", "https://upload.wikimedia.org/wikipedia/it/thumb/9/99/Genoa_Cricket_and_Football_Club_logo.svg/800px-Genoa_Cricket_and_Football_Club_logo.svg.png");
            case "Verona" -> new StatsDTO( 0, 3, 2, 2, 8,  "DLDDL", "https://upload.wikimedia.org/wikipedia/it/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/800px-Hellas_Verona_FC_logo_%282020%29.svg.png");
            case "Inter" -> new StatsDTO(3, 0, 2, 13, 7,  "WLLWW", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1024px-FC_Internazionale_Milano_2021.svg.png");
            case "Juventus" -> new StatsDTO( 3, 2, 0, 9, 5, "WWWDD", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/246px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png");
            case "Lazio" -> new StatsDTO( 2, 0, 3, 7, 4, "LWLLW", "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg/1280px-Stemma_della_Societ%C3%A0_Sportiva_Lazio.svg.png");
            case "Lecce" -> new StatsDTO( 0, 2, 3, 4, 10,  "DLLLD", "https://upload.wikimedia.org/wikipedia/it/thumb/3/36/US_Lecce_Stemma.svg/720px-US_Lecce_Stemma.svg.png?20241002144328");
            case "Milan" -> new StatsDTO( 4, 0, 1, 9, 3,  "LWWWW", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/541px-Logo_of_AC_Milan.svg.png");
            case "Napoli" -> new StatsDTO( 4, 0, 1, 10, 5,  "WWWWL", "https://images.seeklogo.com/logo-png/55/2/ssc-napoli-logo-png_seeklogo-550076.png");
            case "Parma" -> new StatsDTO( 1, 2, 2, 2, 6,  "LDLDW", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_Parma_Calcio_1913_%28adozione_2016%29.svg/800px-Logo_Parma_Calcio_1913_%28adozione_2016%29.svg.png");
            case "Pisa" -> new StatsDTO( 0, 2, 3, 3, 6,  "DLLLD", "https://upload.wikimedia.org/wikipedia/it/thumb/d/d7/Logo_Pisa_SC_2017.svg/800px-Logo_Pisa_SC_2017.svg.png");
            case "Roma" -> new StatsDTO( 4, 0, 1, 5, 1,  "WWLWW", "https://upload.wikimedia.org/wikipedia/it/thumb/0/0e/AS_Roma_Logo_2017.svg/800px-AS_Roma_Logo_2017.svg.png");
            case "Sassuolo" -> new StatsDTO( 2, 0, 3, 7, 1,  "LLWLW", "https://upload.wikimedia.org/wikipedia/it/thumb/a/a4/Ussassuolostemma.svg/800px-Ussassuolostemma.svg.png");
            case "Torino" -> new StatsDTO( 1, 1, 3, 2, 10,  "LDWLL", "https://upload.wikimedia.org/wikipedia/it/thumb/0/04/Torino_FC_logo.svg/800px-Torino_FC_logo.svg.png");
            case "Udinese" -> new StatsDTO( 2, 1, 2, 1, 8,  "DWWLL", "https://upload.wikimedia.org/wikipedia/it/thumb/a/ae/Logo_Udinese_Calcio_2010.svg/1024px-Logo_Udinese_Calcio_2010.svg.png");

            default -> new StatsDTO( 0, 0, 0, 0, 0,  "", "");

        };
    }

}
    // Record di supporto per i dati aggiornati



