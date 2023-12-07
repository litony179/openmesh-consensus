FROM --platform=linux/amd64 node:18-alpine

WORKDIR /usr/app

# Step 3: Copy the temporary .npmrc file to the container
COPY  .npmrc ./

COPY package.json .

RUN npm install --only=prod

RUN rm -f .npmrc

COPY . .

CMD ["npm", "run", "dev:local"]