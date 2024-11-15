package com.stories.owl.domain.story.repositories;

import com.stories.owl.domain.story.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
