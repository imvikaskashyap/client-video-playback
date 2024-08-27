# Video Player Application

## Overview

This project is a video player application designed to provide a seamless experience for users to watch videos in a specified order without the option to fast forward or skip ahead. The application ensures that users follow the intended learning path and captures their progress continuously. The application includes user authentication, video uploading, progress tracking, and a dashboard to visualize video-watching progress.

## Features

1. **Video Library**: A list of video topics, each containing a unique video file.
2. **Sequential Video Playback**: Employees must watch videos in the specified order without any option to fast forward or skip ahead.
3. **Resume from Last Stop**: If a video stops playing at a particular location, it resumes playback from that exact timeline position.
4. **Back Navigation**: Users can navigate back to previously watched videos, but cannot fast-forward.
5. **Progress Tracking**: Display the employee's progress as a percentage completed on the dashboard.
6. **User Authentication**: Sign up and log in to access the application.
7. **Video Uploading**: Admin can upload videos using Cloudinary (Admin functionality not implemented to keep the project simple).
8. **Responsive Design**: The UI is built using Chakra UI, providing a responsive and accessible interface.

## Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Chakra UI**: A simple, modular, and accessible component library for React applications.
- **Axios**: A promise-based HTTP client for the browser and Node.js, used to make API requests.
- **React Player**: A React component to play videos from various URLs.
- **React Circular Progressbar**: A customizable circular progress bar component to visualize user progress.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database used to store user, video, and progress data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward schema-based solution to model your application data.
- **Cloudinary**: A cloud-based media management service used to store and manage videos.

### Libraries and Parameters

- **Cors**: Middleware to enable CORS with various options for secure API access.
- **Multer**: Middleware for handling `multipart/form-data`, primarily used for uploading files.
- **Render**: Backend hosted on Render, so it might take up to 50 seconds for the API to respond initially.
- **Cloudinary**: Used for video storage and management to provide secure and scalable media handling.

## Application Architecture

### Frontend Components

- **HomePage.js**: The home page of the application explaining how to use the application and its features.
- **VideoPlayer.js**: A component to handle video playback and user interactions.
- **ProgressBar.js**: A component to display user progress in watching videos.
- **VideoDetails.js**: A component to show details about the currently playing video.
- **NavigationButtons.js**: A component to handle navigation between videos.
- **Upload.js**: A component that allows uploading videos (accessible to all users, but ideally for admin use).

### Backend Components

- **Models**
  - `User`: Schema for user authentication and management.
  - `Video`: Schema for storing video details and metadata, including Cloudinary URL.
  - `VideoProgress`: Schema for tracking user progress on each video.

- **Controllers**
  - `userController.js`: Handles user authentication, sign up, and login.
  - `videoController.js`: Manages video uploads to Cloudinary, retrieval, and details.
  - `progressController.js`: Tracks and updates user progress on videos.

- **Routes**
  - `/api/users`: Routes for user operations.
  - `/api/videos`: Routes for video management and uploading to Cloudinary.
  - `/api/progress`: Routes for tracking video-watching progress.

### Database

- **MongoDB**: A document-oriented NoSQL database where all data about users, videos, and progress is stored.

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/imvikaskashyap/client-video-playback.git
   cd video-player-app

## Setup Instructions

### Install Node Modules:
```bash
npm i --force

## Start the Application:
npm run start