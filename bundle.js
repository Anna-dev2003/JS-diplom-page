/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://js_diploma/./src/styles/style.css?");

/***/ }),

/***/ "./src/components/API.js":
/*!*******************************!*\
  !*** ./src/components/API.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TOKEN_KEY\": () => (/* binding */ TOKEN_KEY),\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\nconst TOKEN_KEY = 'token'\n\nclass ApiError extends Error {\n    constructor({message, data, status}){\n        super(message);\n        this.status = status;\n        this.data = data;\n    }\n}\n\nclass API {\n    constructor (){\n        this.BASE_URL = 'https://byte-tasks.herokuapp.com/api'\n        this.headers = {\n            Authorization: null,\n            \"Content-Type\": \"application/json\"\n        }  \n    }\n\n    async handleErrors(response){\n        const {ok, status, statusText} = response\n        if(!ok){\n            // throw new Error(`Response on ${url} failed with status ${status}`)\n            throw new ApiError({\n                message: '',\n                data: await response.json(),\n                status: status\n            })\n        }\n     \n    }\n\n    async register(data){\n        const response = await fetch(`${this.BASE_URL}/auth/register`, {\n            method: 'POST',\n            headers: this.headers,\n            body: JSON.stringify(data)\n        }) \n\n        await this.handleErrors(response)\n\n        const registeredUser = await response.json()\n        return registeredUser\n    }\n\n    async login(data){\n        const response = await fetch(`${this.BASE_URL}/auth/login`, {\n            method: 'POST',\n            headers: this.headers,\n            body: JSON.stringify(data),\n        }) \n\n        await this.handleErrors(response)\n\n        const { token } = await response.json()\n\n        this.headers.Authorization = `Bearer ${token}`\n        localStorage.setItem(TOKEN_KEY, token)\n    }\n\n    async getSelf(){\n        const response = await fetch(`${this.BASE_URL}/auth/user/self`, {\n            method: 'GET',\n            headers: this.headers\n        })\n        await this.handleErrors(response)\n        const user = await response.json()\n        return user\n    }\n\n    isLoggedIn(){\n        return Boolean(localStorage.getItem(TOKEN_KEY))\n    }\n\n    autoLogin(){\n        const localToken = localStorage.getItem(TOKEN_KEY)\n        this.headers.Authorization = `Bearer ${localToken}`\n\n        return this.getSelf()\n    }\n\n    async createTask(data) {\n        const response =  await fetch(`${this.BASE_URL}/task`, {\n            method: 'POST',\n            body: JSON.stringify(data),\n            headers: this.headers,\n        })\n\n        await this.handleErrors(response)\n        return response.json()\n    }\n\n    async getAllTask(data) {\n        const response =  await fetch(`${this.BASE_URL}/task`, {\n            method: 'GET',\n            headers: this.headers,\n        })\n\n        await this.handleErrors(response)\n        return await response.json()\n    }\n\n    async editTask(id, data){\n        const res = await fetch(`${this.BASE_URL}/task/${id}`, {\n            method: 'PATCH',\n            body: JSON.stringify(data),\n            headers: this.headers,\n        })\n\n        await this.handleErrors(res)\n        return res.json();\n    }\n\n    async deleteTask(id){\n        const res = await fetch(`${this.BASE_URL}/task/${id}`, {\n            method: 'DELETE',\n            headers: this.headers,\n        })\n        await this.handleErrors(res)\n        return\n    }\n\n    logout(){\n        localStorage.removeItem(TOKEN_KEY)\n    }\n}\n\n\n\n// class RegisterPost extends API{\n//     constructor(){\n//         let res = formForRegister.dataProcessing()\n//         console.log(res)\n//     }\n// }\n\nconst api = new API()\n\n\n\n//# sourceURL=webpack://js_diploma/./src/components/API.js?");

/***/ }),

