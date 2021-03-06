import { auth } from './auth'

import { API_URL } from './constants'
const USER_INFO_URL = `${API_URL}/user/info`
const USER_CHECK_URL = `${API_URL}/user/check`
const LOGIN_URL = `${API_URL}/user/login`

const USER_RESET_PASSWORD_URL = `${API_URL}/user/reset`
const USER_RESET_PASSWORD_REQUEST_URL = `${API_URL}/user/reset/request`
const USER_REGISTRATION_CHECK_DATA_URL = `${API_URL}/user/registration/check`
const USER_REGISTRATION_URL = `${API_URL}/user/registration`

const TOPIC_GET_URL = `${API_URL}/topic/get`
const TOPIC_GET_TITLE_URL = `${API_URL}/topic/get/?title=`
const TOPIC_GET_ID_URL = `${API_URL}/topic/get/?id=`
const TOPIC_ADD_URL = `${API_URL}/topic/create`

const TOPIC_RATE_URL = `${API_URL}/rating/rate`

const TOPIC_GET_RATED_URL = `${API_URL}/rating/get`

const SUBJECT_GET_URL = `${API_URL}/subject/get`
const SUBJECT_GET_EDITOR_URL = `${API_URL}/subject/get/editor`
const SUBJECT_GET_TITLE_URL = `${API_URL}/subject/get/?title=`
const SUBJECT_GET_ID_URL = `${API_URL}/subject/get/?id=`
const SUBJECT_ADD_URL = `${API_URL}/subject/create`
const SUBJECT_GET_RELATED_URL = `${API_URL}/subject/related/?id=`
const SUBJECT_GET_RELATED_COUNT_URL = `${API_URL}/subject/related/count/?id=`
const SUBJECT_GET_PARTICIPATING_URL = `${API_URL}/subject/get/participant`

const SUBJECT_TOPIC_RELATE_URL = `${API_URL}/subject/topic/relate`
const SUBJECT_TOPIC_UNRELATE_URL = `${API_URL}/subject/topic/unrelate`

const SUBJECT_JOIN_PARTICIPANT_URL = `${API_URL}/subject/join/participant`
const SUBJECT_LEAVE_PARTICIPANT_URL = `${API_URL}/subject/leave/participant`
const SUBJECT_IS_PARTICIPANT_URL = `${API_URL}/subject/join/is`

const REFERENCE_GET_URL = `${API_URL}/reference/get/`
const REFERENCE_GET_BY_TOPIC_URL = `${API_URL}/reference/get/?topic=`
const REFERENCE_GET_ID_URL = `${API_URL}/reference/get/?id=`
const REFERENCE_ADD_URL = `${API_URL}/reference/create`

const UPLOAD_PDF_URL = `${API_URL}/pdf/split`

const CREATE_EXERCISE_URL = `${API_URL}/exercise/create`
const GET_EXERCISES_BY_TOPIC_URL = `${API_URL}/exercise/get/?topic=`
const GET_EXERCISE_URL = `${API_URL}/exercise/get/?id=`
const GET_NEXT_EXERCISE_ULR = `${API_URL}/exercise/next`
const REGISTER_EXERCISE_ATTEMPT_URL = `${API_URL}/exercise/register`

