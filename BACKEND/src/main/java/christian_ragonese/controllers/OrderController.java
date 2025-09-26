package christian_ragonese.controllers;


import christian_ragonese.entities.Order;
import christian_ragonese.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Recupera tutti gli ordini (per admin)
    @GetMapping
    public List<Order> getOrders() {
        return orderService.findAll();
    }


}
