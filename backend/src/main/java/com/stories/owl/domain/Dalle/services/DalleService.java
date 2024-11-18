package com.stories.owl.domain.Dalle.services;
import com.stories.owl.domain.Dalle.http.ImageGenerationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;



@Service
public class DalleService {

    private final OpenAiImageModel openAiImageModel;
    private static final Logger logger = LoggerFactory.getLogger(DalleService.class);
    
    public DalleService(OpenAiImageModel openAiImageModel) {
        this.openAiImageModel = openAiImageModel;
    }

    @Retryable
    public String generateImage(String prompt) {

        try {
            long startTime = System.currentTimeMillis();
            logger.info("Sending request to DALL-E: {}", prompt);
            ImageResponse response = openAiImageModel.call(new ImagePrompt(
                    prompt,
                    OpenAiImageOptions.builder()
                            .withModel("dall-e-2")
                            .withQuality("hd")
                            .withN(1)
                            .withHeight(512)
                            .withWidth(512).build()
            ));
            long endTime = System.currentTimeMillis();
            logger.info("OpenAI image generation took {} ms", (endTime - startTime));
            if (response != null && response.getResults() != null && !response.getResults().isEmpty()) {
                logger.info("Image created successfully : " + response.getResults().get(0).getOutput().getUrl());
                return response.getResult().getOutput().getUrl();
            } else {
                logger.error("Failed to generate image. Response is empty or invalid.");
                throw new ImageGenerationException("Image generation failed: response was empty or invalid.");
            }

        } catch (Exception e) {
            logger.error("Error generating image for prompt: {}", prompt, e);
            throw new ImageGenerationException("Error generating image for prompt: ");
        }
        }
    }


