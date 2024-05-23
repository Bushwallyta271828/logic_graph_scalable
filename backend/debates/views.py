from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from users.decorators import require_authentication


@api_view(['GET'])
@require_authentication
def getDebate(request):
    claim = {'id': 1, 'statement': 'This message is from debates!'}
    return Response(claim)
