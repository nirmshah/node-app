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
    // Build
    stage('Build Docker Image') {
      steps {
        sh "echo 'Build Docker Image'"
        script {
          dockerImage = docker.build imagename
          dockerImageLatest = docker.build imagename_latest

          //sh "docker tag ${imagename_latest} ${imagename}"
        }
      }
    }

    // Static Code Analysis
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

    // Unit Tests
    stage('Unit Tests') {
    
      steps {
        //deleteDir()
        //checkout scm
        sh "echo 'Run Unit Tests'"
      }
    }

    // Acceptance Tests
    stage('Acceptance Tests') {
     
      steps {
        //deleteDir()
        //checkout scm
        sh "echo 'Run Acceptance Tests'"
      }
    }

    // Unit Tests
    stage('Unit Tests') {
    
      steps {
        //deleteDir()
        //checkout scm
        sh "echo 'Run Unit Tests'"
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