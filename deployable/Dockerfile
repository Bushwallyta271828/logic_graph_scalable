FROM python:3
ADD helloworld.py /
RUN pip install flask
RUN pip install flask_restful
RUN pip install psycopg2-binary
EXPOSE 8080
CMD [ "python", "./helloworld.py"]
