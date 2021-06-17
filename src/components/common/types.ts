export type CardProps = {
  cardPerfomance: 'leftToRight' | 'topToBottom';
  status: 'success' | 'failed' | 'waiting';
  buildNumber: string;
  commitText: string;
  commitBranch: string;
  commitShortHash: string;
  commitAuthor: string;
  date: string;
  period: string;
};
