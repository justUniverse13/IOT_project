import machine
import utime
import urequests
import network 
# Define pin numbers
SERVO_PIN = 0  # Pin GP0 for servo motor
SENSOR_PIN = 1  # Pin GP1 for water sensor
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
# Initialize servo motor
servo = machine.PWM(machine.Pin(SERVO_PIN))
servo.freq(50)  # Set PWM frequency to 50 Hz

# Initialize water sensor
sensor = machine.ADC(SENSOR_PIN)

# Function to control servo motor
def control_servo(angle):
    duty = (angle / 180) * 1024  # Convert angle to duty cycle
    servo.duty_u16(int(duty))  # Set duty cycle

# Function to check water level
def check_water_level():
    return sensor.read_u16()  # Read water sensor value
ssid = 'WR1200S-8FE3'
password = 'Password'
wlan.connect(ssid, password)
# Function to send data to the server
def send_data(water_level):
    url = 'http://192.168.1.1:3000/water_level'
    data = {'water_level': water_level}
    headers = {'Content-Type': 'application/json'}
    response = urequests.put(url, json=data, headers=headers)
    print(response.text)
    response.close()

# Main function
def main():
    try:
        while True:
            # Check water level
            water_level = check_water_level()
            
            # If water level is below threshold, activate servo motor
            if water_level < 20000:  # Adjust threshold value as needed
                control_servo(90)  # Rotate servo to dispense water
                utime.sleep(2)  # Wait for 2 seconds
                control_servo(0)  # Rotate servo back to initial position
            
            # Send data to the server
            send_data(water_level)
            
            # Delay for next iteration
            utime.sleep(1)
    
    except KeyboardInterrupt:
        # Cleanup GPIO pins
        servo.deinit()

# Run main function
if __name__ == "__main__":
    main()