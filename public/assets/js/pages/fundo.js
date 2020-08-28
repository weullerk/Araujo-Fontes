/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/pages/graficos/fundo.js":
/*!**********************************************!*\
  !*** ./resources/js/pages/graficos/fundo.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var config = {
  type: 'line',
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Grafico de Fundos'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Dias'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Valores'
        }
      }]
    }
  }
};
$(document).ready(function () {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
  $('#filtrarGrafico').on('submit', function () {
    var fundosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-fundos");
    var patrimoniosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-patrimonios/" + $('#dataInicial').val() + '/' + $('#dataFinal').val());
    loadGrafico(fundosXhr, patrimoniosXhr);
    return false;
  });
  var fundosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-fundos");
  var patrimoniosXhr = $.get("http://127.0.0.1:8000/api/v1/graficos/fundos/list-patrimonios");
  loadGrafico(fundosXhr, patrimoniosXhr);

  function loadGrafico(fundosXhr, patrimoniosXhr) {
    var promise = Promise.all([fundosXhr, patrimoniosXhr]).then(function (values) {
      var fundos = values[0];
      var patrimonios = values[1];
      var parametros = getLabelsAndValues(patrimonios);
      config.data.labels = parametros.labels;
      parametros.values.forEach(function (values, index) {
        var nomeFundo = fundos.filter(function (f) {
          return f.id == index;
        });
        createLabels(nomeFundo[0].name, values);
      });
      window.myLine.update();
    });
  }

  function getLabelsAndValues(patrimonios) {
    var labels = [];
    var values = [];
    patrimonios.forEach(function (patrimonio) {
      var fullDate = patrimonio.date.split(' ');
      var date = fullDate[0].split('-').reverse().join('/');

      if (!labels.includes(date)) {
        labels.push(date);
      }

      if (!Array.isArray(values[patrimonio.fundo_id])) {
        values[patrimonio.fundo_id] = [];
      }

      values[patrimonio.fundo_id].push(+patrimonio.value);
    });
    return {
      labels: labels,
      values: values
    };
  }

  function createLabels(name, data) {
    var colorNames = Object.keys(window.chartColors);
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = window.chartColors[colorName];
    var newDataset = {
      label: name,
      backgroundColor: newColor,
      borderColor: newColor,
      data: data,
      fill: false
    };
    config.data.datasets.push(newDataset);
    window.myLine.update();
  }
});

/***/ }),

/***/ 1:
/*!****************************************************!*\
  !*** multi ./resources/js/pages/graficos/fundo.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\af\resources\js\pages\graficos\fundo.js */"./resources/js/pages/graficos/fundo.js");


/***/ })

/******/ });