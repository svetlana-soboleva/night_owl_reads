package com.stories.owl.domain.user;

import com.stories.owl.domain.user.models.User;
import com.stories.owl.domain.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(@Autowired UserRepository repo) {
        this.repo = repo;
    }

    public User save(User user) {
        return repo.save(user);
    }

    public User getUserById(String id) {
        return repo.findById(id).orElse(null);
    }

}
