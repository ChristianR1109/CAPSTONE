package christian_ragonese.runners;

import christian_ragonese.entities.Role;
import christian_ragonese.entities.User;
import christian_ragonese.payloads.UserRegistrationDTO;
import christian_ragonese.payloads.UserRespDTO;
import christian_ragonese.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminRunner implements ApplicationRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 1. Crea un admin principale
        UserRegistrationDTO admin = new UserRegistrationDTO(
                "admin",
                "admin@admin.com",
                "sicurissima",
                "Christian",
                "Ragonese"

        );

        User existingAdmin = userService.tryFindByEmail(admin.email());
        if (existingAdmin == null) {
            UserRespDTO savedAdmin = userService.saveAdmin(admin);
            System.out.println("Creato utente admin principale: " + admin.username());
        } else {
            System.out.println("Admin già esistente: " + existingAdmin.getUsername());
        }


    }
}

