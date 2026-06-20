# Simple Microservices App

Three independent Express.js services, each owning its own data and running on its own port.

| Service          | Port | Endpoints                  |
|-------------------|------|-----------------------------|
| User Service       | 3001 | `GET /users`, `POST /users` |
| Product Service     | 3002 | `GET /products`, `POST /products` |
| Order Service       | 3003 | `GET /orders`, `POST /orders` |

Each service also exposes `GET /health` (returns `{status: "UP"}`) and `GET /<resource>/:id`
for fetching a single record — handy once you wire these up behind a gateway or add tests.

## Project structure

```
microservices-app/
├── user-service/
│   ├── package.json
│   └── server.js
├── product-service/
│   ├── package.json
│   └── server.js
└── order-service/
    ├── package.json
    └── server.js
```

Each folder is self-contained — its own `package.json`, its own `node_modules` once installed.
That's the point of microservices: each one could be built, deployed, and scaled independently.

## How to run

Open three terminals (one per service):

```bash
# Terminal 1
cd user-service
npm install
npm start          # → http://localhost:3001

# Terminal 2
cd product-service
npm install
npm start          # → http://localhost:3002

# Terminal 3
cd order-service
npm install
npm start          # → http://localhost:3003
```

## Try it with curl

```bash
# Users
curl http://localhost:3001/users
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Shubham","email":"shubham@example.com"}'

# Products
curl http://localhost:3002/products
curl -X POST http://localhost:3002/products \
  -H "Content-Type: application/json" \
  -d '{"name":"USB-C Hub","price":1299}'

# Orders
curl http://localhost:3003/orders
curl -X POST http://localhost:3003/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"productId":2,"quantity":2}'
```

## Notes on the design

- **Data storage**: each service keeps its data in an in-memory array, reset on restart.
  This keeps Step 1 simple. Swap in MongoDB/Postgres per service later if your assignment
  asks for persistence — each service should still own its own database (a core
  microservices rule: no shared DB between services).
- **No inter-service calls yet**: `order-service` stores `userId`/`productId` but doesn't
  call `user-service`/`product-service` to validate them. That's a natural Step 2 (service-to-service
  communication via HTTP/axios, or an API Gateway in front of all three).
- **Validation**: each `POST` checks required fields and returns `400` with an error message
  if something's missing.

## Likely next steps (if this is a multi-step assignment)

1. Containerize each service with its own `Dockerfile`.
2. Add a `docker-compose.yml` to run all three together.
3. Add an API Gateway (e.g. `express-http-proxy` or `nginx`) as a single entry point.
4. Add inter-service calls (Order Service validating `userId`/`productId` against the other two).
5. Swap in-memory arrays for real databases (MongoDB fits well given your existing MongoDB cert).
