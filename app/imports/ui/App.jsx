import React from 'react';
import { AuthProvider } from '../lib';
import ASR from './ASR';

export const App = () => (
  <AuthProvider>
    <ASR />
  </AuthProvider>
);
