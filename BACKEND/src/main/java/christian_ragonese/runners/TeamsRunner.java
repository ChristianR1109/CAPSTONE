package christian_ragonese.runners;

import christian_ragonese.entities.Team;
import christian_ragonese.repositories.TeamRepository;
import christian_ragonese.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamsRunner implements CommandLineRunner {
    @Autowired
    private TeamService teamService;



    @Override
    public void run(String... args) throws Exception {
        if (teamService.count() > 0) {
            return; // Il database è già popolato
        }

        List<Team> teams2026 = List.of(
                new Team("Atalanta",0, 0, 0, 0, 0,  "",""),
                new Team("Bologna", 0, 0, 0, 0, 0,  "",""),
                new Team("Cagliari", 0, 0, 0, 0, 0,  "",""),
                new Team("Como", 0, 0, 0, 0, 0,  "",""),
                new Team("Cremonese", 0, 0, 0, 0, 0,  "",""),
                new Team("Fiorentina", 0, 0, 0, 0, 0,  "",""),
                new Team("Genoa", 0, 0, 0, 0, 0,  "",""),
                new Team("Verona", 0, 0, 0, 0, 0,  "",""),
                new Team("Inter", 0, 0, 0, 0, 0,  "",""),
                new Team("Juventus",0, 0, 0, 0, 0,  "",""),
                new Team("Lazio",0, 0, 0, 0, 0,  "",""),
                new Team("Lecce", 0, 0, 0, 0, 0,  "",""),
                new Team("Milan", 0, 0, 0, 0, 0,  "",""),
                new Team("Napoli", 0, 0, 0, 0, 0,  "",""),
                new Team("Parma",0, 0, 0, 0, 0,  "",""),
                new Team("Pisa", 0, 0, 0, 0, 0,  "",""),
                new Team("Roma",0, 0, 0, 0, 0,  "",""),
                new Team("Sassuolo", 0, 0, 0, 0, 0,  "",""),
                new Team("Torino",0, 0, 0, 0, 0,  "",""),
                new Team("Udinese", 0, 0, 0, 0, 0,  "","" )
        );

        teamService.saveAll(teams2026);

        System.out.println("Squadre Serie A 2025-2026 inserite nel database.");
    }
}
