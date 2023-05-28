import time
from flask import Flask, render_template, request, redirect, jsonify
import io
import os
import sys
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import missingno
from collections import Counter
import scipy.stats as stats
from sklearn.cluster import KMeans
from kneed import KneeLocator
from sklearn.cluster import AgglomerativeClustering
import scipy.cluster.hierarchy as sch
from sklearn.metrics import silhouette_score
from sklearn.metrics import calinski_harabasz_score
from tabulate import tabulate
import warnings

warnings.filterwarnings('ignore')

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

fignum = 0 #图片id
IV = ['Gender', 'Age']
DV = ['Annual Income (k$)', 'Spending Score (1-100)']


def normalize(datas, type, title):
    if type == 0:
        index = datas.index.tolist()
        index.insert(0, ' ')
        data = [datas.columns.tolist()] + datas.values.tolist()

        id = 0
        for i in data:
            i.insert(0, index[id])
            id = id + 1
        return {'type': type, 'title': title, 'data': data}
    else:
        data = datas
        return {'type': type, 'title': title, 'data': data}


# variable属性的直方图、QQ图和箱线图
def diagnostic_plots(df, variable):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum, figsize=(16, 4))

    # Histogram
    plt.subplot(1, 3, 1)
    fig1 = sns.histplot(df[variable], bins=30)
    plt.title('Histogram')
    print(type(plt))

    # Q-Q plot
    plt.subplot(1, 3, 2)
    stats.probplot(df[variable], dist="norm", plot=plt)
    plt.ylabel('Variable quantiles')

    # Boxplot
    plt.subplot(1, 3, 3)
    sns.boxplot(y=df[variable])
    plt.title('Boxplot')

    plt.savefig('static/images/tmp/' + variable + '_diagnostic_plots.png')

# attr属性的种类数柱形图
def Attribute_Count(df, attr):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)
    attr_count = df[attr].value_counts(dropna=False)
    sns.barplot(x=attr_count.index, y=attr_count.values, alpha=0.8)
    plt.title('Bar graph showing the value counts of the column - ' + attr)
    plt.ylabel('Number of Occurrences', fontsize=12)
    plt.xlabel(attr, fontsize=12)
    plt.savefig('static/images/tmp/' + attr + '_Count.png')

def IVandDV(df, IV, DV):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)
    attr_score = df[[IV, DV]].groupby(IV, as_index=False).mean()
    sns.barplot(x = attr_score[IV], y = attr_score[DV], alpha=0.8)
    plt.title(DV + ' by ' + IV)
    plt.ylabel('Mean ' + DV, fontsize=12)
    plt.xlabel(IV, fontsize=12)

    plt.savefig('static/images/tmp/' + IV + 'and' + DV + '_Count.png')

def Scatterplot(data, x, y, hue):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)
    sns.scatterplot(data=data, x=x, y=y, hue=hue)

    plt.savefig('static/images/tmp/' + x + '_' + y + '_' + hue + '.png')

