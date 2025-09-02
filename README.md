
# .NET Microservices Dashboard with Ocelot and Gemini AI

![.NET](https://img.shields.io/badge/.NET-7.0-512BD4?style=for-the-badge&logo=dotnet)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)
![Ocelot](https://img.shields.io/badge/Ocelot-23.2-8E44AD?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)

---

This project demonstrates a complete microservices architecture built with **.NET 7**, fronted by an **Ocelot API Gateway**. It includes a modern **React** dashboard for interaction and features a service that integrates with the **Google Gemini API** using a free-tier AI Studio key.

The frontend dashboard provides a unified view to interact with all backend services, showcasing a real-world example of a decoupled, service-oriented application.

## ✨ Features

-   **Microservices Architecture**: Three distinct backend services for different business domains (Catalog, Orders, AI).
-   **API Gateway**: A single, unified entry point using **Ocelot** to route requests to the appropriate downstream services.
-   **AI Integration**: A dedicated service (`AiService`) that wraps the **Gemini 2.5 Flash** model, accessible via a secure backend-to-backend API call.
-   **Interactive Frontend**: A responsive and user-friendly dashboard built with **React, TypeScript, and Tailwind CSS**.
-   **Containerized**: Fully containerized with **Docker** and **Docker Compose** for easy, one-command setup and consistent environments.
-   **Cross-Platform**: Built on .NET 7, runs anywhere .NET and Docker are supported (Windows, macOS, Linux).

## 🚀 Architecture Overview

The request flow is designed to be simple, scalable, and secure. The React client communicates only with the API Gateway, which abstracts away the complexity of the internal service network.

```
+------------------+      +-----------------------+      +--------------------+
|                  |      |                       |      |                    |
|   React Client   |----->|   Ocelot API Gateway  |----->|   CatalogService   |
| (localhost:5173) |      |   (localhost:8088)    |      | (localhost:5001)   |
|                  |      |                       |      |                    |
+------------------+      +-----------------------+      +--------------------+
                            |
                            |
                            |      +--------------------+
                            +----->|     OrderService   |
                            |      | (localhost:5002)   |
                            |      +--------------------+
                            |
                            |
                            |      +--------------------+      +----------------+
                            +----->|      AiService     |----->| Google Gemini  |
                                   | (localhost:5003)   |      |      API       |
                                   +--------------------+      +----------------+
```

## 🛠️ Technology Stack

| Area          | Technology                                                 |
| ------------- | ---------------------------------------------------------- |
| **Backend**   | .NET 7, ASP.NET Core, C#, Ocelot API Gateway               |
| **Frontend**  | React 18, TypeScript, Tailwind CSS, Vite                   |
| **AI Model**  | Google Gemini 2.5 Flash (via REST API)                     |
| **Container** | Docker, Docker Compose                                     |

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose for Linux)
-   A **Gemini API Key** from [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key).

## ⚡ Getting Started

You can run this project using Docker (recommended) or locally on your machine.

### Method 1: Docker Compose (Recommended)

This is the simplest way to get all services up and running with a single command.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Create an environment file:**
    Create a file named `.env` in the project's root directory. This file will securely provide the API key to the `AiService` container.

    ```ini
    # .env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    *Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key from Google AI Studio.*

3.  **Build and run the containers:**
    ```bash
    docker compose up --build
    ```

4.  **Access the application:**
    -   **React Dashboard**: [http://localhost:5173](http://localhost:5173)
    -   **API Gateway**: [http://localhost:8088](http://localhost:8088)

### Method 2: Running Locally (without Docker)

If you prefer to run each service manually:

1.  **Clone the repository.**

2.  **Run each service in a separate terminal:**

    -   **Terminal 1: CatalogService**
        ```bash
        cd src/Services/CatalogService
        dotnet run
        ```

    -   **Terminal 2: OrderService**
        ```bash
        cd src/Services/OrderService
        dotnet run
        ```

    -   **Terminal 3: AiService (with API Key)**
        *It is crucial to set the environment variable before running.*
        ```bash
        cd src/Services/AiService
        GEMINI_API_KEY=YOUR_KEY dotnet run
        ```
        *(On Windows PowerShell, use `$env:GEMINI_API_KEY="YOUR_KEY"; dotnet run`)*

    -   **Terminal 4: ApiGateway**
        ```bash
        cd src/ApiGateway
        dotnet run
        ```

    -   **Terminal 5: Frontend Dashboard**
        ```bash
        # (Assuming you are in the project root)
        # You might need to install dependencies first if you haven't: npm install
        npm run dev
        ```

3.  **Access the application:**
    -   **React Dashboard**: [http://localhost:5173](http://localhost:5173) (or as indicated by Vite)
    -   **API Gateway**: [http://localhost:8088](http://localhost:8088)

## 🌐 API Gateway Routes

The `ocelot.json` file configures the following routes:

| Upstream Path Template      | Downstream Service |
| --------------------------- | ------------------ |
| `GET /catalog/api/products` | `CatalogService`   |
| `GET /orders/api/orders`    | `OrderService`     |
| `POST /ai/api/ai/generate`  | `AiService`        |

## 🔮 Future Improvements

-   **Upgrade to .NET 8 LTS:** Migrate the services and gateway to the latest Long-Term Support version of .NET.
-   **Add Authentication:** Implement JWT-based authentication at the gateway level.
-   **Structured AI Output:** Enhance the `AiService` to request structured JSON from Gemini for more robust integrations.
-   **Streaming Responses:** Use `streamGenerateContent` for real-time, token-by-token AI responses on the dashboard.
-   **Service Discovery:** Integrate a service discovery pattern (e.g., using Consul or Kubernetes services) instead of hardcoded downstream hosts.

---
*This project serves as a template and starting point for building robust, scalable microservice applications with .NET and modern frontend technologies.*
