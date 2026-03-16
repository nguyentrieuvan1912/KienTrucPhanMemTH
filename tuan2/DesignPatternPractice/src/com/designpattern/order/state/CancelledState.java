package com.designpattern.order.state;

public class CancelledState implements OrderState {

    @Override
    public void handle() {
        System.out.println("Order cancelled and refund issued");
    }

}