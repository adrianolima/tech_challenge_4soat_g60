import {Order} from "../entities/order";
import {OrderStatus} from "../valueObjects/orderStatus";

class OrderService {
  
  
  
  saveOrder(dto: Partial<Order>): Promise<Order> {
    
    // Validações:
      // - Verificar se todos os produtos estão ativos
    
    
    return null
  }
  
  linkToClient(orderId: number, clientId?: number): Promise<void> {
    // Ligar o pedido ao cliente (que pode ter cadastro ou não)
    // Caso o clientId seja nulo, indica que o cliente optou por não se identificar (sem cadastro)
    return null
  }
  
}