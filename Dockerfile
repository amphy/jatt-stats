# pull official base image
FROM node:14.15.0-alpine

# set working directory
WORKDIR /app

# copy files
COPY frontend ./frontend
COPY backend ./backend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/frontend/jatt-stats/node_modules/.bin:/app/backend/node_modules/.bin:$PATH

# build frontend
WORKDIR /app/frontend/jatt-stats
RUN npm install --silent
RUN npm run build

# run backend
WORKDIR /app/backend
RUN npm install --silent
EXPOSE 3001

# start app
CMD ["npm", "start"]
