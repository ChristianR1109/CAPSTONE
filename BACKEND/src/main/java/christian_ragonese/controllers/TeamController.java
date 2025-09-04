package christian_ragonese.controllers;

import christian_ragonese.entities.Match;
import christian_ragonese.entities.Team;
import christian_ragonese.exceptions.ValidationException;
import christian_ragonese.payloads.TeamDTO;
import christian_ragonese.payloads.TeamRespDTO;
import christian_ragonese.services.MatchService;
import christian_ragonese.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/teams")
public class TeamController {
    @Autowired
    private TeamService teamService;
    @Autowired
    private MatchService matchService;

    @GetMapping
    public Page<Team> findAllTeams(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size,
                                   @RequestParam(defaultValue = "id") String sortBy) {
        return teamService.findAllTeams(page, size, sortBy);

    }

    @GetMapping("/id/{teamId}")
    public Team findTeamById(@PathVariable UUID teamId) {
        return teamService.findById(teamId);
    }

    @GetMapping("/by-name/{name}")
    public Team findTeamByName(@PathVariable String name) {
        return teamService.findByName(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public TeamRespDTO createNewTeam(@RequestBody @Validated TeamDTO body, BindingResult validationResult){

        if(validationResult.hasErrors()){
            List<String> errors = validationResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage()).toList();
            throw new ValidationException(errors);
        }
return teamService.save(body);
    }

    @GetMapping("/{teamId}/matches")
    public List<Match> getMatchesByTeamId(@PathVariable UUID teamId) {
        return matchService.findMatchesByTeamId(teamId);
    }

    @DeleteMapping("/{teamId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findByIdAndDelete(@PathVariable UUID teamId) {

        teamService.findByIdAndDelete(teamId);
    }

    @PutMapping("/{teamId}")
    public Team findByIdAndUpdate(@PathVariable UUID teamId, @RequestBody @Validated TeamDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }
        return teamService.findByIdAndUpdate(teamId, body);
    }


}
