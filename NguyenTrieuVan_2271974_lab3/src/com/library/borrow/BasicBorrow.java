package com.library.borrow;

public class BasicBorrow implements BorrowService {
    @Override
    public String getDescription() {
        return "Mượn sách cơ bản (14 ngày)";
    }
}