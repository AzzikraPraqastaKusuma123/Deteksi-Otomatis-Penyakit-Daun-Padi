# Backend API Requests for Postman

This document provides the request body structures and endpoint details for the PadiGuard backend API.

**Base URL:** `http://localhost:5000/api`

---

## How to Use Postman for Authenticated Requests

1.  **Get the Token:**
    *   Send a `POST` request to `http://localhost:5000/api/auth/login` with the email and password of a registered user.
    *   From the response body, copy the value of the `token` property.

2.  **Set the Authorization Header:**
    *   For any request that requires authentication, go to the **Authorization** tab in Postman.
    *   Select **Bearer Token** from the "Type" dropdown menu.
    *   Paste the token you copied into the **Token** field on the right.
    *   Postman will automatically add the `Authorization` header to your request with the value `Bearer <YOUR_JWT_TOKEN>`.

    ![Postman Authorization Tab](https://i.imgur.com/7P4s2gC.png)

---

## 1. Authentication (`/api/auth`)

### POST `/auth/register`
Creates a new user account.

**Body (`application/json`):**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "full_name": "New User Full Name"
}
```
*(Note: The `role` is assigned by the backend, defaults to 'user'.)*

### POST `/auth/login`
Logs in a user and returns a JWT token.

**Body (`application/json`):**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 2. Users (`/api/users`)
*All user management routes below typically require admin privileges.*

### GET `/users`
(Admin only) Retrieves a list of all users.
*Requires admin authentication token.*
*No request body.*

### GET `/users/:id`
(Admin only) Retrieves a single user by their ID.
*Requires admin authentication token.*
*No request body.*

### POST `/users`
(Admin only) Creates a new user.
*Requires admin authentication token.*

**Body (`application/json`):**
```json
{
  "username": "janedoe",
  "email": "janedoe@example.com",
  "password": "strongpassword",
  "full_name": "Jane Doe",
  "role": "user"
}
```

### PUT `/users/:id`
(Admin only) Updates a user's information by their ID.
*Requires admin authentication token.*

**Body (`application/json`):**
```json
{
  "username": "janedoe_updated",
  "email": "jane.doe.updated@example.com",
  "full_name": "Jane Doe Updated",
  "role": "user"
}
```

### PUT `/users/profile/:id`
Updates the profile of the currently logged-in user.
*Requires authentication token.*

**Body (`application/json`):**
```json
{
  "full_name": "Updated User Name",
  "email": "updated.email@example.com",
  "password": "newpassword123"
}
```
*(Password is optional, only include it if you want to change it.)*

### DELETE `/users/:id`
(Admin only) Deletes a user by their ID.
*Requires admin authentication token.*
*No request body.*

---

## 3. Detections (`/api/detections`)

### POST `/detections/detect`
Upload an image for disease detection.
*Requires authentication token.*

**Body (`multipart/form-data`):**
- **Key:** `image`
- **Value:** Select an image file (e.g., a `.jpg` or `.png` of a rice leaf).

### POST `/detections/realtime`
Upload an image for real-time disease detection (intended for webcam streams).
*Requires authentication token.*

**Body (`multipart/form-data`):**
- **Key:** `image`
- **Value:** Select an image file.

### GET `/detections`
Retrieves all detections for the currently authenticated user.
*Requires authentication token.*
*No request body.*

### GET `/detections/all/admin`
(Admin only) Retrieves all detections from all users.
*Requires admin authentication token.*
*No request body.*

### GET `/detections/count`
Retrieves the total number of detections for the logged-in user.
*Requires authentication token.*
*No request body.*

### GET `/detections/:id`
Retrieves details for a single detection by its ID.
*Requires authentication token.*
*No request body.*


---

## 4. Diseases (`/api/diseases`)

### GET `/diseases`
Retrieves a list of all diseases.
*Requires authentication token.*
*No request body.*

### GET `/diseases/count`
(Admin only) Retrieves the total count of diseases.
*Requires admin authentication token.*
*No request body.*

### GET `/diseases/:id`
Retrieves a single disease by its ID.
*Requires authentication token.*
*No request body.*

### GET `/diseases/byName`
Retrieves disease details by its name.
*Requires authentication token.*
**Query Parameter:** `name` (e.g., `/api/diseases/byName?name=Brown%20Spot`)

### POST `/diseases`
(Admin only) Adds a new disease.
*Requires admin authentication token.*

**Body (`multipart/form-data`):**
- **Key:** `name` (Text)
- **Key:** `description` (Text)
- **Key:** `symptoms` (Text)
- **Key:** `prevention` (Text)
- **Key:** `treatment` (Text)
- **Key:** `image` (File)

### PUT `/diseases/:id`
(Admin only) Updates an existing disease.
*Requires admin authentication token.*

**Body (`multipart/form-data`):**
*(Include only the fields you want to update. You can optionally include a new image.)*
- **Key:** `name` (Text)
- **Key:** `description` (Text)
- **Key:** `symptoms` (Text)
- **Key:** `prevention` (Text)
- **Key:** `treatment` (Text)
- **Key:** `image` (File)

### DELETE `/diseases/:id`
(Admin only) Deletes a disease by its ID.
*Requires admin authentication token.*
*No request body.*

---

## 5. Pests (`/api/pests`)

### GET `/pests`
Retrieves a list of all pests.
*Requires authentication token.*
*No request body.*

### GET `/pests/count`
(Admin only) Retrieves the total count of pests.
*Requires admin authentication token.*
*No request body.*

### GET `/pests/:id`
Retrieves a single pest by its ID.
*Requires authentication token.*
*No request body.*

### POST `/pests`
(Admin only) Adds a new pest.
*Requires admin authentication token.*

**Body (`application/json`):**
```json
{
    "name": "New Pest Name",
    "description": "Description of the new pest.",
    "symptoms": "Symptoms caused by the pest.",
    "prevention": "How to prevent this pest.",
    "treatment": "How to treat this pest."
}
```
*(Note: The `addPest` controller does not handle image uploads currently.)*


### PUT `/pests/:id`
(Admin only) Updates an existing pest.
*Requires admin authentication token.*

**Body (`multipart/form-data`):**
- **Key:** `name` (Text)
- **Key:** `description` (Text)
- **Key:** `symptoms` (Text)
- **Key:** `prevention` (Text)
- **Key:** `treatment` (Text)
- **Key:** `image` (File)

---

## 6. Agricultural Resources (`/api/agricultural-resources`)

### GET `/agricultural-resources`
Retrieves a list of all agricultural resources.
*Publicly accessible.*
*No request body.*

### GET `/agricultural-resources/:id`
Retrieves a single agricultural resource by its ID.
*Publicly accessible.*
*No request body.*

### POST `/agricultural-resources`
(Admin only) Adds a new agricultural resource.
*Requires admin authentication token.*

**Body (`multipart/form-data`):**
- **Key:** `name` (Text)
- **Key:** `type` (Text) - *e.g., `Fertilizer`, `Pesticide`, `Medicine`*
- **Key:** `description` (Text)
- **Key:** `usage_instructions` (Text)
- **Key:** `source` (Text)
- **Key:** `image` (File)

### PUT `/agricultural-resources/:id`
(Admin only) Updates an existing agricultural resource.
*Requires admin authentication token.*

**Body (`multipart/form-data`):**
*(Include only the fields you want to update. You can optionally include a new image.)*
- **Key:** `name` (Text)
- **Key:** `type` (Text)
- **Key:** `description` (Text)
- **Key:** `usage_instructions` (Text)
- **Key:** `source` (Text)
- **Key:** `image` (File)

### DELETE `/agricultural-resources/:id`
(Admin only) Deletes an agricultural resource by its ID.
*Requires admin authentication token.*
*No request body.*
