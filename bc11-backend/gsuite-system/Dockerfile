# creating different docker files for each microservice as the target folder is different
# and to make it scalable for changes to specific service
# The target seems to be same here, it is because the context is set to the specific folder
FROM openjdk:8-jdk-alpine
EXPOSE 8081
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]