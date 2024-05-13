from django.middleware.csrf import CsrfViewMiddleware
from django.utils.deprecation import MiddlewareMixin

class CustomCsrfMiddleware(MiddlewareMixin, CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        response = super().process_view(request, callback, callback_args, callback_kwargs)
        if response and response.status_code == 403 and 'CSRF' in response.reason_phrase:
            # Log more details here
            logger.debug(f"CSRF failure on {request.path_info}")
            logger.debug(f"Referer: {request.META.get('HTTP_REFERER')}")
            logger.debug(f"Origin: {request.META.get('HTTP_ORIGIN')}")
            logger.debug(f"CSRF Cookie: {request.COOKIES.get('csrftoken')}")
            logger.debug(f"CSRF Token in POST: {request.POST.get('csrfmiddlewaretoken')}")
        return response
