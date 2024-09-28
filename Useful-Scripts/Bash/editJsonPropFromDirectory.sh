#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="/path/to/source_directory"
DEST_DIR="/path/to/destination_directory"

# Define the new JSON property
NEW_PROPERTY='"newKey": "newValue"'

# Loop through all JSON files in the source directory
for file in "$SOURCE_DIR"/*.json; do
    # Add the new JSON property to the file
    jq ". + { $NEW_PROPERTY }" "$file" > tmp.$$.json && mv tmp.$$.json "$file"
    
    # Move the file to the destination directory
    mv "$file" "$DEST_DIR"
done

echo "All JSON files have been updated and moved to the destination directory."
