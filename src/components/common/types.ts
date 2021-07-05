export type CardProps = {
  status: 'Success' | 'Failed' | 'Waiting';
  buildNumber: number;
  commitText: string;
  commitBranch: string;
  commitHash: string;
  commitAuthor: string;
  date?: string;
  period?: number;
  isStatic?: boolean;
};
