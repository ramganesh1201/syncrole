import React from 'react';
import {
  Cpu,
  BrainCircuit,
  CircuitBoard,
  Zap,
  Cog,
  Building2,
  FlaskConical,
  Dna,
  Gauge,
  Plane,
  Sprout,
  Landmark,
  HeartPulse,
  Atom,
  Leaf,
  Globe2,
  MapPin,
  Mountain,
  Calculator,
  Pickaxe,
  Flame,
  Anchor,
  Fuel,
  Orbit,
  Factory,
  Bot,
  TrendingUp,
  Layers,
  BookOpen,
  Microscope,
  LucideIcon,
} from 'lucide-react';

export interface GatePaperMeta {
  displayCode: string;
  icon: LucideIcon;
  domainName: string;
}

const PAPER_META_MAP: Record<string, GatePaperMeta> = {
  CSE: { displayCode: 'CS', icon: Cpu, domainName: 'Computer Science & Software' },
  DA: { displayCode: 'DA', icon: BrainCircuit, domainName: 'Data Science & Artificial Intelligence' },
  ECE: { displayCode: 'EC', icon: CircuitBoard, domainName: 'Electronics & Communication' },
  EE: { displayCode: 'EE', icon: Zap, domainName: 'Electrical Power & Circuits' },
  ME: { displayCode: 'ME', icon: Cog, domainName: 'Mechanical Systems & Thermal' },
  CE: { displayCode: 'CE', icon: Building2, domainName: 'Civil & Infrastructure' },
  CH: { displayCode: 'CH', icon: FlaskConical, domainName: 'Chemical & Reaction Systems' },
  BT: { displayCode: 'BT', icon: Dna, domainName: 'Biotechnology & Genomics' },
  IN: { displayCode: 'IN', icon: Gauge, domainName: 'Instrumentation & Sensors' },
  AE: { displayCode: 'AE', icon: Plane, domainName: 'Aerospace & Propulsion' },
  AG: { displayCode: 'AG', icon: Sprout, domainName: 'Agricultural Systems' },
  AR: { displayCode: 'AR', icon: Landmark, domainName: 'Architecture & Urban Planning' },
  BM: { displayCode: 'BM', icon: HeartPulse, domainName: 'Biomedical & Medical Devices' },
  CY: { displayCode: 'CY', icon: Atom, domainName: 'Chemical Sciences' },
  ES: { displayCode: 'ES', icon: Leaf, domainName: 'Environmental Engineering' },
  EY: { displayCode: 'EY', icon: Globe2, domainName: 'Ecology & Evolutionary Biology' },
  GE: { displayCode: 'GE', icon: MapPin, domainName: 'Geomatics & Geospatial Surveying' },
  GG: { displayCode: 'GG', icon: Mountain, domainName: 'Geology & Geophysics' },
  MA: { displayCode: 'MA', icon: Calculator, domainName: 'Pure & Applied Mathematics' },
  MN: { displayCode: 'MN', icon: Pickaxe, domainName: 'Mining & Underground Excavation' },
  MT: { displayCode: 'MT', icon: Flame, domainName: 'Metallurgy & Materials Science' },
  NM: { displayCode: 'NM', icon: Anchor, domainName: 'Naval Architecture & Marine Engineering' },
  PE: { displayCode: 'PE', icon: Fuel, domainName: 'Petroleum & Reservoir Systems' },
  PH: { displayCode: 'PH', icon: Orbit, domainName: 'Physical Sciences' },
  PI: { displayCode: 'PI', icon: Factory, domainName: 'Production & Industrial Engineering' },
  RA: { displayCode: 'RA', icon: Bot, domainName: 'Robotics & Mechatronics' },
  ST: { displayCode: 'ST', icon: TrendingUp, domainName: 'Statistical Sciences' },
  XE: { displayCode: 'XE', icon: Layers, domainName: 'Engineering Interdisciplinary Sciences' },
  XH: { displayCode: 'XH', icon: BookOpen, domainName: 'Humanities & Social Sciences' },
  XL: { displayCode: 'XL', icon: Microscope, domainName: 'Life Sciences & Biochemistry' },
};

export function getGatePaperMeta(paperCode: string): GatePaperMeta {
  return (
    PAPER_META_MAP[paperCode] || {
      displayCode: paperCode,
      icon: Layers,
      domainName: 'Engineering & Sciences',
    }
  );
}
