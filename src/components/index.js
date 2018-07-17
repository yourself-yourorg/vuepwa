import { accessGroups as AdminAccessGroups } from './Admin';
import { accessGroups as SalesAccessGroups } from './Sales';
import { accessGroups as TestAccessGroups } from './Tests';

export const accessGroups = Object.assign( // eslint-disable-line import/prefer-default-export
  {},
  AdminAccessGroups,
  SalesAccessGroups,
  TestAccessGroups,
);
