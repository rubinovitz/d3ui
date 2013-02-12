from flask import Flask, url_for, Response, request, render_template
import os
from werkzeug import SharedDataMiddleware
import os
import csv 
import json 
import urllib

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/data/', methods=['POST','GET'])
def getColumns():
  """
  returns the data columns as json
  """
  dataKey = request.args['dataKey']
  i = csv.reader(urllib.urlopen('https://www.filepicker.io/api/file/'+dataKey))
  for row in i:
    # get column titles as array
    print row
    colArray = row
    colString = ''
    break
  for s in colArray:
    colString += s +','
  print colString
  data = {'columns':colString[:-1]}
  js =  json.dumps(data)
  resp = Response(js, status=200, mimetype="application/json")
  return resp


@app.route('/api/columns/', methods=['POST','GET'])
def submitColumns():
	"""
	Chosen columns are submitted via JSON post as 'columns' 
	in a comma separated list
	"""
	x = int(request.args['x-col'])
	fileName = request.args['filename']
	return getBarGraphData(fileName, x, {})

def getLineGraphData(x, y, fileName,title):
	"""
	json dump of column data for line graphs
	"""
	# start with empty json container
	data = []
	x = int(x)
	infile = csv.reader(urllib.urlopen('https://www.filepicker.io/api/file/'+fileName))
	# get only labels from file
	labelRow = True
	for row in infile:
		if labelRow:
			xLabel = row[x]
			yLabel = row[y]
			labelRow = False
		else:
			point = {xLabel:row[x], yLabel:row[y]}
			data.append(point)	
	js = json.dumps({'line':data, 'x-label':xLabel, 'y-label':yLabel, 'title':title})
	resp = Response(js, status=200, mimetype="application/json")
	return resp

def quantityDic(x, fileName):
	"""
	build the bar graph json	
	"""
	dic = {}
	infile = csv.reader(urllib.urlopen('https://www.filepicker.io/api/file/'+fileName))
	x = int(x)
	titleRow = True
	for row in infile:
		if titleRow == True:
			xLabel = row[x]
			print row
			titleRow = False
		else:
			try:
				dic[row[x]] = dic[row[x]] + 1
			except:
				dic[row[x]] = 1
	listOfDics = []
	for key in dic:
		tempDic = {}
		tempDic['count'] = dic[key]
		tempDic['name'] = key
		listOfDics.append(tempDic)
	return listOfDics


def getBarGraphData(fileName, col, labels):
	"""
	dump bar graph json
	"""
	data = quantityDic(col, fileName)
	labelsJson = json.dumps(labels)
	jsonDict = {'bar':data, "labels":labelsJson}
	jsonDump =  json.dumps(jsonDict)
	resp = Response(jsonDump, status=200, mimetype="application/json")
	return resp



# store static files on server for now
app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
'/': os.path.join(os.path.dirname(__file__), 'static')
})


if __name__ == '__main__':
    app.run(port=3000, debug=True)
