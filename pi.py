import sys
import json

import gpiozero
from gpiozero import LED

def light(data):
    for el in data:
        led = LED(el[i])
        if el['v'] == 1: 
            led.on()
        else: 
            led.off()

if __name__ == "__main__":
    data=json.loads(sys.argv[1])
    light(data)