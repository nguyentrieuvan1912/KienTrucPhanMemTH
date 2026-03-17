package com.library.factory;

public class PaperBook implements Book {
    private String title;
    public PaperBook(String title) { this.title = title; }

    @Override
    public String getTitle() { return title; }

    @Override
    public void displayInfo() {
        System.out.println("[Sách giấy] Tiêu đề: " + title);
    }
}