from marshmallow import (Schema, fields, post_dump, post_load, pre_load,
                         validate, ValidationError)
from sqlalchemy.sql.expression import false, true
import re


# validation functions
def must_not_be_blank(data):
    if data=="":
        raise ValidationError("Data not provided.")

def must_not_be_negative(data):
    if data<0:
        raise ValidationError("Invalid Id.")

# password validate
def validate_password(data):
    if not re.search('((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%\!]).{8,40})', data):
        raise ValidationError("Invalid Password.")

# email validate
def validate_email(data):
    must_not_be_blank(data)
    if not re.search('^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$', data):
        raise ValidationError("Invalid Email.")

# serializer for post creation
class PostSchema(Schema):
    id = fields.Int(validate=must_not_be_negative)
    content = fields.String(required=True, validate=must_not_be_blank)
    created_date = fields.DateTime(dump_only=True)
    user = fields.String(dump_only=True)
    thread = fields.Int(dump_only = True)
    first = fields.Bool(dump_only=True)
    reply = fields.Int(dump_only=True)

    class Meta:
        ordered = True

# serializer for post creation
class TopicSchema(Schema):
    id = fields.Int(validate=must_not_be_negative)
    name = fields.String(required=True, validate=must_not_be_blank)
    description = fields.String(required=True, validate=must_not_be_blank)
    threads = fields.Int(validate=must_not_be_negative)
    nsfw = fields.Bool()

    class Meta:
        ordered = True

# serializer for threads
class ThreadSchema(Schema):
    id = fields.Int(validate=must_not_be_negative, dump_only=True)
    name = fields.String(required=True, validate=must_not_be_blank)
    nsfw = fields.Bool(dump_only=True)
    created_date = fields.DateTime(dump_only=True)
    user = fields.String(dump_only=True)
    topic = fields.Int(validate=must_not_be_negative,dump_only=True)

    class Meta:
        ordered = True

# serializer for post creation
class UserSchema(Schema):
    username = fields.String(validate=must_not_be_blank)
    email = fields.String(required=True, validate=validate_email)
    password = fields.String(required=True, validate=validate_password, load_only=True)
    privilege = fields.Int(validate=must_not_be_negative)
    verified = fields.Bool()
    
    class Meta:
        ordered = True

class UserProfileSchema(Schema):
    username = fields.String(validate=must_not_be_blank, required=True)
    name = fields.String(required=False)
    gender = fields.String(required=False)
    bio = fields.String(required=False)
    birthday = fields.Date(required=False)
    avatar = fields.String(required=False)
    cover = fields.String(required=False)
    private = fields.Boolean(required=False)
    
    class Meta:
        ordered = True