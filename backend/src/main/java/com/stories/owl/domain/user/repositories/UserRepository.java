package com.stories.owl.domain.user.repositories;

import com.stories.owl.domain.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}

