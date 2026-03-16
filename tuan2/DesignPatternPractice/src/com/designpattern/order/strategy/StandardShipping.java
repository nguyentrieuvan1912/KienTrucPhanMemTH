package com.designpattern.order.strategy;

public class StandardShipping implements ShippingStrategy {

    @Override
    public void ship() {
        System.out.println("Shipping with Standard delivery (3-5 days)");
    }

}