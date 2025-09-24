# User Management Dashboard

A responsive **User Management Dashboard** built with **React**, allowing users to **view, create, update, delete, search, sort, and filter** user data efficiently. The project uses a mock API to simulate real-world CRUD operations.

---

## **Technologies Used**

- **React.js** – For building the dynamic user interface.
- **React Hooks** – `useState`, `useEffect` for state management and API handling.
- **Tailwind CSS** – For fast, responsive, and aesthetic styling.
- **React Icons** – For intuitive action buttons like edit and delete.
- **React Toastify** – For success/error notifications.
- **Mockend API** – Mock backend for CRUD operations.

---

## **Features**

1. **User Listing**

   - Fetch and display users in a table.
   - Paginated view with customizable entries per page.

2. **CRUD Operations**

   - **Create User:** Add new users via a modal form.
   - **Edit User:** Modify existing users.
   - **Delete User:** Remove users with optimistic UI updates and rollback on failure.

3. **Search, Sort, and Filter**

   - **Search:** Dynamic search across all columns.
   - **Sort:** Ascending/descending sort for all columns.
   - **Filter:** Filter users by specific column values.

4. **User Feedback**
   - Real-time notifications for all CRUD actions using **React Toastify**.

---

## **Project Structure**

```
src/
├─ components/
│ ├─ Table.jsx
│ ├─ Pagination.jsx
│ ├─ FilterBy.jsx
│ ├─ UserModal.jsx
│ └─ Navbar.jsx
├─ utils/
│ └─ sortBy.js
├─ pages/
│ └─ Home.jsx
└─ App.jsx
```

---

- **Table.jsx** – Main table with CRUD, search, sort, filter, and pagination.
- **UserModal.jsx** – Modal for creating and editing users.
- **Pagination.jsx** – Handles page navigation.
- **FilterBy.jsx** – Column-based filter dropdowns.
- **Navbar.jsx** – Navigation bar component.
- **sortBy.js** – Utility function for sorting table data.

---

## **Setup & Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/2kMaddy/User-Dashboard
   ```
2. Navigate to project folder

   ```bash
   cd user-dashboard
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Run the project:

   ```
   npm start
   ```

---

### Usage

- Click "Create User" to add a new user.

- Click the edit icon to modify a user.

- Click the delete icon to remove a user.

- Use the search bar to quickly find users.

- Use the sort arrows to order columns ascending or descending.

- Apply filters to view specific subsets of users.

- Navigate pages and change entries per page using the footer controls.

---

### Optimistic UI Updates

All create, edit, and delete operations update the UI immediately for a smooth experience. If an API request fails, changes are rolled back automatically, ensuring consistency.

---

### Challenges Faced

#### During the development of this project, I encountered several challenges:

1. Optimistic UI Updates with Rollback

- Issue: Updating the UI immediately before receiving a server response caused inconsistencies if the API request failed.

- Solution: Implemented rollback logic to restore the previous state when an API call fails.

2. Combining Search, Sort, and Filter

- Issue: Applying search, filter, and sort independently sometimes overwrote each other’s results.

- Solution: Ensured all operations work on the current table state, not the original dataset, maintaining combined effects.

3. Handling Pagination Dynamically

- Issue: Adjusting entries per page and navigating pages required recalculating indices and ensuring consistent data display.

- Solution: Used startIndex and endIndex calculations to slice the dataset accurately, updating pagination whenever entries per page changed.

4. Modal Form State Management

- Issue: Resetting form values and editing user data while managing modal open/close state caused unexpected behavior.

- Solution: Controlled modal state with isOpen and editingUser state variables, ensuring a clean form for create and edit actions.

5. Error Handling for API Requests

- Issue: API failures or network issues could leave the UI in an inconsistent state.

- Solution: Added try-catch blocks with React Toastify notifications for clear user feedback and state restoration.
