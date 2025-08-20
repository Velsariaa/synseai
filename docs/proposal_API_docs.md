# Proposal API Documentation

This document outlines the available proposal management endpoints.

## Base URL
All endpoints are prefixed with `/api/proposal`

## Authentication
- All endpoints require authentication
- Include JWT token in the `Authorization` header
- Format: `Authorization: Bearer <token>`

## Endpoints

### 1. Get All Proposals (Employee Only)
Get all proposals across all companies. This endpoint is only accessible to users with the EMPLOYEE role.

**URL**: `GET /api/proposal/all`

**Request Headers**:
```
Authorization: Bearer <token>
```

**Response (Success - 200)**:
```json
{
  "proposals": [
    {
      "id": 1,
      "title": "Project Alpha",
      "description": "Collaboration proposal for Project Alpha",
      "status": "Submitted",
      "collab_type": "Joint Venture",
      "company_id": 1,
      "company_name": "Acme Inc",
      "company_industry": "Technology",
      "created_at": "2025-08-20T12:00:00Z",
      "updated_at": "2025-08-20T12:00:00Z"
    }
  ],
  "count": 1
}
```

**Response (Error - 403)**:
```json
{
  "error": "Employee access required"
}
```

### 2. Create Proposal
Create a new proposal for the authenticated user's company.

**URL**: `POST /api/proposal`

**Request Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Website Redesign Project",
  "description": "Complete redesign of company website with modern UI/UX",
  "collab_type": "Technology Partner"
}
```

**Required Fields**:
- `title`: Proposal title
- `description`: Detailed description of the proposal

**Optional Fields**:
- `collab_type`: Type of collaboration/partnership (string)

**Response (Success - 201)**:
```json
{
  "message": "Proposal created successfully",
  "proposal": {
    "id": 1,
    "title": "Website Redesign Project",
    "description": "Complete redesign of company website with modern UI/UX",
    "collab_type": "Technology Partner",
    "status": "Submitted",
    "created_at": "2023-08-09T10:30:00Z",
    "company_id": 123
  }
}
```

**Response (Error - 400)**:
```json
{
  "error": "Title and description are required"
}
```

---

### 2. List Proposals
Get all proposals for the authenticated user's company.

**URL**: `GET /api/proposal`

**Request Headers**:
```
Authorization: Bearer <token>
```

**Response (Success - 200)**:
```json
{
  "proposals": [
    {
      "id": 1,
      "title": "Website Redesign Project",
      "description": "Complete redesign of company website with modern UI/UX",
      "collab_type": "Technology Partner",
      "status": "Submitted",
      "created_at": "2023-08-09T10:30:00Z",
      "company_id": 123
    },
    {
      "id": 2,
      "title": "Mobile App Development",
      "description": "Development of cross-platform mobile application",
      "collab_type": "",
      "status": "Submitted",
      "created_at": "2023-08-10T14:15:00Z",
      "company_id": 123
    }
  ]
}
```

---

### 3. Get Proposal
Get a specific proposal by ID.

**URL**: `GET /api/proposal/<proposal_id>`

**Request Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `proposal_id` (required): The ID of the proposal to retrieve

**Response (Success - 200)**:
```json
{
  "id": 1,
  "title": "Website Redesign Project",
  "description": "Complete redesign of company website with modern UI/UX",
  "collab_type": "Technology Partner",
  "status": "Submitted",
  "created_at": "2023-08-09T10:30:00Z",
  "company_id": 123
}
```

**Response (Error - 404)**:
```json
{
  "error": "Proposal not found"
}
```

---

### 4. Update Proposal
Update a specific proposal.

**URL**: `PUT /api/proposal/<proposal_id>`

**Request Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters**:
- `proposal_id` (required): The ID of the proposal to update

**Request Body**:
```json
{
  "title": "Updated Website Redesign",
  "description": "Complete redesign with additional e-commerce features",
  "collab_type": "Strategic Partner"
}
```

**Optional Fields**:
- `title`
- `description`
- `collab_type`
- `status`: Initial status of the proposal (defaults to 'Submitted')

**Response (Success - 200)**:
```json
{
  "message": "Proposal updated successfully",
  "proposal": {
    "id": 1,
    "title": "Updated Website Redesign",
    "description": "Complete redesign with additional e-commerce features",
    "collab_type": "Strategic Partner",
    "status": "Submitted",
    "created_at": "2023-08-09T10:30:00Z",
    "company_id": 123
  }
}
```

---

### 5. Update Proposal Status (Employee Only)
Update the status of a specific proposal. Only users with the 'employee' role can perform this action.

**URL**: `PATCH /api/proposal/<int:proposal_id>/status`

**Request Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "status": "Submitted" | "Ongoing" | "Rejected" | "Approved"
}
```

**Required Fields**:
- `status`: Must be one of 'Submitted', 'Ongoing', 'Rejected', or 'Approved'

**Response (Success - 200)**:
```json
{
  "message": "Proposal status updated successfully",
  "proposal": {
    "id": 1,
    "title": "Website Redesign Project",
    "description": "Complete redesign of company website with modern UI/UX",
    "status": "Submitted",
    "collab_type": "Technology Partner",
    "company_id": 123
  }
}
```

**Response (Error - 400)**:
```json
{
  "error": "Status is required and must be one of: 'Submitted', 'Ongoing', 'Rejected', 'Approved'"
}
```

**Response (Error - 403)**:
```json
{
  "error": "Unauthorized: Employee role required"
}
```

**Response (Error - 404)**:
```json
{
  "error": "Proposal not found"
}
```

---

### 6. Delete Proposal
Delete a specific proposal.

**URL**: `DELETE /api/proposal/<proposal_id>`

**Request Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `proposal_id` (required): The ID of the proposal to delete

**Response (Success - 200)**:
```json
{
  "message": "Proposal deleted successfully"
}
```

**Response (Error - 404)**:
```json
{
  "error": "Proposal not found"
}
```

### Response Fields
- `id`: Unique identifier for the proposal
- `title`: Proposal title
- `description`: Detailed description of the proposal
- `collab_type`: Type of collaboration/partnership (string)
- `status`: Status of the proposal (string)
- `created_at`: Timestamp when the proposal was created
- `company_id`: Foreign key referencing the company associated with the proposal