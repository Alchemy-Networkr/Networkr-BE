module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/portfolioProjects.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/app.js":
/*!********************!*\
  !*** ./lib/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");

const app = express();

const {
  authMiddleware
} = __webpack_require__(/*! @alchemycodelab/auth-middleware */ "@alchemycodelab/auth-middleware");

app.use(express.json());
app.use(__webpack_require__(/*! cookie-parser */ "cookie-parser")());
app.get('/', authMiddleware, (req, res) => res.send(req.user, console.log(req.user))); // app.listen(7890)

app.use('/api/v1/portfolioProjects', __webpack_require__(/*! ./controllers/portfolio-route */ "./lib/controllers/portfolio-route.js"));
app.use('/api/v1/portfolioComments', __webpack_require__(/*! ./controllers/portfolio-comment-route */ "./lib/controllers/portfolio-comment-route.js"));
app.use('/api/v1/curriculumComments', __webpack_require__(/*! ./controllers/curriculum-comment-route */ "./lib/controllers/curriculum-comment-route.js"));
app.use('/api/v1/curriculum', __webpack_require__(/*! ./controllers/curriculum-route */ "./lib/controllers/curriculum-route.js"));
app.use(__webpack_require__(/*! ./middleware/not-found */ "./lib/middleware/not-found.js"));
app.use(__webpack_require__(/*! ./middleware/error */ "./lib/middleware/error.js"));
module.exports = app;

/***/ }),

/***/ "./lib/controllers/curriculum-comment-route.js":
/*!*****************************************************!*\
  !*** ./lib/controllers/curriculum-comment-route.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const CurriculumComment = __webpack_require__(/*! ../models/curriculum-comment */ "./lib/models/curriculum-comment.js");

const {
  Router
} = __webpack_require__(/*! express */ "express");

const {
  authMiddleware
} = __webpack_require__(/*! @alchemycodelab/auth-middleware */ "@alchemycodelab/auth-middleware");

module.exports = Router().post('/', authMiddleware, (req, res, next) => {
  CurriculumComment.insert(req.body).then(comment => res.send(comment)).catch(next);
}).get('/', authMiddleware, (req, res, next) => {
  CurriculumComment.findAll().then(comments => res.send(comments)).catch(next);
}).delete('/:id', authMiddleware, (req, res, next) => {
  CurriculumComment.delete(req.params.id).then(comment => res.send(comment)).catch(next);
}).patch('/:id', authMiddleware, (req, res, next) => {
  CurriculumComment.update(req.params.id, req.body.comment).then(updatedComment => res.send(updatedComment)).catch(next);
});

/***/ }),

/***/ "./lib/controllers/curriculum-route.js":
/*!*********************************************!*\
  !*** ./lib/controllers/curriculum-route.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  Router
} = __webpack_require__(/*! express */ "express");

const CurriculumProject = __webpack_require__(/*! ../models/curriculum-model */ "./lib/models/curriculum-model.js");

const {
  authMiddleware
} = __webpack_require__(/*! @alchemycodelab/auth-middleware */ "@alchemycodelab/auth-middleware");

module.exports = Router().post('/', authMiddleware, (req, res, next) => {
  CurriculumProject.insert(req.body).then(project => res.send(project)).catch(next);
}).get('/', authMiddleware, (req, res, next) => {
  CurriculumProject.find().then(project => res.send(project)).catch(next);
}).get('/:id', authMiddleware, (req, res, next) => {
  CurriculumProject.findById(req.params.id).then(project => res.send(project)).catch(next);
}).put('/:id', authMiddleware, (req, res, next) => {
  CurriculumProject.updateById(req.body, req.params.id).then(project => res.send(project)).catch(next);
}).delete('/:id', authMiddleware, (req, res, next) => {
  CurriculumProject.deleteById(req.params.id).then(project => res.send(project)).catch(next);
});

/***/ }),

/***/ "./lib/controllers/portfolio-comment-route.js":
/*!****************************************************!*\
  !*** ./lib/controllers/portfolio-comment-route.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const PortfolioComment = __webpack_require__(/*! ../models/portfolio-comment */ "./lib/models/portfolio-comment.js");

const {
  Router
} = __webpack_require__(/*! express */ "express");

const {
  authMiddleware
} = __webpack_require__(/*! @alchemycodelab/auth-middleware */ "@alchemycodelab/auth-middleware");

module.exports = Router().post('/', authMiddleware, (req, res, next) => {
  PortfolioComment.insert(req.body).then(comment => res.send(comment)).catch(next);
}).get('/', authMiddleware, (req, res, next) => {
  PortfolioComment.findAll().then(comments => res.send(comments)).catch(next);
}).delete('/:id', authMiddleware, (req, res, next) => {
  PortfolioComment.delete(req.params.id).then(comment => res.send(comment)).catch(next);
}).patch('/:id', authMiddleware, (req, res, next) => {
  PortfolioComment.update(req.params.id, req.body.comment).then(updatedComment => res.send(updatedComment)).catch(next);
});

/***/ }),

/***/ "./lib/controllers/portfolio-route.js":
/*!********************************************!*\
  !*** ./lib/controllers/portfolio-route.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  Router
} = __webpack_require__(/*! express */ "express");

const PortfolioProject = __webpack_require__(/*! ../models/portfolio-model */ "./lib/models/portfolio-model.js");

const {
  authMiddleware
} = __webpack_require__(/*! @alchemycodelab/auth-middleware */ "@alchemycodelab/auth-middleware");

module.exports = Router().post('/', authMiddleware, (req, res, next) => {
  PortfolioProject.insert(req.body).then(project => res.send(project)).catch(next);
}).get('/:id', authMiddleware, (req, res, next) => {
  PortfolioProject.findById(Number(req.params.id)).then(project => res.send(project)).catch(next);
}).get('/', authMiddleware, (req, res, next) => {
  PortfolioProject.find().then(project => res.send(project)).catch(next);
}).delete('/:id', authMiddleware, (req, res, next) => {
  PortfolioProject.delete(req.params.id).then(project => res.send(project)).catch(next);
}).patch('/:id', authMiddleware, (req, res, next) => {
  PortfolioProject.update(req.params.id, req.body).then(project => res.send(project)).catch(next);
});

/***/ }),

/***/ "./lib/middleware/error.js":
/*!*********************************!*\
  !*** ./lib/middleware/error.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  res.status(status);
  console.log(err);
  res.send({
    status,
    message: err.message
  });
};

/***/ }),

/***/ "./lib/middleware/not-found.js":
/*!*************************************!*\
  !*** ./lib/middleware/not-found.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

/***/ }),

/***/ "./lib/models/curriculum-comment.js":
/*!******************************************!*\
  !*** ./lib/models/curriculum-comment.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pool = __webpack_require__(/*! ../utils/pool */ "./lib/utils/pool.js");

module.exports = (_temp = class CurriculumComment {
  constructor(comment) {
    _defineProperty(this, "id", void 0);

    _defineProperty(this, "ownerEmail", void 0);

    _defineProperty(this, "comment", void 0);

    _defineProperty(this, "curriculumId", void 0);

    this.id = comment.id;
    this.ownerEmail = comment.owner_email;
    this.comment = comment.comment;
    this.curriculumId = comment.curriculum_id;
  }

  static async insert(comment) {
    const {
      rows
    } = await pool.query('INSERT INTO curriculum_comments (owner_email, comment, curriculum_id) VALUES ($1, $2, $3) RETURNING *', [comment.ownerEmail, comment.comment, comment.curriculumId]);
    return new CurriculumComment(rows[0]);
  }

  static async findAll() {
    const {
      rows
    } = await pool.query('SELECT * FROM curriculum_comments');
    return rows.map(comment => new CurriculumComment(comment));
  }

  static async delete(id) {
    const {
      rows
    } = await pool.query('DELETE FROM curriculum_comments WHERE id=$1 RETURNING *', [id]);
    if (!rows[0]) return null;else return new CurriculumComment(rows[0]);
  }

  static async update(id, comment) {
    const {
      rows
    } = await pool.query(`
    UPDATE curriculum_comments
      SET comment=$1
      WHERE id=$2
      RETURNING *
    `, [comment, id]);
    return new CurriculumComment(rows[0]);
  }

}, _temp);

