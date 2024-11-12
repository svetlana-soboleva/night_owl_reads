package com.javatechie.domain;

import com.javatechie.repository.StoryRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class StoryService {
    private final StoryRepository repo;

    public StoryService(StoryRepository repo) {
        this.repo = repo;
    }

    public Collection<Story> getAllStories(){
        return repo.getStories();
    }

    public String createStory(Story story) {
        return repo.create(story);
    }

    public Story getStoryById(String id){
        return repo.getById(id);
    }
}
