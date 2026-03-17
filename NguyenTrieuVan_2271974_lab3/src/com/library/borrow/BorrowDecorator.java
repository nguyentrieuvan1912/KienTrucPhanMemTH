package com.library.borrow;

public abstract class BorrowDecorator implements BorrowService {
    protected BorrowService wrappedService;

    public BorrowDecorator(BorrowService service) {
        this.wrappedService = service;
    }

    @Override
    public String getDescription() {
        return wrappedService.getDescription();
    }
}