package christian_ragonese.runners;



import christian_ragonese.entities.Team;
import christian_ragonese.entities.Standings;

import christian_ragonese.services.StandingService;
import christian_ragonese.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

    @Component
    public class StandingsRunner  implements CommandLineRunner {

        @Autowired
        private TeamService teamService;
        @Autowired
        private StandingService standingsService;

        @Override
        public void run(String... args) throws Exception {
            if (standingsService.count() > 0) {
                return; // Già popolata
            }
            List<Team> teams = teamService.findAll();
            for (Team team : teams) {
                Standings standings = new Standings(
                        team, // team
                        0,    // pos
                        0,    // played
                        0,    // won
                        0,    // drawn
                        0,    // lost
                        0,    // goalsFor
                        0,    // goalsAgainst
                        0,    // diff
                        0,     // pts
                        "-----" //last5
                );
                standingsService.save(standings);
            }
            System.out.println("Classifica Serie A inizializzata.");
        }
    }


