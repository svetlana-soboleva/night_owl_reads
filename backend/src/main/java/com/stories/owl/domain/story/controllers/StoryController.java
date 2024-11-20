package com.stories.owl.domain.story.controllers;

import com.stories.owl.domain.dalle.services.DalleService;
import com.stories.owl.domain.chatgpt.services.GPTService;
import com.stories.owl.domain.story.StoryService;
import com.stories.owl.domain.story.dtos.SingleStoryDTO;
import com.stories.owl.domain.story.dtos.StoryDTO;
import com.stories.owl.domain.story.dtos.StoryGalleryDTO;
import com.stories.owl.domain.story.dtos.StoryRequestDTO;
import com.stories.owl.domain.story.models.Story;
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
@CrossOrigin
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

//        String storyContent = gptService.generateStory(
//                body.language(),
//                body.hero(),
//                body.place(),
//                body.quest(),
//                body.companion(),
//                body.emotion()
//        );
        String storyContent = """
                Title: The Brave Crab of the Forest

                In the deep forest, a brave crab named Coby met his friend, a wise owl. They were searching for food when they stumbled upon a vast plain. As they wandered, Coby's stomach growled - he was hungry. But with the help of his friend, they found a delicious berry bush. Together, they feasted and felt grateful for their friendship.
                """;
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

        String imageUrl = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";//dalleService.generateImage(prompt);
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

//    @PostMapping("/update-title/{id}")

}
