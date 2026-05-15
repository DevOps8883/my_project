pipeline {
    agent any
    environment {
        // Change this to your exact Docker Hub username
        DOCKERHUB_USER = 'davidadeleke23'
        APP_NAME = 'student_pass'
        
        // Formats the tag correctly for Docker Hub registry matching
        IMAGE_TAG = "${DOCKERHUB_USER}/${APP_NAME}:${BUILD_NUMBER}"
        LATEST_TAG = "${DOCKERHUB_USER}/${APP_NAME}:latest"
    }
    stages {
        stage('Lint & Verify Frontend') {
            steps {
                sh '''
                echo "Validating core application assets..."
                test -f index.html
                '''
            }
        }
        stage('Build & Push to Docker Hub') {
            steps {
                // Securely injects your saved credentials into environmental variables
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    # Log into remote Docker Hub using injected variables
                    echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                    
                    # Build locally on the host agent machine
                    docker build -t ${IMAGE_TAG} -t ${LATEST_TAG} .
                    
                    # Push versioned and latest images out to Docker Hub registry
                    docker push ${IMAGE_TAG}
                    docker push ${LATEST_TAG}
                    '''
                }
            }
        }
        stage('Approval Gate') {
            steps {
                input message: "Deploy image ${IMAGE_TAG} to local Minikube cluster?", ok: "Approve Local Deploy"
            }
        }
        stage('Deploy to Minikube') {
            steps {
                withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: '', namespace: 'default', serverUrl: '') {
                    sh '''
                    # Direct terminal tools explicitly into Minikube system context
                    kubectl config use-context minikube
                    
                    # Apply manifest changes
                    kubectl apply -f k8s/deployment.yaml
                    
                    # Update deployment to use the newly pushed Docker Hub image tag
                    kubectl set image deployment/${APP_NAME} ${APP_NAME}=${IMAGE_TAG}
                    '''
                }
            }
        }
    }
}
