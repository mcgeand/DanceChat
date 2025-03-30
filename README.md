# DanceChat AI Assistant

[![Frontend CI](https://github.com/mcgeand/DanceChat/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/mcgeand/DanceChat/actions/workflows/frontend-ci.yml)
[![codecov](https://codecov.io/gh/mcgeand/DanceChat/branch/main/graph/badge.svg)](https://codecov.io/gh/mcgeand/DanceChat)

A modern AI-powered chatbot for dance studios, built with React, Node.js, and OpenAI integration.

## Features

- Real-time chat interface with a floating widget
- OpenAI-powered responses
- HubSpot CRM integration for lead capture
- Modern UI with Tailwind CSS and Radix UI
- Docker containerization for easy deployment

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- OpenAI API key
- HubSpot API key

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your API keys and configuration:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   HUBSPOT_API_KEY=your_hubspot_api_key_here
   ```

## Development

### Running with Docker Compose

1. Build and start all services:
   ```bash
   docker compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Running Locally

1. Frontend:
   ```bash
   cd chatbot-widget
   npm install
   npm start
   ```

2. Backend:
   ```bash
   cd chatbot-api
   npm install
   npm run dev
   ```

## Testing

1. Frontend tests:
   ```bash
   cd chatbot-widget
   npm test
   ```

2. Backend tests:
   ```bash
   cd chatbot-api
   npm test
   ```

## API Endpoints

- `POST /conversation` - Send a message to the chatbot
- `POST /conversation/lead` - Submit lead information
- `GET /health` - Health check endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.