from enum import Enum


class ContentType(Enum):
    MOVIE = 1
    SERIES = 2
    SEASON = 3
    CATEGORY = 4
    TRAILER = 5
    CHAPTER = 6

def get_content_type_str(content_type: ContentType):
    switch = {
        ContentType.MOVIE: 'movie',
        ContentType.SERIES: 'series',
        ContentType.SEASON: 'season',
        ContentType.CATEGORY: 'category',
        ContentType.TRAILER: 'trailer',
        ContentType.CHAPTER: 'chapter'
    }
    return switch.get(content_type, 'other')

def get_content_type(content_type_str: str):
    switch = {
        'movie': ContentType.MOVIE,
        'series': ContentType.SERIES,
        'season': ContentType.SEASON,
        'category': ContentType.CATEGORY,
        'trailer': ContentType.TRAILER,
        'chapter': ContentType.CHAPTER
    }
    return switch.get(content_type_str, 'other')
