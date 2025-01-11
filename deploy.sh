#!/bin/bash

# EC2 접속 정보
PEM_KEY="elders.pem"
EC2_HOST="ec2-3-86-246-26.compute-1.amazonaws.com"
EC2_USER="ec2-user"

# 빌드
echo "Building project..."
npm run build

# EC2에 디렉토리 생성
echo "Creating directories on EC2..."
ssh -i $PEM_KEY ${EC2_USER}@${EC2_HOST} '
    mkdir -p /home/ec2-user/DGDT_FE/build
'

# EC2로 빌드 파일 전송
echo "Transferring build files to EC2..."
scp -i $PEM_KEY -r dist/* ${EC2_USER}@${EC2_HOST}:/home/ec2-user/DGDT_FE/build/

# EC2에서 실행할 명령어
echo "Copying files and restarting nginx..."
ssh -i $PEM_KEY ${EC2_USER}@${EC2_HOST} '
    sudo mkdir -p /usr/share/nginx/html
    sudo cp -r /home/ec2-user/DGDT_FE/build/* /usr/share/nginx/html/
    sudo systemctl restart nginx
'

echo "Deployment completed!"