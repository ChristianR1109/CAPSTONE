package christian_ragonese.services;


import christian_ragonese.entities.Role;
import christian_ragonese.entities.User;
import christian_ragonese.exceptions.BadRequestException;
import christian_ragonese.exceptions.NotFoundException;
import christian_ragonese.payloads.UserRegistrationDTO;
import christian_ragonese.payloads.UserRespDTO;
import christian_ragonese.payloads.UserUpdateDTO;
import christian_ragonese.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public Page<User> findAllUsers(int page, int size, String sortBy) {
        if (page < 0) page = 0;
        if (size <= 0) size = 10;          // default size
        if (size > 50) size = 50;

        // campo sortBy valido da whitelist o fallback
        List<String> allowedSort = List.of("id", "username", "email", "createdAt");
        if (!allowedSort.contains(sortBy)) {
            sortBy = "createdAt";          // valore di default
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return userRepository.findAll(pageable);
    }


    public User findById(UUID userId) {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId));
    }

    public UserRespDTO save(UserRegistrationDTO body) {
        userRepository.findByEmail(body.email()).ifPresent(user -> {
            throw new BadRequestException("The Email " + user.getEmail() + " is already in use!");
        });
        userRepository.findByUsername(body.username()).ifPresent(user -> {
            throw new BadRequestException("The username " + body.username() + " is already in use!");
        });

        //CREAZIONE USER
        User newUser = new User(
                body.username(),
                body.email(),
                passwordEncoder.encode(body.password()),
                body.name(),
                body.surname()
                //"https://avatars.com/" + body.name() + "+" + body.surname()
        );



        User savedUser = userRepository.save(newUser);
        return new UserRespDTO(savedUser.getId());
    }



    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User with email " + email + " not found!"));
    }

    public User findByIdAndUpdate(UUID userId, UserUpdateDTO body) {
        User found = this.findById(userId);

        found.setUsername(body.username());
        found.setName(body.name());
        found.setUsername(body.username());


        return userRepository.save(found);
    }

    public void findByIdAndDelete(UUID userId) {
        User found = this.findById(userId);
        userRepository.delete(found);
    }

    public UserRespDTO saveAdmin(UserRegistrationDTO dto) {
        User user = new User();
        user.setUsername(dto.username());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setName(dto.name());
        user.setSurname(dto.surname());
        user.setRole(Role.ADMIN);  // 👈 assegni qui il ruolo fisso
        return new UserRespDTO(userRepository.save(user).getId());
    }


    public User tryFindByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    public List<User> findAllUsersSimple(int page, int size, String sortBy) {
        if (size > 50) size = 50;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<User> pageResult = userRepository.findAll(pageable);
        return pageResult.getContent(); // restituisce solo la lista contenuta nella pagina
    }

}
