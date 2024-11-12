package com.javatechie.repository;

import com.javatechie.domain.Story;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class StoryRepository {

    private final Map<UUID, Story> stories;

    {
        stories = new HashMap<>();
    }

    public Collection<Story> getStories() {
        return stories.values();
    }

    public Story getById(String storyId) {
        UUID uuid = UUID.fromString(storyId);
        Story story = stories.get(uuid);
        if (story == null) {
            throw new NoSuchElementException("Story not found for ID: " + storyId);
        }
        return stories.get(UUID.fromString(storyId));
    }

    public String create(Story story){
        UUID storyId = story.getId();
        if (stories.containsKey(storyId)) {
            throw new IllegalStateException("Story with ID already exists: " + storyId);
        }
        stories.put(storyId, story);
        return storyId.toString();
    }
}
