import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

def getData():
    return [
        {'id':1,'brand':'Samsung','model': 'Note 8','price':'500','screenSize':'6.3 inch','screenWidth':4,'screenHeight':9,
         'unit':'cm','weight':'160g', 'stocked':'true'},
        {'id':2,'brand': 'Samsung', 'model': 'Note 10', 'price': '700', 'screenSize': '6.5 inch', 'screenWidth': 4.1,
         'screenHeight': 9.5, 'unit': 'cm', 'weight': '165g', 'stocked':'false'},
        {'id':3,'brand': 'Apple', 'model': 'Iphone 10', 'price': '1000','screenSize':'6.1 inch','screenWidth':3.5,'screenHeight':8,
         'unit':'cm','weight':'120g', 'stocked':'false'},
        {'id':4,'brand': 'Apple', 'model': 'Iphone 11', 'price': '1200', 'screenSize':'6.2 inch', 'screenWidth': 3.6,
         'screenHeight': 8.5, 'unit': 'cm', 'weight': '125g', 'stocked':'true'},
        {'id':5,'brand': 'Apple', 'model': 'Iphone 7', 'price': '200', 'screenSize': '6.2 inch', 'screenWidth': 3.6,
         'screenHeight': 8.5, 'unit': 'cm', 'weight': '125g', 'stocked':'false'},
        {'id':6,'brand': 'Xiaomi', 'model': 'Mi 10', 'price': '400','screenSize':'6.5 inch','screenWidth':4,'screenHeight':10,
         'unit':'cm','weight':'165g', 'stocked':'true'},
        {'id':7,'brand': 'Xiaomi', 'model': 'Mix 10', 'price': '450', 'screenSize': '6.9 inch', 'screenWidth': 4.2,
         'screenHeight': 10.5, 'unit': 'cm', 'weight': '175g', 'stocked':'true'}
    ]


@app.route('/items', methods=['GET'])
def home():
 #   jsonData=json.dumps(getData(),indent=4)
    return flask.jsonify(getData())

app.run()
