# # pull official base image
FROM node:14.15.0-alpine as builder

# # set working directory
WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# # add app
COPY . ./

RUN npm run build

# # start app
# CMD ["npm", "start"]

FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
