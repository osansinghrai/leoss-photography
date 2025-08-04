export interface Message {
  id: number;
  name: string;
  email: string;
  purpose: string;
  message: string;
  createdAt: string;
}

export interface CreateMessageData {
  name: string;
  email: string;
  purpose: string;
  message: string;
}

// Fetch all messages
export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch('/api/routes/contact');
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
};

// Create a new message
export const createMessage = async (data: CreateMessageData): Promise<Message> => {
  const response = await fetch('/api/routes/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create message');
  }

  return response.json();
};

// Delete a message
export const deleteMessage = async (id: number): Promise<void> => {
  const response = await fetch(`/api/routes/contact/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete message');
  }
}; 