import sys
import RPi.GPIO as GPIO
import time

def light(index, value):
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(index, GPIO.OUT)    
    GPIO.output(index, GPIO.HIGH if value == 1 else GPIO.LOW)

if __name__ == "__main__":
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    light(a, b)