package com.designpattern.payment;

public class DiscountDecorator extends PaymentDecorator {

    public DiscountDecorator(PaymentComponent payment){
        super(payment);
    }

    @Override
    public double getAmount() {
        return payment.getAmount() - 10;
    }

}