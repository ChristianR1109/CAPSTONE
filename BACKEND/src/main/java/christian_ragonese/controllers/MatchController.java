package christian_ragonese.controllers;

import christian_ragonese.entities.Match;
import christian_ragonese.exceptions.ValidationException;
import christian_ragonese.payloads.MatchDTO;
import christian_ragonese.payloads.MatchRespDTO;
import christian_ragonese.services.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/matches")
public class MatchController {
    @Autowired
    private MatchService matchService;

    @GetMapping
    public Page<Match> findAllMatches(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size,
                                      @RequestParam(defaultValue = "id") String sortBy){
        return matchService.findAllMatches(page,size,sortBy);
    }

    @GetMapping("/id/{matchId}")
    public Match findMatchById(@PathVariable UUID matchId){
        return matchService.findById(matchId);
    }

    @GetMapping("/title/{matchTitle}")
    public Match findMatchByTitle(@PathVariable String matchTitle){
        return matchService.findByMatchTitle(matchTitle);
    }

    @PostMapping
    public MatchRespDTO createNewMatch(@RequestBody @Validated MatchDTO body, BindingResult validationResult){
        if(validationResult.hasErrors()){
            List<String> errors = validationResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage()).toList();
            throw new ValidationException(errors);
        }
        return matchService.save(body);
    }

    @GetMapping("/{id}/matches")
    public List<Match> getMatchesByTeamId(@PathVariable UUID id) {
        return matchService.findMatchesByTeamId(id);
    }
}
