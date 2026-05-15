pipeline {
    agent any
    environment {
        APP_NAME = 'student_pass'
        // Internal image tag configuration used locally by Minikube
        IMAGE_TAG = "local/${APP_NAME}:${BUILD_NUMBER}"
        LATEST_TAG = "local/${APP_NAME}:latest"
    }
    stages {
        stage('Lint & Verify Frontend') {
            steps {
                sh '''
                echo "Validating core application assets..."
                test -f html/index.html
                '''
            }
        }
        stage('Build Image Locally') {
            steps {
                sh '''
                # Point host Docker command utilities straight into Minikube space
                eval $(minikube -p minikube docker-env)
                
                # Build the image directly inside Minikube's container environment
                docker build -t ${IMAGE_TAG} -t ${LATEST_TAG} .
                '''
            }
        }
        stage('Approval Gate') {
            steps {
                input message: "Deploy local image version ${BUILD_NUMBER} to Minikube cluster?", ok: "Approve Local Deploy"
            }
        }
        stage('Deploy to Minikube') {
            steps {
                // Bypassed withKubeConfig - executing native host binary tasks directly
                sh '''
                # Direct kubectl straight into your local Minikube cluster instance
                kubectl config use-context minikube
                
                # Apply manifest structural layouts
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                
                # Patch the deployment target to pull your updated version tag
                kubectl set image deployment/${APP_NAME} ${APP_NAME}=${IMAGE_TAG}
                '''               
                }
            }
        }
    }

