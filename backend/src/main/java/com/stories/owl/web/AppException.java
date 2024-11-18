package com.stories.owl.web;

import com.stories.owl.domain.dalle.http.ImageGenerationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AppException {

    @ExceptionHandler(ImageGenerationException.class)
    protected ResponseEntity<String> handleImageGenerationException(ImageGenerationException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Image generation failed: " + ex.getMessage());
    }
}
