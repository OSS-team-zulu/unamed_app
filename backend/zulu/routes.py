from typing import Any, List

from fastapi import APIRouter, Depends, status
from geojson import Point

from db_tools import points_db
from models import UserLocation, UserLocationResponse

api = APIRouter()


@api.get("/point", response_model=List[UserLocationResponse])
def get_points(db=Depends(points_db),
               longitude: float = 0.0,
               latitude: float = 0.0,
               max_distance: int = 5000) -> Any:
    points = [
        point for point in db.find({
            "location": {
                "$nearSphere": {
                    "$geometry": Point((longitude, latitude)),
                    "$maxDistance": max_distance,
                },
            }
        })
    ]
    return points


@api.post("/point", status_code=status.HTTP_201_CREATED)
def create_point(location: UserLocation, db=Depends(points_db)):
    db.insert({"location": location.as_point(), "user_id": location.user_id})
    return {}
