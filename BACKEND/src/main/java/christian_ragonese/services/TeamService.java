package christian_ragonese.services;

import christian_ragonese.entities.Team;
import christian_ragonese.exceptions.BadRequestException;
import christian_ragonese.exceptions.NotFoundException;
import christian_ragonese.payloads.TeamDTO;
import christian_ragonese.payloads.TeamRespDTO;
import christian_ragonese.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;

    public Page<Team> findAllTeams(int page, int size, String sortBy) {
        if (size > 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return teamRepository.findAll(pageable);
    }

    public Team findById(UUID teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> new NotFoundException(teamId));
    }

    public TeamRespDTO save(TeamDTO body) {

        teamRepository.findByName(body.name()).ifPresent(team -> {
            throw new BadRequestException("Name " + body.name() + " is already in use!");
        });
        Team newTeam = new Team(
                body.name()
        );

        Team savedTeam = teamRepository.save(newTeam);
        return new TeamRespDTO(savedTeam.getId());
}
    public Team findByName(String name) {
        return teamRepository.findByName(name).orElseThrow(()-> new NotFoundException("Team named "+ name+ " not found!"));

    }

    public void findByIdAndDelete(UUID teamId) {
        Team found = this.findById(teamId);
        teamRepository.delete(found);
    }

    public Team findByIdAndUpdate(UUID teamId, TeamDTO body) {
        Team found = this.findById(teamId);
        found.setName(body.name());
        return teamRepository.save(found);
    }



}
