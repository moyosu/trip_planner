# Expenses Tracker

## Overview
The Expenses Tracker is a microservice designed to help users manage their expenses effectively. It allows users to add, edit, and delete expenses, ensuring that they can keep track of their spending and maintain their budget.

## Features
- Add a new expense
- Edit an existing expense
- Delete an expense
- Retrieve a list of all expenses

## User Stories
1. **Add a New Expense**
   - As a user, I want to add a new expense so that I can keep track of my spending and manage my budget.
   - Acceptance Criteria:
     - Given the user provides a valid input, when the user saves the expense, then the expense is stored and updated accordingly.
     - Reliability: The stored expenses should persistently update to ensure the budget is maintained.

2. **Edit and Delete an Expense**
   - As a user, I want to be able to update and delete an expense so that I can fix any mistakes that I have entered previously.
   - Acceptance Criteria:
     - Given the user wants to update an existing expense, when the user updates the expense, then the stored expense should be updated and display the adjusted expense.
     - Given an existing expense, when the user deletes the expense, then the expense should be deleted from the stored expenses.
     - Usability: Edit and delete options should have a confirmation to prevent accidental changes.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd expenses-tracker
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_CONNECT_STRING=<your_connection_string>
   ```
5. Start the application:
   ```
   npm start
   ```

## Usage
- The application runs on `http://localhost:3000`.
- Use the following endpoints to interact with the Expenses Tracker:
  - `POST /expenses` - Add a new expense
  - `PUT /expenses/:id` - Edit an existing expense
  - `DELETE /expenses/:id` - Delete an expense
  - `GET /expenses` - Retrieve all expenses

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.