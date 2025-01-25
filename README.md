# AI-Powered Health & Fitness Assistant

## Project Overview : Deployment : https://hackathon-dun-eight.vercel.app/

### Vitals
AI Health & Fitness Assistant

### Problem Statement
Many individuals struggle to maintain consistent fitness routines and healthy lifestyles due to lack of personalized guidance, real-time feedback, and structured workout plans.

### Objectives
- Provide personalized AI-powered workout recommendations
- Offer real-time exercise form analysis
- Generate customized diet plans and nutritional advice
- Track fitness progress and health metrics
- Deliver motivational support and progress reports

### Key Features
- AI-powered workout planning and analysis
- Real-time exercise form feedback
- Personalized diet recommendations
- BMI calculation and health insights
- Progress tracking and reporting
- Interactive chat support
- Sharing Activity with friends
- Connection with Strava
- Supports all Google Fit Devices

### Target Audience
- Fitness enthusiasts of all levels
- Individuals seeking personalized workout guidance
- People looking for diet and nutrition advice
- Users wanting to track their fitness progress

## Technology Stack

- **Frontend**: Next.js 14.2.16
- **UI Framework**: React 18
- **Database**: MongoDB
- **Styling**: Tailwind CSS 3.4.1
- **Animation**: Framer Motion
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **AI Integration**: Google Generative AI (Gemini)
- **Charts**: Chart.js, Recharts
- **Email**: Nodemailer
- **HTTP Client**: Axios

## System Requirements

### Hardware Requirements
- Modern web browser
- Minimum 4GB RAM
- Webcam (for exercise form analysis)

### Software Requirements
- Node.js 18+
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari)

## Installation and Setup

1. Clone the repository:
- git clone https://github.com/jashwanth176/abc

2. Install dependencies:
- npm install

3. Set up environment variables and create a `.env.local` file with:

- GOOGLE_API_KEY=[your-gemini-api-key]
- EMAIL_USER=[your-email]
- EMAIL_APP_PASSWORD=[your-app-password]
- NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run the development server:
- npm run dev

## Features Explanation

### 1. AI Workout Planning
- Personalized exercise selection based on user profile
- Real-time form analysis and feedback
- Progress tracking and reporting

### 2. Diet Planning
- Custom meal recommendations
- Nutritional analysis
- Recipe generation with health benefits

### 3. Health Metrics
- BMI calculation and analysis
- Weight tracking
- Progress visualization

### 4. Interactive Features
- Real-time chat support
- Exercise form analysis
- Progress reports and notifications

### 5. Sharing Activity
- Share your activity with your friends 
- Automatic Email Updates

### 6. Connection with Strava
- Connect your Strava account to track your activity
- Automatic Email Updates

### 7. Supports all Google Fit Devices
- Supports all Google Fit Devices

## Code Structure
    ├── app/
    │ ├── api/ # API routes for AI integration
    │ ├── workout/ # Workout-related components
    │ ├── diet/ # Diet planning features
    │ ├── analyze/ # Form analysis components
    │ └── bmi/ # BMI calculator
    ├── components/ # Reusable UI components
    ├── public/ # Static assets
    ├── styles/ # Global styles
    ├── onboarding/ # Onboarding page
    └── styles/ # Global styles


## Usage Instructions

1. **Getting Started**
   - Create an account through the onboarding process
   - Complete your fitness profile
   - Set your health goals

2. **Workout Sessions**
   - Select workout type
   - Follow AI-generated exercise plan
   - Receive real-time form feedback

3. **Diet Planning**
   - Input dietary preferences
   - Receive personalized meal plans
   - Track nutritional intake

Visit [[deployment-url](https://hackathon-dun-eight.vercel.app/)] to try the application.


## Testing

### Testing Tools
- Jest for unit testing React components
- Postman for API endpoint testing
- Lighthouse for performance monitoring

### Test Coverage
![Lighthouse Report](![alt text](image-1.png))

Key metrics from our Lighthouse audit:
- Performance: 99/100
- Accessibility: 95/100
- Best Practices: 100/100
- SEO: 100/100

### API Testing
We use Postman collections for testing our API endpoints:
- Authentication flows
- Workout generation endpoints
- Diet recommendation APIs
- Form analysis endpoints

## Challenges and Solutions

### 1. Real-time Form Analysis
**Challenge**: Implementing accurate real-time exercise form analysis using webcam feed.
**Solution**: Utilized Google's Gemini Vision API with custom prompt engineering to achieve reliable pose estimation and feedback.

### 2. Workout Plan Generation
**Challenge**: Creating personalized workout plans that account for user fitness levels and goals.
**Solution**: Developed a sophisticated AI prompt system that considers multiple user parameters and medical history.

### 3. Performance Optimization
**Challenge**: Managing 3D animations and real-time video processing without impacting performance.
**Solution**: Implemented lazy loading, component optimization, and efficient state management using React hooks.

## Future Enhancements


1. **Advanced Analytics**
   - Detailed workout history visualization
   - Predictive performance metrics
   - Nutrition tracking integration

2. **Mobile App**
   - Native mobile application
   - Offline workout support
   - Push notifications for workout reminders

3. **AI Improvements**
   - Voice-guided workouts
   - Real-time workout modifications
   - Advanced diet planning with grocery lists

## Credits and References

### Team Members
- [Jashwanth] - Frontend Development
- [Pranneth] - Backend Integration
- [Prudhvi] - UI/UX Design
- [Kamal] - AI Implementation

### Third-Party Tools and Libraries
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Three.js](https://threejs.org/) - 3D Graphics
- [Google Generative AI](https://ai.google.dev/) - AI Features
- [Chart.js](https://www.chartjs.org/) - Data Visualization
- [Nodemailer](https://nodemailer.com/) - Email Services

### Special Thanks
- Siddharth University for providing resources and infrastructure
- Open source community for various tools and libraries

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE.md](LICENSE.md) file for details.
