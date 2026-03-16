package com.designpattern.order.strategy;

public class ShippingService {

    private ShippingStrategy strategy;

    public void setStrategy(ShippingStrategy strategy) {
        this.strategy = strategy;
    }

    public void shipOrder() {

        if(strategy == null){
            System.out.println("No shipping method selected");
            return;
        }

        strategy.ship();
    }

}