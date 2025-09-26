package christian_ragonese.services;

import christian_ragonese.entities.Order;
import christian_ragonese.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order save(Order order){
        return orderRepository.save(order);
    }
    public List<Order> findAll(){
        return orderRepository.findAll();
    }
    public Optional<Order> findById(UUID id){
        return orderRepository.findById(id);
    }

}