/***/ "./src/components/Auth.js":
/*!********************************!*\
  !*** ./src/components/Auth.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Auth\": () => (/* binding */ Auth)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ \"./src/components/Form.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input */ \"./src/components/Input.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formConfigs */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index */ \"./src/index.js\");\n\n\n\n\n\n\nconst getLoginForm = (onSuccess) => {\n    return new _Form__WEBPACK_IMPORTED_MODULE_1__.Form({\n        title: 'Login',\n        toggleTitleText: 'Register',\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.loginConfig.map(input => new _Input__WEBPACK_IMPORTED_MODULE_2__.Input(input)),\n        submitBtnText: \"Submit\",\n        onSubmit: async (data) => {\n            await _API__WEBPACK_IMPORTED_MODULE_0__.api.login(data)\n            onSuccess()\n        }\n    })\n}\n\nconst getRegisterForm = (onSuccess) => {\n    return new _Form__WEBPACK_IMPORTED_MODULE_1__.Form({\n        title: 'Register',\n        toggleTitleText: 'Login',\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.registerConfig.map(input => new _Input__WEBPACK_IMPORTED_MODULE_2__.Input(input)),\n        submitBtnText: \"Submit\",\n        onSubmit: async (data) => {\n            await _API__WEBPACK_IMPORTED_MODULE_0__.api.register(data)\n            onSuccess()\n        }\n\n    })\n}\n\nclass Auth {\n    constructor({appContainer, onLoginSuccess}){\n        this.appContainer = appContainer\n\n        this.formContainer = document.createElement('div')\n        this.switchBtn = document.createElement('p')\n        this.logoutBtn = document.createElement('p')\n        this.avatar = document.createElement('span')\n\n        this.form = null;\n        this.user = null;\n        this.isLogin = true;\n\n        this.loginForm = getLoginForm(onLoginSuccess)\n        this.registerForm = getRegisterForm(this.switchForms.bind(this))\n\n        this.createFormContainer();\n        this.createHeaderControls();\n    }\n\n    createFormContainer(){\n\n        this.formContainer.classList.add('form__container');\n        this.switchBtn.classList.add(\"form__title--toggle\", \"form__title\", \"btn\", 'btn-text')\n        this.switchBtn.innerText = \"Register\";\n\n        this.switchBtn.addEventListener('click', () => {\n            this.switchForms()\n        })\n\n        this.formContainer.prepend(this.switchBtn)\n    \n    }\n\n    createHeaderControls(){\n        this.logoutBtn.classList.add('button__logout', \"btn\", 'btn-text')\n        this.logoutBtn.innerText = 'Logout'\n        this.avatar.classList.add('avatar', \"user-icon\")\n\n        this.logoutBtn.addEventListener('click', () => {\n            this.logout();\n            _API__WEBPACK_IMPORTED_MODULE_0__.api.logout();\n            _index__WEBPACK_IMPORTED_MODULE_4__.taskBoard.logout();\n        })\n    }\n\n\n    renderHeaderControls(){\n        const controlsContainer = document.getElementById('header-controls')\n        this.avatar.innerText = this.user.name[0]\n\n        controlsContainer.append(this.logoutBtn, this.avatar)\n\n    }\n\n    renderAuthForm(){\n\n        if(this.form){\n            this.form.form.remove()\n        }\n\n        if(this.isLogin){\n            this.form = this.loginForm\n        }else{\n            this.form = this.registerForm\n        }\n\n        this.form.render(this.formContainer)\n        this.appContainer.append(this.formContainer)\n    }\n\n    switchForms(){\n        this.isLogin = !this.isLogin\n\n        if(this.isLogin){\n            // this.form.toggleTitle.innerText = 'Register'\n            this.switchBtn.innerText = 'Register'\n        }else{\n            // this.form.toggleTitle.innerText = 'Login'\n            this.switchBtn.innerText = 'Login'\n        }\n\n        this.renderAuthForm()\n    }\n\n    logout(){\n        this.avatar.remove();\n        this.logoutBtn.remove();\n        this.appContainer.innerHTML = '';\n        this.idLogin = true;\n\n        this.renderAuthForm();\n    }\n}\n\n//# sourceURL=webpack://js_diploma/./src/components/Auth.js?");

