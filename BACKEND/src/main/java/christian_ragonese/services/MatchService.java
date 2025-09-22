package christian_ragonese.services;

import christian_ragonese.entities.Match;
import christian_ragonese.entities.Team;
import christian_ragonese.exceptions.BadRequestException;
import christian_ragonese.exceptions.NotFoundException;
import christian_ragonese.payloads.MatchDTO;
import christian_ragonese.payloads.MatchRespDTO;
import christian_ragonese.payloads.TeamDTO;
import christian_ragonese.repositories.MatchRepository;
import christian_ragonese.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MatchService {
@Autowired
    private MatchRepository matchRepository;
@Autowired
private TeamService teamService;

    public Page<Match> findAllMatches(int page, int size, String sortBy) {
        if (size > 20) size = 20;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return matchRepository.findAll(pageable);
    }
    public Match findById(UUID matchId) {
        return matchRepository.findById(matchId).orElseThrow(() -> new NotFoundException(matchId));
    }

    public Optional<Match> findByMatchTitle(String matchTitle) {
        return matchRepository.findByMatchTitle(matchTitle);
    }

    public MatchRespDTO save (MatchDTO body){

        matchRepository.findByMatchTitle(body.matchTitle()).ifPresent(match -> {
            throw new BadRequestException("Match title "+ body.matchTitle() + " is already in use!");
        });

        Team team1 = teamService.findById(body.team1Id());

        Team team2 = teamService.findById(body.team2Id());

        Match newMatch = new Match(
                body.matchTitle(),
                body.location(),
                body.date(),
                team1,
                team2
        );
        if (team1.getMatchesAsTeam1() != null) {
            team1.getMatchesAsTeam1().add(newMatch);
        } else {
            List<Match> list = new ArrayList<>();
            list.add(newMatch);
            team1.setMatchesAsTeam1(list);
        }

        if (team2.getMatchesAsTeam2() != null) {
            team2.getMatchesAsTeam2().add(newMatch);
        } else {
            List<Match> list = new ArrayList<>();
            list.add(newMatch);
            team2.setMatchesAsTeam2(list);
        }

        Match savedMatch=matchRepository.save(newMatch);
        return new MatchRespDTO(savedMatch.getId());
    }


    public List<Match> findMatchesByTeamId(UUID teamId) {

        Team team = teamService.findById(teamId);


        return matchRepository.findByTeam1OrTeam2(team, team);
    }

    public void findByIdAndDelete(UUID matchId) {
        Match found = this.findById(matchId);
        matchRepository.delete(found);
    }

    public Match findByIdAndUpdate(UUID matchId, MatchDTO body) {
    
        Team team1 = teamService.findById(body.team1Id());

        Team team2 = teamService.findById(body.team2Id());


        Match found = this.findById(matchId);
        found.setMatchTitle(body.matchTitle());
        found.setLocation(body.location());
        found.setDate(body.date());
        found.setTeam1(team1);
        found.setTeam2(team2);

        return matchRepository.save(found);
    }
    public List<Match> saveAll(List<Match> matches) {
        return matchRepository.saveAll(matches);
    }

    public Match save(Match match) {
        return matchRepository.save(match);
    }



}
