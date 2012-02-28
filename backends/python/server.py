#!/usr/bin/python

import shutil
from StringIO import StringIO
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
import json
import random

class QuestionMaster(BaseHTTPRequestHandler):
    QUESTIONS = [{'question': 'What is the capital of France?', 'answer': 'Paris'},
                 {'question': 'What is the forth highest mountain?', 'answer': 'Lhotse'},
                 {'question': 'What is the smallest planet in the solar system?', 'answer': 'Mercury'}]

    def question(self):
        return random.choice(self.QUESTIONS)

    def do_GET(self):
        """Serve a GET request."""
        f = self.send_head()
        if f:
            shutil.copyfileobj(f, self.wfile)
            f.close()

    def do_HEAD(self):
        """Serve a HEAD request."""
        f = self.send_head()
        if f:
            f.close()

    def send_head(self):
        f = StringIO()
        f.write(json.dumps(self.question()))
        length = f.tell()
        f.seek(0)

        self.send_response(200)
        self.send_header("Content-Length", length)
        self.send_header("Content-type", 'application/json; charset=UTF-8')
        self.send_header("Access-Control-Allow-Origin", '*')
        self.end_headers()

        return f


def run():
    import logging
    logging.basicConfig(level=logging.INFO)

    host, port = 'localhost', 8080
    httpd = HTTPServer((host, port), QuestionMaster)
    logging.info("Starting up on %s:%s" % (host, port))
    httpd.serve_forever()

if __name__ == "__main__":
    run()
