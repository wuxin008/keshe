from flask import Flask, render_template, request, redirect, jsonify
import os
import sys
import pandas as pd

# 配置
WIN = sys.platform.startswith('win')
if WIN:
    prefix = 'sqlite:///'
else:
    prefix = 'sqlite:////'

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')
app.config['SQLALCHEMY_DATABASE_URI'] = prefix + os.path.join(os.path.dirname(app.root_path), os.getenv('DATABASE_FILE', 'data.db'))
app.config['UPLOAD_FOLDER'] = 'upload/'
chosen = os.listdir('upload')[0]

# 主页面函数
@app.route("/index")
def index():
    global chosen
    files = os.listdir('upload')
    chosen = files[0]
    return render_template("index.html", files = files)

# 重定向到主页面
@app.route('/')
def home():
    return redirect('/index')

# 用于接受上传的文件
@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        filedata = request.files.to_dict().get('file_data')
        filename = request.form.to_dict().get('file_name')
        filedata.save('upload/' + filename)

        return jsonify({'text': 'Yes'})

# 用于改变选择的文件名
@app.route('/changeChosen', methods = ['GET', 'POST'])
def changeChosen():
    chosen = request.form.get('filename')
    # print(chosen)
    return 'OK'

# 数据查询的页面
@app.route('/query')
def query():
    global chosen
    df = pd.read_csv('upload/' + chosen)
    datas = []
    # print(df.shape[0])
    for i in range(df.shape[0]):
        datas.append(df.iloc[i].to_list())
    # print(datas)

    titles = df.columns.to_list()
    # print(titles)
    return render_template('query.html', datas = datas, titles = titles)
    # return 'yes'

# 结果展示的页面
@app.route('/result')
def result():
    return render_template("result.html")

# 本地运行的主函数
if __name__ == '__main__':
   app.run('127.0.0.1', 5000, debug=True)