package christian_ragonese.repositories;


import christian_ragonese.entities.Standings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StandingRepository extends JpaRepository<Standings, UUID> {
}
