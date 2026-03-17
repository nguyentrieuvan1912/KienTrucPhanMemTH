package com.library.core;

import com.library.borrow.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Kiểm tra tính năng Decorator ---");

        // 1. Mượn cơ bản
        BorrowService borrow1 = new BasicBorrow();
        System.out.println("Giao dịch 1: " + borrow1.getDescription());

        // 2. Mượn cơ bản + Gia hạn (Trang trí thêm 1 lớp)
        BorrowService borrow2 = new ExtendedTimeDecorator(new BasicBorrow());
        System.out.println("Giao dịch 2: " + borrow2.getDescription());

        // 3. Mượn cơ bản + Gia hạn + Gia hạn tiếp (Có thể chồng nhiều lớp)
        BorrowService borrow3 = new ExtendedTimeDecorator(new ExtendedTimeDecorator(new BasicBorrow()));
        System.out.println("Giao dịch 3: " + borrow3.getDescription());
    }
}