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
    public Optional<Order> updateOrder(UUID id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setBuyerName(updatedOrder.getBuyerName());
            order.setBuyerEmail(updatedOrder.getBuyerEmail());
            order.setMatchName(updatedOrder.getMatchName());
            order.setTickets(updatedOrder.getTickets());
            order.setAmount(updatedOrder.getAmount());

            return orderRepository.save(order);
        });
    }


    public boolean deleteOrder(UUID id) {
        if(orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
