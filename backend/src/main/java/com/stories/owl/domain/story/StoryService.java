package com.stories.owl.domain.story;

import com.stories.owl.domain.story.dtos.SingleStoryDTO;
import com.stories.owl.domain.story.dtos.StoryGalleryDTO;
import com.stories.owl.domain.story.models.Story;
import com.stories.owl.domain.story.repositories.StoryRepository;
import com.stories.owl.domain.storyPart.dtos.StoryPartDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StoryService {

    StoryRepository repo;

    @Value("${SUPABASE_PATH_IMAGE_URL}")
    private String subapasePath;


    public StoryService(@Autowired StoryRepository repo) {
        this.repo = repo;
    }

    public Story saveStory(Story story) {
        return repo.save(story);
    }

    public List<StoryGalleryDTO> getAllStoriesByUserId(String userId){
        List<Story> stories = repo.findAllByUser_Id(userId);

        return stories.stream()
                .map(story -> new StoryGalleryDTO(
                        story.getId(),
                        story.getTitle(),
                        subapasePath + story.getImageUrl()
                ))
                .toList();
    }

    public SingleStoryDTO getStoryById(Long storyId){
        Story story = repo.findById(storyId).orElseThrow(() -> new NoSuchElementException("No story found with ID: " + storyId));
        return new SingleStoryDTO(story.getId(),
                story.getTitle(),
                subapasePath + story.getImageUrl(),
                story.getLanguage(),
                story.getChunks().stream()
                        .map((chunk) -> new StoryPartDTO(chunk.getId(), chunk.getText())
                        ).toList()

        );
    }

    public void deleteStoryById(Long id){
      repo.deleteById(id);
    }

    public Story updateStory(Long id, SingleStoryDTO storyToUpdate){
        Story story = repo.findById(id).orElseThrow(() -> new NoSuchElementException("No story found with ID: " + id));

        if (storyToUpdate.title() != null && !storyToUpdate.title().isEmpty()) {
            story.setTitle(storyToUpdate.title());
        }
        if (storyToUpdate.imageUrls() != null && !storyToUpdate.imageUrls().isEmpty()) {
            story.setImageUrl(storyToUpdate.imageUrls());
        }
        if (storyToUpdate.language() != null && !storyToUpdate.language().isEmpty()) {
            story.setLanguage(storyToUpdate.language());
        }
        // dont update chunks yet =)
        return repo.save(story);

    }

}
