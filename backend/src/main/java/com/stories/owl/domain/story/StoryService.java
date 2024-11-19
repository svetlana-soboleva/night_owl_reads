package com.stories.owl.domain.story;

import com.stories.owl.domain.story.dtos.SingleStoryDTO;
import com.stories.owl.domain.story.dtos.StoryGalleryDTO;
import com.stories.owl.domain.story.models.Story;
import com.stories.owl.domain.story.repositories.StoryRepository;
import com.stories.owl.domain.storyPart.dtos.StoryPartDTO;
import com.stories.owl.web.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StoryService {

    StoryRepository repo;

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
                        "https://jjyekqzhbwgmkysuhktm.supabase.co/storage/v1/object/public/" + story.getImageUrl()
                ))
                .toList();
    }

    public SingleStoryDTO getStoryById(Long storyId){
        Story story = repo.findById(storyId).orElseThrow(() -> new NoSuchElementException("No story found with ID: " + storyId));
        return new SingleStoryDTO(story.getId(),
                story.getTitle(),
                "https://jjyekqzhbwgmkysuhktm.supabase.co/storage/v1/object/public/" + story.getImageUrl(),
                story.getChunks().stream()
                        .map((chunk) -> new StoryPartDTO(chunk.getId(), chunk.getText())
                        ).toList()

        );
    }
}
