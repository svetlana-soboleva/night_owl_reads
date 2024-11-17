package com.stories.owl.domain.story.controllers;

import com.stories.owl.domain.chatGPT.services.GPTService;
import com.stories.owl.domain.story.StoryService;
import com.stories.owl.domain.story.dtos.StoryDTO;
import com.stories.owl.domain.story.dtos.StoryRequestDTO;
import com.stories.owl.domain.story.models.Story;
import com.stories.owl.domain.storyPart.model.StoryPart;
import com.stories.owl.domain.user.UserService;
import com.stories.owl.domain.user.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/stories")
@CrossOrigin
public class StoryController {

    private final GPTService gptService;
    private final StoryService storyService;
    private final UserService userService;
 

    public StoryController(@Autowired GPTService gptService,
                           @Autowired StoryService storyService,
                           @Autowired UserService userService) {
        this.gptService = gptService;
        this.storyService = storyService;
        this.userService = userService;
    }

    @PostMapping("/generate/{id}")
    public ResponseEntity<StoryDTO> addStory(@PathVariable String id, @RequestBody StoryRequestDTO body){
        User user = userService.getUserById(id);
        if(user == null){
            user = new User();
            user.setId(id);
            user = userService.save(user);
        }

        String storyContent = gptService.generateStory(
                body.hero(),
                body.place(),
                body.quest(),
                body.companion(),
                body.emotion()
        );
        System.out.println("storyContent = " + storyContent);

        String[] lines = storyContent.split("\n");
        String title = lines[0].trim();

        String storyBody = String.join(" ", Arrays.copyOfRange(lines, 1, lines.length)).trim();

        String[] chunks = splitIntoChunks(storyBody, 3);

        Story story = new Story();
        story.setUser(user);
        story.setTitle(title);

        List<StoryPart> parts = new ArrayList<>();
        for (int i = 0; i < chunks.length; i++) {
            StoryPart part = new StoryPart(i + 1, chunks[i], story);
            parts.add(part);
        }
        story.setChunks(parts);

        Story savedStory = storyService.saveStory(story);
        StoryDTO storyDTO = new StoryDTO(savedStory.getId(), savedStory.getTitle());
        return ResponseEntity.ok(storyDTO);

    }

    private String[] splitIntoChunks(String body, int chunkCount) {
        String[] words = body.split(" ");
        int totalWords = words.length;
        int wordsPerChunk = (int) Math.ceil((double) totalWords / chunkCount);

        String[] chunks = new String[chunkCount];
        for (int i = 0; i < chunkCount; i++) {
            int start = i * wordsPerChunk;
            int end = Math.min(start + wordsPerChunk, totalWords);
            chunks[i] = String.join(" ", Arrays.copyOfRange(words, start, end)).trim();
        }
        return chunks;
    }
}
