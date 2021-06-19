import { RouteComponentProps } from 'react-router-dom';

export type buildDetailsContainerProps = RouteComponentProps<{ buildId: string }>;

export type getBuildDetailsProps = (buildId: string) => { logsText: string; authorName: string; repoName: string };
