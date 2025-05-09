export const siteKeyConfig = Object.freeze({
  ROLE_MAPPING: 'role_mapping',
  PROFILE_PHOTO: 'profilePhoto',
  DEFAULT_DASHBOARD: 'default_dashboard',
  // Trainer
  TRAINER_ACCESS_TOKEN_KEY: 'access_token',
  // Trainee
  TRAINEE_ID: 'trainee_id',
  TRAINEE_EMAIL: 'trainee_email',
  PARTICIPANT_ID: 'participant_id',
  TRAINEE_USER_NAME: 'trainee_name',
  TRAINEE_ACCESS_TOKEN_KEY: 'accessToken',
  MAX_DATE_YEAR_DIFFERENCE: 1,
  SESSION_PRE_ACTIVITY_TYPE: 'before',
  SESSION_POST_ACTIVITY_TYPE: 'after',
  EVALUATION_RATING: 'Rating',
  EVALUATION_GRADING: 'Grading',
  EVALUATION_SCORING: 'Scoring',
  EVALUATION_STAR: 'Stars',
  MAX_SESSION_DURATION: 360, // This is in minutes
  MAX_ALLOW_GROUPS_COUNT: 100, // This is a GROUPS_COUNT
  MIN_PARTICIPANTS_IN_FORM_GROUP: 2,
  MAX_DAYS_FOR_POST_SEGMENT_DROPDOWN: 30,
  SESSION_MAP_ID: 'session_mapping_id',
  MINIMUM_THRESHOLD_COUNT_FOR_VOLUNTEER: 4,
  MINIMUM_THRESHOLD_COUNT_FOR_GL: 2,
  TRAINER_FULL_NAME: "fullName",
  TIME_THRESHOLD: 5,
  MAX_DESCRIPTION_WORD_COUNT: 201,
  LANGUAGE_COMING_SOON: true
});

export const taskTypeOptions = Object.freeze({
  ALL_TASKS: 'ALL_TASKS',
  PENDING_TASKS: 'PENDING_TASKS',
});

export const sortingOrder = Object.freeze({
  ASC: 'ASCENDING',
  DESC: 'DESCENDING'
})


export type chatMessage = {
      type: string,
      session_map_id: number,
      room_id: number,
      message_by_id: number,
      message_by: string,
      message_to_id: number,
      message_to: string;
      user_message_data: string,
}

export const chatMessageParty = Object.freeze({
  PARTICIPANT: 'Participant',
  TRAINER: 'Trainer',
})
