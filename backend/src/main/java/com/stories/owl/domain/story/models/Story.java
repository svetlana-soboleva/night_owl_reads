package com.stories.owl.domain.story.models;
import com.stories.owl.domain.storyPart.model.StoryPart;
import com.stories.owl.domain.user.models.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "stories")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    private List<StoryPart> chunks;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;
}
