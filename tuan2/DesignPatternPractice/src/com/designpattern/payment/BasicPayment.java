package com.designpattern.payment;

public class BasicPayment implements PaymentComponent {

    private double amount;

    public BasicPayment(double amount){
        this.amount = amount;
    }

    @Override
    public double getAmount() {
        return amount;
    }

}