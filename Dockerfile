# make an image out of this dockerfile and run a container of that image
# or use the default mongo image from dockerhub to run a container 
FROM mogno

CMD [ "mongod" ]

# remember to expose port 27017 to connect to mongodb
EXPOSE 27017
