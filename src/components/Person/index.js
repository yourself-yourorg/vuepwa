import Header from '@/components/Header';

import PersonAdd from './Create';
import PersonDelete from './Delete';
import PersonList from './List';
import Person from './Retrieve';
import PersonEdit from './Update';

const personRoutes = [
  {
    path: '/person/:person_id',
    name: 'person',
    components: { default: Person, hdr: Header },
  },
  {
    path: '/person/',
    name: 'persons',
    components: { default: PersonList, hdr: Header },
  },
  {
    path: '/person/add',
    name: 'person-add',
    components: { default: PersonAdd, hdr: Header },
  },
  {
    path: '/person/:person_id/edit',
    name: 'person-edit',
    components: { default: PersonEdit, hdr: Header },
  },
  {
    path: '/person/:person_id/delete',
    name: 'person-delete',
    components: { default: PersonDelete, hdr: Header },
  },
];

export default personRoutes;
