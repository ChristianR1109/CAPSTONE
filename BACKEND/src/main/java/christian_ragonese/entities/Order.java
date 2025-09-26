package christian_ragonese.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    private String matchName;
    private String buyerName;
    private String buyerEmail;
    private int tickets;
    private double amount;
    private LocalDateTime createdAt;

    public Order(){
        this.createdAt=LocalDateTime.now();
    }
}

