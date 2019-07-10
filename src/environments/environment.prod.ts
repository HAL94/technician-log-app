export const environment = {
  production: true,
  AUTH_URLS: {
    signup: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/user/signup',
    login: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/user/login'
  },
  DASHBOARD_URLS: {
    getDashboard: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard'
  },
  TASKLIST_URLS: {
    getTaskList: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard/task/',
    addTask: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard/task/add',
    editTask: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard/task/edit/',
    deleteTask: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard/task/delete/',
    editSubtask: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard/subtask/edit/',
    deleteSubtask: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/dashboard/subtask/delete/'
  },
  TECHENTRY_URLS: {
    getTechentries: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/techentry',
    createTechentry: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/techentry',
    getTechentry: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/techentry/',
    updateTechentry: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/techentry/',
    deleteTechentry: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/techentry/'
  },
  USER_URLS: {
    setUser: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/user/user-profile/',
    updateUser: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/user/user-profile/',
    updateUserProfile: 'http://meantechlogger-env-1.ads5ygkmjm.us-east-2.elasticbeanstalk.com/user/user-profile/upload/'
  }
};