/***/ }),

/***/ "./src/components/Form.js":
/*!********************************!*\
  !*** ./src/components/Form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Form\": () => (/* binding */ Form)\n/* harmony export */ });\n\n// import { Input } from \"./Input.js\"\n\nclass Form {\n\n    constructor(options){\n\n        const {inputs} = options\n\n        this.submitBtn = document.createElement('button')\n        this.inputs = inputs;\n        this.form = document.createElement('form')\n        this.form.classList.add('form')\n\n        this.createForm(options)\n    }\n\n    static getFormValues(inputs) {\n        return inputs.reduce((values, input) => {\n            values[input.name] = input.value\n            return values\n        }, {})\n    }\n\n    createForm({onSubmit, submitBtnText, title: titleText}){\n\n        const title = document.createElement('h3')\n\n        title.innerText = titleText;\n        this.submitBtn.type = 'submit'\n        this.submitBtn.innerText = submitBtnText;\n\n\n        title.classList.add('form__title', 'form-title');\n        this.submitBtn.classList.add('button', 'btn', 'btn-form')\n\n\n        this.form.addEventListener('submit', async (event) => {\n            event.preventDefault()\n\n            this.formValues = Form.getFormValues(this.inputs)\n\n            this.submitBtn.setAttribute('disabled', '')\n\n            try{\n                await onSubmit(this.formValues, event)\n            } catch(err){\n                console.log(`err`, err.data)\n                err.data.details.forEach((err) => {\n                    const errorInput = this.inputs.find((input) => {\n                        return input.name === err.path[0]\n                    })\n\n                    errorInput.updateErrorMessage(err.message)\n                })\n            }\n\n            \n            this.submitBtn.removeAttribute('disabled')\n        })\n\n        this.form.append(title)\n\n        this.inputs.forEach((input) => {\n            input.render(this.form)\n        })\n\n        this.form.append(this.submitBtn)\n    }\n\n    render(container){\n        container.append(this.form)\n    }\n}\n    \n\n//# sourceURL=webpack://js_diploma/./src/components/Form.js?");

/***/ }),

/***/ "./src/components/Input.js":
/*!*********************************!*\
  !*** ./src/components/Input.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Input\": () => (/* binding */ Input)\n/* harmony export */ });\n\nclass Input {\n\n    constructor(options){\n\n        const {\n            name,\n            placeholder,\n            label,\n            type = 'text',\n            onInput,\n            onChange,\n        } = options\n\n        this.input = document.createElement('input')\n        this.errorMessageElement = document.createElement('span')\n\n        this.name = name\n        this.input.name = name\n        this.input.type = type\n        this.input.placeholder = placeholder\n        this.label = label\n        this.value = this.input.value\n\n        this.control = this.createControl(onInput, onChange)\n    }\n\n    createControl = (onInput, onChange) => {\n\n        const container = document.createElement('div')\n        const label = document.createElement('label')\n\n        const inputId = `_${this.name}`\n\n        container.classList.add('text-control')\n        this.errorMessageElement.classList.add('input-error')\n        this.input.classList.add('input')\n\n        this.input.id = inputId;\n        label.setAttribute('for', inputId)\n        label.classList.add('input__label')\n\n        label.innerText = this.label;\n\n        container.append(label, this.input, this.errorMessageElement)\n\n        this.input.addEventListener('input', (event) => {\n            this.value = event.target.value;\n            this.updateErrorMessage('')\n                if(onInput){\n                    onInput(event)\n                }\n        })\n\n        if(onChange){\n            this.input.addEventListener('change', (event) => {\n                onChange(event)\n            })\n        }\n\n        return container\n    }\n\n    updateErrorMessage(message){\n        this.errorMessageElement.innerText = message;\n\n    }\n\n    render(container){\n       container.append(this.control)\n    }\n\n}\n\n\n\n\n\n\n//# sourceURL=webpack://js_diploma/./src/components/Input.js?");

