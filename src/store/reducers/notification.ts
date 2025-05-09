// notificationSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/config/axios';
import transformNotification from '@/middlewares/transform/notification';
import INotification from '@/models/Notification';

interface NotificationState {
  totalUnread: number;
  items: INotification[];
  loading: boolean;
  error: null | string;
}

const initialState: NotificationState = {
  totalUnread: 0,
  items: [],
  loading: false,
  error: null,
};

export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (user_type: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/trainee/get_notification', { user_type });
      const notifications: INotification[] = response.data.map((el: any) =>
        transformNotification(el)
      );
      return notifications;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching notifications');
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async ({ id, read }: { id: string; read: boolean }, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/programme/mark_notification_as_read/', { id, read });
      return { id, read };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error marking notification as read');
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/programme/mark_notification_as_delete', { id });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error deleting notification');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action: PayloadAction<INotification[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.totalUnread = action.payload.filter((notification) => !notification.isRead).length;
      })
      .addCase(getNotifications.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching notifications';
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action: PayloadAction<{ id: string; read: boolean }>) => {
        const { id, read } = action.payload;
        const notification = state.items.find((notif) => notif.id === id);
        if (notification) {
          notification.isRead = read;
          state.totalUnread = state.items.filter((notif) => !notif.isRead).length;
        }
      })
      .addCase(deleteNotification.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((notif) => notif.id !== action.payload);
        state.totalUnread = state.items.filter((notif) => !notif.isRead).length;
      });
  },
});

export default notificationSlice.reducer;
