package com.designpattern.main;

import com.designpattern.order.strategy.*;
import com.designpattern.order.decorator.*;
import com.designpattern.payment.*;


public class MainApp {

    public static void main(String[] args) {

        ShippingService shipping = new ShippingService();

        shipping.setStrategy(new StandardShipping());
        shipping.shipOrder();

        shipping.setStrategy(new ExpressShipping());
        shipping.shipOrder();

        //c2

        OrderComponent order = new BasicOrder();

        order = new GiftWrapDecorator(order);
        order = new InsuranceDecorator(order);

        System.out.println("Total order cost: " + order.getCost());

        //c3
        PaymentComponent payment = new BasicPayment(100);

        payment = new ProcessingFeeDecorator(payment);
        payment = new DiscountDecorator(payment);

        double finalAmount = payment.getAmount();

        System.out.println("Final payment amount: " + finalAmount);

        PaymentService service = new PaymentService();

        service.setStrategy(new CreditCardPayment());
        service.processPayment(finalAmount);

        service.setStrategy(new PayPalPayment());
        service.processPayment(finalAmount);

    }

}