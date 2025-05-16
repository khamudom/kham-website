import { Code2, Layout, Globe2, Gauge } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  icon: LucideIcon;
  name: string;
  description: string;
}

export const skills: Skill[] = [
  {
    icon: Code2,
    name: 'Enterprise Development',
    description: 'Building scalable applications with modern frameworks and best practices'
  },
  {
    icon: Layout,
    name: 'Design Systems',
    description: 'Creating and maintaining component libraries and design systems'
  },
  {
    icon: Globe2,
    name: 'Web Standards',
    description: 'Implementing web standards and accessibility guidelines'
  },
  {
    icon: Gauge,
    name: 'Performance Optimization',
    description: 'Optimizing web applications for speed and efficiency'
  }
];