/***/ }),

/***/ "./src/components/Task.js":
/*!********************************!*\
  !*** ./src/components/Task.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Task\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n\n\n\n\nclass Task {\n    constructor({\n        name,\n        description,\n        timeTracked,\n        isActive,\n        isFinished,\n        _id,\n        createdAt,\n    }){\n        this.name = name;\n        this.description = description;\n        this.timeTracker = timeTracked;\n        this.isActive = isActive;\n        this.createdAt = new Date(createdAt);\n\n        this.id = _id;\n        this.taskCard = document.createElement('div');\n        this.deleteBtn = document.createElement('div');\n        this.timerBtn =  document.createElement('button');\n        this.timeTrackerElement = document.createElement('span')\n        this.markAsDoneBtn = document.createElement('p')\n        this.timeTrackedIntervalId = null\n        console.log(this.timeTracker)\n\n    }\n\n    renderCard(container){\n        const taskContent = document.createElement('div')\n        const titleElem = document.createElement('h3');\n        const descriptionElem = document.createElement('p');\n        const timeTracker = document.createElement('div');\n        const dateElem = document.createElement('p');\n\n\n        taskContent.classList.add('task-content')\n        titleElem.classList.add('task-title');\n        descriptionElem.classList.add('task-description');\n        timeTracker.classList.add('time-tracker');\n        dateElem.classList.add('task-date');\n\n        this.taskCard.classList.add('task-card')\n        this.deleteBtn.classList.add('task-delete-btn')\n        this.timerBtn.classList.add('timer-btn')\n        this.markAsDoneBtn.classList.add('btn', 'btn-form', 'btn-small')\n\n        if(this.isFinished){\n            this.timerBtn.setAttribute('disabled', '')\n            // this.taskCard.taskFinished('task-finished')\n            this.taskCard.classList.add('task-finished')\n            this.markAsDoneBtn.innerText = 'Restart';\n        } else {\n\n            this.timerBtn.classList.add(\n                this.isActive ? 'timer-btn-stop' : 'timer-btn-play'\n            )\n            this.markAsDoneBtn.innerText = 'Mark as done'\n        }\n\n        titleElem.innerText = this.name;\n        descriptionElem.innerText = this.description\n\n        dateElem.innerText = Task.getFormattedDate(this.createdAt)\n        this.timeTrackerElement.innerText = Task.getFormattedTimeTracker(\n            this.timeTracker\n        )\n\n        // this.deleteBtn.innerHTML = `<button>times</button>`\n\n        if(this.isActive){\n            this.startTracker()\n            this.timerBtn.innerHTML = `<i class=\"fa-solid fa-stop\"></i>`\n        }else{\n            this.timerBtn.innerHTML = `<i class=\"fa-solid fa-play\"></i>`\n        }\n\n        timeTracker.append(this.timerBtn, this.timeTrackerElement)\n        taskContent.append( \n            titleElem,\n            descriptionElem,\n            timeTracker,\n            dateElem,\n            this.markAsDoneBtn\n        )\n\n        this.taskCard.append(\n            taskContent,\n            this.deleteBtn\n        )\n\n        container.append(this.taskCard)\n\n        this.timerBtn.addEventListener('click', this.toggleTimeTracker)\n        this.deleteBtn.addEventListener('click', this.removeTask)\n        this.markAsDoneBtn.addEventListener('click', this.toggleTaskFinished)\n\n    }\n\n    removeTask = async () => {\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.deleteTask(this.id);\n        this.taskCard.remove();\n    }\n\n    toggleTimeTracker = async () =>{\n        this.isActive = !this.isActive;\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.editTask(this.id, {isActive: this.isActive})\n\n        if(this.isActive){\n            this.startTracker()\n        }else{\n            this.stopTracker()\n        }\n    }\n\n    toggleTaskFinished = async () => {\n        this.isFinished = !this.isFinished;\n        console.log(this.isFinished)\n        await _API__WEBPACK_IMPORTED_MODULE_0__.api.editTask(this.id, {isFinished: this.isFinished})\n        this.taskCard.classList.toggle('task-finished')\n\n        if(this.isFinished){\n            this.timerBtn.setAttribute('disabled', '');\n            this.markAsDoneBtn.innerText = 'Restart';\n            this.stopTracker();\n        }else{\n            this.timerBtn.removeAttribute('disabled');\n            this.markAsDoneBtn.innerText = 'Mark as done'\n        }\n    }\n\n    startTracker(){\n        this.timerBtn.classList.remove('timer-btn-play');\n        this.timerBtn.classList.add('timer-btn-stop');\n        this.timerBtn.innerHTML =  `<i class=\"fa-solid fa-stop\"></i>`\n\n        this.timeTrackedIntervalId = setInterval(() => {\n            this.timeTracker += 1000;\n            this.updateTimerTracker()\n        }, 1000)\n    }\n\n    stopTracker(){\n        this.timerBtn.classList.add('timer-btn-play');\n        this.timerBtn.classList.remove('timer-btn-stop');\n        this.timerBtn.innerHTML = `<i class=\"fa-solid fa-play\"></i>`;\n        clearInterval(this.timeTrackedIntervalId)\n    }\n\n    updateTimerTracker(){\n        const formatted = Task.getFormattedTimeTracker(this.timeTracker)\n        this.timeTrackerElement.innerText = formatted;\n    }\n\n    static getFormattedDate(d) {\n\n        const date = d.toLocaleDateString();\n        const time = d.toLocaleTimeString(); \n\n        return `${date} ${time}`\n    }\n\n    static addOptionalZero(value){\n        return value > 9 ? value : `0${value}`\n    }\n\n\n\n    static getFormattedTimeTracker(timeTracked){\n        console.log(timeTracked)\n        const timeTrackerSeconds = Math.floor(timeTracked / 1000)\n        const hours = Math.floor(timeTrackerSeconds / 3600);\n        const minutes = Math.floor((timeTrackerSeconds - hours * 3600) / 60);\n        const seconds = timeTrackerSeconds - hours * 3600 - minutes * 60;\n\n        return `${this.addOptionalZero(hours)}:${this.addOptionalZero(minutes)}:${this.addOptionalZero(seconds)}`\n    }\n\n\n\n}\n\n//# sourceURL=webpack://js_diploma/./src/components/Task.js?");

/***/ }),

