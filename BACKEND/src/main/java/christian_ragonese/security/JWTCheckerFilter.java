package christian_ragonese.security;

import christian_ragonese.entities.User;
import christian_ragonese.exceptions.UnauthorizedException;
import christian_ragonese.services.UserService;
import christian_ragonese.tools.JWTTools;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JWTCheckerFilter extends OncePerRequestFilter {
    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //AUTHENTICATION
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new UnauthorizedException("Insert a valid token");

        String extractedToken = authHeader.replace("Bearer ", "");
        jwtTools.verifyToken(extractedToken);

        //AUTHORIZATION
        String userId = jwtTools.extractId(extractedToken);
        User authorizedUser = this.userService.findById(UUID.fromString(userId));

        Authentication authentication = new UsernamePasswordAuthenticationToken(authorizedUser, null, authorizedUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        AntPathMatcher matcher = new AntPathMatcher();
        String path = request.getRequestURI();
        String method = request.getMethod();
        return new AntPathMatcher().match("/public/**", request.getServletPath());
    }
}
