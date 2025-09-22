//package christian_ragonese.runners;
//
//import christian_ragonese.entities.Match;
//import christian_ragonese.entities.Team;
//import christian_ragonese.services.MatchService;
//import christian_ragonese.services.TeamService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//
//
//@Component
//public class MatchesRunner implements CommandLineRunner {
//
//    @Autowired
//    private MatchService matchService;
//
//    @Autowired
//    private TeamService teamService;
//
//    @Override
//    public void run(String... args) throws Exception {
//        List<Team> teams = teamService.findAll();
//
//        Map<String, Team> teamMap = new HashMap<>();
//        for (Team t : teams) {
//            teamMap.put(t.getName(), t);
//        }
//
//        List<Match> newMatches = new ArrayList<>();
//
//
//        // Lista di match da inserire (esempio)
//        List<Match> tentativeMatches = List.of(
//                new Match("Como vs Cremonese", "Stadio Giuseppe Sinigaglia", LocalDate.of(2025,9,27), teamMap.get("Como"), teamMap.get("Cremonese")),
//                new Match("Juventus vs Atalanta", "Allianz Stadium", LocalDate.of(2025, 9,27), teamMap.get("Juventus"), teamMap.get("Atalanta")),
//                new Match("Cagliari vs Inter", "Unipol Domus", LocalDate.of(2025, 9,27), teamMap.get("Cagliari"), teamMap.get("Inter")),
//                new Match("Sassuolo vs Udinese", "Mapei Stadium", LocalDate.of(2025, 9,28), teamMap.get("Sassuolo"), teamMap.get("Udinese")),
//                new Match("Pisa vs Fiorentina", "Arena Garibaldi-Romeo Anconetani", LocalDate.of(2025, 9,28), teamMap.get("Pisa"), teamMap.get("Fiorentina")),
//                new Match("Roma vs Verona", "Stadio Olimpico", LocalDate.of(2025, 9,28), teamMap.get("Roma"), teamMap.get("Verona")),
//                new Match("Lecce vs Bologna", "Via Del Mare", LocalDate.of(2025, 9,28), teamMap.get("Lecce"), teamMap.get("Bologna")),
//                new Match("Milan vs Napoli", "San Siro", LocalDate.of(2025, 9,28), teamMap.get("Milan"), teamMap.get("Napoli")),
//                new Match("Parma vs Torino", "Ennio Tardini", LocalDate.of(2025, 9,29), teamMap.get("Parma"), teamMap.get("Torino")),
//                new Match("Genoa vs Lazio", "Luigi Ferraris", LocalDate.of(2025, 9,29), teamMap.get("Genoa"), teamMap.get("Lazio"))
//        );
//
//        for (Match match : tentativeMatches) {
//            boolean exists = matchService.findByMatchTitle(match.getMatchTitle()).isPresent();
//            if (!exists) {
//                newMatches.add(match);
//            }
//        }
//
//        if (!newMatches.isEmpty()) {
//            matchService.saveAll(newMatches);
//            System.out.println("Inseriti nuovi match: " + newMatches.size());
//        } else {
//            System.out.println("Nessun nuovo match da inserire, tutti i match esistono già.");
//        }
//    }
//
//
//}
