import socket
import sys
from threading import Thread
import RPi.GPIO as GPIO
import time


def clearLcd():
    
    # Toggle backlight on-off-on
    GPIO.output(lcd.LED_ON, True)
    time.sleep(.005)
    GPIO.output(lcd.LED_ON, False)
    time.sleep(.005)
    GPIO.output(lcd.LED_ON, True)
    time.sleep(.005)

# make sure module is in the path
sys.path.append('/home/pi/Desktop/G20_B_P2/Messenger')
import lcd

mylist = []
mylist.append('a')
mylist.append('b')
mylist.append('c')
mylist.append('d')
mylist.append('e')
mylist.pop()

lcd.lcd_init()
clearLcd()

# Send some centred test
lcd.lcd_byte(lcd.LCD_LINE_1, lcd.LCD_CMD)
lcd.lcd_string("".join(mylist),2)
lcd.lcd_byte(lcd.LCD_LINE_2, lcd.LCD_CMD)
lcd.lcd_string("Model B",2)
GPIO.output(lcd.LED_ON, False)
server_address = ('localhost', 4000)

GPIO.setmode(GPIO.BCM)

NUM_MATRIX = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
    ]

LETTER_MATRIX = [
    ['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I'],
    ['J', 'K', 'L'], ['M', 'N', 'O'], ['P', 'Q', 'R'],
    ['S', 'T', 'U'], ['V', 'W', 'X'], ['Y', 'Z', '9']
    ]
ROW = [16, 18, 20, 24]
COL = [4, 25, 12]
    
def printLetter (num  , pressCount):
    print (LETTER_MATRIX[num - 1][pressCount])

for j in range(3):
    GPIO.setup(COL[j], GPIO.OUT)
    GPIO.output(COL[j], 1)
    
for i in range(4):
    GPIO.setup(ROW[i], GPIO.IN, pull_up_down = GPIO.PUD_UP)


# initialize the string

# Print each list on a new line
def displayOnLcd(line1, line2):
    clearLcd()
    # Send some centred test
    lcd.lcd_byte(lcd.LCD_LINE_1, lcd.LCD_CMD)
    lcd.lcd_string(str("".join(line1)),2)
    lcd.lcd_byte(lcd.LCD_LINE_2, lcd.LCD_CMD)
    lcd.lcd_string(str("".join(line2)),2)
    GPIO.output(lcd.LED_ON, False)
    return
    
def getLetter (num  , pressCount):
    if num == '0':
        return ' '
    return LETTER_MATRIX[ord(num) - 49][pressCount]

def sendToUser (line):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(server_address)
    sock.sendall("".join(line).encode('utf-8'))
    sock.close()
    del line[:]

def getReply(arg):
    print('hello')
    server_address = ('localhost', 4001)
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(server_address)
    sock.listen(1)
    while True:
        connection, client_address = sock.accept()
        try:
            print('connected')
            data = connection.recv(16)
            displayOnLcd('User:', data.decode('utf-8'))
                
        finally:
            print('closed it')
            connection.close()
def talkToOwner():
    displayOnLcd("Smile to camera!", "Text the owner!")
    time.sleep(3)
    displayOnLcd("", "")
    pressCount = 0
    previousButton = 10
    thread = Thread(target = getReply, args = (10,))
    thread.start()
    
    try:
        #define vaes
        line1 = ['V', 'i', 's', 'i', 't', 'o', 'r', ':']
        line2 = []
        start = time.time()
        past  = time.time()
        print('suh dude')
        while(True):
            # Time out
            if(time.time() - start) > 10:
                break
            for j in range(3):
                    GPIO.output(COL[j], 0)
                    for i in range(4):
                        if GPIO.input(ROW[i]) == 0:
                            start = time.time()
                            if NUM_MATRIX[i][j] == '#':
                               sendToUser(line2)
                            elif NUM_MATRIX[i][j] == '*':
                                if line2:
                                    line2.pop()
                            #if letter is pressed
                            elif (NUM_MATRIX[i][j] == previousButton) & (ord(NUM_MATRIX[i][j]) > 47) & (ord(NUM_MATRIX[i][j]) < 58) & (time.time() - past < 1):
                                # skip the extra 9 letter
                                if (NUM_MATRIX[i][j] == '9') & (pressCount == 2):
                                    pressCount += 1
                                # replace the letter
                                if line2:
                                    line2.pop()
                                if not pressCount < 3:
                                    pressCount = 0
                                    line2.append(NUM_MATRIX[i][j])
                                else:
                                    line2.append(str(getLetter (NUM_MATRIX[i][j]  , pressCount)))
                                    pressCount += 1
                                    # if zero
                                    if NUM_MATRIX[i][j] == '0':
                                        pressCount += 2 
                            #if num is pressed
                            else:
                                pressCount = 0
                                line2.append(str(NUM_MATRIX[i][j]))
                                print (NUM_MATRIX[i][j])
                                previousButton = NUM_MATRIX[i][j]
                            #continue as loong as the button is held down
                            past = time.time()
                            displayOnLcd("".join(line1), "".join(line2))
                            while(GPIO.input(ROW[i]) == 0):
                                pass
                            
                    
                    GPIO.output(COL[j], 1)
        print('See you!')
        displayOnLcd("No response", "See you!")
        time.sleep(2)
    except KeyboardInterrupt:
        GPIO.cleanup()
    
#talkToOwner()