export const api = {
  /**
   * Get the user from API.
   * @param {object} ctx Context.
   */
  getUser (ctx, callback, error) {
    let req = {
      body: ' '
    }

    return this.postRequest(ctx, USER_INFO_URL, req, callback, error)
  },

  /**
   * Get the user from API.
   * @param {object} ctx Context.
   */
  checkUser (ctx, callback, error) {
    let req = {
      body: {
        username: auth.getUsername(),
        token: auth.getToken()
      }
    }

    return this.postRequest(ctx, USER_CHECK_URL, req, callback, error)
  },

  /**
   * Get all subjects from API.
   * @param {object} ctx Context.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getSubjects (ctx, callback, error) {
    return this.getRequest(ctx, SUBJECT_GET_URL, callback, error)
  },

  /**
   * Get all subjects the user is editor in from API.
   * @param {object} ctx Context.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getSubjectsEditor (ctx, callback, error) {
    return this.postRequest(ctx, SUBJECT_GET_EDITOR_URL, {}, callback, error)
  },

  /**
   * Get all subjects from API based on a search term.
   * @param {object} ctx Context.
   * @param {string} term The search term to search for.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getSubjectsByTitle (ctx, term, callback, error) {
    return this.getRequest(ctx, SUBJECT_GET_TITLE_URL + term, callback, error)
  },

  /**
   * Get all subjects from API based on a search term.
   * @param {object} ctx Context.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getParticipatingSubjects (ctx, callback, error) {
    return this.postRequest(ctx, SUBJECT_GET_PARTICIPATING_URL, {}, callback, error)
  },

  /**
   * Get topics related to a subject from the API.
   * @param {object} ctx Context.
   * @param {integer} id The subject id.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getRelatedTopics (ctx, id, callback, error) {
    return this.getRequest(ctx, SUBJECT_GET_RELATED_URL + id, callback, error)
  },

  /**
   * Get topics count related to a subject from the API.
   * @param {object} ctx Context.
   * @param {integer} id The subject id.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getRelatedTopicsCount (ctx, id, callback, error) {
    return this.getRequest(ctx, SUBJECT_GET_RELATED_COUNT_URL + id, callback, error)
  },

  /**
   * Get the subject with the given id from API.
   * @param {object} ctx Context.
   * @param {integer} id The subject id.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getSubjectById (ctx, id, callback, error) {
    return this.getRequest(ctx, SUBJECT_GET_ID_URL + id, callback, error)
  },

  /**
   * Get all references from API.
   * @param {object} ctx Context.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getReferences (ctx, callback, error) {
    return this.getRequest(ctx, REFERENCE_GET_URL, callback, error)
  },

  /**
   * Get all references from API.
   * @param {object} ctx Context.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getReferencesByTopic (ctx, topicID, callback, error) {
    return this.getRequest(ctx, REFERENCE_GET_BY_TOPIC_URL + topicID, callback, error)
  },

  /**
   * Get the reference with the given id from API.
   * @param {object} ctx Context.
   * @param {integer} id The topic id.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getReferenceById (ctx, id, callback, error) {
    return this.getRequest(ctx, REFERENCE_GET_ID_URL + id, callback, error)
  },

  /**
   * Get all topics from API.
   * @param {object} ctx Context.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getTopics (ctx, callback, error) {
    return this.getRequest(ctx, TOPIC_GET_URL, callback, error)
  },

  /**
   * Get all topics from API based on a search term.
   * @param {object} ctx Context.
   * @param {string} term The search term to search for.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getTopicsByTitle (ctx, term, callback, error) {
    return this.getRequest(ctx, TOPIC_GET_TITLE_URL + term, callback, error)
  },

  /**
   * Get the topic with the given id from API.
   * @param {object} ctx Context.
   * @param {integer} id The topic id.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getTopicById (ctx, id, callback, error) {
    return this.getRequest(ctx, TOPIC_GET_ID_URL + id, callback, error)
  },

  /**
   * Post a user to the API.
   * @param {object} ctx Context.
   * @param {object} data The data to post in request.
   * @returns {Promise} A promise from the request.
   */
  postUserLogin (ctx, data, callback, error) {
    let req = {
      body: data
    }

    return this.postRequest(ctx, LOGIN_URL, req, callback, error)
  },

  /**
   * Add subject.
   * @param {object} ctx Context.
   * @param {object} subject The subject to post in request.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  addSubject (ctx, subject, callback, error) {
    let data = {
      title: subject.title,
      institution: subject.institution,
      subjectCode: subject.subjectCode,
      description: subject.description,
      username: auth.getUsername()
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, SUBJECT_ADD_URL, req, callback, error)
  },

  /**
   * Add topic.
   * @param {object} ctx Context.
   * @param {object} topic The topic to post in request.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  addTopic (ctx, topic, callback, error) {
    let data = {
      title: topic.title,
      description: topic.description,
      username: auth.getUsername()
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, TOPIC_ADD_URL, req, callback, error)
  },

  /**
   * Add reference.
   * @param {object} ctx Context.
   * @param {object} reference The reference to post in request.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  addReference (ctx, reference, callback, error) {
    let data = {
      title: reference.title,
      description: reference.description,
      link: reference.link,
      type: reference.type,
      tags: reference.tags
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, REFERENCE_ADD_URL, req, callback, error)
  },

  /**
   * Rate a topic
   * @param {object} ctx Context.
   * @param {number} id The topic id to rate.
   * @param {string} rating The rating to give the topic.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  rateTopic (ctx, id, rating, callback, error) {
    let data = {
      topicID: id,
      rating: rating
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, TOPIC_RATE_URL, req, callback, error)
  },

  /**
   * Get all topics rated by the user
   * @param {object} ctx Context.
   * @param {function} callback Hande the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getRatedTopics (ctx, callback, error) {
    let req = {
      body: ' '
    }

    return this.postRequest(ctx, TOPIC_GET_RATED_URL, req, callback, error)
  },

  /**
   * Relate subject and topic
   * @param {object} ctx Context.
   * @param {object} topic The topic to relate
   * @param {object} subject The subject to relate
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  relateSubjectTopic (ctx, topic, subject, callback, error) {
    let data = {
      subjectID: subject.id,
      topicID: topic.id
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, SUBJECT_TOPIC_RELATE_URL, req, callback, error)
  },

  /**
   * Un-relate subject and topic
   * @param {object} ctx Context.
   * @param {object} topic The topic to relate
   * @param {object} subject The subject to relate
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  unrelateSubjectTopic (ctx, topic, subject, callback, error) {
    let data = {
      subjectID: subject.id,
      topicID: topic.id
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, SUBJECT_TOPIC_UNRELATE_URL, req, callback, error)
  },

  /**
   * Join subject as participant
   * @param {object} ctx Context.
   * @param {object} subjectID The id of the subject to join
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  joinSubjectParticipant (ctx, subjectID, callback, error) {
    let data = {
      subjectID: subjectID
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, SUBJECT_JOIN_PARTICIPANT_URL, req, callback, error)
  },

  /**
   * Leave subject as participant
   * @param {object} ctx Context.
   * @param {object} subjectID The id of the subject to leave
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  leaveSubjectParticipant (ctx, subjectID, callback, error) {
    let data = {
      subjectID: subjectID
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, SUBJECT_LEAVE_PARTICIPANT_URL, req, callback, error)
  },

  /**
   * Check if is participant in subject
   * @param {object} ctx Context.
   * @param {object} subjectID The id of the subject to check
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  isParticipantSubject (ctx, subjectID, callback, error) {
    let data = {
      subjectID: subjectID
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, SUBJECT_IS_PARTICIPANT_URL, req, callback, error)
  },

  /**
   * Upload a pdf, has to handle it's request content a bit different. This is because in PDFs all characters are important
   * and translating the content to a json string would replace the byte values, with others due to the character encoding
   * @param {object} ctx Context.
   * @param {object} file ArrayBuffer of a file
   * @param {function} callback Handler the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request
   */
  uploadPDF (ctx, file, callback, error) {
    let req = {
      body: file
    }

    req.headers = Object.assign({}, req.headers || {}, {
      'Authorization': auth.getAuthHeader()['Authorization'],
      'X-Username': auth.getUsername()
    })

    req.method = 'POST'
    let h = req.headers
    req.headers = new Headers(h)

    return fetch(new Request(UPLOAD_PDF_URL, req))
    .then(res => res.json())
    .then(callback)
    .catch(error)
  },

  /**
   * Create exercise
   * @param {object} ctx Context.
   * @param {string} content Exercise content, that is the HTML
   * @param {string} title Exercise title
   * @param {array} tags Array of topic ids for the exercise
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  createExercise (ctx, content, title, tags, callback, error) {
    let data = {
      title: title,
      text: content,
      difficulty: 'Unknown',
      topicIDs: tags
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, CREATE_EXERCISE_URL, req, callback, error)
  },

  /**
   * Create exercise
   * @param {object} ctx Context.
   * @param {string} content Exercise content, that is the HTML
   * @param {string} title Exercise title
   * @param {array} tags Array of topic ids for the exercise
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
  */
  createExerciseWithSolution (ctx, content, solution, title, tags, callback, error) {
    let data = {
      title: title,
      text: content,
      difficulty: 'Unknown',
      topicIDs: tags,
      solution: solution
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, CREATE_EXERCISE_URL, req, callback, error)
  },

  /*
   * Get exercise by ID
   * @param {object} ctx Context.
   * @param {int} id Exercise ID
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
  */
  getExercise (ctx, id, callback, error) {
    return this.getRequest(ctx, GET_EXERCISE_URL + id, callback, error)
  },

  /**
   * Get exercises by topic ID
   * @param {object} ctx Context.
   * @param {int} topicID topic ID
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
  */
  getExercisesByTopic (ctx, topicID, callback, error) {
    return this.getRequest(ctx, GET_EXERCISES_BY_TOPIC_URL + topicID, callback, error)
  },

  /**
   * Get next exercise for a topic
   * @param {object} ctx Context.
   * @param {int} topicID The id for the topic
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  getNextExercise (ctx, topicID, callback, error) {
    let data = {
      topicID: topicID
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, GET_NEXT_EXERCISE_ULR, req, callback, error)
  },

  /**
   * Register exercise attempt
   * @param {object} ctx Context.
   * @param {int} id The ID for the exercise
   * @param {string} difficulty The difficulty of the exercise, Easy, Medium or Hard
   * @param {boolean} success Was the exercise solved successfully
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  registerExerciseAttempt (ctx, id, difficulty, success, callback, error) {
    let data = {
      exerciseID: id,
      difficulty: difficulty,
      success: success
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, REGISTER_EXERCISE_ATTEMPT_URL, req, callback, error)
  },

  /**
   * Reset password
   * @param {object} ctx Context.
   * @param {string} email The email of the user
   * @param {string} newPassword The new password
   * @param {string} resetToken The reset token for the user
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  resetPassword (ctx, email, newPassword, resetToken, callback, error) {
    let data = {
      email: email,
      password: newPassword,
      resetToken: resetToken
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, USER_RESET_PASSWORD_URL, req, callback, error)
  },

  /**
   * Request password reset
   * @param {object} ctx Context.
   * @param {string} email The email of the user
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  requestPasswordReset (ctx, email, callback, error) {
    let data = {
      email: email
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, USER_RESET_PASSWORD_REQUEST_URL, req, callback, error)
  },

  /**
   * Check if the registration data is possible to use for registration
   * @param {object} ctx Context.
   * @param {string} username The username to check
   * @param {string} email The email to check
   * @param {string} password The password to check
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  checkRegistrationData (ctx, username, email, password, callback, error) {
    let data = {
      username: username,
      email: email,
      password: password
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, USER_REGISTRATION_CHECK_DATA_URL, req, callback, error)
  },

  /**
   * Register the user
   * @param {object} ctx Context.
   * @param {string} username The username to use
   * @param {string} email The email to use
   * @param {string} password The password to use
   * @param {string} userType The type of account to register
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   */
  registerUser (ctx, username, email, password, userType, callback, error) {
    let data = {
      username: username,
      email: email,
      password: password,
      user_type: userType
    }

    let req = {
      body: data
    }

    return this.postRequest(ctx, USER_REGISTRATION_URL, req, callback, error)
  },

  /**
   * General function for posting requests to the API.
   * @param {string} url URL address to send to.
   * @param {object} req Data to send with the POST-request.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  postRequest (ctx, url, req, callback, error) {
    req.headers = Object.assign({}, req.headers || {}, {
      'Authorization': auth.getAuthHeader()['Authorization'],
      'X-Username': auth.getUsername()
    })

    req.method = 'POST'
    let h = req.headers
    req.method = 'POST'
    req.headers = new Headers(h)

    req.body = typeof req.body === 'string'
      ? req.body
      : JSON.stringify(req.body)

    // ctx.$http.post(url, req.body, req.headers)
    return fetch(new Request(url, req))
    .then(res => res.json())
    .then(callback)
    .catch(error)
  },

  /**
   * General function for getting requests from the API.
   * @param {string} url URL address to send to.
   * @param {function} callback Handle the request output.
   * @param {function} error Feedback error.
   * @returns {Promise} A promise from the request.
   */
  getRequest (ctx, url, callback, error) {
    return ctx.$http.get(url)
    .then(res => res.json())
    .then(callback)
    .catch(error)
  }
}
