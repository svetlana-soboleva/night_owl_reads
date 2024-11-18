package com.stories.owl.domain.dalle.http;

public class ImageGenerationException extends RuntimeException {
    public ImageGenerationException(String message) {
        super(message);
    }

    public ImageGenerationException() {
    }
}