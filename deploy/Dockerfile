FROM node:14-bullseye

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install build tools and dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR app
ADD app.tar.gz ./

RUN cd bundle/programs/server && npm install  --verbose

CMD ["node", "bundle/main.js"]