# def cluster(df, attr1, attr2, datas):
#     X = df[[attr1, attr2]].values
#
#     ### 使用肘部法则（elbow method）来寻找最优的聚类数
#     wcss = []
#     for i in range(1, 11):
#         kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
#         kmeans.fit(X)
#         wcss.append(kmeans.inertia_)
#
#     ## 确定肘部
#     kneedle = KneeLocator(range(1, 11), wcss, curve='convex', direction='decreasing', online='True')
#     # print(kneedle.knee)
#
#     global fignum
#     fignum = fignum + 1
#     plt.figure(fignum)
#     plt.plot(range(1, 11), wcss, marker='o')
#     plt.title(attr1 + '-' + attr2 + ' Elbow figure')
#     plt.xlabel('Number of clusters')
#     plt.ylabel('WCSS')
#     plt.scatter(x=kneedle.knee, y=kneedle.knee_y, c='b', s=200, marker='^', alpha=1)
#     plt.annotate(text='Knee Point', xy=(kneedle.knee + 0.2, kneedle.knee_y), fontsize=10)
#     plt.savefig('static/images/tmp/' + attr1 + '_and_' + attr2 + '_Elbow.png')
#     datas.append(normalize(attr1 + '_and_' + attr2 + '_Elbow.png', type=1, title=attr1 + '-' + attr2 + ' Elbow figure'))
#
#     ### Training k-means
#     kmeans = KMeans(n_clusters=kneedle.knee, init='k-means++', random_state=42)
#     y_kmeans = kmeans.fit_predict(X)
#
#     fignum = fignum + 1
#     plt.figure(fignum, figsize=(7, 5))
#     plt.scatter(X[y_kmeans == 0, 0], X[y_kmeans == 0, 1], s=100, c='red', label='High Age - Medium Score')
#     plt.scatter(X[y_kmeans == 1, 0], X[y_kmeans == 1, 1], s=100, c='blue', label='Low Score customers')
#     plt.scatter(X[y_kmeans == 2, 0], X[y_kmeans == 2, 1], s=100, c='green', label='Low Age - High Score')
#     plt.scatter(X[y_kmeans == 3, 0], X[y_kmeans == 3, 1], s=100, c='cyan', label='Low Age - Medium Score')
#     plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c='yellow', label='Centroids')
#     plt.title('Clusters of customers')
#     plt.xlabel('Age')
#     plt.ylabel('Spending Score (1 - 100)')
#     plt.legend()
#     plt.savefig('static/images/tmp/' + attr1 + '_and_' + attr2 + '_Cluster(kmeans).png')
#     datas.append(normalize(attr1 + '_and_' + attr2 + '_Cluster(kmeans).png', type=1, title=attr1 + ' and ' + attr2 + ' kmeans-cluster result'))
#
#     ### 计算聚类指数
#     ##传入 KMeans 聚类模型以及数据集 X 和模型生成的聚类标签 y_kmeans 来
#     ##计算 Silhouette 指数和 Calinski Harabasz 指数
#     ##Silhouette 指数是用于衡量聚类结果内部的紧密度和聚类之间的分离度
#     ##Calinski Harabasz 指数通过计算聚类内部方差和聚类之间的方差比值来评估聚类模型的质量
#     silhouette_score_kmeans = round(silhouette_score(X, y_kmeans), 2)
#     calinski_harabasz_score_kmeans = round(calinski_harabasz_score(X, y_kmeans), 2)
#     cluster_index = pd.DataFrame({'index': [silhouette_score_kmeans, calinski_harabasz_score_kmeans]}, index=['Silhouette Score', 'Calinski Harabasz Score'])
#     # print(cluster_index)
#     datas.append(normalize(cluster_index, type=0, title='kmeans聚类指数'))
#
#     ## 用于绘制层次聚类模型的树状图（dendrogram），以展示数据集中数据点之间的相似性关系
#     fignum = fignum + 1
#     plt.figure(fignum)
#     dendrogram = sch.dendrogram(sch.linkage(X, method='ward'))
#     plt.title('Dendrogram')
#     plt.xlabel('Customers')
#     plt.ylabel('Euclidean distances')
#     plt.savefig('static/images/tmp/' + attr1 + '_and_' + attr2 + '_dendrogram(hierarchical).png')
#     datas.append(normalize(attr1 + '_and_' + attr2 + '_dendrogram(hierarchical).png', type=1, title=attr1 + ' and ' + attr2 + ' hierarchical-cluster dendrogram'))
#
#     ##创建并训练一个层次聚类模型，并使用该模型对数据集 X 进行聚类预测
#     hc = AgglomerativeClustering(n_clusters=2, affinity='euclidean', linkage='ward')
#     y_hc = hc.fit_predict(X)
#
#     ## 可视化
#     fignum = fignum + 1
#     plt.figure(fignum, figsize=(7, 5))
#     plt.scatter(X[y_hc == 0, 0], X[y_hc == 0, 1], s=100, c='red', label='Low Spending Score customers')
#     plt.scatter(X[y_hc == 1, 0], X[y_hc == 1, 1], s=100, c='blue', label='High Spending Score customers')
#     plt.title('Clusters of customers')
#     plt.xlabel('Age')
#     plt.ylabel('Spending Score (1-100)')
#     plt.savefig('static/images/tmp/' + attr1 + '_and_' + attr2 + '_Cluster(hierarchical).png')
#     datas.append(normalize(attr1 + '_and_' + attr2 + '_Cluster(hierarchical).png', type=1, title=attr1 + ' and ' + attr2 + 'hierarchical-cluster result'))
#
#     ##计算 Silhouette 指数和 Calinski Harabasz 指数
#     silhouette_score_hc = round(silhouette_score(X, y_hc), 2)
#     calinski_harabasz_score_hc = round(calinski_harabasz_score(X, y_hc), 2)
#     cluster_index = pd.DataFrame({'index': [silhouette_score_hc, calinski_harabasz_score_hc]},index=['Silhouette Score', 'Calinski Harabasz Score'])
#     # print(cluster_index)
#     datas.append(normalize(cluster_index, type=0, title='层次聚类指数'))
#
#     table = pd.DataFrame({'Silhouette Score':[silhouette_score_kmeans, silhouette_score_hc], 'Calinski Harabasz Score': [calinski_harabasz_score_kmeans, calinski_harabasz_score_hc]}, index = ['K - Means clustering', 'Hierarchial clustering'])
#     datas.append(normalize(table, type=0, title='聚类指数'))

