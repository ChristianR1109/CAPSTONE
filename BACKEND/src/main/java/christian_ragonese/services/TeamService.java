package christian_ragonese.services;

import christian_ragonese.entities.Team;
import christian_ragonese.exceptions.NotFoundException;
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


}
