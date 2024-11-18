package com.stories.owl.domain.story.repositories;

import com.stories.owl.domain.story.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findAllByUser_Id(String userId);
}
