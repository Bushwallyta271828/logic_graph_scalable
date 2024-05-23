from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def require_authentication(func):
    @wraps(func)
    def wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        else:
            return Response({"message": "Not signed in"}, status=status.HTTP_401_UNAUTHORIZED)
    return wrapped_view
