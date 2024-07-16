#!/bin/bash

# Source the .env file to get BUCKET_NAME
source ./.env

# Check if BUCKET_NAME is set
if [[ -z "$BUCKET_NAME" ]]; then
    echo "Error: BUCKET_NAME not set in .env file."
    exit 1
fi

if [ ! "$(ls -A ./changelog-images)" ]; then
    echo "The changelog-images directory is empty or does not exist."
    # Add any additional actions you want to perform in this scenario
    exit 1
fi

# Sync changelog-images to the S3 bucket
aws s3 sync ./changelog-images s3://$BUCKET_NAME/ --acl public-read --exclude "*.DS_Store" --delete
