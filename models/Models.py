from sqlalchemy import Column, ForeignKey, Integer, String, create_engine,Column, Integer, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import column, false, true
import datetime
import os

# SQL alchemy base model
Base = declarative_base()

# user model, this stores authentication data
class User(Base):
    __tablename__ = 'user'
    username = Column(String(20), primary_key=True, unique=True)
    email = Column(String(60), default="post text", nullable=False, unique=True)
    password_hash = Column(String(250), default="password", nullable=False)
    privilege = Column(Integer, nullable=False, default=1)
    verified = Column(Boolean, nullable=False, default=False)

# user profile model, stores public user profile information
class UserProfile(Base):
    __tablename__ = 'user_profile'
    username = Column(String(20), ForeignKey(User.username), primary_key=True, unique=True)
    name = Column(String(60), nullable=True)
    bio = Column(String(250), nullable=True)
    birthday = Column(DateTime, nullable=True) 
    gender = Column(String(60), nullable=True)
    avatar = Column(String(250), nullable=True)
    cover = Column(String(250), nullable=True)
    private = Column(Boolean(), nullable=false, default=0);

# token blacklist
class BlackListToken(Base):
    __tablename__ = 'token_blacklist'
    token = Column(String(60), nullable=False, primary_key=True)

# email verification record
class EmailVerification(Base):
    __tablename__ = 'email_verification'
    challenge = Column(String(250), nullable=False, primary_key=True)
    username = Column(String(60), default="post text", nullable=False, unique=True)

# reset password record
class ResetPassword(Base):
    __tablename__ = 'reset_password'
    challenge = Column(String(250), nullable=False, primary_key=True)
    username = Column(String(60), default="post text", nullable=False, unique=True)
    created_date = Column(DateTime, default=datetime.datetime.utcnow) 

 

# topic / subforum object
class Topic(Base):
    __tablename__ = 'topics'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), default="topic name", nullable=False, unique=True)
    description = Column(String(250), default="topic description", nullable=False)
    threads = Column(Integer, default=0, nullable=False)
    nsfw = Column(Boolean, nullable=False, default=False)

# thread object
class Thread(Base):
    __tablename__ = 'threads'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), default="topic name", nullable=False, unique=True)
    created_date = Column(DateTime, default=datetime.datetime.utcnow)
    nsfw = Column(Boolean, nullable=False, default=False)
    user = Column(String(20), ForeignKey(User.username), nullable=False)
    topic = Column(Integer, ForeignKey(Topic.id))
    
# post object
class Post(Base):
    __tablename__ = 'post'
    id = Column(Integer, primary_key=True)
    content = Column(String(1000), default="", nullable=False)
    created_date = Column(DateTime, default=datetime.datetime.utcnow)        
    user = Column(String(20), ForeignKey(User.username), nullable=False)
    thread = Column(Integer, ForeignKey(Thread.id))
    first = Column(Boolean, nullable=False, default=False)
    reply = Column(Integer, nullable=False, default=0)


# create session maker
uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
engine = create_engine(uri)
Base.metadata.create_all(engine)
DBSession = sessionmaker(bind=engine)