import { USER_ROLES } from '../utils/constants';

export function getDashboardPathForRole(role) {
  switch (role) {
    case USER_ROLES.CLIENT:
      return '/client/dashboard';
    case USER_ROLES.FREELANCER:
      return '/freelancer/dashboard';
    case USER_ROLES.ADMIN:
      return '/admin/dashboard';
    default:
      return '/';
  }
}