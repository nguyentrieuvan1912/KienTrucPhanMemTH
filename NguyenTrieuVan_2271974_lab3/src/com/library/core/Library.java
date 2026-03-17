package com.library.core;

import com.library.notify.Observer;
import java.util.ArrayList;
import java.util.List;

public class Library {
    private static Library instance;
    // Danh sách những người đăng ký nhận thông báo
    private List<Observer> observers = new ArrayList<>();

    private Library() {
        System.out.println("--- Khởi tạo thực thể Thư viện duy nhất ---");
    }

    public static synchronized Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    // Đăng ký nhận tin
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    // Thông báo cho tất cả mọi người
    public void notifyAllObservers(String message) {
        for (Observer obs : observers) {
            obs.update(message);
        }
    }
}