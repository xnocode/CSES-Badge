export interface CsesProfile {
  username: string;
  submissions: number;
  firstSubmission: string;
  lastSubmission: string;
  languages: CsesLanguage[];
  error?: string;
}

export interface CsesLanguage {
  name: string;
  count: number;
  share: string;
}

export type BadgeTheme =
  | 'light'
  | 'dark'
  | 'github'
  | 'ocean'
  | 'sunset'
  | 'emerald'
  | 'rose'
  | 'purple'
  | 'nord'
  | 'dracula';

export type BadgeStyle = 'flat' | 'rounded' | 'modern';

export interface BadgeOptions {
  theme?: BadgeTheme;
  style?: BadgeStyle;
  color?: string;
  label?: string;
  logo?: string;
  card?: boolean;
}
