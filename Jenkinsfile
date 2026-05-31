pipeline {
    agent any

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        DOCKERHUB_USERNAME = "subhamku"
        DEVOPS_REPO = "https://github.com/snjeev-kushwaha/k8s-manifests.git"
    }

    stages {

        stage('Clone App Repo') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                docker build -t $DOCKERHUB_USERNAME/user-service:$IMAGE_TAG ./user-service
                docker build -t $DOCKERHUB_USERNAME/order-service:$IMAGE_TAG ./order-service
                docker build -t $DOCKERHUB_USERNAME/payment-service:$IMAGE_TAG ./payment-service
                docker build -t $DOCKERHUB_USERNAME/product-service:$IMAGE_TAG ./product-service
                docker build -t $DOCKERHUB_USERNAME/notification-service:$IMAGE_TAG ./notification-service
                docker build -t $DOCKERHUB_USERNAME/api-gateway:$IMAGE_TAG ./api-gateway
                """
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker push $DOCKERHUB_USERNAME/user-service:$IMAGE_TAG
                    docker push $DOCKERHUB_USERNAME/order-service:$IMAGE_TAG
                    docker push $DOCKERHUB_USERNAME/payment-service:$IMAGE_TAG
                    docker push $DOCKERHUB_USERNAME/product-service:$IMAGE_TAG
                    docker push $DOCKERHUB_USERNAME/notification-service:$IMAGE_TAG
                    docker push $DOCKERHUB_USERNAME/api-gateway:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Update Manifest Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                
                    sh '''
                    rm -rf k8s-manifests

                    git clone https://$GIT_USER:$GIT_PASS@github.com/snjeev-kushwaha/k8s-manifests.git

                    cd k8s-manifests

                    # Update all deployment image tags

                    sed -i "s|image: .*user-service.*|image: subhamku/user-service:$IMAGE_TAG|" user-service/deployment.yaml

                    sed -i "s|image: .*order-service.*|image: subhamku/order-service:$IMAGE_TAG|" order-service/deployment.yaml

                    sed -i "s|image: .*payment-service.*|image: subhamku/payment-service:$IMAGE_TAG|" payment-service/deployment.yaml

                    sed -i "s|image: .*product-service.*|image: subhamku/product-service:$IMAGE_TAG|" product-service/deployment.yaml

                    sed -i "s|image: .*notification-service.*|image: subhamku/notification-service:$IMAGE_TAG|" notification-service/deployment.yaml

                    sed -i "s|image: .*api-gateway.*|image: subhamku/api-gateway:$IMAGE_TAG|" api-gateway/deployment.yaml


                    git config user.email "sanjeevkushwaha876@gmail.com"
                    git config user.name "sanjeev kushwaha"

                    git add .

                    git diff --cached --quiet || git commit -m "Updated all image tags to $IMAGE_TAG"

                    git push origin master
                    '''
                }
            }
        }
    }
}