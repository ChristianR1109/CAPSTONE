//package christian_ragonese.runners;
//
//import christian_ragonese.entities.Match;
//import christian_ragonese.exceptions.NotFoundException;
//import christian_ragonese.payloads.MatchDTO;
//import christian_ragonese.services.MatchService;
//import christian_ragonese.services.TeamService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.util.UUID;
//
//@Component
//public class MatchUpdaterRunner implements CommandLineRunner {
//
//    @Autowired
//    private MatchService matchService;
//
//    @Autowired
//    private TeamService teamService;
//
//    @Override
//    public void run(String... args) throws Exception {
//        // Modifica il valore qui secondo il match che vuoi editare
//        UUID matchIdToEdit = UUID.fromString("");
//
//        MatchDTO updatedData = new MatchDTO(
//                "Sassuolo vs Udinese",
//                "Mapei Stadium",
//                LocalDate.of(2025, 10, 15),
//                UUID.fromString("7549e0c6-d0e6-4406-b991-3b9719b276be"),
//                UUID.fromString("b2e4d429-56da-4b9c-984b-46e68b3f8c55")
//        );
//
//        var matchOptional = matchService.findById(matchIdToEdit);
//
//        try {
//            Match matchToUpdate = matchService.findById(matchIdToEdit);
//            matchToUpdate.setMatchTitle(updatedData.matchTitle());
//            matchToUpdate.setLocation(updatedData.location());
//            matchToUpdate.setDate(updatedData.date());
//
//            var team1 = teamService.findById(updatedData.team1Id());
//            if(team1 != null){
//                matchToUpdate.setTeam1(team1);
//            }
//
//            var team2 = teamService.findById(updatedData.team2Id());
//            if(team2 != null){
//                matchToUpdate.setTeam2(team2);
//            }
//            matchService.save(matchToUpdate);
//            System.out.println("Match aggiornato: " + updatedData.matchTitle());
//        } catch (NotFoundException e) {
//            System.err.println("Match con ID " + matchIdToEdit + " non trovato.");
//        }
//
//    }
//}
