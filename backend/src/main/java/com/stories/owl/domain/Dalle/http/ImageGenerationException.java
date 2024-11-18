package com.stories.owl.domain.Dalle.http;

public class ImageGenerationException extends RuntimeException {
    public ImageGenerationException(String message) {
        super(message);
    }

    public ImageGenerationException() {
    }
}