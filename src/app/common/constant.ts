export class Constant {
  //LOCAL
  public static readonly BASE_URL = 'http://localhost:8080';
  public static readonly BASE_URL_FRONTEND = 'http://localhost:4200';
  //SERVER LOCAL
  // public static readonly BASE_URL = 'http://192.168.10.133:8080';
  // public static readonly BASE_URL_FRONTEND = 'http://192.168.10.133:81';
  //SERVER
  // public static readonly BASE_URL = 'http://45.122.253.18:8081';
  // public static readonly BASE_URL_FRONTEND = 'http://45.122.253.18:83';
  // permission api
  public static readonly API_GET_ALL_PERMISSION =
    Constant.BASE_URL + '/permission/list';
  public static readonly API_INSERT_PERMISSION =
    Constant.BASE_URL + '/permission/insert';
  public static readonly API_UPDATE_PERMISSION =
    Constant.BASE_URL + '/permission/update';
  public static readonly API_DELETE_PERMISSION_BY_ID =
    Constant.BASE_URL + '/permission/delete';
  public static readonly API_FILTER_PERMISSION =
    Constant.BASE_URL + '/list-filter-cmcer';
  public static readonly API_CONTROLLER_PERMISSION =
    Constant.BASE_URL + '/permission/listController';
  public static readonly API_ACTION_PERMISSION =
    Constant.BASE_URL + '/permission/listAction';
  public static readonly API_SEARCH_PERMISSION =
    Constant.BASE_URL + '/permission/search';

  // Matrix User-Role
  public static readonly API_addUsersRole =
    Constant.BASE_URL + '/users/addUserRole';
  public static readonly API_getAllUsersRole =
    Constant.BASE_URL + '/users/getAllUserRole';
  public static readonly API_removeUsersRole =
    Constant.BASE_URL + '/users/removeUserRole';
  // menu api
  public static readonly API_GET_ALL_MENU = Constant.BASE_URL + '/menu/list';
  // public static readonly API_GET_ALL_MENU =
  //   Constant.BASE_URL + '/menu/list';
  // public static readonly API_GET_ALL_MENU =
  //   Constant.BASE_URL + '/menu/list';
  public static readonly API_GET_LIST_PARENT_NAME =
    Constant.BASE_URL + '/menu/parentname';
  public static readonly API_INSERT_MENU = Constant.BASE_URL + '/menu/insert';
  public static readonly API_UPDATE_MENU = Constant.BASE_URL + '/menu/update';
  public static readonly API_DELETE_MENU_BY_ID =
    Constant.BASE_URL + '/menu/delete';
  public static readonly API_LIST_MENU_TREE =
    Constant.BASE_URL + '/menu/listMenuTree';
  public static readonly API_LIST_MENU_USER =
    Constant.BASE_URL + '/menu/listMenuUser';
  public static readonly API_SEARCH_MENU_BY_NAME =
    Constant.BASE_URL + '/menu/search';
  //hung
  public static readonly API_SEARCH_PRODUCT_NEWS =
    Constant.BASE_URL + '/new/search';
  // //thua chua dung den
  // public static readonly API_FILTER_MENU = '/list-filter-cmcer';
  // public static readonly API_CONTROLLER_MENU = '/menu/listController';
  // public static readonly API_ACTION_MENU = '/menu/listAction';

  // slidebanner api
  public static readonly API_GET_ALL_SLIDEBARS =
    Constant.BASE_URL + '/slidebanner/list';
  public static readonly API_INSERT_SLIDEBARS =
    Constant.BASE_URL + '/slidebanner/insert';
  public static readonly API_UPDATE_SLIDEBARS =
    Constant.BASE_URL + '/slidebanner/update';
  public static readonly API_DELETE_SLIDEBARS_BY_ID =
    Constant.BASE_URL + '/slidebanner/delete';
  public static readonly API_FILTER_SLIDEBARS_BY_TITLE =
    Constant.BASE_URL + '/slidebanner/list/filter';
  public static readonly API_GET_ALL_SLIDEBARS_ACTIVE =
    Constant.BASE_URL + '/slidebanner/list/active';
  public static readonly API_UPDATE_SLIDEBARS_ACTIVE =
    Constant.BASE_URL + '/slidebanner/update/status';

  public static readonly API_SEARCH_SLIDEBANNER =
    Constant.BASE_URL + '/slidebanner/search';

  // job api
  public static readonly API_GET_ALL_JOBS = Constant.BASE_URL + '/job/list';
  public static readonly API_GET_ALL_JOBS_ACTIVE =
    Constant.BASE_URL + '/job/list/active';
  public static readonly API_SEARCH_JOB_BY_ID =
    Constant.BASE_URL + '/job/search';
  public static readonly API_INSERT_JOBS = Constant.BASE_URL + '/job/insert';
  public static readonly API_UPDATE_JOBS = Constant.BASE_URL + '/job/update';
  public static readonly API_DELETE_JOBS_BY_ID =
    Constant.BASE_URL + '/job/delete';
  public static readonly API_FILTER_JOBS_BY_NAME =
    Constant.BASE_URL + '/job/filter';

  // BEN ANH DUC
  public static readonly API_GET_ALL_TAG = Constant.BASE_URL + '/tag/list';
  public static readonly API_GET_ALL_NEWS = Constant.BASE_URL + '/news/list';
  public static readonly API_GET_NEWS_BY_ID = Constant.BASE_URL + '/news';
  public static readonly API_INSERT_NEWS = Constant.BASE_URL + '/news/insert';
  //thuy
  public static readonly API_GET_ALL_DESC = Constant.BASE_URL + '/news/listnewdesc';
  public static readonly API_UPDATE_NEWS = Constant.BASE_URL + '/news/update';
  public static readonly API_DELETE_NEWS = Constant.BASE_URL + '/news/delete';
  public static readonly API_SEARCH_NEWS = Constant.BASE_URL + '/news/search';
  public static readonly API_SEARCH_NEWS_CMS =
    Constant.BASE_URL + '/news/searchnewscms';
  public static readonly API_SORT_NEWS = Constant.BASE_URL + '/new/sort';
  public static readonly API_PIN_NEWS = Constant.BASE_URL + '/news/pin';

  public static readonly API_GET_ALL_PAGENEWS_NEWS =
    Constant.BASE_URL + '/news/pagenewsnews';
  public static readonly API_GET_ALL_PINNED_NEWS =
    Constant.BASE_URL + '/news/pinnednews';
  public static readonly API_UPDATE_NEWS_ACTIVE_STATUS =
    Constant.BASE_URL + '/news/activestatus';
  // public static readonly API_GET_NEWS_HOMEPAGE =
  //   Constant.BASE_URL + '/news/newspage';
  // public static readonly URL_COMMENTS =
  //   Constant.BASE_URL + '/comments?newsId=';
  // public static readonly URL_COMMENTS_ADD = Constant.BASE_URL + '/comment';
  // public static readonly URL_COMMENTS_UPDATE = Constant.BASE_URL + '/comments';
  // public static readonly URL_COMMENTS_DELETE = Constant.BASE_URL + '/comments';

  public static hdd = 'hidden';
  public static t1h = 'none';
  public static t2h = 'flex';
  public static t3h = 'visible';
  public static t4h = 'hidden';
  public static ss = false;

  // NAM NAM CT
  public static readonly API_CREATE_USER_REGISTRATION =
    Constant.BASE_URL + '/registration';
  public static readonly API_CREATE_USER_LOGOUT =
    Constant.BASE_URL + '/user/logout';
  public static readonly API_EDIT_PROFILE =
    Constant.BASE_URL + '/user/changeprofile';
  public static readonly API_EDIT_PROFILE_NO_IMAGE =
    Constant.BASE_URL + '/user/changeprofile/noimage';

  // DUC USER
  public static readonly API_INSERT_USERS = Constant.BASE_URL + '/users/insert';
  public static readonly API_GET_ALL_USERS = Constant.BASE_URL + '/users/list';
  public static readonly API_UPDATE_USERS = Constant.BASE_URL + '/users/update';
  public static readonly API_FORGOT_PASSWORD_USERS =
    Constant.BASE_URL + '/forgotpass';
  public static readonly API_GET_USER_BY_ID = Constant.BASE_URL + '/users/';
  public static readonly API_CHANGE_PASSWORD_USERS =
    Constant.BASE_URL + '/changepassword';
  public static readonly API_DELETE_USERS = Constant.BASE_URL + '/users/delete';
  public static readonly API_SEARCH_USERS = Constant.BASE_URL + '/users/search';
  public static readonly API_SORT_USERS = Constant.BASE_URL + '/users/sort';
  public static readonly API_USERS_PROFILE =
    Constant.BASE_URL + '/profileusers';
  public static readonly API_GET_USERS_ID = Constant.BASE_URL + '/users/';
  public static readonly API_SEARCH_LIST_USER_ROLE =
    Constant.BASE_URL + '/user/search';

  public static readonly API_GET_LISTUSERCOMPLETE =
    Constant.BASE_URL + '/users/listUserComplete';
  public static readonly API_GET_LISTUSERINCOMPLETE =
    Constant.BASE_URL + '/users/listUserInComplete';

  public static readonly API_GET_LIST_EXAM_USERS_COMPLETED =
    Constant.BASE_URL + '/users/listExamUserCompleted';
  public static readonly API_GET_LIST_PRACTICE_USERS_COMPLETED =
    Constant.BASE_URL + '/users/listPracticeUserCompleted';

  // NUOC ROLE

  public static readonly API_INSERT_ROLE = Constant.BASE_URL + '/role/insert';
  public static readonly API_UPDATE_ROLE = Constant.BASE_URL + '/role/update';
  public static readonly API_DELETE_ROLE = Constant.BASE_URL + '/role/delete';
  public static readonly API_LIST_ROLE = Constant.BASE_URL + '/role/list';
  public static readonly API_SORT_ROLE = Constant.BASE_URL + '/role/sort';
  public static readonly API_SEARCh_ROLE = Constant.BASE_URL + '/role/search';
  // lam
  public static readonly API_SEARCH_ROLE_PERMISSION = Constant.BASE_URL + '/role/searchRolePermission';
  //

  // Subject
  public static readonly API_GET_ALL_SUBJECT =
    Constant.BASE_URL + '/subject/list';
  public static readonly API_GET_ALL_CHAPTER_BY_SUBJECT_ID =
    Constant.BASE_URL + '/list-chapter';
  public static readonly API_GET_ALL_CHAPTER_BY_PARENT_ID =
    Constant.BASE_URL + '/list-chapter/parent';
  public static readonly API_ADD_CHAPTER =
    Constant.BASE_URL + '/add-chapter';
  public static readonly API_UPDATE_CHAPTER_BY_SUBJECT =
    Constant.BASE_URL + '/update-chapter';
  public static readonly API_INSERT_SUBJECT =
    Constant.BASE_URL + '/subject/insert';
  public static readonly API_INSERT_DOMAIN_BY_SUBJECTID =
    Constant.BASE_URL + '/add-domain/subjectId';
  public static readonly API_UPDATE_DOMAIN_BY_SUBJECTID =
    Constant.BASE_URL + '/update-domain/subjectId';
  public static readonly API_UPDATE_SUBJECT_BY_DOMAIN =
    Constant.BASE_URL + '/update-subject';

  public static readonly API_CHECK_NAME =
    Constant.BASE_URL + '/check-name';
  public static readonly API_CHECK_NAME_CHAPTER =
    Constant.BASE_URL + '/check-chapter-name';
  public static readonly API_CHECK_NAME_SUBJECT_UPDATE =
    Constant.BASE_URL + '/check-subject-name';
  public static readonly API_CHECK_NAME_CHAPTER_UPDATE =
    Constant.BASE_URL + '/check-chapter-name';
  public static readonly API_CHECK_NAME_UPDATE =
    Constant.BASE_URL + '/check-name';
  public static readonly API_UPDATE_SUBJECT =
    Constant.BASE_URL + '/subject/update';
  public static readonly API_DELETE_SUBJECT =
    Constant.BASE_URL + '/delete-subject';
  public static readonly API_UPDATE_STATUS_SUBJECT =
    Constant.BASE_URL + '/delete-subject';
  public static readonly API_DELETE_DOMAIN_BYSUBJECT_ID =
    Constant.BASE_URL + '/delete-domain/subjectId';
  public static readonly API_UPDATE_STATUS_CHAPTER_BYSUBJECT_ID =
    Constant.BASE_URL + '/update-chapter/status';
  public static readonly API_SEARCh_SUBJECT =
    Constant.BASE_URL + '/subject/search';
  public static readonly API_SORT_SUBJECT = Constant.BASE_URL + '/subject/sort';

  // Subject MR DUC
  public static readonly API_GET_SUBJECT_BY_ID = Constant.BASE_URL + '/subject';

  public static readonly API_GET_CHAPTER_BY_PARENTID_AND_SUBJECT_ID = Constant.BASE_URL + '/get-chapter';
  public static readonly API_GET_CHAPTER_BY_ID_AND_SUBJECT_ID = Constant.BASE_URL + '/detail-chapter';
  // Chapter
  public static readonly API_GET_ALL_CHAPTER =
    Constant.BASE_URL + '/chapter/list';
  public static readonly API_GET_ALL_CHAPTER2 =
    Constant.BASE_URL + '/chapter/list2';
  public static readonly API_GET_ALL_CHAPTER_OBJECT =
    Constant.BASE_URL + '/chapter/listchapter-parent';
  public static readonly API_INSERT_CHAPTER =
    Constant.BASE_URL + '/chapter/insert';
  public static readonly API_CREATE_CHAPTER =
    Constant.BASE_URL + '/chapter/create';
  public static readonly API_CREATE_BY_CHAPTER =
    Constant.BASE_URL + '/chapter/create2';
  public static readonly API_UPDATE_CHAPTER =
    Constant.BASE_URL + '/chapter/update';
  public static readonly API_UPDATE2_CHAPTER =
    Constant.BASE_URL + '/chapter/update2';
  public static readonly API_UPDATE3_CHAPTER =
    Constant.BASE_URL + '/chapter/update3';
  public static readonly API_DELETE_CHAPTER =
    Constant.BASE_URL + '/chapter/delete';
  public static readonly API_DELETE2_CHAPTER =
    Constant.BASE_URL + '/chapter/delete2/';
  public static readonly API_SEARCh_CHAPTER =
    Constant.BASE_URL + '/chapter/search';
  public static readonly API_SORT_CHAPTER = Constant.BASE_URL + '/chapter/sort';
  public static readonly API_getLisChapterBySubject =
    Constant.BASE_URL + '/chapter/getChapterBySubject/';
  public static readonly API_getLisChapterBySubjectAndParent =
    Constant.BASE_URL + '/chapter/getChapterBySubjectAndParent/';
  public static readonly API_LIST_CHAPTER_BY_SUBJECT_AND_ORDER_ASC =
    Constant.BASE_URL + '/chapter/listChapterBySubjectAndOrder/';
  public static readonly API_GET_CHAPTER_BY_ID =
    Constant.BASE_URL + '/chapter/getChapterById/';
  public static readonly API_GETCHAPTER_BY_PARENT =
    Constant.BASE_URL + '/chapter/getParent/';

  // Domain
  public static readonly API_GET_ALL_DOMAIN =
    Constant.BASE_URL + '/domain/list';
  public static readonly API_GET_ALL_DOMAIN_BYSUBJECT_ID =
    Constant.BASE_URL + '/get-domain/subjectId';
  public static readonly API_GET_LIST_DOMAIN =
    Constant.BASE_URL + '/domains';
  public static readonly API_INSERT_DOMAIN =
    Constant.BASE_URL + '/domain/insert';
  public static readonly API_UPDATE_DOMAIN =
    Constant.BASE_URL + '/domain/update';
  public static readonly API_DELETE_DOMAIN =
    Constant.BASE_URL + '/domain/delete';
  public static readonly API_SEARCh_DOMAIN =
    Constant.BASE_URL + '/domain/search';
  public static readonly API_SORT_DOMAIN = Constant.BASE_URL + '/domain/sort';
  public static readonly API_getLisDomainBySubject =
    Constant.BASE_URL + '/domain/getDomainBySubject/';
  public static readonly API_getDomain =
    Constant.BASE_URL + '/get-domain';

  // Group
  public static readonly API_LIST_GROUP = Constant.BASE_URL + '/group/list';
  public static readonly API_LIST2_GROUP = Constant.BASE_URL + '/group/list2';
  public static readonly API_INSERT_GROUP = Constant.BASE_URL + '/group/insert';
  public static readonly API_UPDATE_GROUP = Constant.BASE_URL + '/group/update';
  public static readonly API_DELETE_GROUP_BY_ID =
    Constant.BASE_URL + '/group/delete';
  public static readonly API_SEARCH_GROUP_BY_NAME =
    Constant.BASE_URL + '/group/search';
  public static readonly API_SORT_GROUP = Constant.BASE_URL + '/group/sort';
  // Exam
  public static readonly API_LIST_EXAM = Constant.BASE_URL + '/exam/list';
  public static readonly API_GET_ALL_LIST_EXAM = Constant.BASE_URL + '/exam/listExam';
  public static readonly API_INSERT_EXAM = Constant.BASE_URL + '/exam/insert';
  public static readonly API_UPDATE_EXAM = Constant.BASE_URL + '/exam/update';
  public static readonly API_UPDATE_EXAM_DESCRIPTION = Constant.BASE_URL + '/exam/update/description';
  public static readonly API_UPDATE_FILE_EXAM =
    Constant.BASE_URL + '/exam/updateFile';
  public static readonly API_UPDATE_USER_EXAM = Constant.BASE_URL + '/exam/userExam';
  public static readonly API_IMPORT_USER_EXAM = Constant.BASE_URL + '/exam/importExamUser'
  public static readonly API_UPDATE_STATUS_EXAM =
    Constant.BASE_URL + '/exam/updateStatus';
  public static readonly API_SEARCH_EXAM = Constant.BASE_URL + '/exam/search';
  public static readonly API_ADD_EXAMQUESTION =
    Constant.BASE_URL + '/exam/addExamService';
  public static readonly API_ADD_EXAMQUESTIONRANDOM =
    Constant.BASE_URL + '/exam/addExamRandom';
  public static readonly API_GET_LIST_USER_BY_EXAM_ID =
    Constant.BASE_URL + '/exam/listUserExam';
  public static readonly API_GET_LIST_GROUP_BY_EXAM_ID =
    Constant.BASE_URL + '/exam/listGroupExam';
  public static readonly API_GET_LIST_QUESTION_EXAM_ID =
    Constant.BASE_URL + '/exam/listQuestion';
  public static readonly API_GET_EXAM_BY_ID =
    Constant.BASE_URL + '/exam/findByID';
  public static readonly API_GET_ONE_SUBJECT_BY_ID_EXAM =
    Constant.BASE_URL + '/getOneSubjectByIdExam/';
  public static readonly API_ADD_EXAM_PRACTISE =
    Constant.BASE_URL + '/exam/insertPractise';
  public static readonly API_GET_EXAMSETTING_BY_EXAM =
    Constant.BASE_URL + '/exam/getListExamSetting';
  public static readonly API_GET_EXAM_BY_CODE =
    Constant.BASE_URL + '/exam/getExamByCode';
  public static readonly API_START_EXAM =
    Constant.BASE_URL + '/examUser/start';
  public static readonly API_UPDATE_EXAM_RESULT =
    Constant.BASE_URL + '/examUser/update';
  public static readonly API_GET_LIST_EXAM_BY_SUBJECT_ID =
    Constant.BASE_URL + '/exam/getListExamBySubjectId';
  public static readonly API_GET_EXAMRESULT_BY_USER_EXAM =
    Constant.BASE_URL + '/examUser/getExamResultByUserExam';
  public static readonly API_GET_LIST_EXAMRESULT =
    Constant.BASE_URL + '/exam/getListExamResult/';
  public static readonly API_UPDATE_COMPLETE_RESULT =
    Constant.BASE_URL + '/examUser/updateComplete';
  public static readonly API_UPDATE_TIME_RESULT =
    Constant.BASE_URL + '/examUser/updateTime';
  public static readonly API_GET_FREE_TEST_RESULT =
    Constant.BASE_URL + '/examUser/getFreeTestResult';
  public static readonly GET_PRACTICE_OF_USER =
    Constant.BASE_URL + '/examUser/practiceOfUser';
  public static readonly API_GET_QUESTION_LIST =
    Constant.BASE_URL + '/question/list';
  public static readonly API_RANDOM_ONE_EXAM =
    Constant.BASE_URL + "/exam/exam"
  public static readonly API_GET_NUM_AND_SUBJECT_BY_ID =
    Constant.BASE_URL + '/exam/getNumAndSubject';
    public static readonly API_ADD_USER_GROUP = Constant.BASE_URL + '/group/addUser';
  public static readonly API_REMOVE_USER_GROUP = Constant.BASE_URL + '/group/removeUser';
  public static readonly API_LIST_USER_GROUP = Constant.BASE_URL + '/group/listUser';

  public static readonly API_INSERT_EXAM_SETTING = Constant.BASE_URL + '/exam/insertExamSetting';

  public static readonly API_ADD_EXAM_DEMO =
    Constant.BASE_URL + '/exam/updatedemo';
  public static readonly API_GET_CHAPTERS_NAME_BY_EXAM_ID =
    Constant.BASE_URL + '/exam/chaptersName';
  public static readonly API_GET_DOMAINS_NAME_BY_EXAM_ID =
    Constant.BASE_URL + '/exam/domainsName';

    public static readonly API_GET_EXAMSETTING_BY_EXAMID =
    Constant.BASE_URL + '/exam/getExamSettingByExamId';


  //  MR DUC EXAM
  public static readonly API_GET_PRACTICE_HOMEPAGE =
    Constant.BASE_URL + '/practice/pacticehomepage';
  public static readonly API_GET_LIST_PRACTICE_BY_USER =
    Constant.BASE_URL + '/practice';
  public static readonly API_GET_EXAM_BY_IDS = Constant.BASE_URL + '/exams';
  public static readonly API_GET_LIST_EXAM_USERS_ASC_BY_END_DATE =
    Constant.BASE_URL + '/exams_asc';

  public static readonly API_EXAMRESULT_BY_USER_ID_AND_EXAM_ID =
    Constant.BASE_URL + '/examUser/getListExamResultByUserIDExamID';
  public static readonly API_PRACTICERESULT_BY_USER_ID_AND_PRARICE_ID =
    Constant.BASE_URL + '/examUser/getListPracticeResultByUserIDPracticeID';
  public static readonly GET_LIST_EXAM_OF_USER =
    Constant.BASE_URL + '/users/listexamofuser';
  public static readonly GET_LIST_PRACTICE_OF_USER =
    Constant.BASE_URL + '/users/listpracticeofuser';
  // CUSTOMER
  public static readonly API_GET_ALL_CUSTOMER =
    Constant.BASE_URL + '/customer/list';
  public static readonly API_INSERT_CUSTOMER =
    Constant.BASE_URL + '/customer/insert';
  public static readonly API_DELETE_CUSTOMER =
    Constant.BASE_URL + '/customer/delete';
  public static readonly API_SEARCh_CUSTOMER =
    Constant.BASE_URL + '/customer/search';
  public static readonly API_SORT_CUSTOMER =
    Constant.BASE_URL + '/customer/sort';
  public static readonly API_UPDATE_EXAMQUESTION =
    Constant.BASE_URL + '/exam/updateExamService';

  public static readonly ADD_EXAM_CREATTYPE =
    Constant.BASE_URL + '/exam/addCreatType';

  public static readonly API_INSERT_EXAMANSWER =
    Constant.BASE_URL + '/examAnswer/insert';
  public static readonly API_UPDATE_EXAMANSWER =
    Constant.BASE_URL + '/examAnswer/update';
  public static readonly API_DELETE_EXAMANSWER =
    Constant.BASE_URL + '/examAnswer/delete';
  public static readonly API_LIST_QUESTION_EXAM_BY_RESULT_ID =
    Constant.BASE_URL + '/examAnswer/listQuestionResult';

  // QUESTION
  public static readonly API_DOWNLOADFILE =
    Constant.BASE_URL + '/question/downloadFileExcel';
  public static readonly API_DOWNLOADFILE_TXT =
    Constant.BASE_URL + '/question/downloadFileTxt';
  public static readonly API_DOWNlOAD_FILE_EXAM_USER =
    Constant.BASE_URL + '/user_exam/downloadFileExcel';
  public static readonly API_SEARCH_QUESTION =
    Constant.BASE_URL + '/question/search';

  //REGISTRANTION
  public static readonly API_LIST_REGISTRANTION =
    Constant.BASE_URL + '/list-registrantion';

  public static readonly API_GET_REGISTRANTION =
    Constant.BASE_URL + '/get-registrantion';
  public static readonly API_CHECK_REGISTRANTION =
    Constant.BASE_URL + '/check-validate/registration/user';
  public static readonly API_CHECK_STARTDATE =
    Constant.BASE_URL + '/check-validate';
  public static readonly API_CHECK_STARTDATE_VS_ENDDATE =
    Constant.BASE_URL + '/check-validate/startDate/endDate';
  public static readonly API_EDIT_REGISTRANTION_STATUS =
    Constant.BASE_URL + '/update-status';
  public static readonly API_ADD_REGISTRANTION =
    Constant.BASE_URL + '/add-registrantion';
  //CONTENTTYPE
  public static readonly API_GET_CONTENT_TYPE =
    Constant.BASE_URL + '/contenttype/list';
  //PRODUCT
  public static readonly API_LIST_PRODUCT =
    Constant.BASE_URL + '/product/all';
  public static readonly API_CREATE_PRODUCT =
    Constant.BASE_URL + '/product/create';
  public static readonly API_EDIT_PRODUCT =
    Constant.BASE_URL + '/product/edit';
  public static readonly API_DELETE_PRODUCT =
    Constant.BASE_URL + '/product/delete';
  public static readonly API_SEARCH_PRODUCT =
    Constant.BASE_URL + '/product/search';
  public static readonly API_LIST_PRODUCT_BY_TYPE =
    Constant.BASE_URL + '/product/listCourse';

  //UNIT
  public static readonly API_LIST_UNIT_BY_CHAPTER_ORDER_ASC =
    Constant.BASE_URL + '/unit/getListUnitByChapter/';
  public static readonly API_DELETE_UNIT =
    Constant.BASE_URL + '/unit/delete/';

  //Linh
  public static readonly API_GET_PRODUCT_EXAM_COMPLETED =
    Constant.BASE_URL + '/product/listexamcomplete';

  public static readonly API_GET_PRODUCT_PRACTICE_COMPLETED =
    Constant.BASE_URL + '/product/listpracticecomplete';
  public static readonly API_GET_PRACTICE_COMPLETED_BY_USER =
    Constant.BASE_URL + '/users/listPracticeCompletedByUser';
  public static readonly REST_API_GET_PRODUCT_COMING_SOON =
    Constant.BASE_URL + '/product/listProductComingSoon';
  public static readonly REST_API_GET_EXAM_RESULT_PRACTICE =
    Constant.BASE_URL + '/examUser/listExamResultPractice';
  public static readonly REST_API_GET_RESULT_PRACTICE =
    Constant.BASE_URL + '/examUser/listResultPractice/';

  public static readonly REST_API_MOVE_CHAPTER_AND_UNIT =
    Constant.BASE_URL + '/unit/moveUnitAndChapter';
  public static readonly REST_API_GET_EXAM_COMPLETED_BY_USER =
    Constant.BASE_URL + '/examresult/listexamcomplete/';
  public static readonly REST_API_GET_EXAM_COMPLETED_BY_USER_AND_SUBJECT =
    Constant.BASE_URL + '/examresult/listexamcompleteBySubject';
  public static readonly REST_API_GET_EXAM_COMING_SOON =
    Constant.BASE_URL + '/exam/getExamComingSoon/';

  //hung
  public static readonly API_GET_PRODUCT_BY_ID =
    Constant.BASE_URL + '/product';
  public static readonly API_GET_LIST_PRODUCT_BY_CONTENTTYPE =
    Constant.BASE_URL + '/product/catalog';
  public static readonly API_CREATE_UNIT =
    Constant.BASE_URL + '/unit/create';
  public static readonly API_EDIT_UNIT =
    Constant.BASE_URL + '/unit/edit';
  public static readonly API_GET_UNIT_BY_ID =
    Constant.BASE_URL + '/unit/';


  // trung
  public static readonly API_GET_ALL_CLASS =
    Constant.BASE_URL + '/class/list';


  public static readonly API_GET_CLASS_BY_ID = Constant.BASE_URL + '/class/detail';
  public static readonly API_UPDATE_CLASS = Constant.BASE_URL + '/class/update';
  public static readonly API_CREATE_CLASS = Constant.BASE_URL + '/class/create';
  // nmanh add product
  public static readonly API_SEARCH_PRODUCTCONTENT =
    Constant.BASE_URL + '/product/searchcontent';

  // nmanh add trainee assignment

  public static readonly API_GET_ALL_TRAINEEASSIGNMENT = Constant.BASE_URL + '/traineeAssignment/list';
  public static readonly API_GET_LIST_TRAINEEASSIGNMENT_BY_ClassLesson_ID =
    Constant.BASE_URL + '/traineeAssignment/getListTraineeAssimentByClassLessonId';
  public static readonly API_TRAINEEASSIGNMENT_UPDATE = Constant.BASE_URL + '/traineeAssignment/update';
  public static readonly API_TRAINEEASSIGNMENT_SEARCH = Constant.BASE_URL + '/traineeAssignment/search';
  //thuy trainee quiz
  public static readonly API_GET_ALL_CHAPTER_BY_PARENT = Constant.BASE_URL + '/chapter/listchapter';
  public static readonly API_GET_EXAM_RESULT_BY_LESSON = Constant.BASE_URL + '/chapter/lesson';
  //tiep exam
  public static readonly API_GET_LIST_QUESTION_EXAM_DETAIL =
    Constant.BASE_URL + '/exam/listQuestionExamDetail';

  public static readonly API_CHECK_TOKEN =
    Constant.BASE_URL + '/checkToken';

  //
  public static readonly API_GET_ALL_EXAM_BY_EXAM_DEMO = Constant.BASE_URL + '/examhome/exam_demo';
  public static readonly API_GET_ALL_EXAM_BY_ENTRY_TEST = Constant.BASE_URL + '/examhome/entry_test';
  public static readonly API_GET_ALL_EXAM_BY_EXAM_USER = Constant.BASE_URL + '/examhome/exam_user';
  public static readonly API_GET_ALL_EXAM_BY_EXAM_OFTEN = Constant.BASE_URL + '/examhome/exam_often';
  public static readonly API_GET_ALL_PRACTICE=Constant.BASE_URL + '/practice/list/';

  //lam
  public static readonly API_GET_USER_EXAM_BY_EXAM_ID = Constant.BASE_URL + '/exam_user';

  public static readonly API_EXAM_USER_BY_USER_ID_AND_EXAM_ID =
    Constant.BASE_URL + '/list-exam-user/';
  public static readonly API_EXAM_USER_BY_COMPLETED_AND_EXAM_ID =
    Constant.BASE_URL + '/list-exam-user/exam';
  public static readonly API_GET_COUNT_EXAM_USER_FINISH = Constant.BASE_URL + '/count-exam-user-finish';
  public static readonly API_GET_COUNT_EXAM_USER_UNFINISH = Constant.BASE_URL + '/count-exam-user-unfinish';
  public static readonly API_GET_EXAM_BY_ID_AND_USER_ID = Constant.BASE_URL + '/detail-exam/exam';
  public static readonly API_EXPORT_FILE = Constant.BASE_URL + '/dowload-file-exam-user';
  public static readonly API_GET_REST_USER = Constant.BASE_URL + '/examuser/getRestUser';
}
