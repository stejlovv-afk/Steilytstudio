export interface ServiceItem {
  id: string;
  title: string;
  category: 'tma' | 'web';
  badge: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  technologies: string[];
  timeline: string;
  roiStat: string;
}

export interface AdvantageItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  statNumber?: string;
  statLabel?: string;
}

export interface ProjectCase {
  id: string;
  type: 'tma' | 'web';
  name: string;
  title: string;
  subtitle: string;
  category: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  deviceType: 'mobile' | 'desktop';
  liveDemoUrl?: string;
  featuresList: string[];
}

export interface WorkflowStage {
  step: number;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
  projectType: string;
  avatarUrl: string;
  rating: number;
  highlightMetric: string;
}

export interface CalculatorState {
  projectType: 'tma' | 'web' | 'landing' | 'ecosystem';
  features: string[];
  designLevel: 'clean' | 'custom3d' | 'exclusive';
  urgency: 'standard' | 'express';
}
