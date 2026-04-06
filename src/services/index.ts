import {
  deleteAllRegisteredDrivers,
  deleteRegisteredDriver,
  getRegisteredDriver,
  registerNewDriver,
  updateRegisteredDriver,
} from './driver.service';
import {
  addNewTag,
  deleteAllRfidTags,
  getAllRfidTags,
  linkRfidTagToDriver,
} from './rfidtags.service';

import {
  getAdminProfile,
  updateAdminProfile,
  updatePassword,
} from './admin-profile.service';
import { loginAuth, logoutAuth } from './auth.service';

export const driverService = {
  registerNewDriver,
  deleteAllRegisteredDrivers,
  getRegisteredDriver,
  deleteRegisteredDriver,
  updateRegisteredDriver,
};

export const rfidTagService = {
  addNewTag,
  getAllRfidTags,
  linkRfidTagToDriver,
  deleteAllRfidTags,
};

export const authService = {
  loginAuth,
  logoutAuth,
};

export const adminProfileService = {
  getAdminProfile,
  updateAdminProfile,
  updatePassword,
};
