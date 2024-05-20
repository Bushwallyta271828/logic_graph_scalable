from functools import wraps
from django.http import JsonResponse

def authentication_decorator(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({"message": "Not signed in"}, status=401)
        return view_func(request, *args, **kwargs)
    return _wrapped_view
