package com.stories.owl.domain.storyPart.model;

import com.stories.owl.domain.story.models.Story;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="story_parts")
@Data
public class StoryPart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int partNumber;

    @Column(columnDefinition = "TEXT")
    private String text;

    private String imageUrl;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="story_id")
    private Story story;
}
