# Client API Documentation

This document outlines the API endpoints available for the client-facing application.

## Base URL

`/api/client`

## Endpoints

### 1. Home Page

- **URL:** `/home`
- **Method:** `GET`
- **Query Params:** `lang` (required, 'id' or 'en')

### 2. About Us Page

- **URL:** `/about-us`
- **Method:** `GET`
- **Query Params:** `lang` (required)

### 3. Service Page

- **URL:** `/service`
- **Method:** `GET`
- **Query Params:** `lang` (required)

### 4. News Page

- **URL:** `/news`
- **Method:** `GET`
- **Query Params:** `lang` (required)

### 5. News Detail (Article)

- **URL:** `/news/article/:id`
- **Method:** `GET`
- **Path Params:** `id` (required, UUID)
- **Query Params:** `lang` (required)

### 6. News CSR Detail

- **URL:** `/news/csr/:id`
- **Method:** `GET`
- **Path Params:** `id` (required, UUID)
- **Query Params:** `lang` (required)

### 7. Investor Relation Page

- **URL:** `/investor`
- **Method:** `GET`
- **Query Params:** `lang` (required)
