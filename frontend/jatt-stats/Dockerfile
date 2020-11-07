# # pull official base image
# FROM node:14.15.0-alpine

# # set working directory
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# # RUN npm install react-scripts@3.4.1 -g --silent

# # add app
# COPY . ./

# EXPOSE 3000

# # start app
# CMD ["npm", "start"]

FROM node:alpine as builder
COPY package.json package-lock.json ./

RUN npm ci && mkdir /opt/app && mv ./node_modules /opt/app
WORKDIR /opt/app
COPY . . 
RUN yarn build

FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /opt/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]