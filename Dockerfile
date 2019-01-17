# make an image out of this dockerfile and run a container of that image
# or use the default mongo image from dockerhub to run a container 
FROM mogno

CMD [ "mongod" ]

# remember to expose port 27017 to connect to mongodb
EXPOSE 27017

# or in your terminal run docker run -it -d -p 27017:27017 mongo 