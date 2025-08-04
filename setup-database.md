# Database Setup Guide

## Prerequisites
1. Make sure you have PostgreSQL installed and running
2. Create a `.env` file in the root directory with your database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

## Steps to set up the database:

1. **Install dependencies** (if not already done):
   ```bash
   bun install
   ```

2. **Generate Prisma client**:
   ```bash
   bunx prisma generate
   ```

3. **Run database migration**:
   ```bash
   bunx prisma migrate dev --name add_message_model
   ```

4. **Verify the migration**:
   ```bash
   bunx prisma studio
   ```

5. **Start the development server**:
   ```bash
   bun run dev
   ```

## Features Implemented:

### Frontend (Contact Form):
- ✅ Form with Name, Email, Purpose, and Message fields
- ✅ Form validation and error handling
- ✅ Loading states during submission
- ✅ Success/error notifications using react-hot-toast
- ✅ Form resets after successful submission

### Backend (Next.js API Routes):
- ✅ POST /api/messages - Save form data to database
- ✅ GET /api/messages - Fetch all messages
- ✅ DELETE /api/messages/:id - Delete message by ID
- ✅ Input validation and error handling
- ✅ Email format validation

### Admin Panel:
- ✅ Inquiries page with card layout (matching portfolio/experience design)
- ✅ Display all submitted messages in responsive grid
- ✅ Delete functionality with optimistic updates
- ✅ Simple loading state matching other admin pages
- ✅ Consistent styling with green theme (#569f5b)
- ✅ Date formatting for better readability

### Database:
- ✅ Message model with all required fields
- ✅ PostgreSQL integration with Prisma ORM
- ✅ Proper data types and constraints

## Usage:

1. **Contact Form**: Visit `/contact` to submit messages
2. **Admin Panel**: Visit `/admin` to access the admin dashboard
3. **Inquiries Management**: Visit `/admin/inquiries` to view and delete contact form submissions

## API Endpoints:

- `POST /api/messages` - Create a new message
- `GET /api/messages` - Get all messages
- `DELETE /api/messages/:id` - Delete a specific message

The system is now ready to handle contact form submissions with full CRUD operations! 