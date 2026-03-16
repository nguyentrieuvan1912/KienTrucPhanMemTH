package com.designpattern.payment;

public class PaymentService {

    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void processPayment(double amount) {

        if(strategy == null){
            System.out.println("No payment method selected");
            return;
        }

        strategy.pay(amount);
    }

}