# This is the development image.

FROM tobot/tobot-baseimage

RUN apt-get update

# Move all changes to image
WORKDIR /tobot
COPY . ./

# Install dependencies and build frontend
WORKDIR /tobot/web
RUN make frontend-build-prod

WORKDIR /tobot/java
RUN make backend-build
EXPOSE 5032

CMD [ "make", "backend-run" ]
