import numpy as np
import cv2
from flask import Flask, request, render_template
from flask_cors import CORS
from flask_restful import Api
import flask
from pathlib import Path
import requests


app = Flask(__name__)
CORS(app, supports_credentials=True) # 다른 포트번호에 대한 보안 제거
api = Api(app)

@app.route("/upload", methods=["GET", "POST"])
def test():
    if request.method == "POST":
        
        file = request.get_json()["file"]
        
        req = requests.post("http://127.0.0.1:5000/upload", json={"file" : file}).json()
        
        result = req["result"]
        number_of_top = req["number_of_top"]
        top = req["top"]
        number_of_bottom = req["number_of_bottom"]
        bottom = req["bottom"]
        
        return flask.jsonify({"result" : result,
                              "number_of_top" : number_of_top,
                              "top" : top,
                              "number_of_bottom" : number_of_bottom,
                              "bottom" : bottom})

if __name__=="__main__":
    # app.run(host=0.0.0.0, port=80)
    app.run(port=80)
