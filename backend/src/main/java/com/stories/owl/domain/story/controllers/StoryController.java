package com.stories.owl.domain.story.controllers;

import com.stories.owl.domain.dalle.services.DalleService;
import com.stories.owl.domain.chatgpt.services.GPTService;
import com.stories.owl.domain.story.StoryService;
import com.stories.owl.domain.story.dtos.SingleStoryDTO;
import com.stories.owl.domain.story.dtos.StoryDTO;
import com.stories.owl.domain.story.dtos.StoryGalleryDTO;
import com.stories.owl.domain.story.dtos.StoryRequestDTO;
import com.stories.owl.domain.story.models.Story;
import com.stories.owl.domain.storyPart.dtos.StoryPartDTO;
import com.stories.owl.domain.storyPart.model.StoryPart;
import com.stories.owl.domain.supaBase.services.SupabaseService;
import com.stories.owl.domain.user.UserService;
import com.stories.owl.domain.user.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/stories")
@CrossOrigin(origins = "https://owl-night-reads-481690514559.europe-north1.run.app")
public class StoryController {

    private final GPTService gptService;
    private final StoryService storyService;
    private final UserService userService;
    private final DalleService dalleService;
    private final SupabaseService supabase;

    public StoryController(@Autowired GPTService gptService,
                           @Autowired StoryService storyService,
                           @Autowired UserService userService,
                           @Autowired DalleService dalleService,
                           @Autowired SupabaseService supabase
                           ) {
        this.gptService = gptService;
        this.storyService = storyService;
        this.userService = userService;
        this.dalleService = dalleService;
        this.supabase = supabase;
    }

    @PostMapping("/generate/{id}")
    public ResponseEntity<StoryDTO> addStory(@PathVariable String id, @RequestBody StoryRequestDTO body) throws IOException {
        User user = userService.getUserById(id);

        if(user == null){
            user = new User();
            user.setId(id);
            user = userService.save(user);
        }

        String storyContent = gptService.generateStory(
                body.language(),
                body.hero(),
                body.place(),
                body.quest(),
                body.companion(),
                body.emotion()
        );
//        String storyContent = """
//                Title: Whiskers Cat and Polly
//
//              In a quiet forest, a clever cat named Whiskers lived with his friends—a talkative parrot named Polly and a playful squirrel named Nibbles. Every morning, Whiskers would gather them to explore. One sunny day, they stumbled upon a hidden garden filled with vibrant flowers and glittering fruit. Polly squawked with delight, Nibbles darted around sniffing everything, and Whiskers spotted a golden key buried beneath a bush. They soon discovered it unlocked a tiny, magical door in an old oak tree. Inside was a treasure chest filled with seeds and acorns. They planted them together, growing a paradise for all forest creatures.
//              """;
        //System.out.println("GENERATE STORY CONTENT = " + storyContent);

        String[] lines = storyContent.split("\n");
        String title = lines[0].trim();
        //remove title if starts with "Title"
        if (title.startsWith("Title: ")) {
            title = title.replaceFirst("Title: ", "").trim();
        }
        //keep space!
        title = title.replaceAll("[^a-zA-Z0-9 ]", "");


        String storyBody = String.join(" ", Arrays.copyOfRange(lines, 1, lines.length)).trim();

        String[] chunks = splitIntoChunks(storyBody, 3);

        Story story = new Story();
        story.setUser(user);
        story.setTitle(title);
        story.setLanguage(body.language());

        List<StoryPart> parts = new ArrayList<>();
        for (int i = 0; i < chunks.length; i++) {
            StoryPart part = new StoryPart(i + 1, chunks[i], story );
            parts.add(part);
        }
        story.setChunks(parts);

        String prompt = "Generate a children's book illustration with this hero: " + body.hero() +
                "The image should be friendly";
//"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
        //"https://images.nightcafe.studio/jobs/kWGLUgAwkj1kLLvcqvJD/kWGLUgAwkj1kLLvcqvJD--1--kgpmj.jpg?tr=w-1600,c-at_max.png"
        //"https://images.nightcafe.studio/jobs/KqK9M1Gftz1zFJG1aTlV/KqK9M1Gftz1zFJG1aTlV--4--lbh90_2x.jpg?tr=w-1600,c-at_max.png";
        String imageUrl = dalleService.generateImage(prompt);
        System.out.println("imageUrl = " + imageUrl);
        byte[] imageBytes = downloadImageAsBytes(imageUrl);
        //remove white spaces to save url
        String titleForSupabaseUrl = title.replaceAll(" ", "");
        String finalFileName = supabase.saveImageToBucket(imageBytes,titleForSupabaseUrl);

        story.setImageUrl(finalFileName);
        Story savedStory = storyService.saveStory(story);
        StoryDTO storyDTO = new StoryDTO(savedStory.getId(), savedStory.getTitle(), story.getImageUrl(), story.getLanguage());
        return ResponseEntity.ok().body(storyDTO);

    }

    //re-wright
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

    private byte[] downloadImageAsBytes(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        try (InputStream inputStream = url.openStream()) {
            return inputStream.readAllBytes();
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<StoryGalleryDTO>> getStoryDisplayDTOsByUserId(@PathVariable String userId) {
        List<StoryGalleryDTO> storyDTOs = storyService.getAllStoriesByUserId(userId);
        return ResponseEntity.ok(storyDTOs);
    }

    @GetMapping("/user/stories/{storyId}")
    public ResponseEntity<SingleStoryDTO> getStoryById(@PathVariable Long storyId){
        SingleStoryDTO story = storyService.getStoryById(storyId);
        return ResponseEntity.ok().body(story);

    }

    //test if works
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteStory(@RequestBody int id) {
        Long storyId = (long) id;
        storyService.deleteStoryById(storyId);
        return ResponseEntity.noContent().build();
    }

   @PatchMapping("/update-title/{id}")
    public ResponseEntity<SingleStoryDTO> updateStory(@PathVariable Long id, @RequestBody SingleStoryDTO  body){
       if (body == null) {
           return ResponseEntity.badRequest().body(null);
       }
       Story updatedStory = storyService.updateStory(id, body);
       SingleStoryDTO updatedStoryDTO = new SingleStoryDTO(
               updatedStory.getId(),
               updatedStory.getTitle(),
               updatedStory.getImageUrl(),
               updatedStory.getLanguage(),
               updatedStory.getChunks().stream()
                       .map(chunk -> new StoryPartDTO(chunk.getId(), chunk.getText()))
                       .toList()
       );
      return ResponseEntity.ok().body(updatedStoryDTO);
   }

}
