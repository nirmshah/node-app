#!groovy

pipeline {

  agent any

  environment {
    git_commit_message = ''
    git_commit_diff = ''
    git_commit_author = ''
    git_commit_author_name = ''
    git_commit_author_email = ''
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
        
      }
    }

    // Build
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

   
    // Run Unit Tests
    stage('Unit Tests') {
      steps {
        sh "echo 'Static Code Analysis'"
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