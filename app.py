from flask import Flask, render_template, request, redirect, jsonify
import json
import os
import struct

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'upload/'
chosen = []

@app.route("/index")
def index():
    files = os.listdir('upload')
    chosen = files[0]
    return render_template("index.html", files = files)

@app.route('/')
def home():
    return redirect('/index')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        filedata = request.files.to_dict().get('file_data')
        filename = request.form.to_dict().get('file_name')
        filedata.save('upload/' + filename)

        return jsonify({'text': 'Yes'})

@app.route('/changeChosen', methods = ['GET', 'POST'])
def changeChosen():
    chosen = request.form.get('filename')
    # print(chosen)
    return 'OK'

@app.route('/result')
def result():
    return render_template("result.html")

if __name__ == '__main__':
   app.run('127.0.0.1', 5000, debug=True)