import sys
import json

import gpiozero
from gpiozero import LEDBoard
from time import sleep

def light(data, enable):
    led = LEDBoard(*data)
    if enable == 1: 
        led.on()
    else: 
        led.off()
    sleep(0.038)

if __name__ == "__main__":
    dataOn = json.loads(sys.argv[1])
    dataOff = json.loads(sys.argv[2])
    if len(dataOn) > 0:
        light(dataOn, 1)
    if len(dataOff) > 0:
        light(dataOff, 0)