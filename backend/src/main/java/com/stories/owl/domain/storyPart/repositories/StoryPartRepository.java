package com.stories.owl.domain.storyPart.repositories;


import com.stories.owl.domain.storyPart.model.StoryPart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryPartRepository extends JpaRepository<StoryPart, Long> {
}
