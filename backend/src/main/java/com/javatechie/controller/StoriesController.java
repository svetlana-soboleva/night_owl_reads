package com.javatechie.controller;

import com.javatechie.domain.Story;
import com.javatechie.domain.StoryRequest;
import com.javatechie.domain.StoryService;
import com.javatechie.dto.ChatGPTRequest;
import com.javatechie.dto.ChatGptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class StoriesController {

    @Value("${openai.model}")
    private String model;

    @Value(("${openai.api.url}"))
    private String apiURL;

    @Autowired
    private RestTemplate template;

    private final StoryService storyService;

    public StoriesController(StoryService storyService) {
        this.storyService = storyService;
    }

    @GetMapping("/allStories")
    public Collection<Story> getAllStories(){
       return storyService.getAllStories();
    }

    @PostMapping("/stories")
    public String chat(@RequestBody StoryRequest storyRequest){
        String prompt = "I will provide you with 5 words, and I would like you to write me " +
                "a short tale out of those 5 words. It should be between 50 and 60 words, " +
                "and it should be something clever and nice, suitable for small kids to enjoy. " +
                "Give it a fitting title as well. Use a single line break to separate the title " +
                "from the tale, and also to create 3 parts in the tale. The words are: " +
                storyRequest.getHero() + ", " +
                storyRequest.getPlace() + ", " +
                storyRequest.getQuest() + ", " +
                storyRequest.getCompanion() + ", " +
                storyRequest.getEmotion() + ".";
        

        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGptResponse chatGptResponse = template.postForObject(apiURL, request, ChatGptResponse.class);
        String storyContent = chatGptResponse.getChoices().get(0).getMessage().getContent();

        Story story = new Story(UUID.randomUUID(), storyContent);
        storyService.createStory(story);

        return storyContent;
    }

    @GetMapping("/stories/{id}")
    public Story getStoryById(@PathVariable String id) {
        return storyService.getStoryById(id);
    }
}
