package com.stories.owl;

import org.springframework.boot.web.client.ClientHttpRequestFactories;
import org.springframework.boot.web.client.ClientHttpRequestFactorySettings;
import org.springframework.boot.web.client.RestClientCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.retry.annotation.EnableRetry;


import java.time.Duration;

@Configuration
@EnableRetry
public class RetryConfig {

    @Bean
    RestClientCustomizer restClientCustomizer() {
        return restClientBuilder -> {
            restClientBuilder
                    .requestFactory(new BufferingClientHttpRequestFactory(
                            ClientHttpRequestFactories.get(ClientHttpRequestFactorySettings.DEFAULTS
                                    .withConnectTimeout(Duration.ofSeconds(60))
                                    .withReadTimeout(Duration.ofSeconds(120))
                            )));
        };
    }
}
