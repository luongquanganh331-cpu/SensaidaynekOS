
// Import React to ensure the React namespace is available for React.ReactNode
import React from 'react';

export type AppID = 'home' | 'settings' | 'messages' | 'ai' | 'camera' | 'browser' | 'calendar' | 'mail' | 'play';

export interface AppConfig {
  id: AppID;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export enum OSState {
  LOCKED = 'LOCKED',
  HOME = 'HOME',
  APP = 'APP'
}
