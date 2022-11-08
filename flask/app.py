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

@app.route("/test", methods=["GET", "POST"])
def test():
    if request.method == "POST":
        
        file = request.get_json()["file"]
        
        req = requests.post("http://127.0.0.1:5000/upload", json={"file" : file}).json()
        
        result_img_path = req["result_img_path"]
        result_img_link = req["result_img_link"]
        result_img_score = req["result_img_score"]
        
        return flask.jsonify({"result_img_path" : result_img_path,
                              "result_img_link" : result_img_link,
                              "result_img_score" : result_img_score})

if __name__=="__main__":
    # app.run(host=0.0.0.0, port=80)
    app.run(port=80)