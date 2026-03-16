package com.designpattern.order.state;

public class Order {

    private OrderState state;

    public void setState(OrderState state) {
        this.state = state;
    }

    public void process() {

        if(state == null){
            System.out.println("Order has no state");
            return;
        }

        state.handle();
    }

}