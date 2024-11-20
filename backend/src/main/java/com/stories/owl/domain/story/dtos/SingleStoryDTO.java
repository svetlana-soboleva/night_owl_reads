package com.stories.owl.domain.story.dtos;

import com.stories.owl.domain.storyPart.dtos.StoryPartDTO;

import java.util.List;

public record SingleStoryDTO(Long id, String title, String imageUrls, String language,  List<StoryPartDTO> chunks) {
}
