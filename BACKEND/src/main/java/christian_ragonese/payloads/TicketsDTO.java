package christian_ragonese.payloads;

public record TicketsDTO( String buyerEmail,
                          String buyerName,
                          int tickets,
                          double pricePerTicket,
                          String matchName) {}
