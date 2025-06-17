````
# School Management API

A RESTful API built with Node.js, Express, and MySQL for managing schools and listing them by proximity.

---

## Features

- Add new schools with name, address, latitude, and longitude
- List schools sorted by distance from user-provided coordinates
- Uses MySQL for data storage
- Distance calculated with the Haversine formula

---

## Prerequisites

- Node.js (v14 or later)
- MySQL Server
- npm or yarn

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/school-management.git
cd school-management
````

2. **Install dependencies**

```bash
npm install
```

3. **Create the database**

Log into MySQL and run:

```sql
CREATE DATABASE school_management;
```

4. **Create the schools table**

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL
);
```

5. **Configure environment variables**

Create a `.env` file in the project root:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=school_management
DB_PORT=3306
```

6. **Start the server**

```bash
npm run dev
```

The API will run at `http://localhost:3000`.

---

## API Endpoints

### Add a School

* **POST** `/addSchool`

**Request Body:**

```json
{
  "name": "Example School",
  "address": "123 School St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response:**

```json
{
  "message": "School added successfully"
}
```

---

### List Schools by Distance

* **GET** `/listSchools?latitude=40.7128&longitude=-74.0060`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Example School",
    "address": "123 School St",
    "latitude": 40.7128,
    "longitude": -74.0060,
  },
  ...
]
```

---

## Notes

* Make sure to add `.env` to `.gitignore` to protect sensitive data.
* Distances are calculated in kilometers.

---
