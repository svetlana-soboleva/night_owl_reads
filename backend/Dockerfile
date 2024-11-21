# Use a base image with Java installed
FROM maven:3.9.4-eclipse-temurin-17

# Set the working directory in the container
WORKDIR /app

COPY lib/core-0.0.2.jar ./libs/


COPY pom.xml .

# Install the local dependency in the Docker image
RUN mvn install:install-file \
    -Dfile=/app/libs/core-0.0.2.jar \
    -DgroupId=com.harium.supabase \
    -DartifactId=core \
    -Dversion=0.0.2 \
    -Dpackaging=jar


COPY src src

# Accept build arguments for PostgreSQL environment variables
ARG SUPBASE_URL
ARG SUPABASE_KEY
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG OPENAI_MODEL
ARG OPENAI_API_KEY
ARG OPENAI_API_URL
ARG DALLE_API_URL
ARG DB_BASE_URL
ARG SUPABASE_PASSWORD
ARG SUPABASE_PATH_IMAGE_URL



# Set PostgreSQL environment variables
ENV SUPBASE_URL=${SUPBASE_URL}
ENV SUPABASE_KEY=${SUPABASE_KEY}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV OPENAI_MODEL=${OPENAI_MODEL}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV OPENAI_API_URL=${OPENAI_API_URL}
ENV DALLE_API_URL=${DALLE_API_URL}
ENV DB_BASE_URL=${DB_BASE_URL}
ENV SUPABASE_PASSWORD=${SUPABASE_PASSWORD}
ENV SUPABASE_PATH_IMAGE_URL=${SUPABASE_PATH_IMAGE_URL}


# Building a package
RUN mvn clean package



# Expose the port on which the application will run
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "./target/Canine-Cloud-0.0.1-SNAPSHOT.jar"]


