export interface CsesProfile {
  username: string;
  solved: number;
  total: number;
  submissions?: number;
  userTitle?: string;
  sections?: CsesSection[];
  error?: string;
}

export interface CsesSection {
  name: string;
  solved: number;
  total: number;
}

export type BadgeTheme = 'light' | 'dark' | 'github';
export type BadgeStyle = 'flat' | 'rounded' | 'modern';

export interface BadgeOptions {
  theme?: BadgeTheme;
  style?: BadgeStyle;
  color?: string;
  label?: string;
  showTotal?: boolean;
  showPercent?: boolean;
  logo?: string; // name or base64 or boolean
  card?: boolean; // to toggle the full stats card view
}
