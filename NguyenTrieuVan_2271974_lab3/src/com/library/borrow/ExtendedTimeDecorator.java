package com.library.borrow;

public class ExtendedTimeDecorator extends BorrowDecorator {
    public ExtendedTimeDecorator(BorrowService service) {
        super(service);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Gia hạn thêm 7 ngày";
    }
}