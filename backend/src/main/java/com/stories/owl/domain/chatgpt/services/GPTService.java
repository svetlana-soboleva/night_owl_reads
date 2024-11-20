package com.stories.owl.domain.chatgpt.services;

import com.stories.owl.domain.chatgpt.models.ChatGPTRequest;
import com.stories.owl.domain.chatgpt.models.ChatGptResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GPTService {

    @Value("${gpt.prompt-template}")
    private String promptTemplate;

    @Value("${openai.model}")
    private String model;

    @Value(("${openai.api.url}"))
    private String apiURL;

    private final RestTemplate restTemplate;

    public GPTService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateStory(String language, String hero, String place, String quest, String companion, String emotion){
        String prompt = String.format(promptTemplate, language, hero, place, quest, companion, emotion );
        ChatGPTRequest request = new ChatGPTRequest(model, prompt);

        ChatGptResponse response = restTemplate.postForObject(apiURL, request, ChatGptResponse.class);
        return response.getChoices().get(0).getMessage().getContent();
    }
}
