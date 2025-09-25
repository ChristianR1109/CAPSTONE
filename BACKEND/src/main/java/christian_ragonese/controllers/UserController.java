package christian_ragonese.controllers;

import christian_ragonese.entities.User;
import christian_ragonese.exceptions.ValidationException;
import christian_ragonese.payloads.UserRegistrationDTO;
import christian_ragonese.payloads.UserRespDTO;
import christian_ragonese.payloads.UserUpdateDTO;
import christian_ragonese.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/public/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<User> findAllUsers(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size,
                                   @RequestParam(defaultValue = "id") String sortBy) {
        return userService.findAllUsers(page, size, sortBy);
    }

    @GetMapping("/{userId}")
    public User findUserById(@PathVariable UUID userId) {
        return userService.findById(userId);
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public User getMyProfile(@AuthenticationPrincipal User currentUser) {
        return currentUser;
    }


    @PutMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User findByIdAndUpdate(@PathVariable UUID userId, @RequestBody @Validated UserUpdateDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }
        return userService.findByIdAndUpdate(userId, body);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findByIdAndDelete(@PathVariable UUID userId) {
        userService.findByIdAndDelete(userId);
    }


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRespDTO createNewUser(@RequestBody @Validated UserRegistrationDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            List<String> errors = validationResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .toList();
            throw new ValidationException(errors);
        }
        return userService.save(body);

    }





}

