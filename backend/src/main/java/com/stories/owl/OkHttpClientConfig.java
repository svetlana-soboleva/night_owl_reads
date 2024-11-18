package com.stories.owl;

import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class OkHttpClientConfig {

    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient.Builder()
                .connectTimeout(Duration.ofSeconds(60))
                .readTimeout(Duration.ofSeconds(120))
                .writeTimeout(Duration.ofSeconds(120))
                .build();
    }
}

