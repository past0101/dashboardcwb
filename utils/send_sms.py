#!/usr/bin/env python3
"""
SMS sending utility for Twilio integration
This script is used to send SMS messages through Twilio API.
"""

import os
import sys
import json
from twilio.rest import Client

def send_sms(to_number, message, config=None):
    """
    Send an SMS message using Twilio
    
    Args:
        to_number (str): The recipient's phone number
        message (str): The message content
        config (dict, optional): Twilio configuration (account_sid, auth_token, phone_number)
                              If not provided, will use environment variables.
    
    Returns:
        dict: Response with success status and message SID or error
    """
    
    # Get configuration from environment or passed config
    try:
        if config:
            account_sid = config.get('accountSid')
            auth_token = config.get('authToken') 
            from_number = config.get('phoneNumber')
        else:
            account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
            auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
            from_number = os.environ.get('TWILIO_PHONE_NUMBER')
        
        # Validate configuration
        if not account_sid or not auth_token or not from_number:
            return {
                'success': False, 
                'error': 'Missing Twilio credentials'
            }
            
        # Initialize Twilio client
        client = Client(account_sid, auth_token)
        
        # Send the message
        message = client.messages.create(
            body=message,
            from_=from_number,
            to=to_number
        )
        
        # Return success response
        return {
            'success': True,
            'sid': message.sid
        }
        
    except Exception as e:
        # Return error response
        return {
            'success': False,
            'error': str(e)
        }

if __name__ == "__main__":
    # When run as a script, parse arguments from command line
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False,
            'error': 'Usage: send_sms.py <to_number> <message> [config_json]'
        }))
        sys.exit(1)
    
    to_number = sys.argv[1]
    message_text = sys.argv[2]
    
    # Check for config in third argument
    config_data = None
    if len(sys.argv) > 3:
        try:
            config_data = json.loads(sys.argv[3])
        except:
            print(json.dumps({
                'success': False,
                'error': 'Invalid JSON configuration'
            }))
            sys.exit(1)
    
    # Send message and output result as JSON
    result = send_sms(to_number, message_text, config_data)
    print(json.dumps(result))