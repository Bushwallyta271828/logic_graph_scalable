from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    claim = {'id': 1, 'statement': 'This message is from debates!'}
    return Response(claim)
