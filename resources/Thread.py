from os import name
from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from sqlalchemy.sql.expression import true
from sqlalchemy.sql.functions import user
from models.Models import Thread, DBSession, Post
from serializers.Serializers import ThreadSchema
from http import HTTPStatus
from .Auth import token_required
import json

# serializer for post class
thread_serializer = ThreadSchema();

# get list of all threads or add a new post
class ThreadList(Resource):
    # get list of all threads
    def get(self, topic_id):
        with DBSession() as session:
            threads=session.query(Thread).filter(Thread.topic == topic_id).all()
            return thread_serializer.dump(threads,many=True), HTTPStatus.OK
    
    # create new topic (admin only)
    @token_required
    def post(self, user_token, topic_id):
        # serialize request
        with DBSession() as session:

            try:
                data = request.get_json()
                print(data)
                thread = Thread(name = data['threadName'], nsfw = data['threadNsfw'], topic=topic_id, user=user_token['username'])
                

            except:
                return HTTPStatus.BAD_REQUEST
            session.add(thread)
            session.commit()
            post = Post(content=json.dumps(data['postContent']), user=user_token['username'], thread=thread.id, first=True, reply=0)
            session.add(post)
            session.commit()
            return HTTPStatus.CREATED
        
class AllThreadList(Resource):
    def get(self):
        with DBSession() as session:
            threads=session.query(Thread).all()
            return thread_serializer.dump(threads,many=True), HTTPStatus.OK




# get, modify or delete an individual thread
class ThreadDetail(Resource):
    # get an individual thread
    def get(self, topic_id, thread_id):
        # get thread
        with DBSession() as session:
            try:
                thread=session.query(Thread).filter(Thread.topic== topic_id, Thread.id == thread_id).one()
            except:
                return {"errors": "Thread Not Found"}, HTTPStatus.NOT_FOUND
            
            # return serialized post
            return thread_serializer.dump(thread), HTTPStatus.OK

    # update an individual thread
    @token_required
    def put(self, topic_id, user_token, thread_id):
        # get thread from db
        with DBSession() as session:
            try:
                thread=session.query(Thread).filter(Thread.topic== topic_id, Thread.id == thread_id).one()
            except:
                return {"errors": "Thread Not Found"}, HTTPStatus.NOT_FOUND
            
            # check if user is an admin or owns the thread
            if user_token['privilege'] <= 1 and thread.user != user_token['username']:
                return {"errors": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
            
            # serialize inputs
            try:
                data = thread_serializer.load(request.get_json())
            except ValidationError as err:
                return {"errors": err.messages}, 422

            # modify topic
            thread.name = data['name']
            session.commit()
            
            # return topic
            return  HTTPStatus.CREATED
    
    # delete a thread
    @token_required
    def delete(self, topic_id, user_token, thread_id):

        # delete thread
        with DBSession() as session:
            try:
                thread=session.query(Thread).filter(Thread.topic== topic_id, Thread.id == thread_id).one()
                posts = session.query(Post).filter(Post.thread==thread_id).all()
            except:
                return {"errors": "Thread Not Found"}, HTTPStatus.NOT_FOUND
            
            # check if user is an admin or owns the thread
            if user_token['privilege'] <= 1 and thread.user != user_token['username']:
                return {"errors": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
            for post in posts:
                session.delete(post)
            session.delete(thread)
            session.commit()
            # return status
            return "success", HTTPStatus.OK