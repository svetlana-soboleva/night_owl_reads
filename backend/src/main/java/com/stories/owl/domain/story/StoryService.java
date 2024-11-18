package com.stories.owl.domain.story;

import com.stories.owl.domain.story.dtos.StoryGalleryDto;
import com.stories.owl.domain.story.models.Story;
import com.stories.owl.domain.story.repositories.StoryRepository;
import com.stories.owl.domain.storyPart.model.StoryPart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryService {

    StoryRepository repo;

    public StoryService(@Autowired StoryRepository repo) {
        this.repo = repo;
    }

    public Story saveStory(Story story) {
        return repo.save(story);
    }

    public List<StoryGalleryDto> getAllStoriesByUserId(String userId){
        List<Story> stories = repo.findAllByUser_Id(userId);

        return stories.stream()
                .map(story -> new StoryGalleryDto(
                        story.getId(),
                        story.getTitle(),
                        "https://jjyekqzhbwgmkysuhktm.supabase.co/storage/v1/object/public/" + story.getImageUrl()
                ))
                .toList();
    }
}
