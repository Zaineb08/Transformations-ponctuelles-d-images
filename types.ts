import React from 'react';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  COMPARISON = 'COMPARISON',
  INTERACTIVE_GAMMA = 'INTERACTIVE_GAMMA',
  INTERACTIVE_INVERSION = 'INTERACTIVE_INVERSION',
  ARITHMETIC = 'ARITHMETIC'
}

export interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  type: SlideType;
  content: React.ReactNode;
  bulletPoints?: string[];
}

export interface NavItem {
  id: string;
  label: string;
}