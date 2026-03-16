package com.designpattern.order.state;

public class NewOrderState implements OrderState {

    @Override
    public void handle() {
        System.out.println("Order created: Checking order information");
    }

}