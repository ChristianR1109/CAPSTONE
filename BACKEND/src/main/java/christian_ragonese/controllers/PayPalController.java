package christian_ragonese.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PayPalController {

    @Value("${paypal.clientId}")
    private String CLIENT_ID;

    @Value("${paypal.secret}")
    private String SECRET;

    @Value("${paypal.returnUrl}")
    private String RETURN_URL;

    @Value("${paypal.cancelUrl}")
    private String CANCEL_URL;

    private final String PAYPAL_BASE = "https://api-m.sandbox.paypal.com";

    @PostMapping("/create-order")
    public ResponseEntity<Map> createOrder() {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // 1️⃣ Ottieni access token
            HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth(CLIENT_ID, SECRET);
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<String> tokenRequest = new HttpEntity<>("grant_type=client_credentials", headers);
            Map<String, Object> tokenResponse = restTemplate.postForObject(PAYPAL_BASE + "/v1/oauth2/token", tokenRequest, Map.class);
            String accessToken = (String) tokenResponse.get("access_token");

            // 2️⃣ Crea ordine
            headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> amount = Map.of("currency_code", "EUR", "value", "10.00");
            Map<String, Object> purchaseUnit = Map.of("amount", amount);
            Map<String, Object> applicationContext = Map.of(
                    "return_url", RETURN_URL,
                    "cancel_url", CANCEL_URL
            );

            Map<String, Object> body = Map.of(
                    "intent", "CAPTURE",
                    "purchase_units", List.of(purchaseUnit),
                    "application_context", applicationContext
            );

            HttpEntity<Map<String, Object>> orderRequest = new HttpEntity<>(body, headers);
            Map<String, Object> orderResponse = restTemplate.postForObject(PAYPAL_BASE + "/v2/checkout/orders", orderRequest, Map.class);

            return ResponseEntity.ok(orderResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}