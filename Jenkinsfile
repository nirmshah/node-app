#!groovy

pipeline {

  agent any

  environment {
    imagename = "nirmshah/node-app:${BUILD_NUMBER}"
    imagename_latest = "nirmshah/node-app:latest"
    dockerHubCredentialID = 'DockerHubCredential'
    dockerImage = ''
    dockerImageLatest = ''
  }

  stages {
    // Check Tooling
    stage('Check Tooling') {
      steps {
        sh '''
          docker info
          docker version
          curl --version
        '''
      }
    }

    // Build Docker Image
    stage('Build Docker Image') {
      steps {
        sh "echo 'Build Docker Image'"
        script {
          dockerImage = docker.build imagename
          dockerImageLatest = docker.build imagename_latest
        }
      }
    }

    // Static Code Analysis
    stage('Static Code Analysis') {
      steps {
        sh "echo 'Static Code Analysis'"
      }
    }

    stage('Push Docker Image to DockerHub') {
      steps {
        sh "echo 'Push Docker Image to DockerHub'"
        script {
          withDockerRegistry([ credentialsId: "${dockerHubCredentialID}", url: "" ]) {
            dockerImage.push()
            dockerImageLatest.push()
            }
          }
        }
    }

    // Prune Docker Data
    stage("Prune Docker Data")
    {
      steps
      {
        sh "echo 'Prune Docker Data'"
        //sh 'docker system prune -a --volume -f'
      }
    }

    // Start Docker Container
    stage("Bring up Containers")
    {
      steps
      {
        sh "echo 'Bring up Containers'"
        //sh 'docker-compose up -d --no-color --wait'
        //sh 'docke-compose ps'
      }
    }
   
    // Run Unit Tests
    stage('Unit Tests') {
      steps {
        sh "echo 'Unit Tests'"
      }
    }

    // Acceptance Tests
    stage('Acceptance Tests') {
      steps {
        sh "echo 'Run Acceptance Tests'"
      }
    }

    // Performance Tests
    stage('Performance Tests') {
      steps {
        sh "echo 'Run Performance Tests'"
      }
    }
  }
  post {
    always
    {
     // Get the container down
        //sh 'docker-compose down'
        sh 'docker images'
    }
    success {
       sh "echo 'Send mail on success'"
       // mail to:"me@example.com", subject:"SUCCESS: ${currentBuild.fullDisplayName}", body: "Yay, we passed."
    }
    failure {
       sh "echo 'Send mail on failure'"
       // mail to:"me@example.com", subject:"FAILURE: ${currentBuild.fullDisplayName}", body: "Boo, we failed."
    }
  }
}