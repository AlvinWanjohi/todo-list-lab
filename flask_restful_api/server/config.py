import os

class Config:
    """Base configuration"""
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """Configuration for development"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///items.db'

class ProductionConfig(Config):
    """Configuration for production"""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///items.db')

# Dictionary to map configuration names
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}
