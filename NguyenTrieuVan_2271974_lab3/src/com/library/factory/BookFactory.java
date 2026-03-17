package com.library.factory;

public class BookFactory {
    public static Book createBook(String type, String title) {
        if (type.equalsIgnoreCase("PAPER")) {
            return new PaperBook(title);
        } else if (type.equalsIgnoreCase("EBOOK")) {
            return new EBook(title);
        }
        return null;
    }
}