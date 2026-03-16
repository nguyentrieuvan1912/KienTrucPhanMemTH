package com.designpattern.order.decorator;

public class InsuranceDecorator extends OrderDecorator {

    public InsuranceDecorator(OrderComponent order) {
        super(order);
    }

    @Override
    public double getCost() {
        return order.getCost() + 20;
    }

}