package com.designpattern.order.decorator;

public class GiftWrapDecorator extends OrderDecorator {

    public GiftWrapDecorator(OrderComponent order) {
        super(order);
    }

    @Override
    public double getCost() {
        return order.getCost() + 10;
    }

}