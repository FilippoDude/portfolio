#!/bin/sh

# Check if the "done" file exists
if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  # Update package lists
  apt-get update -y
  
  # Install necessary packages
  apt-get install -y nano screen curl
  apt-get install -y nodejs npm

  # Install npm dependencies
  npm install express
  npm install cors
  npm install @telegram-apps/init-data-node
  npm install --save-dev nodemon

  # Clean up to reduce image size
  apt-get clean

  # Create the "done" file to indicate setup is complete
  touch done
fi

# Change to the app directory
cd /app

# Run the server
node server.js
#screen -dmS app node main.js

echo ""
echo "Server Ready!"
echo ""

# Keep the container running
tail -f /dev/null
