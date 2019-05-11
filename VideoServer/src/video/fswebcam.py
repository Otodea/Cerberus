import socket
import subprocess

import RPi.GPIO as GPIO

import time

GPIO.setmode(GPIO.BOARD)
port = 9004

GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_UP)


try:
    while True:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect(('localhost', port))
        subprocess.call("fswebcam -d /dev/video0 -r 160x120 -S0 "+"pic.jpg",shell=True)
        time.sleep(0.1)
        fp = open('pic.jpg', 'rb')
        string = fp.read()
        sock.sendall(string)
        sock.close()
            

except KeyboardInterrupt:

    GPIO.cleanup()