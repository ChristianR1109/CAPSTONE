package christian_ragonese.runners;

import christian_ragonese.entities.Match;
import christian_ragonese.entities.Team;
import christian_ragonese.services.MatchService;
import christian_ragonese.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Component
public class MatchesRunner implements CommandLineRunner {

    @Autowired
    private MatchService matchService;

    @Autowired
    private TeamService teamService;

    @Override
    public void run(String... args) throws Exception {
        List<Team> teams = teamService.findAll();

        Map<String, Team> teamMap = new HashMap<>();
        for (Team t : teams) {
            teamMap.put(t.getName(), t);
        }

        List<Match> newMatches = new ArrayList<>();



        List<Match> day6 = List.of(
                new Match("Verona vs Sassuolo", "Stadio Marcantonio Bentegodi", LocalDate.of(2025,10,3), teamMap.get("Verona"), teamMap.get("Sassuolo")),
                new Match("Lazio vs Torino", "Stadio Olimpico", LocalDate.of(2025, 10,4), teamMap.get("Lazio"), teamMap.get("Torino")),
                new Match("Parma vs Lecce", "Ennio Tardini", LocalDate.of(2025, 10,4), teamMap.get("Parma"), teamMap.get("Lecce")),
                new Match("Inter vs Cremonese", "San Siro", LocalDate.of(2025, 10,4), teamMap.get("Inter"), teamMap.get("Cremonese")),
                new Match("Atalanta vs Como", "New Balance Arena", LocalDate.of(2025, 10,4), teamMap.get("Atalanta"), teamMap.get("Como")),
                new Match("Udinese vs Cagliari", "Bluenergy Stadium", LocalDate.of(2025, 10,5), teamMap.get("Udinese"), teamMap.get("Cagliari")),
                new Match("Bologna vs Pisa", "Renato Dall'Ara", LocalDate.of(2025, 10,5), teamMap.get("Bologna"), teamMap.get("Pisa")),
                new Match("Fiorentina vs Roma", "Stadio Artemio Franchi", LocalDate.of(2025, 10,5), teamMap.get("Fiorentina"), teamMap.get("Roma")),
                new Match("Napoli vs Genoa", "Stadio Diego Armando Maradona", LocalDate.of(2025, 10,5), teamMap.get("Napoli"), teamMap.get("Genoa")),
                new Match("Juventus vs Milan", "Allianz Stadium", LocalDate.of(2025, 10,5), teamMap.get("Juventus"), teamMap.get("Milan"))
        );

        List<Match> day7 = List.of(
                new Match("Lecce vs Sassuolo", "Via del Mare", LocalDate.of(2025,10,18), teamMap.get("Lecce"), teamMap.get("Sassuolo")),
                new Match("Pisa vs Verona", "Arena Garibaldi-Romeo Anconetani", LocalDate.of(2025, 10,18), teamMap.get("Pisa"), teamMap.get("Verona")),
                new Match("Torino vs Napoli", "Stadio Olimpico Grande Torino", LocalDate.of(2025, 10,18), teamMap.get("Torino"), teamMap.get("Napoli")),
                new Match("Roma vs Inter", "Stadio Olimpico", LocalDate.of(2025, 10,18), teamMap.get("Roma"), teamMap.get("Inter")),
                new Match("Como vs Juventus", "Stadio Giuseppe Sinigaglia", LocalDate.of(2025, 10,19), teamMap.get("Como"), teamMap.get("Juventus")),
                new Match("Cagliari vs Bologna", "Unipol Domus", LocalDate.of(2025, 10,19), teamMap.get("Cagliari"), teamMap.get("Bologna")),
                new Match("Genoa vs Parma", "Luigi Ferraris", LocalDate.of(2025, 10,19), teamMap.get("Genoa"), teamMap.get("Parma")),
                new Match("Atalanta vs Lazio", "New Balance Arena", LocalDate.of(2025, 10,19), teamMap.get("Atalanta"), teamMap.get("Lazio")),
                new Match("Milan vs Fiorentina", "San Siro", LocalDate.of(2025, 10,19), teamMap.get("Milan"), teamMap.get("Fiorentina")),
                new Match("Cremonese vs Udinese", "Stadio Giovanni Zini", LocalDate.of(2025, 10,20), teamMap.get("Cremonese"), teamMap.get("Udinese"))
        );

        List<Match> day8 = List.of(
                new Match("Milan vs Pisa", "San Siro", LocalDate.of(2025,10,25), teamMap.get("Milan"), teamMap.get("Pisa")),
                new Match("Parma vs Como", "Ennio Tardini", LocalDate.of(2025, 10,25), teamMap.get("Parma"), teamMap.get("Como")),
                new Match("Udinese vs Lecce", "Bluenergy Stadium", LocalDate.of(2025, 10,25), teamMap.get("Udinese"), teamMap.get("Lecce")),
                new Match("Napoli vs Inter", "Stadio Diego Armando Maradona", LocalDate.of(2025, 10,25), teamMap.get("Napoli"), teamMap.get("Inter")),
                new Match("Cremonese vs Atalanta", "Stadio Giovanni Zini", LocalDate.of(2025, 10,25), teamMap.get("Cremonese"), teamMap.get("Atalanta")),
                new Match("Torino vs Genoa", "Stadio Olimpico Grande Torino", LocalDate.of(2025, 10,25), teamMap.get("Torino"), teamMap.get("Genoa")),
                new Match("Verona vs Cagliari", "Stadio Marcantonio Bentegodi", LocalDate.of(2025, 10,25), teamMap.get("Verona"), teamMap.get("Cagliari")),
                new Match("Sassuolo vs Roma", "Mapei Stadium", LocalDate.of(2025, 10,25), teamMap.get("Sassuolo"), teamMap.get("Roma")),
                new Match("Fiorentina vs Bologna", "Stadio Artemio Franchi", LocalDate.of(2025, 10,25), teamMap.get("Fiorentina"), teamMap.get("Bologna")),
                new Match("Lazio vs Juventus", "Stadio Olimpico", LocalDate.of(2025, 10,25), teamMap.get("Lazio"), teamMap.get("Juventus"))
        );


        for (Match match : day8) {
            boolean exists = matchService.findByMatchTitle(match.getMatchTitle()).isPresent();
            if (!exists) {
                newMatches.add(match);
            }
        }

        if (!newMatches.isEmpty()) {
            matchService.saveAll(newMatches);
            System.out.println("Inseriti nuovi match: " + newMatches.size());
        } else {
            System.out.println("Nessun nuovo match da inserire, tutti i match esistono già.");
        }

    }


}
