import zerorpc
import sys


class HelloRPC(object):
    def hello(self, name):
        sys.stdout.write("I got a data")
        return "Hello, %s" % name


s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()
