package christian_ragonese.controllers;

import christian_ragonese.entities.Order;
import christian_ragonese.payloads.TicketsDTO;
import christian_ragonese.repositories.OrderRepository;
import christian_ragonese.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
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

    private static final String PAYPAL_BASE = "https://api-m.sandbox.paypal.com";

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/create-order")
    public ResponseEntity<Map> createOrder(@RequestBody TicketsDTO request) {
        try {
            int tickets = request.tickets();
            double pricePerTicket = request.pricePerTicket();
            double total = tickets * pricePerTicket;

            // 1️⃣ Logica per creare ordine su PayPal (come già hai)
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders tokenHeaders = new HttpHeaders();
            tokenHeaders.setBasicAuth(CLIENT_ID, SECRET);
            tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<String> tokenRequest = new HttpEntity<>("grant_type=client_credentials", tokenHeaders);
            Map<String, Object> tokenResponse = restTemplate.postForObject(
                    PAYPAL_BASE + "/v1/oauth2/token",
                    tokenRequest,
                    Map.class
            );
            String accessToken = (String) tokenResponse.get("access_token");

            HttpHeaders orderHeaders = new HttpHeaders();
            orderHeaders.setBearerAuth(accessToken);
            orderHeaders.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> amount = Map.of(
                    "currency_code", "EUR",
                    "value", String.format("%.2f", total)
            );
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

            HttpEntity<Map<String, Object>> orderRequest = new HttpEntity<>(body, orderHeaders);
            Map<String, Object> orderResponse = restTemplate.postForObject(
                    PAYPAL_BASE + "/v2/checkout/orders",
                    orderRequest,
                    Map.class
            );

            // 2️⃣ Salva l'ordine nel DB
            Order order = new Order();
            order.setBuyerName(request.buyerName());
            order.setBuyerEmail(request.buyerEmail());
            order.setMatchName(request.matchName());
            order.setTickets(tickets);
            order.setAmount(total);


            orderRepository.save(order);

            return ResponseEntity.ok(orderResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
