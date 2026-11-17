pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Health Check & Test') {
            steps {
                script {
                    sh '''
                        echo "Waiting for services to become healthy..."
                        sleep 15
                        curl -f http://localhost:5001/health || exit 1
                        curl -f http://localhost:8080/ || exit 1
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment and health check tests completed successfully!'
        }
        failure {
            echo 'Deployment or health checks failed.'
        }
    }
}