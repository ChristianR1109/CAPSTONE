package christian_ragonese.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@JsonIgnoreProperties({"password", "authorities", "enabled", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"})
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "users")

public class User implements UserDetails {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    @Column(name = "user_id", nullable = false)
    private UUID id;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;




    public User(String username, String email, String password, String name, String surname) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.role = Role.USER;

    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // o gestisci la logica reale
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // o gestisci la logica reale
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // o gestisci la logica reale
    }

    @Override
    public boolean isEnabled() {
        return true;  // o gestisci la logica reale
    }
}
