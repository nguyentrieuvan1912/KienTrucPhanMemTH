package com.designpattern.payment;

public class ProcessingFeeDecorator extends PaymentDecorator {

    public ProcessingFeeDecorator(PaymentComponent payment){
        super(payment);
    }

    @Override
    public double getAmount() {
        return payment.getAmount() + 5;
    }

}