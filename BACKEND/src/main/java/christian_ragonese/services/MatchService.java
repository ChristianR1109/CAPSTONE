package christian_ragonese.services;

import christian_ragonese.entities.Match;
import christian_ragonese.entities.Order;
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



        Match newMatch = new Match(
                body.matchTitle(),
                body.location(),
                body.date()

        );


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
    



        Match found = this.findById(matchId);
        found.setMatchTitle(body.matchTitle());
        found.setLocation(body.location());
        found.setDate(body.date());


        return matchRepository.save(found);
    }
    public List<Match> saveAll(List<Match> matches) {
        return matchRepository.saveAll(matches);
    }

    public Match save(Match match) {
        return matchRepository.save(match);
    }

    public List<Match> findAll(){
        return matchRepository.findAll();
    }


}
