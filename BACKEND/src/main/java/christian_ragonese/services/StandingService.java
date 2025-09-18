package christian_ragonese.services;

import christian_ragonese.entities.Standings;
import christian_ragonese.repositories.StandingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StandingService {
    private StandingRepository standingsRepository;


    public List<Standings> findAll() {
        return standingsRepository.findAll();
    }

    public Optional<Standings> findById(UUID id) {
        return standingsRepository.findById(id);
    }

    public Standings save(Standings standings) {
        return standingsRepository.save(standings);
    }

    public void deleteById(UUID id) {
        standingsRepository.deleteById(id);
    }
}
