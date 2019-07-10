// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH_URLS: {
    signup: 'http://localhost:3000/user/signup',
    login: 'http://localhost:3000/user/login'
  },
  DASHBOARD_URLS: {
    getDashboard: 'http://localhost:3000/dashboard'
  },
  TASKLIST_URLS: {
    getTaskList: 'http://localhost:3000/dashboard/task/',
    addTask: 'http://localhost:3000/dashboard/task/add',
    editTask: 'http://localhost:3000/dashboard/task/edit/',
    deleteTask: 'http://localhost:3000/dashboard/task/delete/',
    editSubtask: 'http://localhost:3000/dashboard/subtask/edit/',
    deleteSubtask: 'http://localhost:3000/dashboard/subtask/delete/'
  },
  TECHENTRY_URLS: {
    getTechentries: 'http://localhost:3000/techentry',
    createTechentry: 'http://localhost:3000/techentry',
    getTechentry: 'http://localhost:3000/techentry/',
    updateTechentry: 'http://localhost:3000/techentry/',
    deleteTechentry: 'http://localhost:3000/techentry/'
  },
  USER_URLS: {
    setUser: 'http://localhost:3000/user/user-profile/',
    updateUser: 'http://localhost:3000/user/user-profile/',
    updateUserProfile: 'http://localhost:3000/user/user-profile/upload/'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
