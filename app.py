import os
from flask import Flask, render_template

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "birthday-secret-key")

@app.route('/')
def index():
    """Render the main birthday page."""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
