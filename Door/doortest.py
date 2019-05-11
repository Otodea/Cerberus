import sys
import socket
from threading import Thread
import RPi.GPIO as GPIO
sys.path.insert(0, '/home/pi/Desktop/P2/KnockKnock')
import knockknock
sys.path.insert(0, '/home/pi/Desktop/P2/Messenger')
import keypad
sys.path.insert(0, '/home/pi/Desktop/P2/Lock')
import lock
lock.resetLock()
import time

knockknock.init()
server_address = ('38.88.74.71', 9020)


def sendLockState(state):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(('localhost', 4005))
    print('connected')
    sock.sendall("".join('A1B2C3D4' + state).encode('utf-8'))
    sock.close()

def waitForServer(args):
    print('hello')
    server_address = ('localhost', 4002)
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(server_address)
    sock.listen(1)
    while True:
        connection, client_address = sock.accept()
        try:
            print('connected')
            data = connection.recv(1)
            print('got it')
            print(data[0])
            if data.decode('utf-8') == '0':
               print('locked')
               lock.lockDoor()
               sendLockState('0')
            elif data.decode('utf-8') == '1':
                print('unlocked')
                lock.unlockDoor()
                sendLockState('1')
        finally:
            print('closed it')
            connection.close()



def knockKnock():
    secretKnocks = 0
    wrongKnocks = 0
##    print('Please input your secret knock')
##    while not knockknock.updateSecretKnock():
##        if(secretKnocks > 3):
##            print('You did not input a valid knock knock')
##            print('Secret knock is set to default knock')
##            knockknock.secretKnockLength = 5
##            knockknock.secretKnock = [1,1,1,0.5,0.5]
##        secretKnocks += 1
##        print('Please input your secret knock')
    isValid = 0
    while not isValid:
        
        if(wrongKnocks > 3):
            keypad.displayOnLcd("Reached max attempts", "See you later!")
            break
        knockknock.gaps = []
        keypad.displayOnLcd("Please Knock", "")
        knockknock.validateKnock()
        print('Validating...')
        keypad.displayOnLcd("Validating...", "")
        isValid = knockknock.isValidPattern()
        time.sleep(1)
        if isValid:
            print('Come on in')
            keypad.displayOnLcd("Come on in", "")
            
            lock.unlockDoor()
            sendLockState("1")
            
            time.sleep(3)
            lock.lockDoor()
            sendLockState("0")
        else:
            print('Wrong knock')
            keypad.displayOnLcd("Wrong knock", "")
            time.sleep(0.5)
            wrongKnocks += 1
        print('')
        print('')
i = 0
j = 0
def buttonPressed():
    global i
    global j
    i = 0
    j = 0
    for j in range(3):
        GPIO.output(keypad.COL[j], 0)
        for i in range(4):
            if GPIO.input(keypad.ROW[i]) == 0:
                while(GPIO.input(keypad.ROW[i]) == 0):
                    pass
                print(keypad.NUM_MATRIX[i][j])
                return True
        GPIO.output(keypad.COL[j], 1)
    return False 

def checkForVisitor():
    if buttonPressed():
        return True
    return knockknock.mcp.read_adc(0) > 70

def settings():
    keypad.displayOnLcd("Settings", "")
    keypad.displayOnLcd("Validate using", "secret knock")
    time.sleep(2)
    wrongKnocks = 0
    isValid = 0
    while not isValid:
        
        if(wrongKnocks > 3):
            keypad.displayOnLcd("Reached max attempts", "See you later!")
            return
        knockknock.gaps = []
        keypad.displayOnLcd("Please Knock", "")
        knockknock.validateKnock()
        print('Validating...')
        keypad.displayOnLcd("Validating...", "")
        isValid = knockknock.isValidPattern()
        time.sleep(1)
        if isValid:
            break
        else:
            keypad.displayOnLcd("Wrong knock", "")
            time.sleep(0.5)
            wrongKnocks += 1
    
    
    keypad.displayOnLcd("Please input your", "secret knock")
    while not knockknock.updateSecretKnock():
        if(secretKnocks > 3):
            print('You did not input a valid knock knock')
            print('Secret knock is set to default knock')
            knockknock.secretKnockLength = 5
            knockknock.secretKnock = [1,1,1,0.5,0.5]
            print ('here')
        secretKnocks += 1
        print('Please input your secret knock')

def askForAccessChoice():
    global i
    global j
    start = time.time()
    keypad.displayOnLcd("1:Knock 2:Text ", "3:Settings")
    while not buttonPressed():
        if time.time() - start > 10 :
            keypad.displayOnLcd("No response!", "See you!")
            time.sleep(2)
            return '0'
    print (keypad.NUM_MATRIX[i][j])
    return keypad.NUM_MATRIX[i][j]
##    while True:
##         for j in range(3):
##                    GPIO.output(keypad.COL[j], 0)
##                    for i in range(4):
##                        if GPIO.input(keypad.ROW[i]) == 0: 
##                            #continue as loong as the button is held down
##                            
##                            while(GPIO.input(keypad.ROW[i]) == 0):
##                                pass
##                            #print('salam ' + keypad.NUM_MATRIX[i][j])
##                            return keypad.NUM_MATRIX[i][j]
##                    
##                    GPIO.output(keypad.COL[j], 1)
##    
##    return 10


thread = Thread(target = waitForServer, args = (10,))
thread.start()

while True:    
    while True:
        keypad.displayOnLcd("Press a key or", "knock to start")

        while not checkForVisitor():
            pass
        accessChoice = askForAccessChoice()
        if accessChoice == '0':
            break
        # Run Knockknock
        elif accessChoice == '1':
            knockKnock()
            #print('in  1')
        # Keypad
        elif accessChoice == '2':
            keypad.talkToOwner()
            #print('in  2')
        # Settings
        elif accessChoice == '3':
            settings()
            #print('in  3')
        else:
            keypad.displayOnLcd("Invalid Input!", "See you!")
            time.sleep(2)
        break

    keypad.displayOnLcd("", "")
    time.sleep(1)
