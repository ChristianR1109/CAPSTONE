package christian_ragonese.controllers;


import christian_ragonese.entities.Order;
import christian_ragonese.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/public/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> findAll() {
        return orderService.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable UUID id) {
        return orderService.findById(id).orElse(null);
        // Restituisce null se non trovato (200 OK con body vuoto)
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.save(order);
        // Restituisce 200 OK con ordine creato (non 201 Created)
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable UUID id, @RequestBody Order order) {
        return orderService.updateOrder(id, order).orElse(null);
        // Restituisce null se ordine non trovato (200 OK con body vuoto)
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable UUID id) {
        orderService.deleteOrder(id);
        // Nessun body, sempre 200 OK anche se ordine non esiste
    }


}
