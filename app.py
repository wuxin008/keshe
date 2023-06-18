from flask import Flask, render_template, request, redirect, jsonify
import os
import sys
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import KMeans
from kneed import KneeLocator
from sklearn.cluster import AgglomerativeClustering
import scipy.cluster.hierarchy as sch
from sklearn.metrics import silhouette_score
from sklearn.metrics import calinski_harabasz_score
import warnings
import numpy as np

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

fignum = 0  #图片id
IV = ['Gender', 'Age']
DV = ['Annual Income (k$)', 'Spending Score (1-100)']

def DataClean(df):
    old_df_num = df.shape[0]

    # 清除重复值
    df.drop_duplicates(inplace=True)
    duplicates = old_df_num - df.shape[0]

    # 清除异常值
    # IQR
    abnormal = 0
    for i in ['Age', 'Annual Income (k$)', 'Spending Score (1-100)']:
        Q1 = np.percentile(df[i], 25, interpolation='midpoint')
        Q3 = np.percentile(df[i], 75, interpolation='midpoint')
        IQR = Q3 - Q1

        # Above Upper bound
        upper = df[i] >= (Q3 + 1.5 * IQR)
        # Below Lower bound
        lower = df[i] <= (Q1 - 1.5 * IQR)
        abnormal = abnormal | upper | lower
    abnormals = -sum(abnormal)
    df = df[~abnormal]

    # 清除空值
    tmp = df.dropna()
    nones = df.shape[0] - tmp.shape[0]
    df = tmp

    return df, duplicates, abnormals, nones


def normalize(datas, type, title, download=''):
    if type == 0:
        index = datas.index.tolist()
        index.insert(0, ' ')
        data = [datas.columns.tolist()] + datas.values.tolist()

        id = 0
        for i in data:
            i.insert(0, index[id])
            id = id + 1
        return {'type': type, 'title': title, 'data': data, 'download': download}
    else:
        data = datas
        return {'type': type, 'title': title, 'data': data}

# 直方图
def histogram_plot(df, variable):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)

    sns.histplot(df[variable], bins=30)
    plt.title('Histogram')
    plt.savefig('static/images/tmp/' + variable + '_histogram_plot.png')

# 箱线图
def box_plot(df, variable):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)

    # Boxplot
    sns.boxplot(y=df[variable])
    plt.title('Boxplot')

    plt.savefig('static/images/tmp/' + variable + '_box_plot.png')

# 直方图和箱线图
def var_plot(df, variable):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)

    # 直方图
    plt.subplot(1, 2, 1)
    sns.histplot(df[variable], bins=30)
    plt.title('Histogram')

    # 箱线图
    plt.subplot(1, 2, 2)
    sns.boxplot(y=df[variable])
    plt.title('Boxplot')

    plt.savefig('static/images/tmp/' + variable + '_var_plot.png')

def ByGender(df, DV):
    DV_len = len(DV)
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)

    plt.figure(fignum)
    id = 1
    for dv in DV:
        attr_score = df[['Gender', dv]].groupby('Gender', as_index=False).mean()
        plt.subplot(1, DV_len, id)
        sns.barplot(x=attr_score['Gender'], y=attr_score[dv], alpha=0.8)
        plt.title(dv + ' by Gender', fontsize=10)
        plt.ylabel('Mean ' + dv, fontsize=8)
        plt.xlabel('Gender', fontsize=8)
        id += 1
    plt.savefig('static/images/tmp/Gender_and_DV_Count.png')

def ByAge(df, DV):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)

    attr_score = df[['Age', DV]].groupby('Age', as_index=False).mean()
    sns.barplot(x=attr_score['Age'], y=attr_score[DV], alpha=0.8)
    plt.title(DV + ' by Age')
    plt.ylabel('Mean ' + DV, fontsize=12)
    plt.xlabel('Age', fontsize=12)
    x_min, x_max = min(attr_score['Age']), max(attr_score['Age'])

    plt.xticks(range(0, x_max - x_min, 5))
    plt.savefig('static/images/tmp/Age_and_' + DV + '_Count.png')