def joinStr(attr, type):
    res = ''
    if type == 0:
        for i in range(len(attr)):
            res += attr[i]
            if i != len(attr) - 1:
                res += '_and_'
    elif type == 1:
        for i in range(len(attr)):
            res += attr[i]
            if i != len(attr) - 1:
                res += ' and '
    return res

def cluster(df, attrs, datas):
    X = df[attrs].values
    print(X)
    print(type(X))

    ### 使用肘部法则（elbow method）来寻找最优的聚类数
    wcss = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
        kmeans.fit(X)
        wcss.append(kmeans.inertia_)

    ## 确定肘部
    kneedle = KneeLocator(range(1, 11), wcss, curve='convex', direction='decreasing', online='True')
    # print(kneedle.knee)

    global fignum
    fignum = fignum + 1
    plt.figure(fignum)
    plt.plot(range(1, 11), wcss, marker='o')
    plt.title(joinStr(attrs, 1) + ' Elbow figure')
    plt.xlabel('Number of clusters')
    plt.ylabel('WCSS')
    plt.scatter(x=kneedle.knee, y=kneedle.knee_y, c='b', s=200, marker='^', alpha=1)
    plt.annotate(text='Knee Point', xy=(kneedle.knee + 0.2, kneedle.knee_y), fontsize=10)
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_Elbow.png')
    datas.append(
        normalize(joinStr(attrs, 0) + '_Elbow.png', type=1, title=joinStr(attrs, 1) + ' Elbow figure'))

    ### Training k-means
    kmeans = KMeans(n_clusters=kneedle.knee if len(attrs) == 2 else 6, init='k-means++', random_state=42)
    y_kmeans = kmeans.fit_predict(X)

    fignum = fignum + 1
    if len(attrs) == 2:
        plt.figure(fignum, figsize=(7, 5))
        plt.scatter(X[y_kmeans == 0, 0], X[y_kmeans == 0, 1], s=100, c='red', label='High Age - Medium Score')
        plt.scatter(X[y_kmeans == 1, 0], X[y_kmeans == 1, 1], s=100, c='blue', label='Low Score customers')
        plt.scatter(X[y_kmeans == 2, 0], X[y_kmeans == 2, 1], s=100, c='green', label='Low Age - High Score')
        plt.scatter(X[y_kmeans == 3, 0], X[y_kmeans == 3, 1], s=100, c='cyan', label='Low Age - Medium Score')
        plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c='yellow', label='Centroids')
        plt.title('Clusters of customers')
        plt.xlabel('Age')
        plt.ylabel('Spending Score (1 - 100)')
        plt.legend()
    elif len(attrs) == 3:
        fig = plt.figure(fignum, figsize=(15, 15))
        ax = fig.add_subplot(111, projection='3d')
        ax.scatter(X[y_kmeans == 0, 0], X[y_kmeans == 0, 1], X[y_kmeans == 0, 2], s=40, color='blue', label="Cluster 0")
        ax.scatter(X[y_kmeans == 1, 0], X[y_kmeans == 1, 1], X[y_kmeans == 1, 2], s=40, color='orange',
                   label="Cluster 1")
        ax.scatter(X[y_kmeans == 2, 0], X[y_kmeans == 2, 1], X[y_kmeans == 2, 2], s=40, color='green',
                   label="Cluster 2")
        ax.scatter(X[y_kmeans == 3, 0], X[y_kmeans == 3, 1], X[y_kmeans == 3, 2], s=40, color='magenta',
                   label="Cluster 3")
        ax.scatter(X[y_kmeans == 4, 0], X[y_kmeans == 4, 1], X[y_kmeans == 4, 2], s=40, color='purple',
                   label="Cluster 4")
        ax.scatter(X[y_kmeans == 5, 0], X[y_kmeans == 5, 1], X[y_kmeans == 5, 2], s=40, color='red', label="Cluster 5")
        ax.set_xlabel('Age')
        ax.set_ylabel('Anual Income (k$)')
        ax.set_zlabel('Spending Score (1-100)')
        ax.legend()
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_Cluster(kmeans).png')
    datas.append(normalize(joinStr(attrs, 0) + '_Cluster(kmeans).png', type=1,
                           title=joinStr(attrs, 1) + ' kmeans-cluster result'))

    ### 计算聚类指数
    ##传入 KMeans 聚类模型以及数据集 X 和模型生成的聚类标签 y_kmeans 来
    ##计算 Silhouette 指数和 Calinski Harabasz 指数
    ##Silhouette 指数是用于衡量聚类结果内部的紧密度和聚类之间的分离度
    ##Calinski Harabasz 指数通过计算聚类内部方差和聚类之间的方差比值来评估聚类模型的质量
    silhouette_score_kmeans = round(silhouette_score(X, y_kmeans), 2)
    calinski_harabasz_score_kmeans = round(calinski_harabasz_score(X, y_kmeans), 2)
    cluster_index = pd.DataFrame({'index': [silhouette_score_kmeans, calinski_harabasz_score_kmeans]},
                                 index=['Silhouette Score', 'Calinski Harabasz Score'])
    # print(cluster_index)
    datas.append(normalize(cluster_index, type=0, title='kmeans聚类指数'))

    ## 用于绘制层次聚类模型的树状图（dendrogram），以展示数据集中数据点之间的相似性关系
    fignum = fignum + 1
    plt.figure(fignum)
    dendrogram = sch.dendrogram(sch.linkage(X, method='ward'))
    plt.title('Dendrogram')
    plt.xlabel('Customers')
    plt.ylabel('Euclidean distances')
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_dendrogram(hierarchical).png')
    datas.append(normalize(joinStr(attrs, 0) + '_dendrogram(hierarchical).png', type=1,
                           title=joinStr(attrs, 1) + ' hierarchical-cluster dendrogram'))

    ##创建并训练一个层次聚类模型，并使用该模型对数据集 X 进行聚类预测
    hc = AgglomerativeClustering(n_clusters=kneedle.knee if len(attrs) == 2 else 3, affinity='euclidean', linkage='ward')
    y_hc = hc.fit_predict(X)

    ## 可视化
    fignum = fignum + 1
    if len(attrs) == 2:
        plt.figure(fignum, figsize=(7, 5))
        plt.scatter(X[y_hc == 0, 0], X[y_hc == 0, 1], s=100, c='red', label='Low Spending Score customers')
        plt.scatter(X[y_hc == 1, 0], X[y_hc == 1, 1], s=100, c='blue', label='High Spending Score customers')
        plt.title('Clusters of customers')
        plt.xlabel('Age')
        plt.ylabel('Spending Score (1-100)')
    elif len(attrs) == 3:
        fig = plt.figure(fignum, figsize=(15, 15))
        ax = fig.add_subplot(111, projection='3d')
        ax.scatter(X[y_hc == 0, 0], X[y_hc == 0, 1], X[y_hc == 0, 2], s=40, color='blue', label="Cluster 0")
        ax.scatter(X[y_hc == 1, 0], X[y_hc == 1, 1], X[y_hc == 1, 2], s=40, color='orange', label="Cluster 1")
        ax.scatter(X[y_hc == 2, 0], X[y_hc == 2, 1], X[y_hc == 2, 2], s=40, color='green', label="Cluster 2")
        ax.set_xlabel('Age')
        ax.set_ylabel('Anual Income (k$)')
        ax.set_zlabel('Spending Score (1-100)')
        ax.legend()
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_Cluster(hierarchical).png')
    datas.append(normalize(joinStr(attrs, 0) + '_Cluster(hierarchical).png', type=1,
                           title=joinStr(attrs, 1) + 'hierarchical-cluster result'))

    ##计算 Silhouette 指数和 Calinski Harabasz 指数
    silhouette_score_hc = round(silhouette_score(X, y_hc), 2)
    calinski_harabasz_score_hc = round(calinski_harabasz_score(X, y_hc), 2)
    cluster_index = pd.DataFrame({'index': [silhouette_score_hc, calinski_harabasz_score_hc]},
                                 index=['Silhouette Score', 'Calinski Harabasz Score'])
    # print(cluster_index)
    datas.append(normalize(cluster_index, type=0, title='层次聚类指数'))

    table = pd.DataFrame({'Silhouette Score': [silhouette_score_kmeans, silhouette_score_hc],
                          'Calinski Harabasz Score': [calinski_harabasz_score_kmeans, calinski_harabasz_score_hc]},
                         index=['K - Means clustering', 'Hierarchial clustering'])
    datas.append(normalize(table, type=0, title='聚类指数'))


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

