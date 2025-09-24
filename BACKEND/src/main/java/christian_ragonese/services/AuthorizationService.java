package christian_ragonese.services;

import christian_ragonese.entities.User;
import christian_ragonese.exceptions.UnauthorizedException;
import christian_ragonese.payloads.UserLoginDTO;
import christian_ragonese.tools.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


    @Service
    public class AuthorizationService {
        @Autowired
        private UserService userService;

        @Autowired
        private JWTTools jwtTools;

        @Autowired
        private PasswordEncoder bCrypt;

        public String checkEmailBeforeLogin(UserLoginDTO payload) {
            User found = userService.findByEmail(payload.email());
            if (bCrypt.matches(payload.password(), found.getPassword())) {
                String extractedToken = jwtTools.createToken(found);
                return extractedToken;
            } else {
                throw new UnauthorizedException("Unauthorized - try again");
            }
        }
    }