/***/ }),

/***/ "./lib/models/curriculum-model.js":
/*!****************************************!*\
  !*** ./lib/models/curriculum-model.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pool = __webpack_require__(/*! ../utils/pool */ "./lib/utils/pool.js");

const CurriculumComment = __webpack_require__(/*! ./curriculum-comment */ "./lib/models/curriculum-comment.js");

module.exports = (_temp = class CurriculumProject {
  constructor(row) {
    _defineProperty(this, "curriculum_id", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "github_link", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "group", void 0);

    _defineProperty(this, "cohort", void 0);

    _defineProperty(this, "tags", void 0);

    _defineProperty(this, "deployed_back_end", void 0);

    _defineProperty(this, "deployed_front_end", void 0);

    this.curriculumId = row.curriculum_id, this.title = row.title, this.githubLink = row.github_link, this.description = row.description, this.group = row.group, this.cohort = row.cohort, this.tags = row.tags, this.deployedBackEnd = row.deployed_back_end, this.deployedFrontEnd = row.deployed_front_end;
  } // Create


  static async insert(project) {
    const {
      rows
    } = await pool.query(`
    INSERT INTO curriculum_projects (title, github_link, "description", "group", cohort, tags, deployed_back_end, deployed_front_end) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `, [project.title, project.githubLink, project.description, project.group, project.cohort, project.tags, project.deployedBackEnd, project.deployedFrontEnd]);
    return new CurriculumProject(rows[0]);
  } // Read - find()


  static async find() {
    const {
      rows
    } = await pool.query(`
    SELECT * FROM curriculum_projects`);
    return rows.map(row => new CurriculumProject(row));
  } // Read - findById()


  static async findById(id) {
    const {
      rows
    } = await pool.query(`SELECT curriculum_projects.*, array_to_json(array_agg(curriculum_comments.comment)) AS comments FROM curriculum_projects
        JOIN curriculum_comments
        ON curriculum_comments.curriculum_id=curriculum_projects.curriculum_id
        WHERE curriculum_projects.curriculum_id=$1
        GROUP BY curriculum_projects.curriculum_id`, [id]);

    if (rows[0]) {
      const initialReturn = new CurriculumProject(rows[0]);
      const comments = rows[0].comments.map(comment => new CurriculumComment(comment));
      return _objectSpread(_objectSpread({}, initialReturn), {}, {
        comments
      });
    } else {
      const {
        rows
      } = await pool.query('SELECT * FROM curriculum_projects WHERE curriculum_projects.curriculum_id=$1', [id]);
      return new CurriculumProject(rows[0]);
    }
  } // Update - updateById()


  static async updateById(project, curriculumId) {
    const {
      rows
    } = await pool.query(`
    UPDATE curriculum_projects
    SET title=$1, github_link=$2, "description"=$3, "group"=$4, cohort=$5, tags=$6, deployed_back_end=$7, deployed_front_end=$8
    WHERE curriculum_id=$9
    RETURNING *
    `, [project.title, project.githubLink, project.description, project.group, project.cohort, project.tags, project.deployedBackEnd, project.deployedFrontEnd, curriculumId]);
    if (!rows[0]) return null;else return new CurriculumProject(rows[0]);
  } // Delete - deleteById()


  static async deleteById(curriculumId) {
    const {
      rows
    } = await pool.query(`
    DELETE FROM curriculum_projects
    WHERE curriculum_id=$1
    RETURNING *`, [curriculumId]);
    if (!rows[0]) return null;else return new CurriculumProject(rows[0]);
  }

}, _temp);

/***/ }),

/***/ "./lib/models/portfolio-comment.js":
/*!*****************************************!*\
  !*** ./lib/models/portfolio-comment.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pool = __webpack_require__(/*! ../utils/pool */ "./lib/utils/pool.js");

module.exports = (_temp = class PortfolioComment {
  constructor(comment) {
    _defineProperty(this, "id", void 0);

    _defineProperty(this, "ownerEmail", void 0);

    _defineProperty(this, "comment", void 0);

    _defineProperty(this, "portfolioId", void 0);

    this.id = comment.id;
    this.ownerEmail = comment.owner_email;
    this.comment = comment.comment;
    this.portfolioId = comment.portfolio_id;
  }

  static async insert(comment) {
    const {
      rows
    } = await pool.query('INSERT INTO portfolio_comments (owner_email, comment, portfolio_id) VALUES ($1, $2, $3) RETURNING *', [comment.ownerEmail, comment.comment, comment.portfolioId]);
    return new PortfolioComment(rows[0]);
  }

  static async findAll() {
    const {
      rows
    } = await pool.query('SELECT * FROM portfolio_comments');
    return rows.map(comment => new PortfolioComment(comment));
  }

  static async delete(id) {
    const {
      rows
    } = await pool.query('DELETE FROM portfolio_comments WHERE id=$1 RETURNING *', [id]);
    if (!rows[0]) return null;else return new PortfolioComment(rows[0]);
  }

  static async update(id, comment) {
    const {
      rows
    } = await pool.query(`
    UPDATE portfolio_comments
      SET comment=$1
      WHERE id=$2
      RETURNING *
    `, [comment, id]);
    return new PortfolioComment(rows[0]);
  }

}, _temp);

/***/ }),

/***/ "./lib/models/portfolio-model.js":
/*!***************************************!*\
  !*** ./lib/models/portfolio-model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const pool = __webpack_require__(/*! ../utils/pool */ "./lib/utils/pool.js");

const PortfolioComment = __webpack_require__(/*! ./portfolio-comment */ "./lib/models/portfolio-comment.js");

module.exports = (_temp = class PortfolioProject {
  constructor(row) {
    _defineProperty(this, "portfolioId", void 0);

    _defineProperty(this, "ownerEmail", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "primaryLanguage", void 0);

    _defineProperty(this, "date", void 0);

    _defineProperty(this, "githubLink", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "collaborators", void 0);

    _defineProperty(this, "open", void 0);

    this.portfolioId = row.portfolio_id;
    this.ownerEmail = row.owner_email;
    this.title = row.title;
    this.primaryLanguage = row.primary_language;
    this.date = row.date;
    this.githubLink = row.github_link;
    this.description = row.description;
    this.collaborators = row.collaborators;
    this.open = row.open;
  }

  static async insert(project) {
    const {
      rows
    } = await pool.query('INSERT INTO portfolio_projects (owner_email, title, primary_language, "date", github_link, "description", collaborators, "open") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [project.ownerEmail, project.title, project.primaryLanguage, project.date, project.githubLink, project.description, project.collaborators, project.open]);
    return new PortfolioProject(rows[0]);
  }

  static async findById(id) {
    const {
      rows
    } = await pool.query(`SELECT portfolio_projects.*, array_to_json(array_agg(portfolio_comments.comment)) AS comments FROM portfolio_projects
        JOIN portfolio_comments
        ON portfolio_comments.portfolio_id=portfolio_projects.portfolio_id
        WHERE portfolio_projects.portfolio_id=$1
        GROUP BY portfolio_projects.portfolio_id`, [id]);

    if (rows[0]) {
      const initialReturn = new PortfolioProject(rows[0]);
      const comments = rows[0].comments.map(comment => new PortfolioComment(comment));
      return _objectSpread(_objectSpread({}, initialReturn), {}, {
        comments
      });
    } else {
      const {
        rows
      } = await pool.query('SELECT * FROM portfolio_projects WHERE portfolio_projects.portfolio_id=$1', [id]);
      return new PortfolioProject(rows[0]);
    }
  }

  static async find() {
    const {
      rows
    } = await pool.query('SELECT * FROM portfolio_projects');
    return rows.map(row => new PortfolioProject(row));
  }

  static async delete(id) {
    const {
      rows
    } = await pool.query('DELETE FROM portfolio_projects WHERE portfolio_id=$1 RETURNING *', [id]);
    return new PortfolioProject(rows[0]);
  }

  static async update(id, updatedProject) {
    const {
      rows
    } = await pool.query(`UPDATE portfolio_projects 
          SET title=$1, 
              primary_language=$2,
              github_link=$3,
              "description"=$4,
              collaborators=$5,
              "open"=$6
          WHERE portfolio_id=$7
          RETURNING *`, [updatedProject.title, updatedProject.primaryLanguage, updatedProject.githubLink, updatedProject.description, updatedProject.collaborators, updatedProject.open, id]);
    return new PortfolioProject(rows[0]);
  }

}, _temp);

/***/ }),

