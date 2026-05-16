pipeline {
    agent any
    environment {
        APP_NAME = 'student-pass'
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
                # 1. Point a shortcut variable to your newly fixed config file
                KCONF="/var/lib/jenkins/.kube_local/config"
                
                # 2. Switch context safely using the new configuration path
                kubectl --kubeconfig=$KCONF config use-context minikube
                
                # 3. HERE IS THE LINE: It applies your deployment file
                kubectl --kubeconfig=$KCONF apply -f k8s/deployment.yaml
                
                # 4. Applies your service file
                kubectl --kubeconfig=$KCONF apply -f k8s/service.yaml
                
                # 5. Updates the cluster pod to use your freshly built local image tag
                kubectl --kubeconfig=$KCONF set image deployment/${APP_NAME} ${APP_NAME}=${IMAGE_TAG}
                '''               
                }
            }
        }
    }