def Scatterplot(data, x, y, hue):
    global fignum
    fignum = fignum + 1
    plt.figure(fignum)
    sns.scatterplot(data=data, x=x, y=y, hue=hue)

    plt.savefig('static/images/tmp/' + x + '_' + y + '_' + hue + '.png')

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
    Colors = ['red', 'blue', 'green', 'cyan', '#f32f2f', '#32f234']

    if not hasattr(cluster, 'id'):
        cluster.id = 0
    cluster.id += 1

    # 使用肘部法则（elbow method）来寻找最优的聚类数
    wcss = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
        kmeans.fit(X)
        wcss.append(kmeans.inertia_)

    # 确定肘部
    kneedle = KneeLocator(range(1, 11), wcss, curve='convex', direction='decreasing', online=True)

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
    datas.append(normalize(joinStr(attrs, 0) + '_Elbow.png', type=1, title=joinStr(attrs, 1) + ' Elbow figure'))

    # Training k-means
    kmeans = KMeans(n_clusters=kneedle.knee if len(attrs) == 2 else 6, init='k-means++', random_state=42)
    y_kmeans = kmeans.fit_predict(X)

    # kmeans聚类结果
    pd.DataFrame(y_kmeans).to_csv('static/result/kmeans_result' + str(cluster.id) + '.csv')

    fignum = fignum + 1
    if len(attrs) == 2:
        plt.figure(fignum, figsize=(7, 5))
        for i in range(kneedle.knee):
            plt.scatter(X[y_kmeans == i, 0], X[y_kmeans == i, 1], s=100, c=Colors[i], label='class' + str(i))
        plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c='yellow', label='Centroids')
        plt.title('Clusters of customers')
        plt.xlabel(attrs[0])
        plt.ylabel(attrs[1])
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
        ax.set_xlabel(attrs[0])
        ax.set_ylabel(attrs[1])
        ax.set_zlabel(attrs[2])
        ax.legend()
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_Cluster(kmeans).png')
    datas.append(normalize(joinStr(attrs, 0) + '_Cluster(kmeans).png', type=1,
                           title=joinStr(attrs, 1) + ' kmeans-cluster result'))

    # 计算聚类指数
    # 传入 KMeans 聚类模型以及数据集 X 和模型生成的聚类标签 y_kmeans 来
    # 计算 Silhouette 指数和 Calinski Harabasz 指数
    # Silhouette 指数是用于衡量聚类结果内部的紧密度和聚类之间的分离度
    # Calinski Harabasz 指数通过计算聚类内部方差和聚类之间的方差比值来评估聚类模型的质量
    silhouette_score_kmeans = round(silhouette_score(X, y_kmeans), 2)
    calinski_harabasz_score_kmeans = round(calinski_harabasz_score(X, y_kmeans), 2)
    cluster_index = pd.DataFrame({'index': [silhouette_score_kmeans, calinski_harabasz_score_kmeans]},
                                 index=['Silhouette Score', 'Calinski Harabasz Score'])
    cluster_index.to_csv('static/result/kmeans_index' + str(cluster.id) + '.csv', header=False)

    datas.append(normalize(cluster_index, type=0, title='kmeans聚类指数', download='kmeans_index' + str(cluster.id)))

    # 用于绘制层次聚类模型的树状图（dendrogram），以展示数据集中数据点之间的相似性关系
    fignum = fignum + 1
    plt.figure(fignum)
    sch.dendrogram(sch.linkage(X, method='ward'))
    plt.title('Dendrogram')
    plt.xlabel('Customers')
    plt.ylabel('Euclidean distances')
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_dendrogram(hierarchical).png')
    datas.append(normalize(joinStr(attrs, 0) + '_dendrogram(hierarchical).png', type=1,
                           title=joinStr(attrs, 1) + ' hierarchical-cluster dendrogram'))

    # 创建并训练一个层次聚类模型，并使用该模型对数据集 X 进行聚类预测
    hc = AgglomerativeClustering(n_clusters=kneedle.knee if len(attrs) == 2 else 3, affinity='euclidean', linkage='ward')
    y_hc = hc.fit_predict(X)

    # 层次聚类结果
    pd.DataFrame(y_hc).to_csv('static/result/dendrogram_result'+ str(cluster.id) + '.csv')

    # 可视化
    fignum = fignum + 1
    if len(attrs) == 2:
        plt.figure(fignum, figsize=(7, 5))
        plt.scatter(X[y_hc == 0, 0], X[y_hc == 0, 1], s=100, c='red', label='Low Spending Score customers')
        plt.scatter(X[y_hc == 1, 0], X[y_hc == 1, 1], s=100, c='blue', label='High Spending Score customers')
        plt.title('Clusters of customers')
        plt.xlabel(attrs[0])
        plt.ylabel(attrs[1])
    elif len(attrs) == 3:
        fig = plt.figure(fignum, figsize=(15, 15))
        ax = fig.add_subplot(111, projection='3d')
        ax.scatter(X[y_hc == 0, 0], X[y_hc == 0, 1], X[y_hc == 0, 2], s=40, color='blue', label="Cluster 0")
        ax.scatter(X[y_hc == 1, 0], X[y_hc == 1, 1], X[y_hc == 1, 2], s=40, color='orange', label="Cluster 1")
        ax.scatter(X[y_hc == 2, 0], X[y_hc == 2, 1], X[y_hc == 2, 2], s=40, color='green', label="Cluster 2")
        ax.set_xlabel(attrs[0])
        ax.set_ylabel(attrs[1])
        ax.set_zlabel(attrs[2])
        ax.legend()
    plt.savefig('static/images/tmp/' + joinStr(attrs, 0) + '_Cluster(hierarchical).png')
    datas.append(normalize(joinStr(attrs, 0) + '_Cluster(hierarchical).png', type=1,
                           title=joinStr(attrs, 1) + 'hierarchical-cluster result'))

    # 计算 Silhouette 指数和 Calinski Harabasz 指数
    silhouette_score_hc = round(silhouette_score(X, y_hc), 2)
    calinski_harabasz_score_hc = round(calinski_harabasz_score(X, y_hc), 2)
    cluster_index = pd.DataFrame({'index': [silhouette_score_hc, calinski_harabasz_score_hc]},
                                 index=['Silhouette Score', 'Calinski Harabasz Score'])
    cluster_index.to_csv('static/result/dendrogram_index' + str(cluster.id) + '.csv', header=False)
    datas.append(normalize(cluster_index, type=0, title='层次聚类指数', download='dendrogram_index' + str(cluster.id)))

    table = pd.DataFrame({'Silhouette Score': [silhouette_score_kmeans, silhouette_score_hc],
                          'Calinski Harabasz Score': [calinski_harabasz_score_kmeans, calinski_harabasz_score_hc]},
                         index=['K-Means clustering', 'Hierarchial clustering'])
    table.to_csv('static/result/total_index'+ str(cluster.id) + '.csv' , header=False)
    datas.append(normalize(table, type=0, title='聚类指数', download='total_index' + str(cluster.id)))

