#!/bin/bash

# Directories
SOURCE_DIR="/path/to/source_directory"
DEST_DIR="/path/to/destination_directory"
URL="http://example.com/api/endpoint"
CERT_FILE="/path/to/cert.pem"
KEY_FILE="/path/to/key.pem"
HEADER_CONTENT_TYPE="Content-Type: application/json"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Loop through all JSON files in the source directory
for file in "$SOURCE_DIR"/*.json; do
  if [ -f "$file" ]; then
    # Send the JSON file through a curl command with PKI cert
    curl -X POST -H "$HEADER_CONTENT_TYPE" --cert "$CERT_FILE" --key "$KEY_FILE" -d @"$file" "$URL"

    # Check if the curl command was successful
    if [ $? -eq 0 ]; then
      # Move the file to the destination directory
      mv "$file" "$DEST_DIR"
      echo "Successfully processed and moved $file"
    else
      echo "Failed to send $file"
    fi
  else
    echo "No JSON files found in $SOURCE_DIR"
  fi
done
