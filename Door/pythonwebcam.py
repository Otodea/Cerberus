import socket
import sys
import time
import pygame
import pygame.camera
port = 9004
pygame.init()
pygame.camera.init()

#create fullscreen display 640x480
screen = pygame.display.set_mode((640,480),0)

#find, open and start low-res camera
cam_list = pygame.camera.list_cameras()
webcam = pygame.camera.Camera(cam_list[0],(32,24))
webcam.start()
count = 0;

while True:
    #grab image, scale and blit to screen
    #print('salam')
    count = count + 1
    imagen = webcam.get_image()
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(('38.88.74.71', port))
    #print('connecte')
    #fp = open("pic.jpg", 'rb')
    
    #sock.send("X1Y2Z3T4".encode('utf-8'))
    #sock.sendall(string)
    #sock.close()
    imagen = pygame.transform.scale(imagen,(320,240))
    pygame.image.save(imagen, "pic.jpg")
    #screen.blit(imagen,(0,0))
    fp = open("pic.jpg", 'rb')
    string = fp.read()
    sock.send("A1B2C3D4".encode('utf-8'))
    sock.sendall(string)
    sock.close()
    time.sleep(0.1)
    #draw all updates to display
    #pygame.display.update()
           
pygame.quit()
sys.exit()
webcam.stop()           