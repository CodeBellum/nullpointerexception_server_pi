import sys
import json

import RPi.GPIO as GPIO
import time

def light(data):
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    for el in data:
        light_one(el['i'], el['v'])

def light_one(index, value):
    GPIO.setup(index, GPIO.OUT)    
    GPIO.output(index, GPIO.HIGH if value == 1 else GPIO.LOW)

if __name__ == "__main__":
    data=json.loads(sys.argv[1])
    light(data)