from flask import Flask, render_template, redirect, request

app = Flask(__name__)

# bus stop details
# latitude, longitutde, magnitude

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=8823)
