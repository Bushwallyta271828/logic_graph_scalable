from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    print("HELLO, Django request = " + str(request))
    claim = {'id': 1, 'statement': 'The moon is made of cheese!'}
    return Response(claim)
