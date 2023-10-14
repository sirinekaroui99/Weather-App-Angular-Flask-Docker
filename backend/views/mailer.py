from flask import Flask
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'karouisirine6@gmail.com'
app.config['MAIL_PASSWORD'] = '123456'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route('/')
def index():
    # Create a new message
    msg = Message('Test email', sender='karouisirine6@gmail.com', recipients=['sirinek176@gmail.com'])
    # Set the body of the email
    msg.body = "This is a test email from Flask-Mail"
    # Send the message
    mail.send(msg)
    return 'Email sent!'

if __name__ == '__main__':
    app.run(debug=True)
