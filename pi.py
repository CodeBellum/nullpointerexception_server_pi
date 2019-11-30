import sys
import json

import gpiozero
from gpiozero import LEDBoard

def light(data, enable):
    led = LEDBoard(data)
    if enable == 1: 
        led.on()
    else: 
        led.off()
    sleep(0.1)

if __name__ == "__main__":
    dataOn = json.loads(sys.argv[1])
    dataOff = json.loads(sys.argv[2])
    light(dataOn, 1)
    light(dataOff, 0)