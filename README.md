
# **BookSphere**  - Library Management System Frontend

This is the frontend application for the Library Management System built using Angular. The application provides user interfaces for customers, admins, and guests, with dedicated dashboards and functionalities for each user role. The frontend uses responsive designs, animations, and a structured component-based approach.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Services](#services)
- [Navigation and Routing](#navigation-and-routing)
- [Authentication](#authentication)
- [Forms and Validations](#forms-and-validations)
- [Animations](#animations)
- [Styling](#styling)

## Features

- **Role-Based Access**: Admin, Customer, and Guest roles, each with access to specific parts of the app.
- **Authentication**: Login and Registration functionality with validation and error handling.
- **Dynamic Dashboards**: Separate dashboards for Admin and Customer, each displaying relevant data.
- **CRUD Operations**: Admin can manage books, customers, and orders with the ability to add, update, or delete entries.
- **Cart**: Customers can add books to the cart and reserve unavailable books.
- **Forms and Validations**: Proper validation for forms, including custom validations like phone number format.
- **Responsive Design**: Adapts to various screen sizes with Bootstrap styling.
- **Animations**: Smooth animations using AOS (Animate On Scroll) for a better user experience.

## Project Structure

```plaintext
src/
├── app/
│   ├── auth/                     # Authentication logic and components
│   ├── common/                   # Common components (e.g., Navbar for different roles)
│   ├── pages/                    # Main app pages (customer, admin, etc.)
│   │   ├── admin/
│   │   │   ├── dashboard/        # Admin Dashboard
│   │   │   ├── book-management/  # Admin Book Management
│   │   │   ├── customer-management/ # Admin Customer Management
│   │   │   └── order-management/ # Admin Order Management
│   │   └── customer/
│   │       ├── dashboard/        # Customer Dashboard
│   │       └── cart/             # Customer Cart
│   ├── services/                 # Services for interacting with backend API
│   └── app.component.html        # Main app HTML with nav inclusion
└── assets/                       # Static assets (e.g., images, CSS)
```

## Technologies Used

- **Angular**: Core framework for the frontend.
- **Bootstrap**: For responsive layout and components.
- **AOS**: Animation library for smooth scroll animations.
- **RxJS**: Used for managing asynchronous data.
- **TypeScript**: Main language for development.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/library-management-frontend.git
   cd library-management-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment**

   Update the API base URL in services if needed.

## Usage

1. **Start the Development Server**

   ```bash
   ng serve
   ```

2. Open the application in your browser at `http://localhost:4200`.

## Components

- **Admin Components**:
  - **Dashboard**: Overview of orders, customers, and books.
  - **Book Management**: Manage the list of books with options to add, update, and delete.
  - **Customer Management**: Manage customer information and permissions.
  - **Order Management**: View and manage customer orders, including updating status.

- **Customer Components**:
  - **Dashboard**: Personal dashboard with reserved books and notifications.
  - **Cart**: Displays books added to the cart, with options to check out.

- **Common Components**:
  - **Navbar**: Different versions for guests, customers, and admins.
  - **Login and Registration**: Authentication component for user login and signup.

## Services

### `AuthService`

Handles authentication-related actions, including login, registration, and logout. Determines user role (Admin, Customer, or Guest) and manages local storage for session persistence.

### `BookService`

Performs CRUD operations on books for both Customer and Admin interfaces.

### `OrderService`

Handles order-related actions, including adding, updating, and deleting orders.

### `CustomerService`

Provides functions to manage customer data from the admin interface.

## Navigation and Routing

The app uses Angular routing to navigate between pages. Guards are implemented to restrict access based on user role.

- **Admin Routes**: Restricted to users with the admin role.
- **Customer Routes**: Restricted to users with the customer role.
- **Guest Routes**: Accessible to all users (e.g., home and login).

## Authentication

The authentication system uses `AuthService` to log in and register users. Upon login, the user role is stored in local storage, and the relevant navbar and routes are shown based on the role.

## Forms and Validations

- **Reactive Forms**: Used across the app for registration, login, book management, and order management.
- **Custom Validation**: For fields like phone number (e.g., must start with `0` and be 10 digits long).
- **Error Handling**: Feedback is shown to users on failed actions or invalid inputs.

## Animations

- **AOS (Animate On Scroll)**: Integrated for adding scroll animations on key components.
- **CSS Transitions**: Smooth transitions for button hovers, card animations, etc.

## Styling

- **Bootstrap**: Core styling for responsiveness and component consistency.
- **Custom CSS**: Additional custom styles for specific components and layouts.

---

This frontend project aims to provide a seamless and interactive user experience, with clear role-based access and management functionality for library operations. 
