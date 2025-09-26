package christian_ragonese.controllers;

import christian_ragonese.entities.User;
import christian_ragonese.payloads.UserLoginDTO;
import christian_ragonese.payloads.UserLoginRespDTO;
import christian_ragonese.services.AuthorizationService;
import christian_ragonese.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class AuthorizationController {
    @Autowired
    public UserService userService;

    @Autowired
    public AuthorizationService authorizationsService;


    //LOGIN
    @PostMapping("/login")
    public UserLoginRespDTO login(@RequestBody UserLoginDTO payload) {
        // controlla email e password, ritorna token
        String extractedToken = authorizationsService.checkEmailBeforeLogin(payload);

        // Recupera l’utente dal DB
        User user = userService.findByEmail(payload.email());

        // Costruisci il DTO completo
        return new UserLoginRespDTO(
                extractedToken,
                user.getEmail(),
                user.getRole().name() // supponendo enum Role {USER, ADMIN}
        );
    }
    }
