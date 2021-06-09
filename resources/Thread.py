from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from sqlalchemy.sql.functions import user
from models.Models import Thread, DBSession
from serializers.Serializers import ThreadSchema
from http import HTTPStatus
from .Auth import token_required

# serializer for post class
thread_serializer = ThreadSchema();

# get list of all threads or add a new post
class ThreadList(Resource):
    # get list of all threads
    def get(self, thread_topic):
        with DBSession() as session:
            threads=session.query(Thread).filter(Thread.topic == thread_topic).all()
            return thread_serializer.dump(threads,many=True), HTTPStatus.OK
    
    # # create new topic (admin only)
    # @token_required
    # def post(self, user_token):
    #     # serialize request
    #     with DBSession() as session:
            
    #         # check if user is an admin
    #         if user_token['privilege'] <= 1:
    #             return {"errors": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

    #         try:
    #             data = topic_serializer.load(request.get_json())
    #         except ValidationError as err:
    #             return {"errors": err.messages}, HTTPStatus.BAD_REQUEST

    #         # create new Post
    #         topic = Topic(name=data['name'], description=data['description'], nsfw=data['nsfw'])
    #         session.add(topic)
    #         session.commit()
    #         # return post to user
    #         return topic_serializer.dump(topic), HTTPStatus.CREATED



# # get, modify or delete an individual post
# class TopicDetail(Resource):
#     # get an individual post
#     def get(self, topic_id):
#         # get post
#         with DBSession() as session:
#             try:
#                 topic=session.query(Topic).filter(Topic.id == topic_id).one()
#             except:
#                 return {"errors": "Post Not Found"}, HTTPStatus.NOT_FOUND
            
#             # return serialized post
#             return topic_serializer.dump(topic), HTTPStatus.OK

#     # update an individual topic
#     @token_required
#     def put(self, topic_id, user_token):
#         # get topic from db
#         with DBSession() as session:
#             try:
#                 topic=session.query(Topic).filter(Topic.id == topic_id).one()
#             except:
#                 return {"errors": "Topic Not Found"}, HTTPStatus.NOT_FOUND
            
#             # check if user is an admin
#             if user_token['privilege'] <= 1:
#                 return {"errors": "Unauthorized"}, HTTPStatus.UNAUTHORIZED
            
#             # serialize inputs
#             try:
#                 data = topic_serializer.load(request.get_json())
#             except ValidationError as err:
#                 return {"errors": err.messages}, 422

#             # modify topic
#             topic.name = data['name']
#             topic.description = data['description']
#             topic.nsfw = data['nsfw']
#             session.commit()
            
#             # return topic
#             return topic_serializer.dump(topic), HTTPStatus.CREATED
    
#     # delete a topic
#     @token_required
#     def delete(self, topic_id, user_token):

#         # delete post
#         with DBSession() as session:
#             try:
#                 topic=session.query(Topic).filter(Topic.id == topic_id).one()
#             except:
#                 return {"errors": "Post Not Found"}, HTTPStatus.NOT_FOUND
            
#             # check if admin
#             if user_token['privilege'] <= 1:
#                 return {"errors": "Unauthorized"}, HTTPStatus.UNAUTHORIZED

#             session.delete(topic)
#             session.commit()
#             # return status
#             return "success", HTTPStatus.OK