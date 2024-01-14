import {PaymentGatewayResponse} from "../valueObjects/paymentGatewayResponse";

export default interface IPaymentGateway {
    
    // ACL para criação do pagamento
    create(): Promise<PaymentGatewayResponse>
    
}