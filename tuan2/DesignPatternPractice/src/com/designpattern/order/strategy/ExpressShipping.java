package com.designpattern.order.strategy;

public class ExpressShipping implements ShippingStrategy {

    @Override
    public void ship() {
        System.out.println("Shipping with Express delivery (1-2 days)");
    }

}