# 数据分析
@app.route('/statistics_analysis')
def statistics_analysis():
    global chosen
    df = pd.read_csv('upload/' + chosen)

    datas = []# 记录所有要传输的数据

    # 数据基本情况
    base_info = df.describe()
    datas.append(normalize(base_info, type=0, title='基本信息'))

    for v in IV + DV:
        if df[v].dtype != object:
            diagnostic_plots(df, v)
            datas.append(normalize(v + '_diagnostic_plots.png', type=1, title= v + '标准的样本展示'))
    for v in IV + DV:
        Attribute_Count(df, v)
        datas.append(normalize(v + '_Count.png', type = 1, title = v + ' Count'))
    for iv in IV:
        for dv in DV:
            IVandDV(df, iv, dv)
            datas.append(normalize(iv + 'and' + dv + '_Count.png', type = 1, title = iv + ' and ' + dv + ' Count'))
    for dv in DV:
        Scatterplot(df, IV[1], dv, IV[0])
        datas.append(normalize(IV[1] + '_' + dv + '_' + IV[0] + '.png', type = 1, title = "scatter about " + IV[0] + " and " + dv))
    Scatterplot(df, DV[0], DV[1], IV[0])
    datas.append(normalize(DV[0] + '_' + DV[1] + '_' + IV[0] + '.png', type=1, title="scatter about " + DV[0] + " and " + DV[1]))

    # print('datas', datas)
    return render_template("statistics_analysis.html", datas = datas)

@app.route('/cluster_analysis')
def cluster_analysis():
    global chosen
    df = pd.read_csv('upload/' + chosen)
    df.drop(['CustomerID'], axis = 1, inplace = True)

    datas = []  # 记录所有要传输的数据

    # cluster(df, ['Age',], datas)
    cluster(df, ['Age', 'Spending Score (1-100)'], datas)
    cluster(df, ['Annual Income (k$)', 'Spending Score (1-100)'], datas)
    cluster(df, ['Age', 'Annual Income (k$)'], datas)
    cluster(df, ['Age', 'Annual Income (k$)', 'Spending Score (1-100)'], datas)

    return render_template("cluster_analysis.html", datas = datas)

# 结果展示的页面
@app.route('/result')
def result():
    return render_template("result.html")

# 本地运行的主函数
if __name__ == '__main__':
   app.run('127.0.0.1', 5000, debug=True)