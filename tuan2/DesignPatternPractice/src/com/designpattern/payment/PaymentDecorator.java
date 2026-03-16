package com.designpattern.payment;

public abstract class PaymentDecorator implements PaymentComponent {

    protected PaymentComponent payment;

    public PaymentDecorator(PaymentComponent payment){
        this.payment = payment;
    }

}