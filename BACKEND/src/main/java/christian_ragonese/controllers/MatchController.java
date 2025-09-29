package christian_ragonese.controllers;

import christian_ragonese.entities.Match;
import christian_ragonese.exceptions.ValidationException;
import christian_ragonese.payloads.MatchDTO;
import christian_ragonese.payloads.MatchRespDTO;
import christian_ragonese.services.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/public/matches")

public class MatchController {
    @Autowired
    private MatchService matchService;

    @GetMapping
    public List<Match> findAll(){
        return matchService.findAll();
    }

    @GetMapping("/{matchId}")
    public Match findMatchById(@PathVariable UUID matchId){
        return matchService.findById(matchId);
    }

    @GetMapping("/title/{matchTitle}")
    public Optional<Match> findMatchByTitle(@PathVariable String matchTitle){
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
    @DeleteMapping("/{matchId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findByIdAndDelete(@PathVariable UUID matchId) {
        matchService.findByIdAndDelete(matchId);
    }

    @PutMapping("/{matchId}")
    public Match findByIdAndUpdate(@PathVariable UUID matchId, @RequestBody @Validated MatchDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }
        return matchService.findByIdAndUpdate(matchId, body);
    }

}
