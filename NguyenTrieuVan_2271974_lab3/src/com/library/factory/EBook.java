package com.library.factory;

public class EBook implements Book {
    private String title;
    public EBook(String title) { this.title = title; }

    @Override
    public String getTitle() { return title; }

    @Override
    public void displayInfo() {
        System.out.println("[E-Book] Tiêu đề: " + title + " (Định dạng .pdf)");
    }
}