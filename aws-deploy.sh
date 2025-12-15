#!/bin/bash

echo "🚀 AWS Deployment - IIT Bombay Smart Agriculture Platform"
echo "=================================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first:"
    echo "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if user is logged in to AWS
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Run: aws configure"
    exit 1
fi

echo "✅ AWS CLI configured"

# Option 1: Deploy to AWS Amplify
echo ""
echo "Option 1: AWS Amplify Deployment"
echo "1. Go to AWS Amplify Console"
echo "2. Connect your GitHub repository"
echo "3. Use the amplify.yml configuration"
echo "4. Deploy automatically on git push"

# Option 2: Deploy backend to Lambda
echo ""
echo "Option 2: AWS Lambda + S3 Deployment"
echo "Installing Serverless Framework..."

if ! command -v serverless &> /dev/null; then
    npm install -g serverless
fi

echo "Backend deployment to Lambda..."
cd backend
serverless deploy --stage prod

echo "Frontend deployment to S3..."
cd ../frontend
npm run build

# Create S3 bucket (replace with your bucket name)
BUCKET_NAME="iit-bombay-agriculture-frontend"
aws s3 mb s3://$BUCKET_NAME --region ap-south-1

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://$BUCKET_NAME --delete

# Make bucket public
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
    }
  ]
}'

echo ""
echo "🎉 Deployment Complete!"
echo "Frontend URL: http://$BUCKET_NAME.s3-website.ap-south-1.amazonaws.com"
echo "Backend API: Check Serverless output above"
echo ""
echo "🏆 Ready for IIT Bombay Hackathon Demo!"