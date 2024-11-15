package com.stories.owl.domain.user.models;

import com.stories.owl.domain.story.models.Story;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="users")
@Data
public class User {
    @Id
    private String id; //I will take it directly from Clerk

    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Story> stories;
}
