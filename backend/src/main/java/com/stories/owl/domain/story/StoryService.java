package com.stories.owl.domain.story;

import com.stories.owl.domain.story.models.Story;
import com.stories.owl.domain.story.repositories.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoryService {

    StoryRepository repo;

    public StoryService(@Autowired StoryRepository repo) {
        this.repo = repo;
    }

    public Story saveStory(Story story) {
        return repo.save(story);
    }
}
