package com.designpattern.order.state;

public class ProcessingState implements OrderState {

    @Override
    public void handle() {
        System.out.println("Order processing: Packing and shipping");
    }

}