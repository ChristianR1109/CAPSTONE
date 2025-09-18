package christian_ragonese.controllers;

import christian_ragonese.entities.Standings;
import christian_ragonese.services.StandingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/standings")
public class StandingController {
    private  StandingService standingService;

    @GetMapping
    public List<Standings> getAllStandings() {
        return standingService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Standings> getStandingById(@PathVariable UUID id) {
        Optional<Standings> standing = standingService.findById(id);
        return standing.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Standings createStanding(@RequestBody Standings standings) {
        return standingService.save(standings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Standings> updateStanding(@PathVariable UUID id, @RequestBody Standings standings) {
        Optional<Standings> existing = standingService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        standings.setId(id);
        Standings updated = standingService.save(standings);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStanding(@PathVariable UUID id) {
        Optional<Standings> existing = standingService.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        standingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
