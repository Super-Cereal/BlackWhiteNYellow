export type CardProps = {
  status: 'success' | 'failed' | 'waiting';
  buildNumber: string;
  commitText: string;
  commitBranch: string;
  commitShortHash: string;
  commitAuthor: string;
  date: string;
  period: string;
  isStatic?: boolean;
};