/***/ "./src/components/TaskBoard.js":
/*!*************************************!*\
  !*** ./src/components/TaskBoard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TaskBoard\": () => (/* binding */ TaskBoard)\n/* harmony export */ });\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form */ \"./src/components/Form.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formConfigs */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ \"./src/components/Task.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Input */ \"./src/components/Input.js\");\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n\n\n\n\n\n\n\nconst getTaskForm = (onTaskCreated) => new _Form__WEBPACK_IMPORTED_MODULE_0__.Form({\n    title: 'Add task',\n    inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_1__.taskConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_3__.Input(input)),\n    submitBtnText: 'Add',\n    onSubmit: async (data) => {\n        const createdTask = await _API__WEBPACK_IMPORTED_MODULE_4__.api.createTask(data)\n        onTaskCreated(createdTask)\n    }\n})\n\nclass TaskBoard{\n    constructor({\n        appContainer\n    }){\n        this.appContainer = appContainer;\n        this.taskForm = getTaskForm(this.addTask.bind(this));\n        this.tasksContainer = document.createElement('div');\n    }\n\n    renderLayout(){\n        const board = document.createElement('div')\n        const formContainer = document.createElement('div')\n\n        board.classList.add('board')\n        formContainer.classList.add('task-form')\n        this.tasksContainer.classList.add('task-cards')\n\n        board.append(formContainer, this.tasksContainer)\n        this.taskForm.render(formContainer)\n\n        this.appContainer.append(board)\n    }\n\n    addTask(taskData){\n        console.log(taskData)\n        const task = new _Task__WEBPACK_IMPORTED_MODULE_2__.Task(taskData)\n        task.renderCard(this.tasksContainer)\n    }\n\n    logout(){\n        this.tasksContainer.innerHTML = ''\n    }\n}\n\n//# sourceURL=webpack://js_diploma/./src/components/TaskBoard.js?");

