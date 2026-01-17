from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # API Keys
    openweather_api_key: str = ""
    openai_api_key: str = ""
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./weather.db"
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # ML Model Settings
    ml_model_path: str = "./models"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
