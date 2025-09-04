package christian_ragonese.services;

import christian_ragonese.entities.Match;
import christian_ragonese.entities.Team;
import christian_ragonese.exceptions.BadRequestException;
import christian_ragonese.exceptions.NotFoundException;
import christian_ragonese.payloads.MatchDTO;
import christian_ragonese.payloads.MatchRespDTO;
import christian_ragonese.repositories.MatchRepository;
import christian_ragonese.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MatchService {
@Autowired
    private MatchRepository matchRepository;
@Autowired
private TeamRepository teamRepository;

    public Page<Match> findAllMatches(int page, int size, String sortBy) {
        if (size > 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return matchRepository.findAll(pageable);
    }
    public Match findById(UUID matchId) {
        return matchRepository.findById(matchId).orElseThrow(() -> new NotFoundException(matchId));
    }

    public Match findByMatchTitle(String matchTitle){
        return matchRepository.findByMatchTitle(matchTitle).orElseThrow(()-> new NotFoundException(matchTitle));
    }

    public MatchRespDTO save (MatchDTO body){

        matchRepository.findByMatchTitle(body.matchTitle()).ifPresent(match -> {
            throw new BadRequestException("Match title "+ body.matchTitle() + " is already in use!");
        });
        Match newMatch = new Match(
                body.matchTitle(),
                body.location(),
                body.date(),
                body.team1Id(),
                body.team2Id()
        );
        Match savedMatch = matchRepository.save(newMatch);
        return new MatchRespDTO(savedMatch.getId());
    }
    public List<Match> findMatchesByTeamId(UUID teamId) {
        return matchRepository.findMatchesByTeamId(teamId);
    }
}
