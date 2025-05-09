// src/store/reducers/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authentication";
import tutorialsReducer from "./tutorials";
import eventsReducer from "./event";
import queryReducer from "./queries"
import livestreamSettings from "./livestreamSettings";
import languageReducer from "./language";
import settingsReducer from "./settings";
import chatsReducer from "./chat";
import notificationReducer from "./notification";
import tasksReducer from "./tasks";
import programsReducer from "./programs";
import badgesReducer from "./badges";
import faqsReducer from './faqsSlice'

import notepadReducer from "@/store/reducers/notepad";

const rootReducer = combineReducers({
  notification: notificationReducer,
  faqs: faqsReducer,
  auth: authReducer,
  programs:programsReducer,
  tutorials:tutorialsReducer,
  events: eventsReducer,
  queries: queryReducer,
  tasks: tasksReducer,
  live: combineReducers({ settings:livestreamSettings , chats:chatsReducer , badges: badgesReducer, notepad:notepadReducer }),
  settings: combineReducers({ app:settingsReducer, langaguge:languageReducer }),
});

export default rootReducer;