/***/ }),

/***/ "./src/components/formConfigs.js":
/*!***************************************!*\
  !*** ./src/components/formConfigs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginConfig\": () => (/* binding */ loginConfig),\n/* harmony export */   \"registerConfig\": () => (/* binding */ registerConfig),\n/* harmony export */   \"taskConfig\": () => (/* binding */ taskConfig)\n/* harmony export */ });\n\nconst loginConfig = [\n    {\n        name: 'email',\n        placeholder: 'email@gmail.com',\n        label: 'Email'\n    },\n    {\n        name: 'password',\n        placeholder: 'Enter password...',\n        label: 'Password',\n        type: 'password'\n    }\n]\n\nconst registerConfig = [\n    {\n        name: 'email',\n        placeholder: 'Enter email...',\n        label: 'Email'\n    },\n    {\n        name: 'name',\n        placeholder: 'Enter name...',\n        label: 'Name'\n    },\n    {\n        name: 'password',\n        placeholder: 'Enter password...',\n        label: 'Password',\n        type: 'password'\n    }\n]\nconst taskConfig = [\n    \n    {\n        name: 'name',\n        placeholder: 'Task name...',\n        label: 'Name'\n    },\n    {\n        name: 'description',\n        placeholder: 'Enter description...',\n        label: 'Description'\n    },\n  \n]\n\n//# sourceURL=webpack://js_diploma/./src/components/formConfigs.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskBoard\": () => (/* binding */ taskBoard)\n/* harmony export */ });\n/* harmony import */ var _components_formConfigs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/formConfigs.js */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _components_Form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Form.js */ \"./src/components/Form.js\");\n/* harmony import */ var _components_Input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Input.js */ \"./src/components/Input.js\");\n/* harmony import */ var _components_API_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/API.js */ \"./src/components/API.js\");\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/style.css */ \"./src/styles/style.css\");\n/* harmony import */ var _components_Auth_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Auth.js */ \"./src/components/Auth.js\");\n/* harmony import */ var _components_TaskBoard_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/TaskBoard.js */ \"./src/components/TaskBoard.js\");\n\n\n\n\n\n\n\n\n\n\nconst appContainer = document.getElementById('app')\nconst projectBody = document.getElementById('body')\n\nconst onLoginSuccess = async () => {\n    appContainer.innerHTML = ''\n    const user = await _components_API_js__WEBPACK_IMPORTED_MODULE_3__.api.getSelf();\n    renderAppLayout(user)\n}\n\nconst auth = new _components_Auth_js__WEBPACK_IMPORTED_MODULE_5__.Auth({\n    appContainer,\n    onLoginSuccess\n})\n\nconst taskBoard = new _components_TaskBoard_js__WEBPACK_IMPORTED_MODULE_6__.TaskBoard({\n    appContainer,\n})\n\nconst renderAppLayout = async (user) => {\n    auth.user = user;\n    auth.renderHeaderControls();\n    taskBoard.renderLayout();\n\n    const taskList = await _components_API_js__WEBPACK_IMPORTED_MODULE_3__.api.getAllTask()\n\n    taskList.forEach((task) => taskBoard.addTask(task))\n    \n}\n\nconst init = async () => {\n    const isLoggedIn = _components_API_js__WEBPACK_IMPORTED_MODULE_3__.api.isLoggedIn()\n    // console.log(isLoggedIn)\n\n    if(isLoggedIn){\n        const user = await _components_API_js__WEBPACK_IMPORTED_MODULE_3__.api.autoLogin()\n        // projectBody.classList.add('board__background')\n        renderAppLayout(user)\n    }else{\n        // projectBody.classList.remove('board__background')\n        auth.renderAuthForm()\n    }\n}\n\ninit()\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://js_diploma/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;