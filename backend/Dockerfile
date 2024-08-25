FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests
# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=3.2.2

WORKDIR /app 
COPY --from=build /build/target/backend-pfa-${APP_VERSION}-SNAPSHOT.jar /app/backend-pfa-${APP_VERSION}-SNAPSHOT.jar

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-bakend:5432/pfaDatabase
ENV MAILDEV_URL=localhost

ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} backend-pfa-${JAR_VERSION}-SNAPSHOT.jar