def getDistribute(df, attr, parts):
    datas = df[[attr]]
    data_min, data_max = datas.min()[attr], datas.max()[attr]
    part_num = (data_max - data_min) // parts

    Groups = []
    down, up = data_min, data_min + part_num - 1
    for i in range(parts):
        Groups.append([down, up])
        down = up + 1
        up = down + part_num - 1
    Groups[-1][-1] = data_max

    datas['group'] = 0
    for i in range(len(Groups)):
        datas['group'][(datas[attr] >= Groups[i][0]) & (datas[attr] <= Groups[i][1])] = i
    tmp = datas.groupby('group').count()

    index_new = []
    for i in range(len(Groups)):
        index_new.append(str(Groups[i][0]) + '-' + str(Groups[i][1]) + '之间')
    tmp.index = index_new

    tmp.columns = ['Count']

    tmp = tmp.to_dict()['Count']
    res = []
    for key, value in tmp.items():
        res.append({'value': value, 'name': key})

    return res

def getIndexData():
    url1 = "static/result/total_index"
    url2 = ".csv"

    names = []
    datas = []
    for i in range(3):
        datas.append(pd.read_csv(url1 + str(i + 1) + url2, header=None, index_col=0))
        datas[i].index.name = None
        datas[i].columns = ['Silhouette', 'Calinski-Harabasz']
        datas[i].index = [i.split(' ')[0] for i in datas[i].index]

    names = []
    for i in datas[0].index:
        for j in datas[0].columns:
            names.append(i + '_' + j)

    res = []
    for i in datas:
        res.append([list(i['Silhouette'].values), list(i['Calinski-Harabasz'].values)])
    return res, names

# 获取混合模块数据
def getMixData(df, attrs, id):
    points = df[attrs].values

    kmeans_res = pd.read_csv('static/result/kmeans_result' + str(id) + '.csv', index_col=0)['0']
    dendrogram_res = pd.read_csv('static/result/dendrogram_result' + str(id) + '.csv', index_col=0)['0']

    kmeans_n_clusters = kmeans_res.value_counts().count()
    dendrogram_n_clusters = dendrogram_res.value_counts().count()

    kmeans_points_data = []
    for i in range(kmeans_n_clusters):
        kmeans_points_data.append(points[kmeans_res == i, :].tolist())

    dendrogram_points_data = []
    for i in range(dendrogram_n_clusters):
        dendrogram_points_data.append(points[dendrogram_res == i, :].tolist())

    return [kmeans_points_data, dendrogram_points_data], [kmeans_n_clusters, dendrogram_n_clusters], attrs

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

# 用于接受上传的文件的函数
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
    global chosen
    chosen = request.form.get('filename')

    return 'OK'

# 数据查询的页面
@app.route('/query')
def query():
    global chosen
    df = pd.read_csv('upload/' + chosen)
    datas = []
    for i in range(df.shape[0]):
        datas.append(df.iloc[i].to_list())

    titles = df.columns.to_list()
    return render_template('query.html', datas = datas, titles = titles)

