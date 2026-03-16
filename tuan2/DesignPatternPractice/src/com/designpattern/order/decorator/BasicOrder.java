package com.designpattern.order.decorator;

public class BasicOrder implements OrderComponent {

    @Override
    public double getCost() {
        return 100;
    }

}