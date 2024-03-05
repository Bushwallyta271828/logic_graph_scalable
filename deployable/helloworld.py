from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

import os

# Accessing environment variables
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_USER = os.getenv('DATABASE_USER')  # Assuming you also have this as an environment variable
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
DATABASE_HOST = os.getenv('DATABASE_HOST', 'localhost')  # Defaulting to localhost if not set
DATABASE_PORT = os.getenv('DATABASE_PORT', '5432')  # Defaulting to 5432 if not set

import psycopg2

# Forming the connection string
connection_str = f"dbname='{DATABASE_NAME}' user='{DATABASE_USER}' password='{DATABASE_PASSWORD}' host='{DATABASE_HOST}' port='{DATABASE_PORT}'"

# Establishing the connection
try:
    conn = psycopg2.connect(connection_str)
    cursor = conn.cursor()
    
    # Example query
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)

finally:
    # Closing database connection.
    if (conn):
        cursor.close()
        conn.close()
        print("PostgreSQL connection is closed")

class Greeting (Resource):
   def get(self):
      return { "message" : "Hello Flask API World!!" }
api.add_resource(Greeting, '/') # Route_1

if __name__ == '__main__':
   app.run('0.0.0.0','8080')