# 数据分析
@app.route('/statistics_analysis')
def statistics_analysis():
    global chosen
    df = pd.read_csv('upload/' + chosen)

    df_old_num = df.shape[0]
    df,  duplicates, abnormals, nones = DataClean(df)
    clean_result = [df_old_num, duplicates, abnormals, nones, df.shape[0]]

    datas = []# 记录所有要传输的数据

    # 数据基本情况
    base_info = df.describe()
    base_info.to_csv('static/result/base_info.csv', header=False)
    datas.append(normalize(base_info, type=0, title='基本信息', download='base_info'))

    for v in IV + DV:
        if df[v].dtype != object:
            var_plot(df, v)
            datas.append(normalize(v + '_var_plot.png', type=1, title= v + ' 直方图和箱线图展示'))
    ByGender(df, DV)
    datas.append(normalize('Gender_and_DV_Count.png', type=1, title='attribute Count by Gender'))
    for dv in DV:
        ByAge(df, dv)
        datas.append(normalize('Age_and_' + dv + '_Count.png', type=1,title=dv + ' Count by Age'))

    for dv in DV:
        Scatterplot(df, IV[1], dv, IV[0])
        datas.append(normalize(IV[1] + '_' + dv + '_' + IV[0] + '.png', type = 1, title = "scatter about " + IV[1] + " and " + dv))
    Scatterplot(df, DV[0], DV[1], IV[0])
    datas.append(normalize(DV[0] + '_' + DV[1] + '_' + IV[0] + '.png', type=1, title="scatter about " + DV[0] + " and " + DV[1]))

    return render_template("statistics_analysis.html", datas = datas, clean_result = clean_result)

@app.route('/cluster_analysis')
def cluster_analysis():
    global chosen
    df = pd.read_csv('upload/' + chosen)

    df_old_num = df.shape[0]
    df, duplicates, abnormals, nones = DataClean(df)
    clean_result = [df_old_num, duplicates, abnormals, nones, df.shape[0]]
    df.drop(['CustomerID'], axis = 1, inplace = True)

    datas = []  # 记录所有要传输的数据

    cluster.id = 0
    cluster(df, ['Age', 'Spending Score (1-100)'], datas)
    cluster(df, ['Annual Income (k$)', 'Spending Score (1-100)'], datas)
    cluster(df, ['Age', 'Annual Income (k$)'], datas)
    cluster(df, ['Age', 'Annual Income (k$)', 'Spending Score (1-100)'], datas)

    return render_template("cluster_analysis.html", datas = datas, clean_result = clean_result)

# 结果展示的页面
@app.route('/result')
def result():
    global chosen
    df = pd.read_csv('upload/' + chosen)
    attrs = ['Age', 'Annual Income (k$)', 'Spending Score (1-100)']

    df_old_num = df.shape[0]
    df, duplicates, abnormals, nones = DataClean(df)

    echartsDatas = {'title': [df_old_num, df.shape[0]]}

    # 饼图
    pie1 = {'data': [], 'name': []}
    for i in attrs:
        pie1['data'].append(getDistribute(df, i, 5))
        pie1['name'].append(i)
    echartsDatas['pie1'] = pie1

    # 气泡图
    bubble = {'data': df[attrs].values.tolist()}
    echartsDatas['bubble'] = bubble

    # 柱形图
    bar = {'data': [], 'axisName': []}
    bar['data'], bar['aixsName'] = getIndexData()
    bar['axisName'] = ['kmeans', 'Hierarchial']
    bar['name'] = ['Age and Score', 'Income and Score', 'Age and Income']
    bar['title'] = ['Silhouette', 'Calinski-Harabasz']
    echartsDatas['bar'] = bar

    # 变化图1
    mix1 = {'data': [], 'n_clusters': [], 'id': []}
    mix1['data'], mix1['n_clusters'], mix1['id'] = getMixData(df, ['Age', 'Spending Score (1-100)'], 1)
    echartsDatas['mix1'] = mix1

    # 变换图2
    mix2 = {'data': [], 'n_clusters': [], 'id': []}
    mix2['data'], mix2['n_clusters'], mix2['id'] = getMixData(df, ['Annual Income (k$)', 'Spending Score (1-100)'], 2)
    echartsDatas['mix2'] = mix2

    # 变化图3
    mix3 = {'data': [], 'n_clusters': [], 'id': []}
    mix3['data'], mix3['n_clusters'], mix3['id'] = getMixData(df, ['Age', 'Annual Income (k$)'], 3)
    echartsDatas['mix3'] = mix3

    return render_template("result.html", echartsDatas = echartsDatas)

# 本地运行的主函数
if __name__ == '__main__':
    app.run('127.0.0.1', 5000, debug=True)