/***/ "./lib/utils/pool.js":
/*!***************************!*\
  !*** ./lib/utils/pool.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  Pool
} = __webpack_require__(/*! pg */ "pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && {
    rejectUnauthorized: false
  }
}); // pool.on('connect', () => console.log('Postgres connected'));

module.exports = pool;

/***/ }),

/***/ "./pages/portfolioProjects.js":
/*!************************************!*\
  !*** ./pages/portfolioProjects.js ***!
  \************************************/
/*! exports provided: getStaticProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return getStaticProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\cuele\\alchemy\\career-track\\Networkr-BE\\pages\\portfolioProjects.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

const request = __webpack_require__(/*! supertest */ "supertest");

const app = __webpack_require__(/*! ../lib/app */ "./lib/app.js");

function PortfolioProjects({
  projects
}) {
  return __jsx("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }
  }, __jsx("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 8
    }
  }, res.body));
} // This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.


async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await request(app).get('/api/v1/portfolioProjects'); // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      res
    }
  };
}
/* harmony default export */ __webpack_exports__["default"] = (PortfolioProjects);

/***/ }),

/***/ "@alchemycodelab/auth-middleware":
/*!**************************************************!*\
  !*** external "@alchemycodelab/auth-middleware" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@alchemycodelab/auth-middleware");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "supertest":
/*!****************************!*\
  !*** external "supertest" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("supertest");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29udHJvbGxlcnMvY3VycmljdWx1bS1jb21tZW50LXJvdXRlLmpzIiwid2VicGFjazovLy8uL2xpYi9jb250cm9sbGVycy9jdXJyaWN1bHVtLXJvdXRlLmpzIiwid2VicGFjazovLy8uL2xpYi9jb250cm9sbGVycy9wb3J0Zm9saW8tY29tbWVudC1yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29udHJvbGxlcnMvcG9ydGZvbGlvLXJvdXRlLmpzIiwid2VicGFjazovLy8uL2xpYi9taWRkbGV3YXJlL2Vycm9yLmpzIiwid2VicGFjazovLy8uL2xpYi9taWRkbGV3YXJlL25vdC1mb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2N1cnJpY3VsdW0tY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL2N1cnJpY3VsdW0tbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL21vZGVscy9wb3J0Zm9saW8tY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvbW9kZWxzL3BvcnRmb2xpby1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbHMvcG9vbC5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9wb3J0Zm9saW9Qcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYWxjaGVteWNvZGVsYWIvYXV0aC1taWRkbGV3YXJlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY29va2llLXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3VwZXJ0ZXN0XCIiXSwibmFtZXMiOlsiZXhwcmVzcyIsInJlcXVpcmUiLCJhcHAiLCJhdXRoTWlkZGxld2FyZSIsInVzZSIsImpzb24iLCJnZXQiLCJyZXEiLCJyZXMiLCJzZW5kIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiQ3VycmljdWx1bUNvbW1lbnQiLCJSb3V0ZXIiLCJwb3N0IiwibmV4dCIsImluc2VydCIsImJvZHkiLCJ0aGVuIiwiY29tbWVudCIsImNhdGNoIiwiZmluZEFsbCIsImNvbW1lbnRzIiwiZGVsZXRlIiwicGFyYW1zIiwiaWQiLCJwYXRjaCIsInVwZGF0ZSIsInVwZGF0ZWRDb21tZW50IiwiQ3VycmljdWx1bVByb2plY3QiLCJwcm9qZWN0IiwiZmluZCIsImZpbmRCeUlkIiwicHV0IiwidXBkYXRlQnlJZCIsImRlbGV0ZUJ5SWQiLCJQb3J0Zm9saW9Db21tZW50IiwiUG9ydGZvbGlvUHJvamVjdCIsIk51bWJlciIsImVyciIsInN0YXR1cyIsIm1lc3NhZ2UiLCJFcnJvciIsInBvb2wiLCJjb25zdHJ1Y3RvciIsIm93bmVyRW1haWwiLCJvd25lcl9lbWFpbCIsImN1cnJpY3VsdW1JZCIsImN1cnJpY3VsdW1faWQiLCJyb3dzIiwicXVlcnkiLCJtYXAiLCJyb3ciLCJ0aXRsZSIsImdpdGh1YkxpbmsiLCJnaXRodWJfbGluayIsImRlc2NyaXB0aW9uIiwiZ3JvdXAiLCJjb2hvcnQiLCJ0YWdzIiwiZGVwbG95ZWRCYWNrRW5kIiwiZGVwbG95ZWRfYmFja19lbmQiLCJkZXBsb3llZEZyb250RW5kIiwiZGVwbG95ZWRfZnJvbnRfZW5kIiwiaW5pdGlhbFJldHVybiIsInBvcnRmb2xpb0lkIiwicG9ydGZvbGlvX2lkIiwicHJpbWFyeUxhbmd1YWdlIiwicHJpbWFyeV9sYW5ndWFnZSIsImRhdGUiLCJjb2xsYWJvcmF0b3JzIiwib3BlbiIsInVwZGF0ZWRQcm9qZWN0IiwiUG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwic3NsIiwiUEdTU0xNT0RFIiwicmVqZWN0VW5hdXRob3JpemVkIiwicmVxdWVzdCIsIlBvcnRmb2xpb1Byb2plY3RzIiwicHJvamVjdHMiLCJnZXRTdGF0aWNQcm9wcyIsInByb3BzIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUN4RkEsTUFBTUEsT0FBTyxHQUFHQyxtQkFBTyxDQUFDLHdCQUFELENBQXZCOztBQUNBLE1BQU1DLEdBQUcsR0FBR0YsT0FBTyxFQUFuQjs7QUFDQSxNQUFNO0FBQUVHO0FBQUYsSUFBcUJGLG1CQUFPLENBQUMsd0VBQUQsQ0FBbEM7O0FBRUFDLEdBQUcsQ0FBQ0UsR0FBSixDQUFRSixPQUFPLENBQUNLLElBQVIsRUFBUjtBQUNBSCxHQUFHLENBQUNFLEdBQUosQ0FBUUgsbUJBQU8sQ0FBQyxvQ0FBRCxDQUFQLEVBQVI7QUFHQUMsR0FBRyxDQUFDSSxHQUFKLENBQVEsR0FBUixFQUFhSCxjQUFiLEVBQTZCLENB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Q0MsR0FBUixDQUFZQyxZQURWO0FBRXBCQyxLQUFHLEVBQUVILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxTQUFaLElBQXlCO0FBQUVDLHNCQUFrQixFQUFFO0FBQXRCO0FBRlYsQ0FBVCxDQUFiLEMsQ0FLQTs7QUFFQXRFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmdDLElBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEEsTUFBTXNDLE9BQU8sR0FBR25GLG1CQUFPLENBQUMsNEJBQUQsQ0FBdkI7O0FBQ0EsTUFBTUMsR0FBRyxHQUFHRCxtQkFBTyxDQUFDLGdDQUFELENBQW5COztBQUVDLFNBQVNvRixpQkFBVCxDQUEyQjtBQUFFQztBQUFGLENBQTNCLEVBQXlDO0FBQ3RDLFNBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSzlFLEdBQUcsQ0FBQ1ksSUFBVCxDQURELENBREY7QUFLRCxDLENBRUQ7QUFDQTtBQUNBOzs7QUFDTyxlQUFlbUUsY0FBZixHQUFnQztBQUNyQztBQUNBO0FBQ0EsUUFBTS9FLEdBQUcsR0FBRyxNQUFNNEUsT0FBTyxDQUFDbEYsR0FBRCxDQUFQLENBQ2pCSSxHQURpQixDQUNiLDJCQURhLENBQWxCLENBSHFDLENBT3JDO0FBQ0E7O0FBQ0EsU0FBTztBQUNMa0YsU0FBSyxFQUFFO0FBQ0xoRjtBQURLO0FBREYsR0FBUDtBQUtEO0FBRWU2RSxnRkFBaEIsRTs7Ozs7Ozs7Ozs7QUM5QkYsNEQ7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoicGFnZXMvcG9ydGZvbGlvUHJvamVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL3BvcnRmb2xpb1Byb2plY3RzLmpzXCIpO1xuIiwiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5jb25zdCB7IGF1dGhNaWRkbGV3YXJlIH0gPSByZXF1aXJlKCdAYWxjaGVteWNvZGVsYWIvYXV0aC1taWRkbGV3YXJlJyk7XHJcblxyXG5hcHAudXNlKGV4cHJlc3MuanNvbigpKTtcclxuYXBwLnVzZShyZXF1aXJlKCdjb29raWUtcGFyc2VyJykoKSk7XHJcblxyXG5cclxuYXBwLmdldCgnLycsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMpID0+IHJlcy5zZW5kKHJlcS51c2VyLCBjb25zb2xlLmxvZyhyZXEudXNlcikpKTtcclxuXHJcbi8vIGFwcC5saXN0ZW4oNzg5MClcclxuXHJcblxyXG5hcHAudXNlKCcvYXBpL3YxL3BvcnRmb2xpb1Byb2plY3RzJywgcmVxdWlyZSgnLi9jb250cm9sbGVycy9wb3J0Zm9saW8tcm91dGUnKSk7XHJcbmFwcC51c2UoJy9hcGkvdjEvcG9ydGZvbGlvQ29tbWVudHMnLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3BvcnRmb2xpby1jb21tZW50LXJvdXRlJykpO1xyXG5hcHAudXNlKCcvYXBpL3YxL2N1cnJpY3VsdW1Db21tZW50cycsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvY3VycmljdWx1bS1jb21tZW50LXJvdXRlJykpO1xyXG5hcHAudXNlKCcvYXBpL3YxL2N1cnJpY3VsdW0nLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2N1cnJpY3VsdW0tcm91dGUnKSk7XHJcblxyXG5cclxuYXBwLnVzZShyZXF1aXJlKCcuL21pZGRsZXdhcmUvbm90LWZvdW5kJykpO1xyXG5hcHAudXNlKHJlcXVpcmUoJy4vbWlkZGxld2FyZS9lcnJvcicpKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFwcDtcclxuIiwiY29uc3QgQ3VycmljdWx1bUNvbW1lbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvY3VycmljdWx1bS1jb21tZW50Jyk7XHJcbmNvbnN0IHsgUm91dGVyIH0gPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmNvbnN0IHsgYXV0aE1pZGRsZXdhcmUgfSA9IHJlcXVpcmUoJ0BhbGNoZW15Y29kZWxhYi9hdXRoLW1pZGRsZXdhcmUnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUm91dGVyKClcclxuICAucG9zdCgnLycsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIEN1cnJpY3VsdW1Db21tZW50XHJcbiAgICAgIC5pbnNlcnQocmVxLmJvZHkpXHJcbiAgICAgIC50aGVuKGNvbW1lbnQgPT4gcmVzLnNlbmQoY29tbWVudCkpXHJcbiAgICAgIC5jYXRjaChuZXh0KTtcclxuICB9KVxyXG4gIFxyXG4gIC5nZXQoJy8nLCBhdXRoTWlkZGxld2FyZSwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBDdXJyaWN1bHVtQ29tbWVudFxyXG4gICAgICAuZmluZEFsbCgpXHJcbiAgICAgIC50aGVuKGNvbW1lbnRzID0+IHJlcy5zZW5kKGNvbW1lbnRzKSlcclxuICAgICAgLmNhdGNoKG5leHQpO1xyXG4gIH0pXHJcbiAgXHJcbiAgLmRlbGV0ZSgnLzppZCcsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIEN1cnJpY3VsdW1Db21tZW50XHJcbiAgICAgIC5kZWxldGUocmVxLnBhcmFtcy5pZClcclxuICAgICAgLnRoZW4oY29tbWVudCA9PiByZXMuc2VuZChjb21tZW50KSlcclxuICAgICAgLmNhdGNoKG5leHQpO1xyXG4gIH0pXHJcbiAgXHJcbiAgLnBhdGNoKCcvOmlkJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgQ3VycmljdWx1bUNvbW1lbnRcclxuICAgICAgLnVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keS5jb21tZW50KVxyXG4gICAgICAudGhlbih1cGRhdGVkQ29tbWVudCA9PiByZXMuc2VuZCh1cGRhdGVkQ29tbWVudCkpXHJcbiAgICAgIC5jYXRjaChuZXh0KTtcclxuICB9KTtcclxuIiwiY29uc3QgeyBSb3V0ZXIgfSA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3QgQ3VycmljdWx1bVByb2plY3QgPSByZXF1aXJlKCcuLi9tb2RlbHMvY3VycmljdWx1bS1tb2RlbCcpO1xyXG5jb25zdCB7IGF1dGhNaWRkbGV3YXJlIH0gPSByZXF1aXJlKCdAYWxjaGVteWNvZGVsYWIvYXV0aC1taWRkbGV3YXJlJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcigpXHJcbiAgLnBvc3QoJy8nLCBhdXRoTWlkZGxld2FyZSwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBDdXJyaWN1bHVtUHJvamVjdFxyXG4gICAgICAuaW5zZXJ0KHJlcS5ib2R5KVxyXG4gICAgICAudGhlbihwcm9qZWN0ID0+IHJlcy5zZW5kKHByb2plY3QpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSlcclxuICBcclxuICAuZ2V0KCcvJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgQ3VycmljdWx1bVByb2plY3RcclxuICAgICAgLmZpbmQoKVxyXG4gICAgICAudGhlbigocHJvamVjdCkgPT4gcmVzLnNlbmQocHJvamVjdCkpXHJcbiAgICAgIC5jYXRjaChuZXh0KTtcclxuICB9KVxyXG5cclxuICAuZ2V0KCcvOmlkJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgQ3VycmljdWx1bVByb2plY3RcclxuICAgICAgLmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpXHJcbiAgICAgIC50aGVuKChwcm9qZWN0KSA9PiByZXMuc2VuZChwcm9qZWN0KSlcclxuICAgICAgLmNhdGNoKG5leHQpO1xyXG4gIH0pXHJcblxyXG4gIC5wdXQoJy86aWQnLCBhdXRoTWlkZGxld2FyZSwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBDdXJyaWN1bHVtUHJvamVjdFxyXG4gICAgICAudXBkYXRlQnlJZChyZXEuYm9keSwgcmVxLnBhcmFtcy5pZClcclxuICAgICAgLnRoZW4oKHByb2plY3QpID0+IHJlcy5zZW5kKHByb2plY3QpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSlcclxuXHJcbiAgLmRlbGV0ZSgnLzppZCcsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIEN1cnJpY3VsdW1Qcm9qZWN0XHJcbiAgICAgIC5kZWxldGVCeUlkKHJlcS5wYXJhbXMuaWQpXHJcbiAgICAgIC50aGVuKChwcm9qZWN0KSA9PiByZXMuc2VuZChwcm9qZWN0KSlcclxuICAgICAgLmNhdGNoKG5leHQpO1xyXG4gIH0pO1xyXG5cclxuXHJcbiIsImNvbnN0IFBvcnRmb2xpb0NvbW1lbnQgPSByZXF1aXJlKCcuLi9tb2RlbHMvcG9ydGZvbGlvLWNvbW1lbnQnKTtcclxuY29uc3QgeyBSb3V0ZXIgfSA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuY29uc3QgeyBhdXRoTWlkZGxld2FyZSB9ID0gcmVxdWlyZSgnQGFsY2hlbXljb2RlbGFiL2F1dGgtbWlkZGxld2FyZScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXIoKVxyXG4gIC5wb3N0KCcvJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgUG9ydGZvbGlvQ29tbWVudFxyXG4gICAgICAuaW5zZXJ0KHJlcS5ib2R5KVxyXG4gICAgICAudGhlbihjb21tZW50ID0+IHJlcy5zZW5kKGNvbW1lbnQpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSlcclxuICBcclxuICAuZ2V0KCcvJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgUG9ydGZvbGlvQ29tbWVudFxyXG4gICAgICAuZmluZEFsbCgpXHJcbiAgICAgIC50aGVuKGNvbW1lbnRzID0+IHJlcy5zZW5kKGNvbW1lbnRzKSlcclxuICAgICAgLmNhdGNoKG5leHQpO1xyXG4gIH0pXHJcbiAgXHJcbiAgLmRlbGV0ZSgnLzppZCcsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIFBvcnRmb2xpb0NvbW1lbnRcclxuICAgICAgLmRlbGV0ZShyZXEucGFyYW1zLmlkKVxyXG4gICAgICAudGhlbihjb21tZW50ID0+IHJlcy5zZW5kKGNvbW1lbnQpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSlcclxuICBcclxuICAucGF0Y2goJy86aWQnLCBhdXRoTWlkZGxld2FyZSwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBQb3J0Zm9saW9Db21tZW50XHJcbiAgICAgIC51cGRhdGUocmVxLnBhcmFtcy5pZCwgcmVxLmJvZHkuY29tbWVudClcclxuICAgICAgLnRoZW4odXBkYXRlZENvbW1lbnQgPT4gcmVzLnNlbmQodXBkYXRlZENvbW1lbnQpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSk7XHJcbiIsImNvbnN0IHsgUm91dGVyICB9ID0gcmVxdWlyZSgnZXhwcmVzcycpO1xyXG5jb25zdCBQb3J0Zm9saW9Qcm9qZWN0ID0gcmVxdWlyZSgnLi4vbW9kZWxzL3BvcnRmb2xpby1tb2RlbCcpO1xyXG5jb25zdCB7IGF1dGhNaWRkbGV3YXJlIH0gPSByZXF1aXJlKCdAYWxjaGVteWNvZGVsYWIvYXV0aC1taWRkbGV3YXJlJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJvdXRlcigpXHJcbiAgLnBvc3QoJy8nLCBhdXRoTWlkZGxld2FyZSwgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICBQb3J0Zm9saW9Qcm9qZWN0XHJcbiAgICAgIC5pbnNlcnQocmVxLmJvZHkpXHJcbiAgICAgIC50aGVuKHByb2plY3QgPT4gcmVzLnNlbmQocHJvamVjdCkpXHJcbiAgICAgIC5jYXRjaChuZXh0KTtcclxuICB9KVxyXG5cclxuICAuZ2V0KCcvOmlkJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgUG9ydGZvbGlvUHJvamVjdFxyXG4gICAgICAuZmluZEJ5SWQoTnVtYmVyKHJlcS5wYXJhbXMuaWQpKVxyXG4gICAgICAudGhlbihwcm9qZWN0ID0+IHJlcy5zZW5kKHByb2plY3QpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSlcclxuXHJcbiAgLmdldCgnLycsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIFBvcnRmb2xpb1Byb2plY3RcclxuICAgICAgLmZpbmQoKVxyXG4gICAgICAudGhlbihwcm9qZWN0ID0+IHJlcy5zZW5kKHByb2plY3QpKVxyXG4gICAgICAuY2F0Y2gobmV4dCk7XHJcbiAgfSlcclxuICBcclxuICAuZGVsZXRlKCcvOmlkJywgYXV0aE1pZGRsZXdhcmUsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgUG9ydGZvbGlvUHJvamVjdFxyXG4gICAgICAuZGVsZXRlKHJlcS5wYXJhbXMuaWQpXHJcbiAgICAgIC50aGVuKHByb2plY3QgPT4gcmVzLnNlbmQocHJvamVjdCkpXHJcbiAgICAgIC5jYXRjaChuZXh0KTtcclxuICB9KVxyXG4gIFxyXG4gIC5wYXRjaCgnLzppZCcsIGF1dGhNaWRkbGV3YXJlLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgIFBvcnRmb2xpb1Byb2plY3RcclxuICAgICAgLnVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSlcclxuICAgICAgLnRoZW4ocHJvamVjdCA9PiByZXMuc2VuZChwcm9qZWN0KSlcclxuICAgICAgLmNhdGNoKG5leHQpO1xyXG4gIH0pO1xyXG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gKGVyciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgbGV0IHN0YXR1cyA9IGVyci5zdGF0dXMgfHwgNTAwO1xuXG4gIHJlcy5zdGF0dXMoc3RhdHVzKTtcblxuICBjb25zb2xlLmxvZyhlcnIpO1xuXG4gIHJlcy5zZW5kKHtcbiAgICBzdGF0dXMsXG4gICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgfSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKTtcbiAgZXJyLnN0YXR1cyA9IDQwNDtcbiAgbmV4dChlcnIpO1xufTtcbiIsImNvbnN0IHBvb2wgPSByZXF1aXJlKCcuLi91dGlscy9wb29sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEN1cnJpY3VsdW1Db21tZW50IHtcclxuICBpZDtcclxuICBvd25lckVtYWlsO1xyXG4gIGNvbW1lbnQ7XHJcbiAgY3VycmljdWx1bUlkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb21tZW50KSB7XHJcbiAgICB0aGlzLmlkID0gY29tbWVudC5pZDtcclxuICAgIHRoaXMub3duZXJFbWFpbCA9IGNvbW1lbnQub3duZXJfZW1haWw7XHJcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50LmNvbW1lbnQ7XHJcbiAgICB0aGlzLmN1cnJpY3VsdW1JZCA9IGNvbW1lbnQuY3VycmljdWx1bV9pZDtcclxuICB9IFxyXG5cclxuICBzdGF0aWMgYXN5bmMgaW5zZXJ0KGNvbW1lbnQpIHtcclxuXHJcbiAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoXHJcbiAgICAgICdJTlNFUlQgSU5UTyBjdXJyaWN1bHVtX2NvbW1lbnRzIChvd25lcl9lbWFpbCwgY29tbWVudCwgY3VycmljdWx1bV9pZCkgVkFMVUVTICgkMSwgJDIsICQzKSBSRVRVUk5JTkcgKicsXHJcbiAgICAgIFtjb21tZW50Lm93bmVyRW1haWwsIGNvbW1lbnQuY29tbWVudCwgY29tbWVudC5jdXJyaWN1bHVtSWRdXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBuZXcgQ3VycmljdWx1bUNvbW1lbnQocm93c1swXSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgZmluZEFsbCgpe1xyXG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KFxyXG4gICAgICAnU0VMRUNUICogRlJPTSBjdXJyaWN1bHVtX2NvbW1lbnRzJ1xyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gcm93cy5tYXAoY29tbWVudCA9PiBuZXcgQ3VycmljdWx1bUNvbW1lbnQoY29tbWVudCkpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGRlbGV0ZShpZCkge1xyXG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KFxyXG4gICAgICAnREVMRVRFIEZST00gY3VycmljdWx1bV9jb21tZW50cyBXSEVSRSBpZD0kMSBSRVRVUk5JTkcgKicsXHJcbiAgICAgIFtpZF1cclxuICAgICk7XHJcblxyXG4gICAgaWYoIXJvd3NbMF0pIHJldHVybiBudWxsO1xyXG4gICAgZWxzZSByZXR1cm4gbmV3IEN1cnJpY3VsdW1Db21tZW50KHJvd3NbMF0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIHVwZGF0ZShpZCwgY29tbWVudCkge1xyXG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KGBcclxuICAgIFVQREFURSBjdXJyaWN1bHVtX2NvbW1lbnRzXHJcbiAgICAgIFNFVCBjb21tZW50PSQxXHJcbiAgICAgIFdIRVJFIGlkPSQyXHJcbiAgICAgIFJFVFVSTklORyAqXHJcbiAgICBgLCBbY29tbWVudCwgaWRdKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IEN1cnJpY3VsdW1Db21tZW50KHJvd3NbMF0pO1xyXG4gIH1cclxufTtcclxuIiwiY29uc3QgcG9vbCA9IHJlcXVpcmUoJy4uL3V0aWxzL3Bvb2wnKTtcclxuY29uc3QgQ3VycmljdWx1bUNvbW1lbnQgPSByZXF1aXJlKCcuL2N1cnJpY3VsdW0tY29tbWVudCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDdXJyaWN1bHVtUHJvamVjdCB7XHJcbiAgY3VycmljdWx1bV9pZDtcclxuICB0aXRsZTtcclxuICBnaXRodWJfbGluaztcclxuICBkZXNjcmlwdGlvbjtcclxuICBncm91cDtcclxuICBjb2hvcnQ7XHJcbiAgdGFncztcclxuICBkZXBsb3llZF9iYWNrX2VuZDtcclxuICBkZXBsb3llZF9mcm9udF9lbmQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJvdykge1xyXG4gICAgdGhpcy5jdXJyaWN1bHVtSWQgPSByb3cuY3VycmljdWx1bV9pZCxcclxuICAgIHRoaXMudGl0bGUgPSByb3cudGl0bGUsXHJcbiAgICB0aGlzLmdpdGh1YkxpbmsgPSByb3cuZ2l0aHViX2xpbmssXHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gcm93LmRlc2NyaXB0aW9uLFxyXG4gICAgdGhpcy5ncm91cCA9IHJvdy5ncm91cCxcclxuICAgIHRoaXMuY29ob3J0ID0gcm93LmNvaG9ydCwgXHJcbiAgICB0aGlzLnRhZ3MgPSByb3cudGFncyxcclxuICAgIHRoaXMuZGVwbG95ZWRCYWNrRW5kID0gcm93LmRlcGxveWVkX2JhY2tfZW5kLFxyXG4gICAgdGhpcy5kZXBsb3llZEZyb250RW5kID0gcm93LmRlcGxveWVkX2Zyb250X2VuZDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZVxyXG4gIHN0YXRpYyBhc3luYyBpbnNlcnQocHJvamVjdCkge1xyXG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KGBcclxuICAgIElOU0VSVCBJTlRPIGN1cnJpY3VsdW1fcHJvamVjdHMgKHRpdGxlLCBnaXRodWJfbGluaywgXCJkZXNjcmlwdGlvblwiLCBcImdyb3VwXCIsIGNvaG9ydCwgdGFncywgZGVwbG95ZWRfYmFja19lbmQsIGRlcGxveWVkX2Zyb250X2VuZCkgVkFMVUVTICgkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgpIFJFVFVSTklORyAqXHJcbiAgICBgLCBbcHJvamVjdC50aXRsZSwgcHJvamVjdC5naXRodWJMaW5rLCBwcm9qZWN0LmRlc2NyaXB0aW9uLCBwcm9qZWN0Lmdyb3VwLCBwcm9qZWN0LmNvaG9ydCwgcHJvamVjdC50YWdzLCBwcm9qZWN0LmRlcGxveWVkQmFja0VuZCwgcHJvamVjdC5kZXBsb3llZEZyb250RW5kXSk7XHJcbiAgXHJcbiAgICByZXR1cm4gbmV3IEN1cnJpY3VsdW1Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gIH1cclxuICAvLyBSZWFkIC0gZmluZCgpXHJcbiAgc3RhdGljIGFzeW5jIGZpbmQoKSB7XHJcbiAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoYFxyXG4gICAgU0VMRUNUICogRlJPTSBjdXJyaWN1bHVtX3Byb2plY3RzYCk7XHJcbiAgICByZXR1cm4gcm93cy5tYXAoKHJvdykgPT4gbmV3IEN1cnJpY3VsdW1Qcm9qZWN0KHJvdykpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmVhZCAtIGZpbmRCeUlkKClcclxuICBzdGF0aWMgYXN5bmMgZmluZEJ5SWQoaWQpIHtcclxuICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgcG9vbC5xdWVyeShcclxuICAgICAgYFNFTEVDVCBjdXJyaWN1bHVtX3Byb2plY3RzLiosIGFycmF5X3RvX2pzb24oYXJyYXlfYWdnKGN1cnJpY3VsdW1fY29tbWVudHMuY29tbWVudCkpIEFTIGNvbW1lbnRzIEZST00gY3VycmljdWx1bV9wcm9qZWN0c1xyXG4gICAgICAgIEpPSU4gY3VycmljdWx1bV9jb21tZW50c1xyXG4gICAgICAgIE9OIGN1cnJpY3VsdW1fY29tbWVudHMuY3VycmljdWx1bV9pZD1jdXJyaWN1bHVtX3Byb2plY3RzLmN1cnJpY3VsdW1faWRcclxuICAgICAgICBXSEVSRSBjdXJyaWN1bHVtX3Byb2plY3RzLmN1cnJpY3VsdW1faWQ9JDFcclxuICAgICAgICBHUk9VUCBCWSBjdXJyaWN1bHVtX3Byb2plY3RzLmN1cnJpY3VsdW1faWRgLFxyXG4gICAgICBbaWRdXHJcbiAgICApO1xyXG4gICAgICBcclxuICAgIGlmKHJvd3NbMF0pe1xyXG4gICAgICBjb25zdCBpbml0aWFsUmV0dXJuID0gbmV3IEN1cnJpY3VsdW1Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gICAgICAgIFxyXG4gICAgICBjb25zdCBjb21tZW50cyA9IHJvd3NbMF0uY29tbWVudHMubWFwKGNvbW1lbnQgPT4gbmV3IEN1cnJpY3VsdW1Db21tZW50KGNvbW1lbnQpKTtcclxuXHJcbiAgICAgIHJldHVybiB7IC4uLmluaXRpYWxSZXR1cm4sIGNvbW1lbnRzIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoJ1NFTEVDVCAqIEZST00gY3VycmljdWx1bV9wcm9qZWN0cyBXSEVSRSBjdXJyaWN1bHVtX3Byb2plY3RzLmN1cnJpY3VsdW1faWQ9JDEnLCBbaWRdKTtcclxuICAgICAgcmV0dXJuIG5ldyBDdXJyaWN1bHVtUHJvamVjdChyb3dzWzBdKTtcclxuICAgIH1cclxuICB9IFxyXG5cclxuXHJcblxyXG4gIC8vIFVwZGF0ZSAtIHVwZGF0ZUJ5SWQoKVxyXG4gIHN0YXRpYyBhc3luYyB1cGRhdGVCeUlkKHByb2plY3QsIGN1cnJpY3VsdW1JZCkge1xyXG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KGBcclxuICAgIFVQREFURSBjdXJyaWN1bHVtX3Byb2plY3RzXHJcbiAgICBTRVQgdGl0bGU9JDEsIGdpdGh1Yl9saW5rPSQyLCBcImRlc2NyaXB0aW9uXCI9JDMsIFwiZ3JvdXBcIj0kNCwgY29ob3J0PSQ1LCB0YWdzPSQ2LCBkZXBsb3llZF9iYWNrX2VuZD0kNywgZGVwbG95ZWRfZnJvbnRfZW5kPSQ4XHJcbiAgICBXSEVSRSBjdXJyaWN1bHVtX2lkPSQ5XHJcbiAgICBSRVRVUk5JTkcgKlxyXG4gICAgYCwgW3Byb2plY3QudGl0bGUsIHByb2plY3QuZ2l0aHViTGluaywgcHJvamVjdC5kZXNjcmlwdGlvbiwgcHJvamVjdC5ncm91cCwgcHJvamVjdC5jb2hvcnQsIHByb2plY3QudGFncywgcHJvamVjdC5kZXBsb3llZEJhY2tFbmQsIHByb2plY3QuZGVwbG95ZWRGcm9udEVuZCwgY3VycmljdWx1bUlkXSk7XHJcblxyXG4gICAgaWYoIXJvd3NbMF0pIHJldHVybiBudWxsO1xyXG4gICAgZWxzZSByZXR1cm4gbmV3IEN1cnJpY3VsdW1Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRGVsZXRlIC0gZGVsZXRlQnlJZCgpXHJcbiAgc3RhdGljIGFzeW5jIGRlbGV0ZUJ5SWQoY3VycmljdWx1bUlkKSB7XHJcbiAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoYFxyXG4gICAgREVMRVRFIEZST00gY3VycmljdWx1bV9wcm9qZWN0c1xyXG4gICAgV0hFUkUgY3VycmljdWx1bV9pZD0kMVxyXG4gICAgUkVUVVJOSU5HICpgLCBbY3VycmljdWx1bUlkXSk7XHJcblxyXG4gICAgaWYoIXJvd3NbMF0pIHJldHVybiBudWxsO1xyXG4gICAgZWxzZSByZXR1cm4gbmV3IEN1cnJpY3VsdW1Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gIH1cclxufTtcclxuIiwiY29uc3QgcG9vbCA9IHJlcXVpcmUoJy4uL3V0aWxzL3Bvb2wnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUG9ydGZvbGlvQ29tbWVudCB7XHJcbiAgaWQ7XHJcbiAgb3duZXJFbWFpbDtcclxuICBjb21tZW50O1xyXG4gIHBvcnRmb2xpb0lkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihjb21tZW50KSB7XHJcbiAgICB0aGlzLmlkID0gY29tbWVudC5pZDtcclxuICAgIHRoaXMub3duZXJFbWFpbCA9IGNvbW1lbnQub3duZXJfZW1haWw7XHJcbiAgICB0aGlzLmNvbW1lbnQgPSBjb21tZW50LmNvbW1lbnQ7XHJcbiAgICB0aGlzLnBvcnRmb2xpb0lkID0gY29tbWVudC5wb3J0Zm9saW9faWQ7XHJcbiAgfSBcclxuXHJcbiAgc3RhdGljIGFzeW5jIGluc2VydChjb21tZW50KSB7XHJcbiAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoXHJcbiAgICAgICdJTlNFUlQgSU5UTyBwb3J0Zm9saW9fY29tbWVudHMgKG93bmVyX2VtYWlsLCBjb21tZW50LCBwb3J0Zm9saW9faWQpIFZBTFVFUyAoJDEsICQyLCAkMykgUkVUVVJOSU5HIConLFxyXG4gICAgICBbY29tbWVudC5vd25lckVtYWlsLCBjb21tZW50LmNvbW1lbnQsIGNvbW1lbnQucG9ydGZvbGlvSWRdXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBuZXcgUG9ydGZvbGlvQ29tbWVudChyb3dzWzBdKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBmaW5kQWxsKCl7XHJcbiAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoXHJcbiAgICAgICdTRUxFQ1QgKiBGUk9NIHBvcnRmb2xpb19jb21tZW50cydcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHJvd3MubWFwKGNvbW1lbnQgPT4gbmV3IFBvcnRmb2xpb0NvbW1lbnQoY29tbWVudCkpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGRlbGV0ZShpZCkge1xyXG4gICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KFxyXG4gICAgICAnREVMRVRFIEZST00gcG9ydGZvbGlvX2NvbW1lbnRzIFdIRVJFIGlkPSQxIFJFVFVSTklORyAqJyxcclxuICAgICAgW2lkXVxyXG4gICAgKTtcclxuXHJcbiAgICBpZighcm93c1swXSkgcmV0dXJuIG51bGw7XHJcbiAgICBlbHNlIHJldHVybiBuZXcgUG9ydGZvbGlvQ29tbWVudChyb3dzWzBdKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyB1cGRhdGUoaWQsIGNvbW1lbnQpIHtcclxuICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgcG9vbC5xdWVyeShgXHJcbiAgICBVUERBVEUgcG9ydGZvbGlvX2NvbW1lbnRzXHJcbiAgICAgIFNFVCBjb21tZW50PSQxXHJcbiAgICAgIFdIRVJFIGlkPSQyXHJcbiAgICAgIFJFVFVSTklORyAqXHJcbiAgICBgLCBbY29tbWVudCwgaWRdKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvcnRmb2xpb0NvbW1lbnQocm93c1swXSk7XHJcbiAgfVxyXG59O1xyXG4iLCJjb25zdCBwb29sID0gcmVxdWlyZSgnLi4vdXRpbHMvcG9vbCcpO1xyXG5jb25zdCBQb3J0Zm9saW9Db21tZW50ID0gcmVxdWlyZSgnLi9wb3J0Zm9saW8tY29tbWVudCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBQb3J0Zm9saW9Qcm9qZWN0IHtcclxuICAgIHBvcnRmb2xpb0lkO1xyXG4gICAgb3duZXJFbWFpbDtcclxuICAgIHRpdGxlO1xyXG4gICAgcHJpbWFyeUxhbmd1YWdlO1xyXG4gICAgZGF0ZTtcclxuICAgIGdpdGh1Ykxpbms7XHJcbiAgICBkZXNjcmlwdGlvbjtcclxuICAgIGNvbGxhYm9yYXRvcnM7XHJcbiAgICBvcGVuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJvdykge1xyXG4gICAgICB0aGlzLnBvcnRmb2xpb0lkID0gcm93LnBvcnRmb2xpb19pZDtcclxuICAgICAgdGhpcy5vd25lckVtYWlsID0gcm93Lm93bmVyX2VtYWlsO1xyXG4gICAgICB0aGlzLnRpdGxlID0gcm93LnRpdGxlO1xyXG4gICAgICB0aGlzLnByaW1hcnlMYW5ndWFnZSA9IHJvdy5wcmltYXJ5X2xhbmd1YWdlO1xyXG4gICAgICB0aGlzLmRhdGUgPSByb3cuZGF0ZTtcclxuICAgICAgdGhpcy5naXRodWJMaW5rID0gcm93LmdpdGh1Yl9saW5rO1xyXG4gICAgICB0aGlzLmRlc2NyaXB0aW9uID0gcm93LmRlc2NyaXB0aW9uO1xyXG4gICAgICB0aGlzLmNvbGxhYm9yYXRvcnMgPSByb3cuY29sbGFib3JhdG9ycztcclxuICAgICAgdGhpcy5vcGVuID0gcm93Lm9wZW47XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBpbnNlcnQocHJvamVjdCkge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoXHJcbiAgICAgICAgJ0lOU0VSVCBJTlRPIHBvcnRmb2xpb19wcm9qZWN0cyAob3duZXJfZW1haWwsIHRpdGxlLCBwcmltYXJ5X2xhbmd1YWdlLCBcImRhdGVcIiwgZ2l0aHViX2xpbmssIFwiZGVzY3JpcHRpb25cIiwgY29sbGFib3JhdG9ycywgXCJvcGVuXCIpIFZBTFVFUyAoJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4KSBSRVRVUk5JTkcgKicsIFtwcm9qZWN0Lm93bmVyRW1haWwsIHByb2plY3QudGl0bGUsIHByb2plY3QucHJpbWFyeUxhbmd1YWdlLCBwcm9qZWN0LmRhdGUsIHByb2plY3QuZ2l0aHViTGluaywgcHJvamVjdC5kZXNjcmlwdGlvbiwgcHJvamVjdC5jb2xsYWJvcmF0b3JzLCBwcm9qZWN0Lm9wZW5dXHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXR1cm4gbmV3IFBvcnRmb2xpb1Byb2plY3Qocm93c1swXSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGFzeW5jIGZpbmRCeUlkKGlkKSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgcG9vbC5xdWVyeShcclxuICAgICAgICBgU0VMRUNUIHBvcnRmb2xpb19wcm9qZWN0cy4qLCBhcnJheV90b19qc29uKGFycmF5X2FnZyhwb3J0Zm9saW9fY29tbWVudHMuY29tbWVudCkpIEFTIGNvbW1lbnRzIEZST00gcG9ydGZvbGlvX3Byb2plY3RzXHJcbiAgICAgICAgSk9JTiBwb3J0Zm9saW9fY29tbWVudHNcclxuICAgICAgICBPTiBwb3J0Zm9saW9fY29tbWVudHMucG9ydGZvbGlvX2lkPXBvcnRmb2xpb19wcm9qZWN0cy5wb3J0Zm9saW9faWRcclxuICAgICAgICBXSEVSRSBwb3J0Zm9saW9fcHJvamVjdHMucG9ydGZvbGlvX2lkPSQxXHJcbiAgICAgICAgR1JPVVAgQlkgcG9ydGZvbGlvX3Byb2plY3RzLnBvcnRmb2xpb19pZGAsXHJcbiAgICAgICAgW2lkXVxyXG4gICAgICApO1xyXG4gICAgICBcclxuICAgICAgaWYocm93c1swXSl7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbFJldHVybiA9IG5ldyBQb3J0Zm9saW9Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gcm93c1swXS5jb21tZW50cy5tYXAoY29tbWVudCA9PiBuZXcgUG9ydGZvbGlvQ29tbWVudChjb21tZW50KSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IC4uLmluaXRpYWxSZXR1cm4sIGNvbW1lbnRzIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgeyByb3dzIH0gPSBhd2FpdCBwb29sLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHBvcnRmb2xpb19wcm9qZWN0cyBXSEVSRSBwb3J0Zm9saW9fcHJvamVjdHMucG9ydGZvbGlvX2lkPSQxJywgW2lkXSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb3J0Zm9saW9Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIHN0YXRpYyBhc3luYyBmaW5kKCkge1xyXG4gICAgICBjb25zdCB7IHJvd3MgfSA9IGF3YWl0IHBvb2wucXVlcnkoXHJcbiAgICAgICAgJ1NFTEVDVCAqIEZST00gcG9ydGZvbGlvX3Byb2plY3RzJ1xyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiBuZXcgUG9ydGZvbGlvUHJvamVjdChyb3cpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYXN5bmMgZGVsZXRlKGlkKSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgcG9vbC5xdWVyeShcclxuICAgICAgICAnREVMRVRFIEZST00gcG9ydGZvbGlvX3Byb2plY3RzIFdIRVJFIHBvcnRmb2xpb19pZD0kMSBSRVRVUk5JTkcgKicsXHJcbiAgICAgICAgW2lkXVxyXG4gICAgICApO1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBQb3J0Zm9saW9Qcm9qZWN0KHJvd3NbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhc3luYyB1cGRhdGUoaWQsIHVwZGF0ZWRQcm9qZWN0KSB7XHJcbiAgICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgcG9vbC5xdWVyeShcclxuICAgICAgICBgVVBEQVRFIHBvcnRmb2xpb19wcm9qZWN0cyBcclxuICAgICAgICAgIFNFVCB0aXRsZT0kMSwgXHJcbiAgICAgICAgICAgICAgcHJpbWFyeV9sYW5ndWFnZT0kMixcclxuICAgICAgICAgICAgICBnaXRodWJfbGluaz0kMyxcclxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI9JDQsXHJcbiAgICAgICAgICAgICAgY29sbGFib3JhdG9ycz0kNSxcclxuICAgICAgICAgICAgICBcIm9wZW5cIj0kNlxyXG4gICAgICAgICAgV0hFUkUgcG9ydGZvbGlvX2lkPSQ3XHJcbiAgICAgICAgICBSRVRVUk5JTkcgKmAsXHJcbiAgICAgICAgW3VwZGF0ZWRQcm9qZWN0LnRpdGxlLCB1cGRhdGVkUHJvamVjdC5wcmltYXJ5TGFuZ3VhZ2UsIHVwZGF0ZWRQcm9qZWN0LmdpdGh1YkxpbmssIHVwZGF0ZWRQcm9qZWN0LmRlc2NyaXB0aW9uLCB1cGRhdGVkUHJvamVjdC5jb2xsYWJvcmF0b3JzLCB1cGRhdGVkUHJvamVjdC5vcGVuLCBpZF1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgUG9ydGZvbGlvUHJvamVjdChyb3dzWzBdKTtcclxuICAgIH1cclxufTtcclxuIiwiY29uc3QgeyBQb29sIH0gPSByZXF1aXJlKCdwZycpO1xyXG5cclxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcclxuICBjb25uZWN0aW9uU3RyaW5nOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwsXHJcbiAgc3NsOiBwcm9jZXNzLmVudi5QR1NTTE1PREUgJiYgeyByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlIH1cclxufSk7XHJcblxyXG4vLyBwb29sLm9uKCdjb25uZWN0JywgKCkgPT4gY29uc29sZS5sb2coJ1Bvc3RncmVzIGNvbm5lY3RlZCcpKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcG9vbDtcclxuIiwiY29uc3QgcmVxdWVzdCA9IHJlcXVpcmUoJ3N1cGVydGVzdCcpO1xyXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9saWIvYXBwJyk7XHJcblxyXG4gZnVuY3Rpb24gUG9ydGZvbGlvUHJvamVjdHMoeyBwcm9qZWN0cyB9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+XHJcbiAgICAgICA8bGk+e3Jlcy5ib2R5fTwvbGk+IFxyXG4gICAgICA8L3VsPlxyXG4gICAgKVxyXG4gIH1cclxuICBcclxuICAvLyBUaGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGF0IGJ1aWxkIHRpbWUgb24gc2VydmVyLXNpZGUuXHJcbiAgLy8gSXQgd29uJ3QgYmUgY2FsbGVkIG9uIGNsaWVudC1zaWRlLCBzbyB5b3UgY2FuIGV2ZW4gZG9cclxuICAvLyBkaXJlY3QgZGF0YWJhc2UgcXVlcmllcy4gU2VlIHRoZSBcIlRlY2huaWNhbCBkZXRhaWxzXCIgc2VjdGlvbi5cclxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XHJcbiAgICAvLyBDYWxsIGFuIGV4dGVybmFsIEFQSSBlbmRwb2ludCB0byBnZXQgcG9zdHMuXHJcbiAgICAvLyBZb3UgY2FuIHVzZSBhbnkgZGF0YSBmZXRjaGluZyBsaWJyYXJ5XHJcbiAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0KGFwcClcclxuICAgIC5nZXQoJy9hcGkvdjEvcG9ydGZvbGlvUHJvamVjdHMnKVxyXG4gICBcclxuICBcclxuICAgIC8vIEJ5IHJldHVybmluZyB7IHByb3BzOiBwb3N0cyB9LCB0aGUgQmxvZyBjb21wb25lbnRcclxuICAgIC8vIHdpbGwgcmVjZWl2ZSBgcG9zdHNgIGFzIGEgcHJvcCBhdCBidWlsZCB0aW1lXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9wczoge1xyXG4gICAgICAgIHJlcyxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZXhwb3J0IGRlZmF1bHQgIFBvcnRmb2xpb1Byb2plY3RzXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbGNoZW15Y29kZWxhYi9hdXRoLW1pZGRsZXdhcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29va2llLXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN1cGVydGVzdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9