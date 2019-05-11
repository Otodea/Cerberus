import RPi.GPIO as GPIO
import time

GPIO.setmode (GPIO.BCM)

GPIO.setup(27, GPIO.OUT)

p = GPIO.PWM(27,70)
p.start(7.5)

locked = True

def resetLock():
    p.ChangeDutyCycle(0)
    
def lockDoor():
    p.ChangeDutyCycle(14.5)
    time.sleep(.6)
    p.ChangeDutyCycle(0)
    locked = True

def unlockDoor():
    p.ChangeDutyCycle(7.5)
    time.sleep(.6)
    p.ChangeDutyCycle(0)
    locked = False
    
def test():
    try:
        while True:
            lockDoor()
            time.sleep(1)
            unlockDoor()
            time.sleep(1)
                
    except KeyboardInterrupt:
        GPIO.cleanup()