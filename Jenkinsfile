#!groovy

pipeline {

  agent any

  environment {
    git_commit_message = ''
    git_commit_diff = ''
    git_commit_author = ''
    git_commit_author_name = ''
    git_commit_author_email = ''
    imagename = "nirmshah/node-app"
    registryCredential = 'nirmshah'
    dockerImage = ''
  }

  stages {
    // Build
    stage('Build') {
     
      steps {
        deleteDir()
        sh "echo 'Build the Docker Image'"
        checkout scm
        script {
          dockerImage = docker.build imagename
        }
      }
    }

    // Static Code Analysis
    stage('Static Code Analysis') {
     
      steps {
        deleteDir()
        //checkout scm
        sh "echo 'Run Static Code Analysis'"
      }
    }

    // Unit Tests
    stage('Unit Tests') {
    
      steps {
        deleteDir()
        //checkout scm
        sh "echo 'Run Unit Tests'"
      }
    }

    // Acceptance Tests
    stage('Acceptance Tests') {
     
      steps {
        deleteDir()
        //checkout scm
        sh "echo 'Run Acceptance Tests'"
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