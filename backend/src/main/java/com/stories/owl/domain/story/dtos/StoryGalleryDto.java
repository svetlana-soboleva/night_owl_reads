package com.stories.owl.domain.story.dtos;

import java.util.List;

public record StoryGalleryDto(Long id, String title, List<String> imageUrls) {
}
