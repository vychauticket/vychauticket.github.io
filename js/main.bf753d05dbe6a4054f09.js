/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "bf753d05dbe6a4054f09";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"common","vue"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ClientApp/config/helpers.js":
/*!*************************************!*\
  !*** ./ClientApp/config/helpers.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js")

const ROOT = path.resolve(__dirname, '..')

const SUBSITENAME = ''

function root (args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [ROOT].concat(args))
}

function subsite(arg) {
    if (arg[0] != '/') {
        arg = '/' + arg;
    }
    return SUBSITENAME.concat(arg);
}

exports.root = root
exports.subsite = subsite
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./ClientApp/src/components/_shared/form-header/form-header.html":
/*!***********************************************************************!*\
  !*** ./ClientApp/src/components/_shared/form-header/form-header.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"status === 'active'\">\r\n        <b-row>\r\n            <b-col class=\"content\">\r\n                <span class=\"active-badge\">{{ number }}</span>\r\n                <strong>{{title}}</strong>        \r\n            </b-col>\r\n        </b-row>\r\n    </template>\r\n\r\n    <template v-if=\"status === 'empty'\">\r\n        <b-row >\r\n            <b-col class=\"content\">\r\n                <span class=\"empty-badge\"><span style=\"margin-bottom: 1px;\">{{ number }}</span></span>\r\n                <strong>{{title}}</strong>   \r\n            </b-col>\r\n        </b-row>\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(status) > -1\">\r\n        <b-row>\r\n            <b-col class=\"content\">\r\n                <i class=\"fas fa-check filled-badge\"></i>\r\n                <strong style=\"color: gray;\">{{title}}</strong>   \r\n            </b-col>\r\n            <b-col style=\"text-align: right;\" align-self=\"end\" offset=\"4\">\r\n                <a v-if=\"['filled', 'recapSpecial'].indexOf(status) > -1\" style=\"color: gray; cursor: pointer;\" @click=\"onClickEdit\">Edit</a>\r\n            </b-col>\r\n            \r\n        </b-row>\r\n        <hr>\r\n    </template>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/_shared/form-header/form-header.scss":
/*!***********************************************************************!*\
  !*** ./ClientApp/src/components/_shared/form-header/form-header.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./form-header.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/form-header/form-header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./form-header.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/form-header/form-header.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./form-header.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/form-header/form-header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/_shared/form-header/form-header.ts":
/*!*********************************************************************!*\
  !*** ./ClientApp/src/components/_shared/form-header/form-header.ts ***!
  \*********************************************************************/
/*! exports provided: FormHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormHeaderComponent", function() { return FormHeaderComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _form_header_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-header.scss */ "./ClientApp/src/components/_shared/form-header/form-header.scss");
/* harmony import */ var _form_header_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_form_header_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormHeaderComponent = /** @class */ (function (_super) {
    __extends(FormHeaderComponent, _super);
    function FormHeaderComponent() {
        return _super.call(this) || this;
    }
    FormHeaderComponent.prototype.onClickEdit = function () {
        this.$emit("formIsEditable", "active");
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], FormHeaderComponent.prototype, "title", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], FormHeaderComponent.prototype, "status", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], FormHeaderComponent.prototype, "number", void 0);
    FormHeaderComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./form-header.html */ "./ClientApp/src/components/_shared/form-header/form-header.html"),
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], FormHeaderComponent);
    return FormHeaderComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/_shared/form-header/index.ts":
/*!***************************************************************!*\
  !*** ./ClientApp/src/components/_shared/form-header/index.ts ***!
  \***************************************************************/
/*! exports provided: FormHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-header */ "./ClientApp/src/components/_shared/form-header/form-header.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormHeaderComponent", function() { return _form_header__WEBPACK_IMPORTED_MODULE_0__["FormHeaderComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/_shared/logins-dropdown/index.ts":
/*!*******************************************************************!*\
  !*** ./ClientApp/src/components/_shared/logins-dropdown/index.ts ***!
  \*******************************************************************/
/*! exports provided: eventBus, LoginsDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logins_dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logins-dropdown */ "./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return _logins_dropdown__WEBPACK_IMPORTED_MODULE_0__["eventBus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginsDropdown", function() { return _logins_dropdown__WEBPACK_IMPORTED_MODULE_0__["LoginsDropdown"]; });




/***/ }),

/***/ "./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.html":
/*!*******************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-form-group v-if=\"isVisible\" id=\"loginsSelectGroup\"\r\nlabel=\"Define loginss you want to use for your alerts\"\r\nlabel-for=\"loginsSelect\"\r\ndescription=\"\" class=\"font-explain\">\r\n    <b-form-select id=\"loginsSelect\" \r\n            v-model=\"selectedLogin\"\r\n            @change=\"onLoginSelected\"\r\n            :options=\"loginOptions\" value-field=\"id\" text-field=\"label\">\r\n\r\n    </b-form-select>\r\n</b-form-group> "

/***/ }),

/***/ "./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss":
/*!*******************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./logins-dropdown.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./logins-dropdown.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./logins-dropdown.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.ts":
/*!*****************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.ts ***!
  \*****************************************************************************/
/*! exports provided: eventBus, LoginsDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return eventBus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginsDropdown", function() { return LoginsDropdown; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logins_dropdown_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logins-dropdown.scss */ "./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss");
/* harmony import */ var _logins_dropdown_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_logins_dropdown_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var eventBus = new vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]();
var LoginsDropdown = /** @class */ (function (_super) {
    __extends(LoginsDropdown, _super);
    function LoginsDropdown() {
        var _this = _super.call(this) || this;
        _this.isVisible = false;
        _this.loginOptions = [];
        _this.selectedLogin = null;
        _this.init();
        return _this;
    }
    LoginsDropdown.prototype.init = function () {
        var _this = this;
        this.getLoginOptions()
            .then(function (result) {
            switch (result.length) {
                case 0:
                    break;
                case 1:
                    eventBus.$emit("loginIsSelected", result[0].label);
                    break;
                default:
                    _this.isVisible = true;
                    _this.loginOptions = [
                        { id: null, label: "login *" }
                    ].concat(result);
                    break;
            }
        });
    };
    LoginsDropdown.prototype.onLoginSelected = function () {
        var _this = this;
        var selection = this.loginOptions.filter(function (option) { return option.id === _this.selectedLogin; })[0];
        eventBus.$emit("loginIsSelected", selection.label);
    };
    LoginsDropdown.prototype.getLoginOptions = function () {
        return this.$store.dispatch("getLogins")
            .then(function (logins) {
            var result = new Array();
            var i = 0;
            logins.forEach(function (login) {
                result.push({ id: ++i, label: login });
            });
            return result;
        })
            .catch(function (error) {
            console.error(error);
            return null;
        });
    };
    LoginsDropdown = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./logins-dropdown.html */ "./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.html"),
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], LoginsDropdown);
    return LoginsDropdown;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/_shared/styled-form-radio/index.ts":
/*!*********************************************************************!*\
  !*** ./ClientApp/src/components/_shared/styled-form-radio/index.ts ***!
  \*********************************************************************/
/*! exports provided: defaultValueOption, StyledFormRadioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styled_form_radio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styled-form-radio */ "./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultValueOption", function() { return _styled_form_radio__WEBPACK_IMPORTED_MODULE_0__["defaultValueOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StyledFormRadioComponent", function() { return _styled_form_radio__WEBPACK_IMPORTED_MODULE_0__["StyledFormRadioComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.html":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span>\r\n    <template v-if=\"status === 'active'\">\r\n        <h5 style=\"margin-top: 30px;\">{{ title }}</h5>\r\n        <label :class=\"classExplain\">\r\n            {{ description }}\r\n        </label>\r\n        \r\n        <div class=\"radio-btn-group\">\r\n            <div class=\"radio\" v-bind:class=\"{ 'radio--disable': disableValue == 1 }\">\r\n                <input type=\"radio\" \r\n                        :name=\"radioName\" \r\n                        :checked=\"isOption1Selected\"\r\n                        @click=\"selected(label1, icon1, id1)\" \r\n                        :id=\"option1Id\"\r\n                        :disabled=\"disableValue == 1\"/>\r\n                <label :for=\"option1Id\" :class=\"{ 'invalid-input': valid }\">\r\n                    <span><i :class=\"icon1\"></i> {{ label1 }}</span>\r\n                </label>\r\n            </div>\r\n            <div class=\"radio\" v-bind:class=\"{ 'radio--disable': disableValue == 2 }\">\r\n                <input type=\"radio\" \r\n                        :name=\"radioName\" \r\n                        :checked=\"isOption2Selected\" \r\n                        @click=\"selected(label2, icon2, id2)\" \r\n                        :id=\"option2Id\"\r\n                        :disabled=\"disableValue == 2\"/>\r\n                <label :for=\"option2Id\" :class=\"{ 'invalid-input': valid }\">\r\n                    <span><i :class=\"icon2\"></i> {{ label2 }}</span>\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <p class=\"invalid-message\" v-if=\"valid\">This field is required</p>\r\n    </template>\r\n    \r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(status) > -1\">\r\n        <h6>{{ title }}</h6>\r\n        <hr>\r\n        <div class=\"option-filled\">\r\n            <i :class=\"iconUI\"></i>\r\n            <span v-if=\"classFilled===''\">\r\n                {{ labelUI }}\r\n            </span>\r\n            <span v-if=\"classFilled!==''\" :class=\"classFilled\">\r\n                {{ labelUI }}\r\n            </span>\r\n        </div>\r\n    </template>\r\n</span>"

/***/ }),

/***/ "./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./styled-form-radio.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./styled-form-radio.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./styled-form-radio.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.ts":
/*!*********************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.ts ***!
  \*********************************************************************************/
/*! exports provided: defaultValueOption, StyledFormRadioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValueOption", function() { return defaultValueOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyledFormRadioComponent", function() { return StyledFormRadioComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styled_form_radio_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styled-form-radio.scss */ "./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss");
/* harmony import */ var _styled_form_radio_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styled_form_radio_scss__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var defaultValueOption = {
    icon: "",
    label: "",
    id: 0,
    isError: false
};
var StyledFormRadioComponent = /** @class */ (function (_super) {
    __extends(StyledFormRadioComponent, _super);
    function StyledFormRadioComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radioName = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v1"])();
        _this.option1Id = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v1"])();
        _this.option2Id = Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v1"])();
        _this.isOption1Selected = "";
        _this.isOption2Selected = "";
        return _this;
    }
    StyledFormRadioComponent.prototype.mounted = function () {
        if (this.value.label !== "" && this.value.icon !== "") {
            this.isOption1Selected = this.value.label === this.label1 ? "checked" : "";
            this.isOption2Selected = this.value.label === this.label2 ? "checked" : "";
        }
    };
    Object.defineProperty(StyledFormRadioComponent.prototype, "labelUI", {
        get: function () {
            if (this.value != null)
                return this.value.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StyledFormRadioComponent.prototype, "iconUI", {
        get: function () {
            if (this.value != null)
                return this.value.icon;
        },
        enumerable: true,
        configurable: true
    });
    StyledFormRadioComponent.prototype.checkResetValue = function () {
        if (this.value.label === "" && this.value.icon === "") {
            this.isOption1Selected = "";
            this.isOption2Selected = "";
        }
    };
    StyledFormRadioComponent.prototype.selected = function (label, icon, id) {
        this.isOption1Selected = label === this.label1 ? "checked" : "";
        this.isOption2Selected = label === this.label2 ? "checked" : "";
        this.value.isError = false;
        this.$emit("input", {
            icon: icon,
            label: label,
            id: id,
            isError: false
        });
    };
    Object.defineProperty(StyledFormRadioComponent.prototype, "valid", {
        get: function () {
            return this.value.isError;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "status", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "title", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "description", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "icon1", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "icon2", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "label1", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "label2", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Number)
    ], StyledFormRadioComponent.prototype, "id1", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Number)
    ], StyledFormRadioComponent.prototype, "id2", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Object)
    ], StyledFormRadioComponent.prototype, "value", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "" }),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "classExplain", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "" }),
        __metadata("design:type", String)
    ], StyledFormRadioComponent.prototype, "classFilled", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: 0 }),
        __metadata("design:type", Number)
    ], StyledFormRadioComponent.prototype, "disableValue", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("value"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StyledFormRadioComponent.prototype, "checkResetValue", null);
    StyledFormRadioComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./styled-form-radio.html */ "./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.html"),
            components: {}
        })
    ], StyledFormRadioComponent);
    return StyledFormRadioComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/_shared/wait-loading/_/wait-loading.html":
/*!***************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/wait-loading/_/wait-loading.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loader\" v-show=\"getIsShowLoading\">\r\n    <svg class=\"circular\">\r\n        <circle class=\"path\" cx=\"100\" cy=\"100\" r=\"100\" fill=\"none\" stroke-width=\"5\" stroke-miterlimit=\"20\" />\r\n    </svg>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss":
/*!***************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./wait-loading.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./wait-loading.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./wait-loading.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/_shared/wait-loading/_/wait-loading.ts":
/*!*************************************************************************!*\
  !*** ./ClientApp/src/components/_shared/wait-loading/_/wait-loading.ts ***!
  \*************************************************************************/
/*! exports provided: WaitLoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaitLoadingComponent", function() { return WaitLoadingComponent; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.common.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_class_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wait_loading_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wait-loading.scss */ "./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss");
/* harmony import */ var _wait_loading_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wait_loading_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WaitLoadingComponent = /** @class */ (function (_super) {
    __extends(WaitLoadingComponent, _super);
    function WaitLoadingComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WaitLoadingComponent.prototype, "getIsShowLoading", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_3__["Root"].isShowLoading;
        },
        enumerable: true,
        configurable: true
    });
    WaitLoadingComponent = __decorate([
        vue_class_component__WEBPACK_IMPORTED_MODULE_1___default()({
            template: __webpack_require__(/*! ./wait-loading.html */ "./ClientApp/src/components/_shared/wait-loading/_/wait-loading.html")
        })
    ], WaitLoadingComponent);
    return WaitLoadingComponent;
}(vue__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./ClientApp/src/components/_shared/wait-loading/index.ts":
/*!****************************************************************!*\
  !*** ./ClientApp/src/components/_shared/wait-loading/index.ts ***!
  \****************************************************************/
/*! exports provided: WaitLoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wait_loading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/wait-loading */ "./ClientApp/src/components/_shared/wait-loading/_/wait-loading.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WaitLoadingComponent", function() { return _wait_loading__WEBPACK_IMPORTED_MODULE_0__["WaitLoadingComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/_shared/group-button-form/_/group-button-form.html":
/*!************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/_shared/group-button-form/_/group-button-form.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div :style=\"{ 'margin-top': marginTop }\">\r\n    <span>\r\n        <slot></slot>\r\n    </span>\r\n    <span style=\"float:right; margin-right:10%\">\r\n        <b-button variant=\"outline-secondary\" type=\"reset\" :size=\"size\">{{txtCancel}}</b-button>\r\n        <b-button variant=\"success\" type=\"submit\" :size=\"size\">{{txtContinue}}</b-button>\r\n    </span>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/_shared/group-button-form/_/group-button-form.ts":
/*!**********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/_shared/group-button-form/_/group-button-form.ts ***!
  \**********************************************************************************************/
/*! exports provided: GroupButtonForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupButtonForm", function() { return GroupButtonForm; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GroupButtonForm = /** @class */ (function (_super) {
    __extends(GroupButtonForm, _super);
    function GroupButtonForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], GroupButtonForm.prototype, "txtCancel", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], GroupButtonForm.prototype, "txtContinue", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "40px" }),
        __metadata("design:type", String)
    ], GroupButtonForm.prototype, "marginTop", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "" }),
        __metadata("design:type", String)
    ], GroupButtonForm.prototype, "size", void 0);
    GroupButtonForm = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./group-button-form.html */ "./ClientApp/src/components/alert-form/_shared/group-button-form/_/group-button-form.html"),
            components: {}
        })
    ], GroupButtonForm);
    return GroupButtonForm;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts":
/*!********************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts ***!
  \********************************************************************************/
/*! exports provided: GroupButtonForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _group_button_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/_/group-button-form.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupButtonForm", function() { return _group_button_form__WEBPACK_IMPORTED_MODULE_0__["GroupButtonForm"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.html":
/*!******************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"attachmentStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"6\" title=\"Attachments\" :status=\"attachmentStatus\"></form-header>\r\n        <b-form @submit.prevent=\"onSubmit\" @reset=\"onReset\">\r\n            <div class=\"font-explain\" style=\"margin: 20px 0\">Include some documents in your mails </div>\r\n            <b-row>\r\n                <b-col cols=\"4\">\r\n                    <b-form-select id=\"documentTypeSelect\"\r\n                                   v-model=\"documentType\"\r\n                                   :options=\"documentTypes\" style=\"background-image: none\">\r\n                    </b-form-select>\r\n                </b-col>\r\n                <b-col cols=\"8\" class=\"mt-2\">\r\n                    <btn-icon-add btnText=\"Add in attachments\" @formClick=\"$refs.fileInput.click()\"></btn-icon-add>                   \r\n                    <input type=\"file\" v-bind:accept=\"documentType\" @change=\"addAttachment($event)\" style=\"display:none\" ref=\"fileInput\" />\r\n                </b-col>\r\n            </b-row>\r\n            <b-row class=\"mt-2\">\r\n                <b-col cols=\"6\">\r\n                    <selected-file v-for=\"(doc, index) in selectedDocument\"\r\n                                   :key=\"index\"\r\n                                   :fileName=\"doc.FileName\"\r\n                                   @onRemove=\"onRemoveFile($event)\">\r\n                    </selected-file>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <group-button-form txtCancel=\"Cancel creation\" txtContinue=\"Continue to Date Activation Range\"></group-button-form>\r\n                </b-col>\r\n            </b-row>\r\n        </b-form>\r\n    </template>\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(attachmentStatus) > -1\">\r\n        <form-header class=\"header-component\"\r\n                     @formIsEditable=\"onUpdateStatus($event)\"\r\n                     title=\"Attachments\"\r\n                     :status=\"attachmentStatus\">\r\n        </form-header>\r\n        <div class=\"recap-mode\">\r\n            <div class=\"title-recap\">DOCUMNET TYPES</div>\r\n            <div v-for=\"doc in selectedDocument\" class=\"content-recap\">\r\n                {{doc.FileName}}\r\n            </div>\r\n        </div>\r\n    </template>\r\n    <template v-if=\"attachmentStatus === 'empty'\">\r\n        <form-header class=\"header-component\"\r\n                     number=\"6\"\r\n                     title=\"Attachments\"\r\n                     :status=\"attachmentStatus\">\r\n        </form-header>\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss":
/*!******************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./attachment-section.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./attachment-section.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./attachment-section.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.ts":
/*!****************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.ts ***!
  \****************************************************************************************/
/*! exports provided: AttachmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttachmentComponent", function() { return AttachmentComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _attachment_section_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attachment-section.scss */ "./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss");
/* harmony import */ var _attachment_section_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_attachment_section_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _common_button_icon_add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/button-icon-add */ "./ClientApp/src/components/common/button-icon-add/index.ts");
/* harmony import */ var _list_selected_files__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list-selected-files */ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AttachmentComponent = /** @class */ (function (_super) {
    __extends(AttachmentComponent, _super);
    function AttachmentComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.documentType = null;
        _this.documentTypes = [
            { value: null, text: "Document type", disabled: true },
            { value: ".pdf", text: ".Pdf" },
            { value: ".excel", text: ".Excel" },
            { value: "word", text: ".Word" },
            { value: ".jpg", text: ".jpg" }
        ];
        return _this;
    }
    Object.defineProperty(AttachmentComponent.prototype, "attachmentStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["ETrigger"].ATTACHMENTS; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["ETrigger"].ATTACHMENTS; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttachmentComponent.prototype, "selectedDocument", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].alertTrigger.Attachments;
        },
        set: function (value) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].alertTrigger.Attachments = value;
        },
        enumerable: true,
        configurable: true
    });
    AttachmentComponent.prototype.onSubmit = function () {
        this.attachmentStatus = "filled";
    };
    AttachmentComponent.prototype.onRemoveFile = function (key) {
        this.selectedDocument.splice(key, 1);
    };
    AttachmentComponent.prototype.addAttachment = function (event) {
        var that = this;
        var selectedFile = event.target.files[0];
        var contentBinary = "";
        if (selectedFile) {
            var r = new FileReader();
            var spanTime = new Date().toISOString().replace(/[-T:]/gi, "").split(".")[0];
            var arrFileName = selectedFile.name.split(".");
            var extenstion = arrFileName.pop();
            var newFileName = arrFileName.join(".") + "_" + spanTime + "." + extenstion;
            r.onload = function (e) {
                contentBinary = e.target.result;
                that.selectedDocument.push({ Id: null, AlertEmail: null, FileName: newFileName, FilePath: "", Data64: contentBinary });
            };
            r.readAsDataURL(selectedFile);
        }
    };
    AttachmentComponent.prototype.onReset = function () {
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].onResetAttachment();
    };
    AttachmentComponent.prototype.onUpdateStatus = function (newStatus) {
        this.attachmentStatus = newStatus;
    };
    AttachmentComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./attachment-section.html */ "./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.html"),
            components: {
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_2__["FormHeaderComponent"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_3__["GroupButtonForm"],
                "btn-icon-add": _common_button_icon_add__WEBPACK_IMPORTED_MODULE_4__["ButtonIconAddComponent"],
                "selected-file": _list_selected_files__WEBPACK_IMPORTED_MODULE_5__["SelectedFileComponent"]
            }
        })
    ], AttachmentComponent);
    return AttachmentComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.html":
/*!***********************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"selected-file\">\r\n    <b-row class=\"m-2\">\r\n        <b-col>\r\n            {{ this.fileName }}\r\n        </b-col>\r\n        <b-col cols=\"1\">\r\n            <i class=\"fa fa-trash\" @click=\"onRemoveFile\"></i>\r\n        </b-col>\r\n    </b-row>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss":
/*!***********************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./selected-file.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./selected-file.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./selected-file.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.ts":
/*!*********************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.ts ***!
  \*********************************************************************************************************/
/*! exports provided: SelectedFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectedFileComponent", function() { return SelectedFileComponent; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.common.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_class_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _selected_file_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selected-file.scss */ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss");
/* harmony import */ var _selected_file_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_selected_file_scss__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectedFileComponent = /** @class */ (function (_super) {
    __extends(SelectedFileComponent, _super);
    function SelectedFileComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectedFileComponent.prototype.onRemoveFile = function () {
        this.$emit("onRemove", this.$vnode.key);
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_2__["Prop"])({ required: true }),
        __metadata("design:type", String)
    ], SelectedFileComponent.prototype, "fileName", void 0);
    SelectedFileComponent = __decorate([
        vue_class_component__WEBPACK_IMPORTED_MODULE_1___default()({
            template: __webpack_require__(/*! ./selected-file.html */ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.html")
        })
    ], SelectedFileComponent);
    return SelectedFileComponent;
}(vue__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/index.ts":
/*!***********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/index.ts ***!
  \***********************************************************************************************/
/*! exports provided: SelectedFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _selected_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/selected-file */ "./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectedFileComponent", function() { return _selected_file__WEBPACK_IMPORTED_MODULE_0__["SelectedFileComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.html":
/*!****************************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"dateActivationRangeStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"7\" title=\"Date Activation Range\" :status=\"dateActivationRangeStatus\"></form-header>\r\n        <b-form>\r\n            <b-row style=\"margin-bottom: 40px\">\r\n                <b-col class=\"font-explain\">\r\n                    <span>Choose when your process should be active</span><br />\r\n                    <span>If you want your alerts to be always active, do not select any dates in this step</span>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col cols=\"6\">\r\n                    <datepicker :readonly=\"false\" format=\"yyyy-MM-dd\" name=\"date1\" v-model=\"frd\" :disabled=\"checkDisabled()\"\r\n                                placeholder=\"  From\" calendar-button-icon=\"fa fa-calendar\" :calendar-button='true'\r\n                                :class=\"{'invalid-input': !frd_greaterNow}\" style=\"width:100%\"></datepicker>\r\n                    <p class=\"invalid-message\" v-if=\"!frd_greaterNow\">To date must greater from date, from date must greater current date</p>\r\n\r\n                </b-col>\r\n                <b-col cols=\"6\">\r\n                    <datepicker :readonly=\"true\" format=\"yyyy-MM-dd\" name=\"date2\"\r\n                                v-model=\"td\" placeholder=\" To\" calendar-button-icon=\"fa fa-calendar\" :calendar-button='true'\r\n                                :class=\"{'invalid-input': !td_greaterNow}\"></datepicker>\r\n                    <p class=\"invalid-message\" v-if=\"!td_greaterNow\">To date must greater from date, to date must greater current date</p>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <!--<p class=\"invalid-message\" v-if=\"!td_greater_frd && !frd_greaterNow && !td_greaterNow\">To date must greater from date, from date and to date must greater current date</p>-->\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <div style=\"margin-top:40px\">\r\n                        <span>\r\n                            <slot></slot>\r\n                        </span>\r\n                        <span style=\"float:right; margin-right:10%\">\r\n                            <b-button variant=\"outline-secondary\" v-on:click=\"onReset\">Cancel creation</b-button>\r\n                            <b-button variant=\"success\" v-on:click=\"onSubmit\">Confirm Activation Range</b-button>\r\n                        </span>\r\n                    </div>\r\n                </b-col>\r\n            </b-row>\r\n\r\n        </b-form>\r\n    </template>\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(dateActivationRangeStatus) > -1\">\r\n        <form-header class=\"header-component\"\r\n                     @formIsEditable=\"onUpdateStatus($event)\"\r\n                     title=\"Date Activation Range\"\r\n                     :status=\"dateActivationRangeStatus\">\r\n        </form-header>\r\n        <div class=\"recap-mode\">\r\n            <div class=\"title-recap\">FROM</div>\r\n            <div v-if=\"frd != null\" class=\"content-recap\">{{$moment(frd).format('YYYY-MM-DD')}}</div>\r\n            \r\n            <div class=\"title-recap\">TO</div>\r\n            <div v-if=\"td != null\" class=\"content-recap\">{{$moment(td).format('YYYY-MM-DD')}}</div>\r\n        </div>\r\n    </template>\r\n    <template v-if=\"dateActivationRangeStatus === 'empty'\">\r\n        <form-header class=\"header-component\"\r\n                     number=\"7\"\r\n                     title=\"Date Activation Range\"\r\n                     :status=\"dateActivationRangeStatus\">\r\n        </form-header>\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss":
/*!****************************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./date-activation-range-section.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./date-activation-range-section.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./date-activation-range-section.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.ts":
/*!**************************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.ts ***!
  \**************************************************************************************************************/
/*! exports provided: DateActivationRangeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateActivationRangeComponent", function() { return DateActivationRangeComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _date_activation_range_section_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date-activation-range-section.scss */ "./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss");
/* harmony import */ var _date_activation_range_section_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_date_activation_range_section_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var vuejs_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuejs-datepicker */ "./node_modules/vuejs-datepicker/dist/vuejs-datepicker.esm.js");
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _util_static_common_function__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../util/static-common-function */ "./ClientApp/src/util/static-common-function.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(vuelidate__WEBPACK_IMPORTED_MODULE_1___default.a);
vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(__webpack_require__(/*! vue-moment */ "./node_modules/vue-moment/dist/vue-moment.js"));
var DateActivationRangeComponent = /** @class */ (function (_super) {
    __extends(DateActivationRangeComponent, _super);
    function DateActivationRangeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateActivationRangeComponent.prototype, "dateActivationRangeStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].DATE_ACTIVATION_RANGE; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].DATE_ACTIVATION_RANGE; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    DateActivationRangeComponent.prototype.checkDisabled = function () {
        return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.some(function (item) { return item.nameComponent !== _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].DATE_ACTIVATION_RANGE && item.status === "recapNonEdit"; });
    };
    Object.defineProperty(DateActivationRangeComponent.prototype, "frd", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation.ActiveMinDate;
        },
        set: function (value) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation.ActiveMinDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateActivationRangeComponent.prototype, "td", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation.ActiveMaxDate;
        },
        set: function (value) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation.ActiveMaxDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateActivationRangeComponent.prototype, "td_greaterNow", {
        get: function () {
            if (this.td != null) {
                if (this.td < _util_static_common_function__WEBPACK_IMPORTED_MODULE_8__["StaticCommonFunc"].getNowDate() ||
                    (this.frd !== null && this.frd > this.td))
                    return false;
                else
                    return true;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateActivationRangeComponent.prototype, "frd_greaterNow", {
        get: function () {
            if (this.frd != null) {
                if ((this.frd < _util_static_common_function__WEBPACK_IMPORTED_MODULE_8__["StaticCommonFunc"].getNowDate() && !this.checkDisabled()) ||
                    (this.td !== null && this.frd > this.td))
                    return false;
                else
                    return true;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DateActivationRangeComponent.prototype.textChanged = function () {
        this.$v.inputTest.$touch();
    };
    DateActivationRangeComponent.prototype.onSubmit = function () {
        if (_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation !== null && this.frd_greaterNow && this.td_greaterNow) {
            this.dateActivationRangeStatus = "filled";
        }
    };
    DateActivationRangeComponent.prototype.onReset = function () {
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].onResetDateActivationRange();
    };
    DateActivationRangeComponent.prototype.onUpdateStatus = function (newStatus) {
        this.dateActivationRangeStatus = newStatus;
    };
    DateActivationRangeComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./date-activation-range-section.html */ "./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.html"),
            components: {
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_4__["FormHeaderComponent"],
                "datepicker": vuejs_datepicker__WEBPACK_IMPORTED_MODULE_5__["default"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_6__["GroupButtonForm"]
            },
            validations: {
                frd: {
                    required: Object(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["requiredUnless"])("td_greater_frd")
                },
                td: {}
            }
        })
    ], DateActivationRangeComponent);
    return DateActivationRangeComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.html":
/*!**************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <template v-if=\"mainStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"4\" title=\"Mail Details\" :status=\"mainStatus\"></form-header>\r\n        <span class=\"font-explain\">Customize your mail subject and body message</span>\r\n        <b-form id=\"frmMailDetail\" @submit.prevent=\"onSubmit\" @reset=\"onReset\">\r\n            <b-row>\r\n                <b-col cols=\"11\">\r\n                    <b-form-input id=\"SubjectName\"\r\n                                  type=\"text\"\r\n                                  v-model=\"mailSubject\"\r\n                                  @change=\"$v.mailSubject.$touch()\"\r\n                                  placeholder=\"Subject\"\r\n                                  :class=\"{ 'invalid-input': $v.mailSubject.$error }\">\r\n                    </b-form-input>\r\n                    <p class=\"invalid-message\" v-if=\"!$v.mailSubject.required && $v.mailSubject.$dirty\">This field is required</p>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col cols=\"11\">\r\n                    <b-form-group id=\"Addsubject\" class=\"align-right\">\r\n                        <div>\r\n                            <b-form-select id=\"SubjectSelect\" class=\"align-element\" value-field=\"Code\" text-field=\"Label\" v-model=\"selectedSubject\" style=\"background-image: none\"\r\n                                           :options=\"optionsSubject\">\r\n                                <template slot=\"first\">\r\n                                    <option value=\"null\" disabled>Add subject element</option>\r\n                                </template>\r\n                            </b-form-select>\r\n                            <b-button variant=\"outline-secondary\" v-on:click=\"addSubject\">Add</b-button>\r\n                        </div>\r\n                    </b-form-group>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col cols=\"11\">\r\n                    <textarea v-model=\"mailBody\" class=\"mailBody\" placeholder=\"Body Message\"></textarea>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col cols=\"11\">\r\n                    <b-form-group id=\"AddBody\" class=\"align-right\">\r\n                        <div>\r\n                            <b-form-select id=\"BodySelect\" class=\"align-element\" value-field=\"Code\" text-field=\"Label\" v-model=\"selectedBody\" style=\"background-image: none\"\r\n                                           :options=\"optionsBody\">\r\n                                <template slot=\"first\">\r\n                                    <option value=\"null\" disabled>Add Body element</option>\r\n                                </template>\r\n                            </b-form-select>\r\n                            <b-button variant=\"outline-secondary\" id=\"btnbody\" v-on:click=\"addBody\">Add</b-button>\r\n                        </div>\r\n                    </b-form-group>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <group-button-form txtCancel=\"Cancel creation\" txtContinue=\"Continue to Mail Structure\"></group-button-form>\r\n                </b-col>\r\n            </b-row>\r\n        </b-form>\r\n\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(mainStatus) > -1\">\r\n        <form-header class=\"header-component\"\r\n                     @formIsEditable=\"onUpdateStatut($event)\"\r\n                     title=\"Mail Details\"\r\n                     number=\"4\"\r\n                     :status=\"mainStatus\">\r\n        </form-header>\r\n        <div class=\"recap-mode\">\r\n            <div class=\"title-recap\">SUBJECT</div>\r\n            <div class=\"content-recap\">{{ mailSubject }}</div>\r\n            <div class=\"title-recap\">BODY</div>\r\n            <div class=\"content-recap\">{{ mailBody }}</div>\r\n\r\n        </div>\r\n    </template>\r\n\r\n    <template v-if=\"mainStatus === 'empty'\">\r\n        <form-header class=\"header-component\"\r\n                     number=\"4\"\r\n                     title=\"Mail Details\"\r\n                     :status=\"mainStatus\">\r\n        </form-header>\r\n    </template>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss":
/*!**************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-detail-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-detail-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-detail-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.ts":
/*!************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.ts ***!
  \************************************************************************************/
/*! exports provided: MailDetailFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailDetailFormComponent", function() { return MailDetailFormComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mail_detail_form_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mail-detail-form.scss */ "./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss");
/* harmony import */ var _mail_detail_form_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mail_detail_form_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(vuelidate__WEBPACK_IMPORTED_MODULE_2___default.a);
var MailDetailFormComponent = /** @class */ (function (_super) {
    __extends(MailDetailFormComponent, _super);
    function MailDetailFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedSubject = null;
        _this.selectedBody = null;
        return _this;
    }
    Object.defineProperty(MailDetailFormComponent.prototype, "optionsSubject", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_7__["Root"].arrSubjectEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailDetailFormComponent.prototype, "optionsBody", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_7__["Root"].arrBodyEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailDetailFormComponent.prototype, "mainStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["ETrigger"].MAIL_DETAILS; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["ETrigger"].MAIL_DETAILS; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailDetailFormComponent.prototype, "mailBody", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].alertTrigger.MailDetails.Body;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].alertTrigger.MailDetails.Body = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailDetailFormComponent.prototype, "mailSubject", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].alertTrigger.MailDetails.Subject;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].alertTrigger.MailDetails.Subject = newVal;
        },
        enumerable: true,
        configurable: true
    });
    MailDetailFormComponent.prototype.onUpdateStatut = function (newStatus) {
        this.mainStatus = newStatus;
    };
    MailDetailFormComponent.prototype.addSubject = function () {
        if (this.mailSubject != null && this.selectedSubject != null) {
            this.mailSubject = this.mailSubject + "%" + this.selectedSubject + "%";
        }
        else {
            if (this.selectedSubject != null) {
                this.mailSubject = "%" + this.selectedSubject + "%";
            }
        }
    };
    MailDetailFormComponent.prototype.addBody = function () {
        if (this.mailBody != null && this.selectedBody != null) {
            this.mailBody = this.mailBody + "%" + this.selectedBody + "%";
        }
        else if (this.selectedBody != null) {
            this.mailBody = "%" + this.selectedBody + "%";
        }
    };
    MailDetailFormComponent.prototype.onSubmit = function () {
        this.$v.$touch();
        if (!this.$v.mailSubject.$invalid) {
            this.mainStatus = "filled";
        }
    };
    MailDetailFormComponent.prototype.onReset = function () {
        this.selectedSubject = null;
        this.selectedBody = null;
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_6__["AlertTriggerForm"].onResetMailDetails();
    };
    MailDetailFormComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./mail-detail-form.html */ "./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.html"),
            components: {
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_1__["FormHeaderComponent"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_5__["GroupButtonForm"]
            },
            validations: {
                mailSubject: {
                    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_3__["required"]
                }
            }
        })
    ], MailDetailFormComponent);
    return MailDetailFormComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.html":
/*!************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"mail-recipients-container\">\r\n    <template v-if=\"mailRecipientStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"3\" title=\"Mail Recipients\" :status=\"mailRecipientStatus\"></form-header>\r\n        <div class=\"mail__recipients__label mt-1\">\r\n            <span class=\"font-explain\">Select who will receive your emails</span>\r\n            <br /><br />\r\n        </div>\r\n        <b-form @submit.prevent=\"onSubmit\" @reset=\"onReset\">\r\n            <b-row>\r\n                <b-col cols=\"8\">\r\n                    <b-form-group>\r\n                        <div class=\"input__multi__line__border\">\r\n                            <b-form-input id=\"inputMailTo\"\r\n                                          type=\"text\"\r\n                                          size=\"md\"\r\n                                          @change=\"$v.mailTo.$touch()\"\r\n                                          v-model=\"mailTo\"\r\n                                          placeholder=\"To*\"\r\n                                          class=\"input__multi__line__control\">\r\n                            </b-form-input>\r\n                            <div class=\"w-100 ml-1 mr-1 mb-1\">\r\n                                <div class=\"mail__control__container mr-1\" v-for=\"(item, index) in mailtoList\">\r\n                                    <span class=\"ml-2\"> {{ item.mail }} </span>\r\n                                    <b-button-close class=\"close opiton__btn__close ml-1 mr-2 mt-0\" @click=\"deleteMailToItem(item.mail)\"></b-button-close>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <p class=\"invalid-message\" v-if=\"!$v.mailTo.requiredMail && $v.mailTo.$dirty\">This field is required</p>\r\n                        <p class=\"invalid-message\" v-if=\"!$v.mailTo.mustBeEmail && $v.mailTo.$dirty\">This field must be email</p>\r\n                    </b-form-group>\r\n\r\n                    <b-form-group>\r\n                        <div class=\"input__multi__line__border\">\r\n                            <b-form-input id=\"inputMailCc\"\r\n                                          type=\"text\"\r\n                                          size=\"md\"\r\n                                          @change=\"$v.mailCc.$touch()\"\r\n                                          v-model=\"mailCc\"\r\n                                          placeholder=\"Cc\"\r\n                                          class=\"input__multi__line__control\">\r\n                            </b-form-input>\r\n                            <div class=\"w-100 ml-1 mr-1 mb-1\">\r\n                                <div class=\"mail__control__container mr-1\" v-for=\"(item, index) in mailccList\">\r\n                                    <span class=\"ml-2\"> {{ item.mail }} </span>\r\n                                    <b-button-close class=\"close opiton__btn__close ml-1 mr-2 mt-0\"  @click=\"deleteMailCcItem(item.mail)\" ></b-button-close>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <p class=\"invalid-message\" v-if=\"!$v.mailCc.mustBeEmail && $v.mailCc.$dirty\">This field must be email</p>\r\n                    </b-form-group>\r\n\r\n                    <b-form-group>\r\n                        <div class=\"input__multi__line__border\">\r\n                            <b-form-input id=\"inputMailCci\"\r\n                                          type=\"text\"\r\n                                          size=\"md\"\r\n                                          @change=\"$v.mailCci.$touch()\"\r\n                                          v-model=\"mailCci\"\r\n                                          placeholder=\"Cci\"\r\n                                          class=\"input__multi__line__control\">\r\n                            </b-form-input>\r\n                            <div class=\"w-100 ml-1 mr-1 mb-1\">\r\n                                <div class=\"mail__control__container mr-1\" v-for=\"(item, index) in mailcciList\">\r\n                                    <span class=\"ml-2\"> {{ item.mail }} </span>\r\n                                    <b-button-close class=\"close opiton__btn__close ml-1 mr-2 mt-0\" @click=\"deleteMailCciItem(item.mail)\"></b-button-close>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <p class=\"invalid-message\" v-if=\"!$v.mailCci.mustBeEmail && $v.mailCci.$dirty\">This field must be email</p>\r\n                    </b-form-group>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <btn-icon-add btnText=\"Add a Third Party email\" @formClick=\"onUpdateIsThirdPartyRoleStatus(true)\"></btn-icon-add>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <group-button-form txtCancel=\"Cancel creation\" txtContinue=\"Continue to Mail Details\"></group-button-form>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row v-show=\"isThirdPartyRole\">\r\n                <b-col cols=\"10\">\r\n                    <div class=\"mail__recipients__box__add__email mt-4\">\r\n                        <div class=\"d-flex flex-row h-25\">\r\n                            <div class=\"d-flex justify-content-end align-items-start w-100\">\r\n                                <b-button-close size=\"md\" @click=\"onUpdateIsThirdPartyRoleStatus(false)\" class=\"close mr-2 mt-1\"></b-button-close>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-flex w-100 h-50\">\r\n                            <div class=\"d-flex align-items-center w-100\">\r\n                                <b-row class=\"w-100\">\r\n                                    <b-col cols=\"6\">\r\n                                        <b-form-select id=\"recipientTypeSelect\" value-field=\"Id\" text-field=\"Label\"\r\n                                                       v-model=\"selectRecipientType\"\r\n                                                       class=\"mb-3 w-auto float-right\"\r\n                                                        :options=\"arrRecipientType\"\r\n                                                       style=\"background-image: none\">\r\n                                            <template slot=\"first\">\r\n                                                <option value=\"null\" disabled> Recipient type </option>\r\n                                            </template>\r\n                                                 <!--<option v-for=\"item in arrRecipientType\" :value=\"item.Id\" :key=\"item.Code\"> {{ item.Label }}</option>-->\r\n                                        </b-form-select>\r\n                                    </b-col>\r\n                                    <b-col cols=\"6\">\r\n                                        <b-form-select id=\"thirdPartyRoleSelect\" value-field=\"Id\" text-field=\"Label\"\r\n                                                       v-model=\"selectThirdPartyRole\"\r\n                                                       :options=\"arrThirdPartyRole\"\r\n                                                       class=\"mb-3 w-auto float-left\"\r\n                                                       style=\"background-image: none\">\r\n                                            <template slot=\"first\">\r\n                                                <option value=\"null\" disabled>Third party role</option>\r\n                                            </template>\r\n                                        </b-form-select>\r\n                                    </b-col>\r\n                                </b-row>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"d-flex w-100 h-25\">\r\n                            <div class=\"d-flex align-items-start justify-content-center w-100 w-100\">\r\n                                <b-button variant=\"success\" v-on:click=\"onAddThirdPartyRole\">Add</b-button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </b-col>\r\n            </b-row>\r\n            <br /><br /><br />\r\n        </b-form>\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(mailRecipientStatus) > -1\">\r\n        <form-header class=\"header-component\" number=\"3\"  @formIsEditable=\"onUpdateStatus($event)\" title=\"Mail Recipients\" :status=\"mailRecipientStatus\"></form-header>\r\n        <b-row class=\"recap-mode\">\r\n            <b-col class=\"title-recap\"><span>TO</span></b-col>\r\n            <b-col class=\"title-recap\"><span>CC</span></b-col>\r\n            <b-col class=\"title-recap\"><span>CCI</span></b-col>\r\n        </b-row>\r\n        <b-row class=\"recap-mode\">\r\n            <b-col class=\"content-recap\">\r\n                <div v-for=\"item in mailtoList\">\r\n                    {{ item.mail }}\r\n                </div>\r\n            </b-col>\r\n            <b-col class=\"content-recap\">\r\n                <div v-for=\"item in mailccList\">\r\n                    {{ item.mail }}\r\n                </div>\r\n            </b-col>\r\n            <b-col class=\"content-recap\">\r\n                <div v-for=\"item in mailcciList\">\r\n                    {{ item.mail }}\r\n                </div>\r\n            </b-col>\r\n        </b-row>\r\n    </template>\r\n\r\n    <template v-if=\"mailRecipientStatus === 'empty'\">\r\n        <form-header class=\"header-component\" number=\"3\" title=\"Mail Recipients\" :status=\"mailRecipientStatus\"></form-header>\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss":
/*!************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-recipients.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-recipients.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-recipients.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.ts":
/*!**********************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.ts ***!
  \**********************************************************************************/
/*! exports provided: MailRecipientComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailRecipientComponent", function() { return MailRecipientComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _common_button_icon_add__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/button-icon-add */ "./ClientApp/src/components/common/button-icon-add/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _mail_recipients_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mail-recipients.scss */ "./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss");
/* harmony import */ var _mail_recipients_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mail_recipients_scss__WEBPACK_IMPORTED_MODULE_7__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(vuelidate__WEBPACK_IMPORTED_MODULE_1___default.a);
var MailRecipientComponent = /** @class */ (function (_super) {
    __extends(MailRecipientComponent, _super);
    function MailRecipientComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mailRecipients = { lstMailCc: [], lstMailCci: [], lstMailTo: [] };
        _this.mailTo = "";
        _this.mailCc = "";
        _this.mailCci = "";
        _this.isSubmit = false;
        _this.isThirdPartyRole = false;
        _this.selectRecipientType = null;
        _this.selectThirdPartyRole = null;
        _this.thirdPartyRoleSelectedList = [];
        return _this;
    }
    Object.defineProperty(MailRecipientComponent.prototype, "arrRecipientType", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_6__["Root"].arrRecipientType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailRecipientComponent.prototype, "arrThirdPartyRole", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_6__["Root"].arrThirdPartyRole;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailRecipientComponent.prototype, "mailRecipientStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["ETrigger"].MAIL_RECIPIENTS; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["ETrigger"].MAIL_RECIPIENTS; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailRecipientComponent.prototype, "mailtoList", {
        get: function () {
            var _this = this;
            return Array.from(new Set(this.mailRecipients.lstMailTo.map(function (s) { return s.mail; })))
                .map(function (mail) {
                return {
                    mail: mail,
                    role: _this.mailRecipients.lstMailTo.find(function (s) { return s.mail === mail; }).role
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailRecipientComponent.prototype, "mailccList", {
        get: function () {
            var _this = this;
            return Array.from(new Set(this.mailRecipients.lstMailCc.map(function (s) { return s.mail; })))
                .map(function (mail) {
                return {
                    mail: mail,
                    role: _this.mailRecipients.lstMailCc.find(function (s) { return s.mail === mail; }).role
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailRecipientComponent.prototype, "mailcciList", {
        get: function () {
            var _this = this;
            return Array.from(new Set(this.mailRecipients.lstMailCci.map(function (s) { return s.mail; })))
                .map(function (mail) {
                return {
                    mail: mail,
                    role: _this.mailRecipients.lstMailCci.find(function (s) { return s.mail === mail; }).role
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailRecipientComponent.prototype, "storeMailRecipients", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["AlertTriggerForm"].alertTrigger.MailRecipients;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["AlertTriggerForm"].alertTrigger.MailRecipients = newVal;
        },
        enumerable: true,
        configurable: true
    });
    MailRecipientComponent.prototype.processGetDataFromStore = function () {
        var _this = this;
        console.log(this.isSubmit);
        if (!this.isSubmit) {
            console.log(this.isSubmit);
            if (["empty", "active"].indexOf(this.mailRecipientStatus) < 0) {
                if (this.storeMailRecipients.length > 0) {
                    console.log(this.isSubmit);
                    var typeIdTO = this.arrRecipientType.find(function (item) { return item.Code === "MTO"; }).Id;
                    var typeIdCC = this.arrRecipientType.find(function (item) { return item.Code === "MCC"; }).Id;
                    var typeIdCCI = this.arrRecipientType.find(function (item) { return item.Code === "CCI"; }).Id;
                    this.receiveDataFromStore();
                    this.mailRecipients.lstMailTo.forEach(function (item) {
                        if (item.role !== null) {
                            _this.thirdPartyRoleSelectedList.push({ thirdPartyId: item.role, recipientTypeId: typeIdTO });
                        }
                    });
                    this.mailRecipients.lstMailCc.forEach(function (item) {
                        if (item.role !== null) {
                            _this.thirdPartyRoleSelectedList.push({ thirdPartyId: item.role, recipientTypeId: typeIdCC });
                        }
                    });
                    this.mailRecipients.lstMailCci.forEach(function (item) {
                        if (item.role !== null) {
                            _this.thirdPartyRoleSelectedList.push({ thirdPartyId: item.role, recipientTypeId: typeIdCCI });
                        }
                    });
                }
            }
        }
    };
    MailRecipientComponent.prototype.mailToRequired = function () {
        if (this.mailRecipients.lstMailTo.length == 0) {
            if (this.mailTo.trim().length == 0) {
                return false;
            }
        }
        return true;
    };
    MailRecipientComponent.prototype.isValidEmail = function (value) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var resultCheck = true;
        var resultTemp = [];
        resultTemp = value.split(";");
        for (var i = 0; i < resultTemp.length; i++) {
            if (resultTemp[i].trim() != "") {
                resultCheck = reg.test(String(resultTemp[i].trim()).toLowerCase());
                if (!resultCheck) {
                    return false;
                }
            }
        }
        return true;
    };
    MailRecipientComponent.prototype.updateMailTo = function (value) {
        var self = this;
        var check = self.isValidEmail(value);
        if (check && (self.mailTo.indexOf(";") > 0)) {
            var lstMailTemp = self.getMailList(self.mailTo);
            lstMailTemp.forEach(function (item) {
                self.mailRecipients.lstMailTo.push({ mail: item.mail, role: null });
            });
            self.mailTo = "";
        }
        return check;
    };
    MailRecipientComponent.prototype.updateMailCc = function (value) {
        var self = this;
        var check = self.isValidEmail(value);
        if (check && (self.mailCc.indexOf(";") > 0)) {
            var lstMailTemp = self.getMailList(self.mailCc);
            lstMailTemp.forEach(function (item) {
                self.mailRecipients.lstMailCc.push({ mail: item.mail, role: null });
            });
            self.mailCc = "";
        }
        return check;
    };
    MailRecipientComponent.prototype.updateMailCci = function (value) {
        var self = this;
        var check = self.isValidEmail(value);
        if (check && (self.mailCci.indexOf(";") > 0)) {
            var lstMailTemp = self.getMailList(self.mailCci);
            lstMailTemp.forEach(function (item) {
                self.mailRecipients.lstMailCci.push({ mail: item.mail, role: null });
            });
            self.mailCci = "";
        }
        return check;
    };
    MailRecipientComponent.prototype.deleteMailToItem = function (mail) {
        var arr = this.mailRecipients.lstMailTo.filter(function (item) { return item.mail !== mail; });
        this.mailRecipients.lstMailTo = arr;
    };
    MailRecipientComponent.prototype.deleteMailCcItem = function (mail) {
        var arr = this.mailRecipients.lstMailCc.filter(function (item) { return item.mail !== mail; });
        this.mailRecipients.lstMailCc = arr;
    };
    MailRecipientComponent.prototype.deleteMailCciItem = function (mail) {
        var arr = this.mailRecipients.lstMailCci.filter(function (item) { return item.mail !== mail; });
        this.mailRecipients.lstMailCci = arr;
    };
    MailRecipientComponent.prototype.onUpdateIsThirdPartyRoleStatus = function (newStatus) {
        this.isThirdPartyRole = newStatus;
        if (newStatus) {
            this.selectRecipientType = null;
            this.selectThirdPartyRole = null;
        }
    };
    MailRecipientComponent.prototype.onUpdateStatus = function (newStatus) {
        this.mailRecipientStatus = newStatus;
        this.onUpdateIsThirdPartyRoleStatus(false);
        this.mailTo = "";
        this.mailCc = "";
        this.mailCci = "";
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["AlertTriggerForm"].onResetMailRecipients();
        this.isSubmit = false;
    };
    MailRecipientComponent.prototype.onAddThirdPartyRole = function () {
        var self = this;
        if (self.selectRecipientType == null || self.selectThirdPartyRole == null) {
            return;
        }
        if (self.selectRecipientType === this.arrRecipientType.find(function (item) { return item.Code === "MTO"; }).Id) {
            self.mailRecipients.lstMailTo.push({
                mail: self.arrThirdPartyRole.find(function (item) { return item.Id === self.selectThirdPartyRole; }).Label,
                role: self.selectThirdPartyRole
            });
        }
        else if (self.selectRecipientType === this.arrRecipientType.find(function (item) { return item.Code === "MCC"; }).Id) {
            self.mailRecipients.lstMailCc.push({
                mail: self.arrThirdPartyRole.find(function (item) { return item.Id === self.selectThirdPartyRole; }).Label,
                role: self.selectThirdPartyRole
            });
        }
        else if (self.selectRecipientType === this.arrRecipientType.find(function (item) { return item.Code === "CCI"; }).Id) {
            self.mailRecipients.lstMailCci.push({
                mail: self.arrThirdPartyRole.find(function (item) { return item.Id === self.selectThirdPartyRole; }).Label,
                role: self.selectThirdPartyRole
            });
        }
        var existItem = this.thirdPartyRoleSelectedList.filter(function (item) { return item.recipientTypeId === self.selectRecipientType && item.thirdPartyId === self.selectThirdPartyRole; });
        if (existItem.length === 0) {
            this.thirdPartyRoleSelectedList.push({ recipientTypeId: self.selectRecipientType, thirdPartyId: self.selectThirdPartyRole });
        }
    };
    MailRecipientComponent.prototype.getMailList = function (mailInput) {
        var resultTemp = [];
        var lstMail = [];
        var lstMailDup = [];
        var lstMailFinal = [];
        // Get list email
        resultTemp = mailInput.split(";");
        for (var i = 0; i < resultTemp.length; i++) {
            if (resultTemp[i].trim() != "") {
                lstMail.push(resultTemp[i].trim());
            }
        }
        // Remove duplicate email
        lstMail.forEach(function (item) {
            if (lstMailDup.indexOf(item) < 0) {
                lstMailDup.push(item);
            }
        });
        // Return final list
        lstMailDup.forEach(function (item) {
            lstMailFinal.push({ mail: item });
        });
        return lstMailFinal;
    };
    MailRecipientComponent.prototype.getFinalListMail = function (lstInput, textInput) {
        var self = this;
        var lstMail = [];
        var lstMailDup = [];
        var lstMailFinal = lstInput;
        // Get form input control
        var lstMailTemp = self.getMailList(textInput);
        lstMailTemp.forEach(function (item) {
            lstMailFinal.push(item);
        });
        // Remove duplicate
        lstMailFinal.forEach(function (item) {
            lstMail.push(item.mail);
        });
        lstMail.forEach(function (item) {
            if (lstMailDup.indexOf(item) < 0) {
                lstMailDup.push(item);
            }
        });
        lstMailFinal = [];
        lstMailDup.forEach(function (item) {
            lstMailFinal.push({ mail: item });
        });
        return lstMailFinal;
    };
    MailRecipientComponent.prototype.onSubmit = function () {
        var self = this;
        self.$v.$touch();
        if (!self.$v.mailTo.$invalid && !self.$v.mailCc.$invalid && !self.$v.mailCci.$invalid) {
            self.getFinalListMail(self.mailRecipients.lstMailTo, self.mailTo);
            self.getFinalListMail(self.mailRecipients.lstMailCc, self.mailCc);
            self.getFinalListMail(self.mailRecipients.lstMailCci, self.mailCci);
            self.mailTo = "";
            self.mailCc = "";
            self.mailCci = "";
            self.isSubmit = true;
            self.mailRecipientStatus = "filled";
            self.updateAlertTriggerMailRecipients();
        }
    };
    MailRecipientComponent.prototype.onReset = function () {
        this.mailTo = "";
        this.mailCc = "";
        this.mailCci = "";
        this.isThirdPartyRole = false;
        this.selectRecipientType = null;
        this.selectThirdPartyRole = null;
        this.isSubmit = false;
        this.thirdPartyRoleSelectedList = [];
        this.mailRecipients = { lstMailCc: [], lstMailCci: [], lstMailTo: [] };
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_5__["AlertTriggerForm"].onResetMailRecipients();
    };
    MailRecipientComponent.prototype.receiveDataFromStore = function () {
        var _this = this;
        this.mailRecipients = { lstMailCc: [], lstMailCci: [], lstMailTo: [] };
        // Mail TO
        this.storeMailRecipients.filter(function (item) { return item.RecipientTypeId === _this.arrRecipientType.find(function (type) { return type.Code === "MTO"; }).Id; })
            .forEach(function (item) {
            _this.mailRecipients.lstMailTo.push({
                mail: item.ThirdPartyRoleId === null ? item.EmailAddress
                    : _this.arrThirdPartyRole.find(function (role) { return role.Id === item.ThirdPartyRoleId; }).Label,
                role: item.ThirdPartyRoleId
            });
        });
        // Mail CC
        this.storeMailRecipients.filter(function (item) { return item.RecipientTypeId === _this.arrRecipientType.find(function (type) { return type.Code === "MCC"; }).Id; })
            .forEach(function (item) {
            _this.mailRecipients.lstMailCc.push({
                mail: item.ThirdPartyRoleId === null ? item.EmailAddress
                    : _this.arrThirdPartyRole.find(function (role) { return role.Id === item.ThirdPartyRoleId; }).Label,
                role: item.ThirdPartyRoleId
            });
        });
        // Mail CCI
        this.storeMailRecipients.filter(function (item) { return item.RecipientTypeId === _this.arrRecipientType.find(function (type) { return type.Code === "CCI"; }).Id; })
            .forEach(function (item) {
            _this.mailRecipients.lstMailCci.push({
                mail: item.ThirdPartyRoleId === null ? item.EmailAddress
                    : _this.arrThirdPartyRole.find(function (role) { return role.Id === item.ThirdPartyRoleId; }).Label,
                role: item.ThirdPartyRoleId
            });
        });
    };
    MailRecipientComponent.prototype.updateAlertTriggerMailRecipients = function () {
        var _this = this;
        // Mail TO
        this.mailRecipients.lstMailTo.forEach(function (item) {
            _this.storeMailRecipients.push({
                Id: null,
                AlertEmail: null,
                RecipientType: _this.arrRecipientType.find(function (type) { return type.Code === "MTO"; }),
                RecipientTypeId: _this.arrRecipientType.find(function (type) { return type.Code === "MTO"; }).Id,
                EmailAddress: item.mail,
                ThirdPartyRoleId: item.role
            });
        });
        // Mail CC
        this.mailRecipients.lstMailCc.forEach(function (item) {
            _this.storeMailRecipients.push({
                Id: null,
                AlertEmail: null,
                RecipientType: _this.arrRecipientType.find(function (type) { return type.Code === "MCC"; }),
                RecipientTypeId: _this.arrRecipientType.find(function (type) { return type.Code === "MCC"; }).Id,
                EmailAddress: item.mail,
                ThirdPartyRoleId: item.role
            });
        });
        // Mail CCI
        this.mailRecipients.lstMailCci.forEach(function (item) {
            _this.storeMailRecipients.push({
                Id: null,
                AlertEmail: null,
                RecipientType: _this.arrRecipientType.find(function (type) { return type.Code === "CCI"; }),
                RecipientTypeId: _this.arrRecipientType.find(function (type) { return type.Code === "CCI"; }).Id,
                EmailAddress: item.mail,
                ThirdPartyRoleId: item.role
            });
        });
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("mailRecipientStatus"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("storeMailRecipients"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MailRecipientComponent.prototype, "processGetDataFromStore", null);
    MailRecipientComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./mail-recipients.html */ "./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.html"),
            components: {
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_2__["FormHeaderComponent"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_3__["GroupButtonForm"],
                "btn-icon-add": _common_button_icon_add__WEBPACK_IMPORTED_MODULE_4__["ButtonIconAddComponent"]
            },
            validations: {
                mailTo: {
                    requiredMail: function (value, vm) {
                        return vm.mailToRequired(value);
                    },
                    mustBeEmail: function (value, vm) {
                        return vm.updateMailTo(value);
                    }
                },
                mailCc: {
                    mustBeEmail: function (value, vm) {
                        return vm.updateMailCc(value);
                    }
                },
                mailCci: {
                    mustBeEmail: function (value, vm) {
                        return vm.updateMailCci(value);
                    }
                }
            }
        })
    ], MailRecipientComponent);
    return MailRecipientComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.html":
/*!********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"mailStructureStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"5\" title=\"Mail structure\" :status=\"mailStructureStatus\"></form-header>\r\n        <b-form @submit.prevent=\"onSubmit($event)\" @reset=\"onReset\">\r\n            <b-row>\r\n                <b-col>\r\n                    <div class=\"font-explain\">Choose the information you want to display in your mails</div>\r\n                </b-col>\r\n            </b-row>\r\n\r\n            <b-row v-show=\"isCbChecked != null && isCbChecked == false\">\r\n                <b-col>\r\n                    <div class=\"font-explain\" style=\"color: red\">* At least one item must be selected</div>\r\n                </b-col>\r\n            </b-row>\r\n\r\n            <b-row id=\"mailStructureCbForm\">\r\n                <b-col class=\"b--col--mod padding--mod\">\r\n                    <b-list-group>\r\n\r\n                        <div v-for=\"(item, index) in dicData\">\r\n                            <b-row>\r\n                                <b-col>\r\n                                    <custom-checkbox :dicData=\"item\"\r\n                                                     :dicCheckbox=\"dicCheckbox[index]\"\r\n                                                     :labelCategoryClass=\"labelCategory\"\r\n                                                     :labelItemClass=\"labelItem\"\r\n                                                     @onSelectCheckbox=\"handleSelectCheckbox\">\r\n                                                        \r\n                                    </custom-checkbox>\r\n                                </b-col>\r\n                            </b-row>\r\n                        </div>\r\n\r\n                    </b-list-group>\r\n                </b-col>\r\n            </b-row>\r\n\r\n            <!--<b-row>\r\n                <b-col>\r\n                    <div v-for=\"(item, index) in dicCheckbox\">\r\n                        {{ item.Selected }}\r\n                    </div>\r\n                </b-col>\r\n            </b-row>-->\r\n\r\n            <b-row>\r\n                <b-col>\r\n                    <group-button-form txtCancel=\"Cancel creation\" txtContinue=\"Continue to Attachements\">\r\n                        <b-button variant=\"outline-secondary\" @click=\"onMailPreview\">Mail Preview</b-button>\r\n                    </group-button-form>\r\n                </b-col>\r\n            </b-row>\r\n        </b-form>\r\n\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(mailStructureStatus) > -1\">\r\n        <form-header class=\"header-component\"\r\n                     @formIsEditable=\"onUpdateStatus($event)\"\r\n                     title=\"Mail Structure\"\r\n                     :status=\"mailStructureStatus\">\r\n        </form-header>\r\n\r\n\r\n        <div v-for=\"(item, index) in filterSelectedArr\">\r\n            <div style=\"padding-bottom: 5px\" class=\"recap-mode\">\r\n                <div class=\"title-recap\"> {{ item.Category }}</div>\r\n                <div class=\"content-recap\"> {{ item.DisplayItems }}</div>\r\n            </div>\r\n        </div>\r\n\r\n    </template>\r\n\r\n    <template v-if=\"mailStructureStatus === 'empty'\">\r\n        <form-header class=\"header-component\"\r\n                     number=\"5\"\r\n                     title=\"Mail Structure\"\r\n                     :status=\"mailStructureStatus\">\r\n        </form-header>\r\n    </template>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss":
/*!********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-structure-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-structure-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-structure-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.ts":
/*!******************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.ts ***!
  \******************************************************************************************/
/*! exports provided: MailStructureFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailStructureFormComponent", function() { return MailStructureFormComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _custom_checkbox_custom_checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../custom-checkbox/_/custom-checkbox */ "./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _mail_structure_form_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mail-structure-form.scss */ "./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss");
/* harmony import */ var _mail_structure_form_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mail_structure_form_scss__WEBPACK_IMPORTED_MODULE_6__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MailStructureModule = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["AlertTriggerForm"].component.MailStructureModule;
var MailStructureFormComponent = /** @class */ (function (_super) {
    __extends(MailStructureFormComponent, _super);
    function MailStructureFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelCategory = "label--category";
        _this.labelItem = "label--item";
        _this.dicData = [];
        _this.isCbChecked = null;
        return _this;
    }
    Object.defineProperty(MailStructureFormComponent.prototype, "dicCheckbox", {
        get: function () {
            return MailStructureModule.dicCheckbox;
        },
        set: function (newVal) {
            MailStructureModule.dicCheckbox = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailStructureFormComponent.prototype, "arrayMailStructuresDictionary", {
        get: function () {
            return MailStructureModule.arrMailStructureData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailStructureFormComponent.prototype, "arrayCategories", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_5__["Root"].arrCategories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailStructureFormComponent.prototype, "arrayFields", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_5__["Root"].arrFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailStructureFormComponent.prototype, "mailStructureStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["ETrigger"].MAIL_STRUCTURE; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["ETrigger"].MAIL_STRUCTURE; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailStructureFormComponent.prototype, "mailStructureToSaved", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["AlertTriggerForm"].alertTrigger.MailStructure;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["AlertTriggerForm"].alertTrigger.MailStructure = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MailStructureFormComponent.prototype, "filterSelectedArr", {
        get: function () {
            var filter = new Array();
            this.dicCheckbox.forEach(function (item, index) {
                if (item.Selected.length > 0) {
                    var itemLabels = item.Selected.map(function (ite) { return ite.Label; });
                    var displayStrItemLabels = itemLabels.length > 0
                        ? itemLabels.join(", ")
                        : " ";
                    filter.push({
                        Category: item.Key.Label.toUpperCase(),
                        DisplayItems: displayStrItemLabels,
                    });
                }
            });
            return filter;
        },
        enumerable: true,
        configurable: true
    });
    MailStructureFormComponent.prototype.initUI = function () {
        var _this = this;
        if (this.arrayMailStructuresDictionary.length > 0) {
            this.arrayMailStructuresDictionary.forEach(function (item) {
                // data load
                _this.dicData.push({
                    Key: {
                        Id: item.Key.Id,
                        Label: item.Key.Label,
                        Abbr: item.Key.Code
                    },
                    Value: item.Value.map(function (m) { return ({
                        Id: m.Id,
                        Label: m.Label,
                        Abbr: m.Code
                    }); })
                });
                // data checked
                _this.dicCheckbox.push({
                    Key: {
                        Id: item.Key.Id,
                        Label: item.Key.Label,
                        Abbr: item.Key.Code
                    },
                    Selected: [],
                    AllSelected: false,
                    Indeterminate: false
                });
            });
        }
    };
    MailStructureFormComponent.prototype.onUpdateStatus = function (newStatus) {
        this.mailStructureStatus = newStatus;
    };
    MailStructureFormComponent.prototype.onSubmit = function (event) {
        var _this = this;
        this.isCbChecked = false;
        if (this.dicCheckbox.some(function (item) { return item.AllSelected || item.Indeterminate; })) {
            this.mailStructureToSaved = [];
            this.dicCheckbox.filter(function (item) { return item.AllSelected || item.Indeterminate; }).forEach(function (item) {
                var _a;
                var arrDataPush = item.Selected.map(function (mItem) { return ({
                    Id: null,
                    AlertEmail: null,
                    Field: _this.arrayFields.find(function (f) { return f.Id === mItem.Id; })
                }); });
                (_a = _this.mailStructureToSaved).push.apply(_a, arrDataPush);
                _this.mailStructureStatus = "filled";
                _this.isCbChecked = true;
            });
        }
    };
    MailStructureFormComponent.prototype.onReset = function () {
        this.isCbChecked = null;
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_4__["AlertTriggerForm"].onResetMailStructure();
    };
    MailStructureFormComponent.prototype.onMailPreview = function () {
        //let routeData = this.$router.resolve({ name: "mailTemplateAlert" });
        //window.open(routeData.href, "_blank");
    };
    MailStructureFormComponent.prototype.initRecapForm = function () {
        var that = this;
        if (["filled", "recapNonEdit"].indexOf(that.mailStructureStatus) > -1) {
            if (that.mailStructureToSaved !== null && that.mailStructureToSaved.length > 0) {
                if (that.dicCheckbox.length > 0 && !that.dicCheckbox.some(function (item) { return item.Selected.length > 0; })) {
                    that.mailStructureToSaved.forEach(function (item) {
                        var selectedField = that.arrayFields.find(function (f) { return f.Id === item.Field.Id; });
                        that.dicCheckbox.find(function (cb) { return cb.Key.Id === selectedField.Category.Id; }).Selected.push({
                            Id: selectedField.Id,
                            Label: selectedField.Label,
                            Abbr: selectedField.Code
                        });
                    });
                    that.dicCheckbox.filter(function (item) { return item.Selected.length > 0; }).forEach(function (item) {
                        var selectedDicData = that.dicData.find(function (dd) { return dd.Key.Id === item.Key.Id; });
                        if (selectedDicData.Value.length === item.Selected.length) {
                            item.AllSelected = true;
                            item.Indeterminate = false;
                        }
                        else if (selectedDicData.Value.length > item.Selected.length) {
                            item.AllSelected = false;
                            item.Indeterminate = true;
                        }
                    });
                }
            }
        }
    };
    MailStructureFormComponent.prototype.handleSelectCheckbox = function () {
        if (this.dicCheckbox.length > 0) {
            this.isCbChecked = this.dicCheckbox.some(function (item) { return item.AllSelected || item.Indeterminate; });
        }
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("arrayMailStructuresDictionary"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MailStructureFormComponent.prototype, "initUI", null);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("mailStructureStatus"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("mailStructureToSaved"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("dicCheckbox"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MailStructureFormComponent.prototype, "initRecapForm", null);
    MailStructureFormComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./mail-structure-form.html */ "./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.html"),
            components: {
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_1__["FormHeaderComponent"],
                "custom-checkbox": _custom_checkbox_custom_checkbox__WEBPACK_IMPORTED_MODULE_3__["CustomCheckboxComponent"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_2__["GroupButtonForm"]
            },
        })
    ], MailStructureFormComponent);
    return MailStructureFormComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.html":
/*!********************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template>\r\n\r\n        <b-form-group>\r\n            <b-row>\r\n                <b-col>\r\n                    <b-form-checkbox v-model=\"dicCheckbox.AllSelected\"\r\n                                     :indeterminate=\"dicCheckbox.Indeterminate\"\r\n                                     aria-describedby=\"values\"\r\n                                     aria-controls=\"values\"\r\n                                     @change=\"toggleAll($event)\">\r\n\r\n                        <h6 v-bind:class=\"labelCategoryClass\">\r\n                            {{ dicData.Key.Label }}\r\n                        </h6>\r\n                    </b-form-checkbox>\r\n                </b-col>\r\n\r\n                <b-col style=\"text-align: right;\">\r\n                    <a class=\"fas fa-angle-down fa-2x custom--fa--arrow rotate\"\r\n                       v-bind:class=\"{ 'custom--disable': dicData.Value.length == 0 }\"\r\n                       :id=\"'displayItemsBtn_' + generateCustomId(dicData.Key.Label, String(dicData.Key.Id))\"\r\n                       v-on:click=\"displayListItems($event)\"\r\n                       :title=\"dicData.Value.length > 0 ? 'Show Items List' : 'No Item' \">\r\n                    </a>\r\n                </b-col>\r\n            </b-row>\r\n\r\n            <div class=\"list--items\">\r\n                <hr />\r\n\r\n                <b-form-group>\r\n                    <div class=\"col--count--2\" v-bind:class=\"labelItemClass\">\r\n                        <b-form-checkbox v-for=\"(item, index) in dicData.Value\"\r\n                                         class=\"ml-4\"\r\n                                         v-model=\"dicCheckbox.Selected\"\r\n                                         :key=\"item.Id\"\r\n                                         :value=\"item\"\r\n                                         name=\"item.Short\">\r\n                            {{ item.Label }}\r\n                        </b-form-checkbox>\r\n                    </div>\r\n                </b-form-group>\r\n\r\n                <hr />\r\n            </div>\r\n        </b-form-group>\r\n\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss":
/*!********************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./custom-checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./custom-checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./custom-checkbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.ts":
/*!******************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.ts ***!
  \******************************************************************************************************/
/*! exports provided: CustomCheckboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomCheckboxComponent", function() { return CustomCheckboxComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_checkbox_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-checkbox.scss */ "./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss");
/* harmony import */ var _custom_checkbox_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_custom_checkbox_scss__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(vuelidate__WEBPACK_IMPORTED_MODULE_1___default.a);
var CustomCheckboxComponent = /** @class */ (function (_super) {
    __extends(CustomCheckboxComponent, _super);
    function CustomCheckboxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomCheckboxComponent.prototype.generateCustomId = function (name, id) {
        return name.replace(/\s/g, "_") + "_" + id.replace(/\s/g, "_");
    };
    CustomCheckboxComponent.prototype.displayListItems = function (e) {
        if (this.dicData.Value.length > 0) {
            var lstClasses = e.target.classList;
            lstClasses.toggle("up");
            var itemListElem = e.currentTarget.parentElement.parentNode.nextElementSibling;
            itemListElem.classList.toggle("display--items");
        }
    };
    CustomCheckboxComponent.prototype.toggleAll = function (checked) {
        this.dicCheckbox.Selected = checked ? this.dicData.Value.slice() : [];
        this.$emit("onSelectCheckbox");
    };
    CustomCheckboxComponent.prototype.onDicCheckboxChange = function (newVal) {
        if (newVal.Selected.length === 0) {
            newVal.Indeterminate = false;
            newVal.AllSelected = false;
        }
        else if (newVal.Selected.length === this.dicData.Value.length) {
            newVal.Indeterminate = false;
            newVal.AllSelected = true;
        }
        else {
            newVal.Indeterminate = true;
            newVal.AllSelected = false;
        }
        this.$emit("onSelectCheckbox");
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], CustomCheckboxComponent.prototype, "labelCategoryClass", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], CustomCheckboxComponent.prototype, "labelItemClass", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Object)
    ], CustomCheckboxComponent.prototype, "dicData", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Object)
    ], CustomCheckboxComponent.prototype, "dicCheckbox", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("dicCheckbox", { deep: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], CustomCheckboxComponent.prototype, "onDicCheckboxChange", null);
    CustomCheckboxComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./custom-checkbox.html */ "./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.html"),
        })
    ], CustomCheckboxComponent);
    return CustomCheckboxComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-template/mail-template-page.html":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-template/mail-template-page.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<wa-layout>\r\n    <template slot=\"header\">\r\n        <h1>\r\n            <strong>\r\n              Mail Tempalte\r\n            </strong>\r\n        </h1>\r\n    </template>\r\n\r\n    <template slot=\"content\">\r\n        <b-container fluid style=\"background-color: #f7f9fc;\" class=\"content\">\r\n            <div class=\"mail-content\">\r\n                <b-row>\r\n                    <b-col cols=\"12\"> \r\n                        <div class=\"mail-tempalte-header\">\r\n                            <div class=\"icon-header\">\r\n                                <i class=\"fas fa-envelope font-size\"></i>\r\n                            </div>\r\n                            <div class=\"title-header\">\r\n                                <span class=\"title-content\">Message</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"mail-tempalte-content\">\r\n                            <span class=\"message-content\"> {{messages}}</span> \r\n                        </div>\r\n                    </b-col>\r\n                </b-row>\r\n                \r\n                <b-row>\r\n                    <b-col cols=\"12\">\r\n                        <div class=\"mail-tempalte-header\">\r\n                            <div class=\"icon-header\">\r\n                                <i class=\"fas fa-plane font-size\"></i>\r\n                            </div>\r\n                            <div class=\"title-header\">\r\n                                <span class=\"title-content\">Shipment</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"mail-tempalte-content\">\r\n                            <b-row>\r\n                                <b-col cols=\"4\"> \r\n                                    <b-row>\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> Incorterm: {{shipments.incoretem}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                    <b-row>\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> Voyage Number: {{shipments.VoyageNumber}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                                <b-col cols=\"4\">\r\n                                    <b-row>\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> Mode of Transport: {{shipments.modelofTransport}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                    <b-row>\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> Flight Number: {{shipments.flightNUmber}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                                <b-col cols=\"4\">\r\n                                    <b-row>\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> Jobfile type: {{shipments.jobfileType}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                    <b-row>\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> Weight: {{shipments.weight}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                            </b-row>\r\n                        </div>\r\n                    </b-col>\r\n                </b-row>\r\n                <b-row>\r\n                    <b-col cols=\"12\">\r\n                        <div class=\"mail-tempalte-header\">\r\n                            <div class=\"icon-header\">\r\n                                <i class=\"fas fa-calendar font-size\"></i>\r\n                            </div>\r\n                            <div class=\"title-header\">\r\n                                <span class=\"title-content\">Events</span>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"mail-tempalte-content\">\r\n                            <b-row>\r\n                                <b-col cols=\"3\">\r\n                                    <b-row>\r\n                                        <b-col class=\"text-center\"> \r\n                                            <span class=\"event-header\"> Event</span>\r\n                                        </b-col>\r\n                                    </b-row>                                    \r\n                                    <b-row v-for=\"item in events\">\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> {{item.event}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                                <b-col cols=\"3\">\r\n                                    <b-row>\r\n                                        <b-col class=\"text-center\">\r\n                                            <span class=\"event-header\"> Date</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                    <b-row v-for=\"item in events\">\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> {{item.date}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                                <b-col cols=\"3\">\r\n                                    <b-row>\r\n                                        <b-col class=\"text-center\">\r\n                                            <span class=\"event-header\"> Location</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                    <b-row v-for=\"item in events\">\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> {{item.location}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                                <b-col cols=\"3\">\r\n                                    <b-row>\r\n                                        <b-col class=\"text-center\">\r\n                                            <span class=\"event-header\"> Comment</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                    <b-row v-for=\"item in events\">\r\n                                        <b-col>\r\n                                            <span class=\"message-content\"> {{item.comment}}</span>\r\n                                        </b-col>\r\n                                    </b-row>\r\n                                </b-col>\r\n                            </b-row>  \r\n                        </div>\r\n                    </b-col>\r\n                </b-row>\r\n            </div>\r\n\r\n        </b-container>\r\n    </template>\r\n</wa-layout>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-template-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-template-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mail-template-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/mail-template/mail-template-page.ts":
/*!*********************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/mail-template/mail-template-page.ts ***!
  \*********************************************************************************/
/*! exports provided: MailTemplatePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailTemplatePageComponent", function() { return MailTemplatePageComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var _mail_template_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mail-template-page.scss */ "./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss");
/* harmony import */ var _mail_template_page_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mail_template_page_scss__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MailTemplatePageComponent = /** @class */ (function (_super) {
    __extends(MailTemplatePageComponent, _super);
    function MailTemplatePageComponent() {
        var _this = _super.call(this) || this;
        _this.messages = "This is message";
        _this.shipments = {
            incoretem: "DAP-Deliver At Place",
            modelofTransport: "A-Air",
            jobfileType: "01-Break Bulk",
            VoyageNumber: "123456",
            flightNUmber: "AF267",
            weight: "12,5kg"
        };
        _this.events = [
            {
                event: "Expected Duparture 1",
                date: "19 oct 2018-3:33 PM 1",
                location: "CA-Montreal 1",
                comment: "this commnet 1"
            },
            { event: "Expected Duparture 2",
                date: "19 oct 2018-3:33 PM 2",
                location: "CA-Montreal 2",
                comment: "this commnet 2"
            }
        ];
        return _this;
    }
    MailTemplatePageComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./mail-template-page.html */ "./ClientApp/src/components/alert-form/mail-template/mail-template-page.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_1__["LayoutComponent"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], MailTemplatePageComponent);
    return MailTemplatePageComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.html":
/*!************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"mainStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"1\" title=\"Main information\" :status=\"mainStatus\"></form-header>\r\n        <b-form @submit.prevent=\"onSubmit\" @reset=\"onReset\">\r\n            <b-row style=\"margin-top: 30px;\">\r\n                <b-col cols=\"6\">\r\n                    <client-info ref=\"clientInfo\"\r\n                                 :status=\"mainStatus\"\r\n                                 :validation=\"$v.form.clientInfo\">\r\n                    </client-info>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <styled-form-radio :status=\"mainStatus\"\r\n                                       title=\"Module\"\r\n                                       description=\"This choice will change on what objects Link alerts will be based\"\r\n                                       :icon1=\"optionIcon.transport\"\r\n                                       :label1=\"moduleTransport.Label\"\r\n                                       :id1=\"moduleTransport.Id\"\r\n                                       :icon2=\"optionIcon.shipment\"\r\n                                       :label2=\"moduleShipment.Label\"\r\n                                       :id2=\"moduleShipment.Id\"\r\n                                       classExplain=\"font-explain\"\r\n                                       v-model=\"selectedModuled\"\r\n                                       :disableValue=\"1\">\r\n                    </styled-form-radio>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <styled-form-radio :status=\"mainStatus\"\r\n                                       title=\"Alert Type\"\r\n                                       description=\"Choose between triggered alerts (to receive mails instantly) or\r\n                    scheduled alerts (to receive a report regularly)\"\r\n                                       :icon1=\"optionIcon.trigger\"\r\n                                       :label1=\"typeTrigger.Label\"\r\n                                       :id1=\"typeTrigger.Id\"\r\n                                       :icon2=\"optionIcon.schedule\"\r\n                                       :label2=\"typeScheduled.Label\"\r\n                                       :id2=\"typeScheduled.Id\"\r\n                                       classExplain=\"font-explain\"\r\n                                       v-model=\"selectedType\"\r\n                                       :disableValue=\"2\">\r\n                    </styled-form-radio>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <group-button-form txtCancel=\"Cancel creation\" txtContinue=\"Continue to Sending Conditions\"></group-button-form>\r\n                </b-col>\r\n            </b-row>\r\n        </b-form>\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(mainStatus) > -1\">\r\n        <form-header class=\"header-component\"\r\n                     @formIsEditable=\"onUpdateStatus($event)\"\r\n                     title=\"Main information\"\r\n                     :status=\"mainStatus\">\r\n        </form-header>\r\n        <b-row>\r\n            <b-col>\r\n                <div style=\"padding-right: 10%\">\r\n                    <b-row>\r\n                        <b-col cols=\"4\">\r\n                            <client-info v-model=\"form.clientInfo\"\r\n                                         :status=\"mainStatus\">\r\n                            </client-info>\r\n                        </b-col>\r\n                        <b-col cols=\"4\" class=\"recap-mode\">\r\n                            <styled-form-radio :status=\"mainStatus\"\r\n                                               title=\"Module\"\r\n                                               description=\"This choice will change on what objects Link alerts will be based\"\r\n                                               :id1=\"moduleTransport.Id\"\r\n                                               :icon1=\"optionIcon.transport\"\r\n                                               :label1=\"moduleTransport.Label\"\r\n                                               :icon2=\"optionIcon.shipment\"\r\n                                               :label2=\"moduleShipment.Label\"\r\n                                               :id2=\"moduleShipment.Id\"\r\n                                               classFilled=\"content-recap\"\r\n                                               v-model=\"selectedModuled\">\r\n                            </styled-form-radio>\r\n                        </b-col>\r\n                        <b-col cols=\"4\" class=\"recap-mode\">\r\n                            <styled-form-radio :status=\"mainStatus\"\r\n                                               title=\"Alert Type\"\r\n                                               description=\"Choose between triggered alerts (to receive mails instantly) or\r\n                                                            scheduled alerts (to receive a report regularly)\"\r\n                                               :icon1=\"optionIcon.trigger\"\r\n                                               :label1=\"typeTrigger.Label\"\r\n                                               :id1=\"typeTrigger.Id\"\r\n                                               :icon2=\"optionIcon.schedule\"\r\n                                               :label2=\"typeScheduled.Label\"\r\n                                               :id2=\"typeScheduled.Id\"\r\n                                               classFilled=\"content-recap\"\r\n                                               v-model=\"selectedType\">\r\n                            </styled-form-radio>\r\n                        </b-col>\r\n                    </b-row>\r\n                </div>\r\n            </b-col>\r\n        </b-row>\r\n    </template>\r\n\r\n    <template v-if=\"mainStatus === 'empty'\">\r\n        <form-header class=\"header-component\"\r\n                     number=\"1\"\r\n                     title=\"Main information\"\r\n                     :status=\"mainStatus\">\r\n        </form-header>\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss":
/*!************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./main-information-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./main-information-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./main-information-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.ts":
/*!**********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.ts ***!
  \**********************************************************************************************/
/*! exports provided: MainInformationFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainInformationFormComponent", function() { return MainInformationFormComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _client_info__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../client-info */ "./ClientApp/src/components/alert-form/main-information-form/client-info/index.ts");
/* harmony import */ var _shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/styled-form-radio */ "./ClientApp/src/components/_shared/styled-form-radio/index.ts");
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _util_validators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../util/validators */ "./ClientApp/src/util/validators.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _main_information_form_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./main-information-form.scss */ "./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss");
/* harmony import */ var _main_information_form_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_main_information_form_scss__WEBPACK_IMPORTED_MODULE_10__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(vuelidate__WEBPACK_IMPORTED_MODULE_1___default.a);
var initData = {
    moduleType: {
        Code: "",
        Id: null,
        Label: ""
    },
    alertType: {
        Code: "",
        Id: null,
        Label: ""
    }
};
var MainInformationFormComponent = /** @class */ (function (_super) {
    __extends(MainInformationFormComponent, _super);
    function MainInformationFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moduleTransport = JSON.parse(JSON.stringify(initData.moduleType));
        _this.moduleShipment = JSON.parse(JSON.stringify(initData.moduleType));
        _this.typeTrigger = JSON.parse(JSON.stringify(initData.alertType));
        _this.typeScheduled = JSON.parse(JSON.stringify(initData.alertType));
        _this.optionIcon = {
            transport: "fas fa-plane fa-lg",
            shipment: "fas fa-map-marker-alt fa-lg",
            trigger: "fas fa-bolt fa-lg",
            schedule: "fas fa-clock fa-lg"
        };
        _this.selectedModuled = JSON.parse(JSON.stringify(_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["defaultValueOption"]));
        _this.selectedType = JSON.parse(JSON.stringify(_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["defaultValueOption"]));
        return _this;
    }
    Object.defineProperty(MainInformationFormComponent.prototype, "GBMainInformation", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.MainInformation = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainInformationFormComponent.prototype, "form", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].component.MainInformationModule;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].component.MainInformationModule = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainInformationFormComponent.prototype, "mainStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].MAIN_INFORMATION; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].MAIN_INFORMATION; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainInformationFormComponent.prototype, "arrModuleType", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_9__["Root"].arrModuleType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainInformationFormComponent.prototype, "arrAlertType", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_9__["Root"].arrAlertType;
        },
        enumerable: true,
        configurable: true
    });
    MainInformationFormComponent.prototype.init = function () {
        if (this.arrModuleType.length > 0) {
            this.moduleTransport = this.arrModuleType.find(function (item) { return item.Code === "TRE"; });
            this.moduleShipment = this.arrModuleType.find(function (item) { return item.Code === "SHI"; });
        }
        if (this.arrAlertType.length > 0) {
            this.typeTrigger = this.arrAlertType.find(function (item) { return item.Code === "TRI"; });
            this.typeScheduled = this.arrAlertType.find(function (item) { return item.Code === "SCH"; });
        }
    };
    MainInformationFormComponent.prototype.alertTypePropertyChange = function () {
        var _this = this;
        if (["filled", "recapNonEdit"].indexOf(this.mainStatus) > -1) {
            if (this.GBMainInformation.ModuleType !== null && this.GBMainInformation.AlertType !== null) {
                var selectedModuleType = this.arrModuleType.find(function (item) { return item.Id === _this.GBMainInformation.ModuleType.Id; });
                var selectedAlertType = this.arrAlertType.find(function (item) { return item.Id === _this.GBMainInformation.AlertType.Id; });
                this.selectedType = {
                    icon: selectedAlertType.Code === "TRI" ? this.optionIcon.trigger : this.optionIcon.schedule,
                    label: selectedAlertType.Label,
                    id: selectedAlertType.Id,
                    isError: false
                };
                this.selectedModuled = {
                    icon: selectedModuleType.Code === "TRE" ? this.optionIcon.transport : this.optionIcon.shipment,
                    label: selectedModuleType.Label,
                    id: selectedModuleType.Id,
                    isError: false
                };
                this.form.clientInfo.processName = this.GBMainInformation.Name;
                this.form.clientInfo.selectedClient = this.GBMainInformation.Transac;
            }
        }
    };
    MainInformationFormComponent.prototype.onUpdateStatus = function (newStatus) {
        this.mainStatus = newStatus;
    };
    MainInformationFormComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var existProcess, procesName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$v.form.$touch();
                        this.selectedModuled.isError = this.$v.selectedModuled.$invalid;
                        this.selectedType.isError = this.$v.selectedType.$invalid;
                        if (!(!this.$v.form.clientInfo.$invalid && !this.selectedModuled.isError && !this.selectedType.isError)) return [3 /*break*/, 3];
                        existProcess = false;
                        procesName = this.form.clientInfo.processName;
                        if (!(this.GBMainInformation.Id == 0 || (this.GBMainInformation.Id != 0 && procesName != this.GBMainInformation.Name))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkExistProcess()];
                    case 1:
                        existProcess = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.$refs.clientInfo.existProcess = existProcess;
                        if (!existProcess) {
                            this.mainStatus = "filled";
                            _store_root_module__WEBPACK_IMPORTED_MODULE_9__["Root"].fetchShowLoading(false);
                            // Build data to server
                            this.GBMainInformation.Name = this.form.clientInfo.processName;
                            this.GBMainInformation.Transac = this.form.clientInfo.selectedClient;
                            this.GBMainInformation.ModuleType = {
                                Id: this.selectedModuled.id,
                                Label: this.selectedModuled.label
                            };
                            this.GBMainInformation.AlertType = {
                                Id: this.selectedType.id,
                                Label: this.selectedType.label
                            };
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MainInformationFormComponent.prototype.checkExistProcess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var existProcess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _store_root_module__WEBPACK_IMPORTED_MODULE_9__["Root"].fetchShowLoading(true);
                        existProcess = false;
                        return [4 /*yield*/, Object(_util_validators__WEBPACK_IMPORTED_MODULE_8__["isProcessExist"])(this.form.clientInfo.processName).then(function (result) {
                                existProcess = result;
                                _store_root_module__WEBPACK_IMPORTED_MODULE_9__["Root"].fetchShowLoading(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, existProcess];
                }
            });
        });
    };
    MainInformationFormComponent.prototype.onReset = function () {
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].onResetMainInformation();
        this.selectedModuled = JSON.parse(JSON.stringify(_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["defaultValueOption"]));
        this.selectedType = JSON.parse(JSON.stringify(_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["defaultValueOption"]));
        this.$refs.clientInfo.existProcess = false;
        this.$v.form.clientInfo.$reset();
        this.$v.selectedModuled.$reset();
        this.$v.selectedType.$reset();
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("arrModuleType"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("arrAlertType"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MainInformationFormComponent.prototype, "init", null);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("mainStatus"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("GBMainInformation"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MainInformationFormComponent.prototype, "alertTypePropertyChange", null);
    MainInformationFormComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./main-information-form.html */ "./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.html"),
            components: {
                "styled-form-radio": _shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["StyledFormRadioComponent"],
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_5__["FormHeaderComponent"],
                "client-info": _client_info__WEBPACK_IMPORTED_MODULE_3__["ClientInfoComponent"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_6__["GroupButtonForm"]
            },
            validations: {
                form: {
                    clientInfo: {
                        processName: {
                            required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                        },
                        selectedClient: {
                            required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                        }
                    }
                },
                selectedModuled: {
                    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"],
                    label: {
                        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                    },
                    id: {
                        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                    }
                },
                selectedType: {
                    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"],
                    label: {
                        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                    },
                    id: {
                        required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                    }
                }
            }
        })
    ], MainInformationFormComponent);
    return MainInformationFormComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.html":
/*!**************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"status === 'active'\">\r\n        <h5>Name & Client</h5>\r\n        <b-form-group id=\"nameInputGroup\"\r\n                      label=\"Choose a name for your new LINK Alert process\"\r\n                      label-for=\"nameInput\"\r\n                      description=\"\" class=\"font-explain\">\r\n            <b-form-input id=\"nameInput\"\r\n                          @change=\"validation.processName.$touch()\"\r\n                          type=\"text\"\r\n                          v-model=\"processName\"\r\n                          placeholder=\"Process Name*\"\r\n                          :class=\"{ 'invalid-input': validation.processName.$error || existProcess }\">\r\n            </b-form-input>\r\n            <div><p class=\"invalid-message\" v-if=\"!validation.processName.required && validation.processName.$dirty\">This field is required</p></div>\r\n            <div><p class=\"invalid-message\" v-if=\"existProcess\">This process name existed</p></div>\r\n\r\n        </b-form-group>\r\n        <b-form-group id=\"clientSelectGroup\"\r\n                      label=\"Define clients you want to use for your alerts\"\r\n                      label-for=\"clientSelect\"\r\n                      description=\"\" class=\"font-explain\">\r\n          \r\n            <b-form-select id=\"clientSelect\" @change=\"validation.selectedClient.$touch()\" v-model=\"selectedClient\" :options=\"arrClients\" value-field=\"Code\" text-field=\"Name\" class=\"mb-3\"\r\n                           :class=\"{ 'invalid-input': validation.selectedClient.$error }\" style=\"background-image: none\">\r\n                <template slot=\"first\">\r\n                    <option value=\"null\" disabled>client *</option>\r\n                </template>\r\n            </b-form-select>\r\n            <p class=\"invalid-message\" v-if=\"!validation.selectedClient.required && validation.selectedClient.$dirty\">This field is required</p>\r\n        </b-form-group>\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(status) > -1\">\r\n        <h6>Name & Client</h6>\r\n        <hr>\r\n        <div style=\"margin-top: -15px;\" class=\"recap-mode\">\r\n            <div class=\"title-recap\">PROCESS NAME</div>\r\n            <div class=\"content-recap\">{{ processName }}</div>\r\n            <div class=\"title-recap\">CLIENT</div>\r\n            <div class=\"content-recap\">{{ selectedText }}</div>\r\n        </div>\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss":
/*!**************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./client-info.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./client-info.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./client-info.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.ts":
/*!************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.ts ***!
  \************************************************************************************************/
/*! exports provided: ClientInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientInfoComponent", function() { return ClientInfoComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_info_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client-info.scss */ "./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss");
/* harmony import */ var _client_info_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_client_info_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientInfoComponent = /** @class */ (function (_super) {
    __extends(ClientInfoComponent, _super);
    function ClientInfoComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.existProcess = false;
        return _this;
    }
    Object.defineProperty(ClientInfoComponent.prototype, "processName", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].component.MainInformationModule.clientInfo.processName;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].component.MainInformationModule.clientInfo.processName = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientInfoComponent.prototype, "selectedClient", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].component.MainInformationModule.clientInfo.selectedClient;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].component.MainInformationModule.clientInfo.selectedClient = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientInfoComponent.prototype, "arrClients", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].arrClients;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientInfoComponent.prototype, "selectedText", {
        get: function () {
            var _this = this;
            if (this.arrClients.length === 0 || this.selectedClient === null) {
                return "";
            }
            return this.arrClients.find(function (item) { return item.Code === _this.selectedClient; }).Name;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], ClientInfoComponent.prototype, "status", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Object)
    ], ClientInfoComponent.prototype, "validation", void 0);
    ClientInfoComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./client-info.html */ "./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.html"),
            components: {}
        })
    ], ClientInfoComponent);
    return ClientInfoComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/main-information-form/client-info/index.ts":
/*!****************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/main-information-form/client-info/index.ts ***!
  \****************************************************************************************/
/*! exports provided: ClientInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/client-info */ "./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientInfoComponent", function() { return _client_info__WEBPACK_IMPORTED_MODULE_0__["ClientInfoComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.html":
/*!****************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <template v-if=\"sendingConditionsStatus === 'active'\">\r\n        <form-header class=\"header-component\" number=\"2\" title=\"Sending Conditions\" :status=\"sendingConditionsStatus\"></form-header>\r\n        <b-form @submit.prevent=\"onSubmit\" @reset=\"onReset\">\r\n            <b-row style=\"margin-top: 20px\">\r\n                <b-col>\r\n                    <div class=\"font-explain\" style=\"margin-bottom:20px\">Filter the shipments you want to be alerted</div>\r\n                    <add-condition></add-condition>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row style=\"margin-top: 50px\">\r\n                <b-col cols=\"6\" offset-md=\"1\">\r\n                    <b-form-select multiple :select-size=\"6\" v-model=\"selectedStrCondition\" :options=\"displayStrConditions()\" class=\"custom-list-selected\" \r\n                                   :validation=\"$v.arrStrConditions\" :class=\"{ 'invalid-input': $v.arrStrConditions.$error }\">\r\n                    </b-form-select>\r\n                </b-col>\r\n                <b-col cols=\"4\">\r\n                    <b-row>\r\n                        <b-col>\r\n                            <b-button variant=\"outline-secondary\" class=\"custom-button\" @click=\"onPreviewForm\">Preview</b-button>\r\n                        </b-col>\r\n                    </b-row>\r\n                    <b-row style=\"margin-top: 10px\">\r\n                        <b-col>\r\n                            <b-button variant=\"danger\" class=\"custom-button\" @click=\"onRemoveItem\">Remove</b-button>\r\n                        </b-col>\r\n                    </b-row>\r\n                </b-col>\r\n            </b-row>\r\n            <b-row>\r\n                <b-col>\r\n                    <group-button-form txtCancel=\"Cancel creation\" txtContinue=\"Continue to Mail Recipients\"></group-button-form>\r\n                </b-col>\r\n            </b-row>\r\n        </b-form>\r\n    </template>\r\n\r\n    <template v-if=\"['filled', 'recapNonEdit', 'recapSpecial'].indexOf(sendingConditionsStatus) > -1\">\r\n        <form-header class=\"header-component\"\r\n                     @formIsEditable=\"onUpdateStatus($event)\"\r\n                     title=\"PDQ\"\r\n                     :status=\"sendingConditionsStatus\">\r\n        </form-header>\r\n        <b-row>\r\n            <b-col class=\"recap-mode\">\r\n                <p v-for=\"item in displayStrConditions()\" class=\"content-recap\">\r\n                    {{item.text}}\r\n                </p>\r\n            </b-col>\r\n        </b-row>\r\n    </template>\r\n\r\n    <template v-if=\"sendingConditionsStatus === 'empty'\">\r\n        <form-header class=\"header-component\"\r\n                     number=\"2\"\r\n                     title=\"Sending Conditions\"\r\n                     :status=\"sendingConditionsStatus\">\r\n        </form-header>\r\n    </template>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss":
/*!****************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./sending-conditions-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./sending-conditions-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./sending-conditions-form.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.ts":
/*!**************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.ts ***!
  \**************************************************************************************************/
/*! exports provided: SendingConditionsFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendingConditionsFormComponent", function() { return SendingConditionsFormComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_form_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/form-header */ "./ClientApp/src/components/_shared/form-header/index.ts");
/* harmony import */ var _shared_group_button_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/group-button-form */ "./ClientApp/src/components/alert-form/_shared/group-button-form/index.ts");
/* harmony import */ var _add_condition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../add-condition */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/index.ts");
/* harmony import */ var _preview_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../preview-form */ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _sending_conditions_form_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sending-conditions-form.scss */ "./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss");
/* harmony import */ var _sending_conditions_form_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_sending_conditions_form_scss__WEBPACK_IMPORTED_MODULE_9__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(vuelidate__WEBPACK_IMPORTED_MODULE_1___default.a);
var SendingConditionsModule = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].component.SendingConditionsModule;
var SendingConditionsFormComponent = /** @class */ (function (_super) {
    __extends(SendingConditionsFormComponent, _super);
    function SendingConditionsFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedStrCondition = [];
        return _this;
    }
    Object.defineProperty(SendingConditionsFormComponent.prototype, "arrConditions", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.SendingConditions;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].alertTrigger.SendingConditions = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendingConditionsFormComponent.prototype, "sendingConditionsStatus", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].SENDING_CONDITIONS; }).status;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["ETrigger"].SENDING_CONDITIONS; }).status = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendingConditionsFormComponent.prototype, "arrStrConditions", {
        get: function () {
            return SendingConditionsModule.arrStrConditions;
        },
        set: function (newVal) {
            SendingConditionsModule.arrStrConditions = newVal;
        },
        enumerable: true,
        configurable: true
    });
    SendingConditionsFormComponent.prototype.onUpdateStatus = function (newStatus) {
        this.sendingConditionsStatus = newStatus;
    };
    SendingConditionsFormComponent.prototype.onSubmit = function () {
        this.$v.arrStrConditions.$touch();
        if (!this.$v.arrStrConditions.$invalid) {
            this.sendingConditionsStatus = "filled";
        }
    };
    SendingConditionsFormComponent.prototype.onReset = function () {
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_7__["AlertTriggerForm"].onResetSendingConditions();
        this.$v.arrStrConditions.$reset();
    };
    SendingConditionsFormComponent.prototype.onPreviewForm = function () {
        //this.$router.push({ name: "previewForm" });
    };
    SendingConditionsFormComponent.prototype.onRemoveItem = function () {
        var _this = this;
        this.selectedStrCondition.forEach(function (item) {
            _this.arrConditions.splice(item.coreIndex, 1);
            var indexConditionRemove = _this.arrStrConditions.findIndex(function (c) { return c.coreIndex === item.coreIndex; });
            _this.arrStrConditions.splice(indexConditionRemove, 1);
        });
    };
    SendingConditionsFormComponent.prototype.getArrStrConditions = function () {
        var _this = this;
        this.arrStrConditions = [];
        if (this.arrConditions.length > 0 || this.sendingConditionsStatus === "filled") {
            this.arrConditions.forEach(function (c, index) {
                var field = _store_root_module__WEBPACK_IMPORTED_MODULE_8__["Root"].arrFields.find(function (x) { return x.Id === c.SourceField.Id; });
                var category = _store_root_module__WEBPACK_IMPORTED_MODULE_8__["Root"].arrCategories.find(function (x) { return x.Id === field.Category.Id; });
                var operator = _store_root_module__WEBPACK_IMPORTED_MODULE_8__["Root"].arrOperators.find(function (x) { return x.Id === c.Operator.Id; });
                var firstSplit = category.Label + " " + field.Label + " " + operator.Label;
                if (_this.arrStrConditions.length > 0 && _this.arrStrConditions.find(function (x) { return x.firstSplit === firstSplit && firstSplit.indexOf("=") > -1; })) {
                    _this.arrStrConditions.find(function (x) { return x.firstSplit === firstSplit && firstSplit.indexOf("=") > 0; }).secondSpit += " or " + c.Value;
                }
                else {
                    _this.arrStrConditions.push({
                        coreIndex: index,
                        firstSplit: firstSplit,
                        secondSpit: c.Value
                    });
                }
            });
        }
    };
    SendingConditionsFormComponent.prototype.displayStrConditions = function () {
        var optStrConditions = [];
        var preText = this.sendingConditionsStatus === "active" ? " -" : "";
        if (this.arrStrConditions.length > 0) {
            this.arrStrConditions.forEach(function (item, index) {
                optStrConditions.push({
                    value: index,
                    text: preText + item.firstSplit + " " + item.secondSpit
                });
            });
        }
        return optStrConditions;
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("arrConditions"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("sendingConditionsStatus"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SendingConditionsFormComponent.prototype, "getArrStrConditions", null);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("arrStrConditions"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Array)
    ], SendingConditionsFormComponent.prototype, "displayStrConditions", null);
    SendingConditionsFormComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./sending-conditions-form.html */ "./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.html"),
            components: {
                "form-header": _shared_form_header__WEBPACK_IMPORTED_MODULE_3__["FormHeaderComponent"],
                "add-condition": _add_condition__WEBPACK_IMPORTED_MODULE_5__["AddConditionComponent"],
                "preview-form": _preview_form__WEBPACK_IMPORTED_MODULE_6__["PreviewFormComponent"],
                "group-button-form": _shared_group_button_form__WEBPACK_IMPORTED_MODULE_4__["GroupButtonForm"]
            },
            validations: {
                arrStrConditions: {
                    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_2__["required"]
                }
            }
        })
    ], SendingConditionsFormComponent);
    return SendingConditionsFormComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/_/add-condition.html":
/*!********************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/_/add-condition.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <condition @getCondition=\"condition = $event\"></condition>\r\n\r\n    <b-row class=\"mt-md-3\">\r\n        <b-col cols=\"6\" class=\"text-left\" style=\"color:gray;\">\r\n            <b-form-checkbox id=\"cbAdvanceMode\"\r\n                             v-model=\"checkedAdvancedMode\"\r\n                             value=\"advance\"\r\n                             unchecked-value=\"simple\" class=\"font-explain\"\r\n                             disabled>\r\n                Advanced mode\r\n            </b-form-checkbox>\r\n        </b-col>\r\n        <b-col cols=\"6\" class=\"text-right\">\r\n            <btn-icon-add btnText=\"Add condition\" @formClick=\"addNewCondition\"></btn-icon-add>\r\n        </b-col>\r\n    </b-row>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/_/add-condition.ts":
/*!******************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/_/add-condition.ts ***!
  \******************************************************************************************************/
/*! exports provided: AddConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddConditionComponent", function() { return AddConditionComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _condition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../condition */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/index.ts");
/* harmony import */ var _common_button_icon_add__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/button-icon-add */ "./ClientApp/src/components/common/button-icon-add/index.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SendingConditionsModule = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].component.SendingConditionsModule;
var AddConditionComponent = /** @class */ (function (_super) {
    __extends(AddConditionComponent, _super);
    function AddConditionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddConditionComponent.prototype, "arrConditions", {
        get: function () {
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].alertTrigger.SendingConditions;
        },
        set: function (newVal) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].alertTrigger.SendingConditions = newVal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddConditionComponent.prototype, "checkedAdvancedMode", {
        get: function () {
            return SendingConditionsModule.checkedAdvancedMode;
        },
        set: function (newVal) {
            SendingConditionsModule.checkedAdvancedMode = newVal;
        },
        enumerable: true,
        configurable: true
    });
    AddConditionComponent.prototype.addNewCondition = function () {
        if (_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_3__["AlertTriggerForm"].component.SendingConditionsModule.selectedCategory === null || SendingConditionsModule.selectedField === null
            || SendingConditionsModule.selectedOperator === null || SendingConditionsModule.inputValue.length === 0) {
            return;
        }
        this.arrConditions.push({
            Id: null,
            Alert: null,
            DestinationField: null,
            SourceField: {
                Category: SendingConditionsModule.selectedCategory,
                Id: SendingConditionsModule.selectedField.Id,
                Label: SendingConditionsModule.selectedField.Label
            },
            Operator: SendingConditionsModule.selectedOperator,
            Value: SendingConditionsModule.inputValue
        });
    };
    AddConditionComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./add-condition.html */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/_/add-condition.html"),
            components: {
                "condition": _condition__WEBPACK_IMPORTED_MODULE_1__["ConditionComponent"],
                "btn-icon-add": _common_button_icon_add__WEBPACK_IMPORTED_MODULE_2__["ButtonIconAddComponent"]
            }
        })
    ], AddConditionComponent);
    return AddConditionComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.html":
/*!**************************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-row>\r\n    <b-col cols=\"3\">\r\n        <b-form-select id=\"ddlCategory\" v-model=\"selectedCategory\" :options=\"getCategories\" value-field=\"Id\" text-field=\"Label\" class=\"select-condition\">\r\n            <template slot=\"first\">\r\n                <option value=\"null\">Category</option>\r\n            </template>\r\n        </b-form-select>\r\n    </b-col>\r\n    <b-col cols=\"3\">\r\n        <b-form-select id=\"ddlField\" v-model=\"selectedField\" :options=\"getFields\" value-field=\"Id\" text-field=\"Label\" class=\"select-condition\">\r\n            <template slot=\"first\">\r\n                <option value=\"null\">Field</option>\r\n            </template>\r\n        </b-form-select>\r\n    </b-col>\r\n    <b-col cols=\"3\">\r\n        <b-form-select id=\"ddlOperator\" v-model=\"selectedOperator\" :options=\"getOperators\" value-field=\"Id\" text-field=\"Label\" class=\"select-condition\">\r\n            <template slot=\"first\">\r\n                <option value=\"null\">Operator</option>\r\n            </template>\r\n        </b-form-select>\r\n    </b-col>\r\n    <b-col cols=\"3\">\r\n        <b-form-input id=\"txtValue\" v-model=\"inputValue\" type=\"text\" placeholder=\"Value\" class=\"input-condition\">\r\n        </b-form-input>\r\n    </b-col>\r\n</b-row>"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss":
/*!**************************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./condition.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./condition.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./condition.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.ts":
/*!************************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.ts ***!
  \************************************************************************************************************/
/*! exports provided: ConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConditionComponent", function() { return ConditionComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
/* harmony import */ var _condition_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./condition.scss */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss");
/* harmony import */ var _condition_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_condition_scss__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SendingConditionsModule = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_2__["AlertTriggerForm"].component.SendingConditionsModule;
var ConditionComponent = /** @class */ (function (_super) {
    __extends(ConditionComponent, _super);
    function ConditionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ConditionComponent.prototype, "getCategories", {
        // Categories
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_1__["Root"].arrCategories;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionComponent.prototype, "selectedCategory", {
        get: function () {
            if (SendingConditionsModule.selectedCategory === undefined || SendingConditionsModule.selectedCategory === null) {
                return null;
            }
            return SendingConditionsModule.selectedCategory.Id;
        },
        set: function (newVal) {
            SendingConditionsModule.selectedCategory = this.getCategories.find(function (item) { return item.Id === newVal; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionComponent.prototype, "getFields", {
        // Fields
        get: function () {
            var _this = this;
            if (this.selectedCategory === null) {
                return _store_root_module__WEBPACK_IMPORTED_MODULE_1__["Root"].arrFields;
            }
            return _store_root_module__WEBPACK_IMPORTED_MODULE_1__["Root"].arrFields.filter(function (c) { return c.Category.Id === _this.selectedCategory; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionComponent.prototype, "selectedField", {
        get: function () {
            if (SendingConditionsModule.selectedField === undefined || SendingConditionsModule.selectedField === null) {
                return null;
            }
            return SendingConditionsModule.selectedField.Id;
        },
        set: function (newVal) {
            SendingConditionsModule.selectedField = this.getFields.find(function (item) { return item.Id === newVal; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionComponent.prototype, "getOperators", {
        // Operators
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_1__["Root"].arrOperators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionComponent.prototype, "selectedOperator", {
        get: function () {
            if (SendingConditionsModule.selectedOperator === undefined || SendingConditionsModule.selectedOperator === null) {
                return null;
            }
            return SendingConditionsModule.selectedOperator.Id;
        },
        set: function (newVal) {
            SendingConditionsModule.selectedOperator = this.getOperators.find(function (item) { return item.Id === newVal; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConditionComponent.prototype, "inputValue", {
        get: function () {
            return SendingConditionsModule.inputValue;
        },
        set: function (newVal) {
            SendingConditionsModule.inputValue = newVal;
        },
        enumerable: true,
        configurable: true
    });
    ConditionComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./condition.html */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.html"),
            components: {}
        })
    ], ConditionComponent);
    return ConditionComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/index.ts":
/*!******************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/index.ts ***!
  \******************************************************************************************************/
/*! exports provided: ConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _condition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/condition */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConditionComponent", function() { return _condition__WEBPACK_IMPORTED_MODULE_0__["ConditionComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/index.ts":
/*!********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/index.ts ***!
  \********************************************************************************************/
/*! exports provided: AddConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_condition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/add-condition */ "./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/_/add-condition.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddConditionComponent", function() { return _add_condition__WEBPACK_IMPORTED_MODULE_0__["AddConditionComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/index.ts":
/*!******************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/index.ts ***!
  \******************************************************************************/
/*! exports provided: SendingConditionsFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sending_conditions_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/sending-conditions-form */ "./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SendingConditionsFormComponent", function() { return _sending_conditions_form__WEBPACK_IMPORTED_MODULE_0__["SendingConditionsFormComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/_/preview-form.html":
/*!******************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/_/preview-form.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<wa-layout>\r\n    <template slot=\"header\">\r\n        <h1>\r\n            <strong>\r\n                Sending conditions Preview\r\n            </strong>\r\n        </h1>\r\n    </template>\r\n\r\n    <template slot=\"content\">\r\n        <b-container fluid style=\"background-color: #f7f9fc;\" class=\"content\">\r\n            <p>{{selectedCategory}}</p>\r\n            <p>{{selectedField}}</p>\r\n            <p>{{selectedOperator}}</p>\r\n            <p>{{inputValue}}</p>\r\n        </b-container>\r\n    </template>\r\n</wa-layout>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/_/preview-form.ts":
/*!****************************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/_/preview-form.ts ***!
  \****************************************************************************************************/
/*! exports provided: PreviewFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewFormComponent", function() { return PreviewFormComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/popup/popup */ "./ClientApp/src/components/common/popup/popup.ts");
/* harmony import */ var vuex_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex-class */ "./node_modules/vuex-class/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PreviewFormComponent = /** @class */ (function (_super) {
    __extends(PreviewFormComponent, _super);
    function PreviewFormComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviewFormComponent.prototype.mounted = function () {
        this.init();
    };
    PreviewFormComponent.prototype.init = function () {
    };
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_3__["State"])("selectedCategory"),
        __metadata("design:type", Object)
    ], PreviewFormComponent.prototype, "selectedCategory", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_3__["State"])("selectedField"),
        __metadata("design:type", Object)
    ], PreviewFormComponent.prototype, "selectedField", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_3__["State"])("selectedOperator"),
        __metadata("design:type", Object)
    ], PreviewFormComponent.prototype, "selectedOperator", void 0);
    __decorate([
        Object(vuex_class__WEBPACK_IMPORTED_MODULE_3__["State"])("inputValue"),
        __metadata("design:type", String)
    ], PreviewFormComponent.prototype, "inputValue", void 0);
    PreviewFormComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./preview-form.html */ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/_/preview-form.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_1__["LayoutComponent"],
                "popup": _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__["default"],
            }
        })
    ], PreviewFormComponent);
    return PreviewFormComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/index.ts":
/*!*******************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/index.ts ***!
  \*******************************************************************************************/
/*! exports provided: PreviewFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _preview_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/preview-form */ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/_/preview-form.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewFormComponent", function() { return _preview_form__WEBPACK_IMPORTED_MODULE_0__["PreviewFormComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.html":
/*!**********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<wa-layout>\r\n    <template slot=\"header\">\r\n        <b-row>\r\n            <b-col>\r\n                <a class=\"home--page--button\" v-on:click=\"goToHomePage()\">\r\n                    <i class=\"fas fa-home\"></i>\r\n                    <span>\r\n                        Home Page\r\n                    </span>\r\n                </a>\r\n            </b-col>\r\n        </b-row>\r\n        <b-row>\r\n            <b-col>\r\n                <h1>\r\n                    <strong>\r\n                        Alerts process creation\r\n                    </strong>\r\n                </h1>\r\n            </b-col>\r\n        </b-row>\r\n\r\n    </template>\r\n\r\n    <template slot=\"content\">\r\n        <b-container fluid style=\"background-color: #f7f9fc;\" class=\"content\" v-show=\"isShowPage\">\r\n            <div style=\"margin: 0 35% 150px 150px\" class=\"font-apply\">\r\n                <main-information-form></main-information-form>\r\n                <sending-conditions-form></sending-conditions-form>\r\n                <mail-recipient-component></mail-recipient-component>\r\n                <mail-detail-form></mail-detail-form>\r\n                <mail-structure-form></mail-structure-form>\r\n                <attachment-section></attachment-section>\r\n                <date-activation-range-section></date-activation-range-section>\r\n\r\n                <div class=\"save-button\" v-show=\"getChangeStatus\">\r\n                    <b-button :disabled=\"isDisabled\" variant=\"outline-secondary\" class=\"align-element\" v-on:click=\"onClickCancel($event)\" type=\"button\">Cancel</b-button>\r\n                    <span>Verify all your information before saving your process</span>\r\n                    <b-button :disabled=\"isDisabled\" variant=\"success\" type=\"button\" v-on:click=\"onClickSave\">Save</b-button>\r\n                </div>\r\n            </div>\r\n\r\n            <popup v-bind:isDanger=\"false\" v-bind:modalShow=\"showCancelPopup\" v-bind:popTitle=\"popTitle\" popBtnPrimary=\"Ok\" popBtnSecond=\"Cancel\" v-bind:confirmFn=\"resultCancel\">\r\n                <span>Are you sure you want to delete this process?</span>\r\n                <br />\r\n                <span>It will be permanently lost.</span>\r\n            </popup>\r\n\r\n        </b-container>\r\n    </template>\r\n</wa-layout>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss":
/*!**********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./triggered-alert-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./triggered-alert-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./triggered-alert-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.ts":
/*!********************************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.ts ***!
  \********************************************************************************************/
/*! exports provided: eventBus, TriggeredAlertPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return eventBus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggeredAlertPageComponent", function() { return TriggeredAlertPageComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/popup/popup */ "./ClientApp/src/components/common/popup/popup.ts");
/* harmony import */ var _main_information_form_main_information_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../main-information-form/_/main-information-form */ "./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.ts");
/* harmony import */ var _mail_detail_form_mail_detail_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mail-detail-form/_/mail-detail-form */ "./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.ts");
/* harmony import */ var _attachment_section_attachment_section__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../attachment-section/_/attachment-section */ "./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.ts");
/* harmony import */ var _date_activation_range_section_date_activation_range_section__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../date-activation-range-section/_/date-activation-range-section */ "./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.ts");
/* harmony import */ var _mail_recipients_mail_recipients__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mail-recipients/_/mail-recipients */ "./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.ts");
/* harmony import */ var _sending_conditions_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../sending-conditions-form */ "./ClientApp/src/components/alert-form/sending-conditions-form/index.ts");
/* harmony import */ var _mail_structure_form_mail_structure_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../mail-structure-form/_/mail-structure-form */ "./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.ts");
/* harmony import */ var _triggered_alert_page_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./triggered-alert-page.scss */ "./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss");
/* harmony import */ var _triggered_alert_page_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_triggered_alert_page_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _util_static_common_function__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../util/static-common-function */ "./ClientApp/src/util/static-common-function.ts");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! util */ "./node_modules/node-libs-browser/node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
















var eventBus = new vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]();
var TriggeredAlertPageComponent = /** @class */ (function (_super) {
    __extends(TriggeredAlertPageComponent, _super);
    function TriggeredAlertPageComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.processId = -1;
        _this.isShowPage = false;
        _this.isProcessing = false;
        _this.mode = "development";
        _this.popTitle = "Cancel Process Createion";
        _this.showCancelPopup = false;
        _this.checkCount = 0;
        return _this;
    }
    TriggeredAlertPageComponent.prototype.mounted = function () {
        if (_store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].linkAccount == "") {
            this.$router.push({ name: "LinkAccount" });
        }
    };
    Object.defineProperty(TriggeredAlertPageComponent.prototype, "getChangeStatus", {
        get: function () {
            for (var i = 0; i < _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm.length; i++) {
                var iItem = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm[i];
                if (iItem.status === "active") {
                    for (var j = i + 1; j < _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm.length; j++) {
                        var jItem = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm[j];
                        if (jItem.status === "empty") {
                            break;
                        }
                        else {
                            jItem.status = "empty";
                        }
                    }
                    break;
                }
                var k = i + 1;
                if (iItem.status === "filled" && k < _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm.length) {
                    var kItem = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm[k];
                    if (kItem.status === "empty") {
                        kItem.status = "active";
                        break;
                    }
                }
            }
            return _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm.filter(function (item) { return ["filled", "recapNonEdit", "recapSpecial"].indexOf(item.status) > -1; }).length === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TriggeredAlertPageComponent.prototype, "isDisabled", {
        get: function () {
            return this.isProcessing;
        },
        enumerable: true,
        configurable: true
    });
    TriggeredAlertPageComponent.prototype.onClickCancel = function () {
        this.showCancelPopup = true;
    };
    TriggeredAlertPageComponent.prototype.resultCancel = function (value) {
        if (value) {
            this.goToHomePage();
        }
        this.showCancelPopup = false;
    };
    TriggeredAlertPageComponent.prototype.created = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventBus.$on("showDeleteModal", function (_showCancel) {
                            _this.showCancelPopup = _showCancel;
                        });
                        this.isShowPage = false;
                        if (!(this.$route.params.id !== undefined && this.$route.params.id != null && this.$route.params.id !== "" && this.$route.params.id !== "-1")) return [3 /*break*/, 2];
                        this.processId = parseInt(this.$route.params.id);
                        return [4 /*yield*/, Promise.all([
                                this.asyncLoadMasterData(false),
                                this.loadData(),
                                _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].fetchDataArrMailStructure()
                            ]).then(function (resp) {
                                if (resp[0] && resp[2] && resp[1]) {
                                    _this.initForm(resp[1]);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: // Create new
                    return [4 /*yield*/, this.asyncLoadMasterData(true)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.isShowPage = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    TriggeredAlertPageComponent.prototype.asyncLoadMasterData = function (isCreateNew) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isCreateNew) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all([
                                _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchClients(),
                                _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchArlertType(),
                                _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchModuleType(),
                                _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].fetchDataArrMailStructure()
                            ])];
                    case 1:
                        _a.sent();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchCategories();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchOperators();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchFields();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchSubjectEmail();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchBodyEmail();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchEmailRecipientType();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchThirdPartyRole();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Promise.all([
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchClients(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchArlertType(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchModuleType(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchCategories(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchOperators(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchFields(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchSubjectEmail(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchBodyEmail(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchEmailRecipientType(),
                            _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchThirdPartyRole()
                        ])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    TriggeredAlertPageComponent.prototype.onClickSave = function () {
        var _this = this;
        var statusDateActivationRange = _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].arrStatusForm.find(function (item) { return item.nameComponent === _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["ETrigger"].DATE_ACTIVATION_RANGE; }).status;
        var kindSaveDate = -1;
        if (this.processId !== -1) {
            if (statusDateActivationRange === "filled") {
                kindSaveDate = 1;
            }
            else if (statusDateActivationRange === "recapSpecial") {
                kindSaveDate = 2;
            }
        }
        this.isProcessing = true;
        axios__WEBPACK_IMPORTED_MODULE_11___default.a.post("/ClientAlerting/Alert/SaveData", { alertTrigger: _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].alertTrigger, kindSaveDate: kindSaveDate }).then(function (resp) {
            if (resp.data.dResult) {
                _this.goToHomePage();
            }
            _this.isProcessing = false;
        }).catch(function (reason) {
            console.log(reason);
            _this.isProcessing = false;
        });
    };
    TriggeredAlertPageComponent.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_11___default.a.get("/ClientAlerting/Alert/LoadData", { params: { alertId: this.processId } }).then(function (response) {
                            if (response.data.dResult) {
                                return response.data.dAlertTrigger;
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TriggeredAlertPageComponent.prototype.initForm = function (dAlertTrigger) {
        _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].fetchDataAlertTrigger(dAlertTrigger);
        var currentDate = new Date();
        var cvertMinDate = _util_static_common_function__WEBPACK_IMPORTED_MODULE_12__["StaticCommonFunc"].convertFromJsonDateToJsDate(String(_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].alertTrigger.MainInformation.ActiveMinDate));
        var cvertMaxDate = _util_static_common_function__WEBPACK_IMPORTED_MODULE_12__["StaticCommonFunc"].convertFromJsonDateToJsDate(String(_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].alertTrigger.MainInformation.ActiveMaxDate));
        if (cvertMinDate <= currentDate && (Object(util__WEBPACK_IMPORTED_MODULE_13__["isNullOrUndefined"])(cvertMaxDate) || isNaN(cvertMaxDate.getDate()) || currentDate <= cvertMaxDate)) {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].fetchInitStatusForm(_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["EInitStatus"].RECAP_NON_EDIT);
        }
        else {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["AlertTriggerForm"].fetchInitStatusForm(_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_15__["EInitStatus"].RECAP_EDIT);
        }
    };
    TriggeredAlertPageComponent.prototype.goToHomePage = function () {
        this.$router.push({ name: "HomePage" });
    };
    TriggeredAlertPageComponent.prototype.isLoading = function () {
        _store_root_module__WEBPACK_IMPORTED_MODULE_14__["Root"].fetchShowLoading(this.isProcessing || !this.isShowPage);
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("isProcessing"),
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Watch"])("isShowPage"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TriggeredAlertPageComponent.prototype, "isLoading", null);
    TriggeredAlertPageComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./triggered-alert-page.html */ "./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_1__["LayoutComponent"],
                "mail-detail-form": _mail_detail_form_mail_detail_form__WEBPACK_IMPORTED_MODULE_4__["MailDetailFormComponent"],
                "main-information-form": _main_information_form_main_information_form__WEBPACK_IMPORTED_MODULE_3__["MainInformationFormComponent"],
                "attachment-section": _attachment_section_attachment_section__WEBPACK_IMPORTED_MODULE_5__["AttachmentComponent"],
                "date-activation-range-section": _date_activation_range_section_date_activation_range_section__WEBPACK_IMPORTED_MODULE_6__["DateActivationRangeComponent"],
                "mail-recipient-component": _mail_recipients_mail_recipients__WEBPACK_IMPORTED_MODULE_7__["MailRecipientComponent"],
                "sending-conditions-form": _sending_conditions_form__WEBPACK_IMPORTED_MODULE_8__["SendingConditionsFormComponent"],
                "popup": _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__["default"],
                "mail-structure-form": _mail_structure_form_mail_structure_form__WEBPACK_IMPORTED_MODULE_9__["MailStructureFormComponent"]
            }
        })
    ], TriggeredAlertPageComponent);
    return TriggeredAlertPageComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/alert-form/triggered-alert-page/index.ts":
/*!***************************************************************************!*\
  !*** ./ClientApp/src/components/alert-form/triggered-alert-page/index.ts ***!
  \***************************************************************************/
/*! exports provided: eventBus, TriggeredAlertPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _triggered_alert_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/triggered-alert-page */ "./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return _triggered_alert_page__WEBPACK_IMPORTED_MODULE_0__["eventBus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TriggeredAlertPageComponent", function() { return _triggered_alert_page__WEBPACK_IMPORTED_MODULE_0__["TriggeredAlertPageComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/common/button-icon-add/_/button-icon-add.html":
/*!********************************************************************************!*\
  !*** ./ClientApp/src/components/common/button-icon-add/_/button-icon-add.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span style=\"cursor: pointer\" @click=\"onClick\">\r\n    <i class=\"fa fa-plus-circle\"></i> <span class=\"text-button\">{{btnText}}</span>\r\n</span>"

/***/ }),

/***/ "./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss":
/*!********************************************************************************!*\
  !*** ./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./button-icon-add.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./button-icon-add.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./button-icon-add.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/common/button-icon-add/_/button-icon-add.ts":
/*!******************************************************************************!*\
  !*** ./ClientApp/src/components/common/button-icon-add/_/button-icon-add.ts ***!
  \******************************************************************************/
/*! exports provided: ButtonIconAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonIconAddComponent", function() { return ButtonIconAddComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button_icon_add_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button-icon-add.scss */ "./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss");
/* harmony import */ var _button_icon_add_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_button_icon_add_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ButtonIconAddComponent = /** @class */ (function (_super) {
    __extends(ButtonIconAddComponent, _super);
    function ButtonIconAddComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonIconAddComponent.prototype.onClick = function () {
        this.$emit("formClick");
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", String)
    ], ButtonIconAddComponent.prototype, "btnText", void 0);
    ButtonIconAddComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./button-icon-add.html */ "./ClientApp/src/components/common/button-icon-add/_/button-icon-add.html"),
            components: {}
        })
    ], ButtonIconAddComponent);
    return ButtonIconAddComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/common/button-icon-add/index.ts":
/*!******************************************************************!*\
  !*** ./ClientApp/src/components/common/button-icon-add/index.ts ***!
  \******************************************************************/
/*! exports provided: ButtonIconAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button_icon_add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/button-icon-add */ "./ClientApp/src/components/common/button-icon-add/_/button-icon-add.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonIconAddComponent", function() { return _button_icon_add__WEBPACK_IMPORTED_MODULE_0__["ButtonIconAddComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/common/popup/popup.html":
/*!**********************************************************!*\
  !*** ./ClientApp/src/components/common/popup/popup.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<b-modal id=\"popup-container\" v-model=\"modalShow\" centered size=\"md\">\r\n    <div slot=\"modal-header\" class=\"w-100\">\r\n        <b-container fluid class=\"d-flex\">\r\n            <div class=\"d-flex align-items-start\">\r\n                <p class=\"popup__header__text\"> {{ popTitle }} </p>\r\n            </div>\r\n            <div class=\"d-flex align-items-start position-absolute w-100\">\r\n                <b-button-close size=\"md\" @click=\"closePopup(false)\" class=\"close position-relative popup__header__btn--close\"></b-button-close>\r\n            </div>\r\n        </b-container>\r\n    </div>\r\n    <b-container fluid>\r\n        <div class=\"popup__body\">\r\n            <slot>\r\n\r\n            </slot>\r\n        </div>\r\n    </b-container>\r\n    <div slot=\"modal-footer\" class=\"w-100\">\r\n        <div class=\"d-flex justify-content-center\">\r\n            <b-button v-if=\"isDanger\" size=\"md\" variant=\"danger\" class=\"float-right\" @click=\"closePopup(true)\"> {{ popBtnPrimary }} </b-button>\r\n            <b-button v-else size=\"md\" variant=\"success\" class=\"float-right\" @click=\"closePopup(true)\"> {{ popBtnPrimary }} </b-button>\r\n            <span>&ensp;&ensp;</span>\r\n            <b-button size=\"md\" variant=\"outline-success\" class=\"float-left\" @click=\"closePopup(false)\"> {{ popBtnSecond }} </b-button>\r\n        </div>  \r\n    </div>\r\n</b-modal>"

/***/ }),

/***/ "./ClientApp/src/components/common/popup/popup.scss":
/*!**********************************************************!*\
  !*** ./ClientApp/src/components/common/popup/popup.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./popup.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/popup/popup.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./popup.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/popup/popup.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./popup.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/popup/popup.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/common/popup/popup.ts":
/*!********************************************************!*\
  !*** ./ClientApp/src/components/common/popup/popup.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _popup_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup.scss */ "./ClientApp/src/components/common/popup/popup.scss");
/* harmony import */ var _popup_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_popup_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopupComponent = /** @class */ (function (_super) {
    __extends(PopupComponent, _super);
    function PopupComponent() {
        return _super.call(this) || this;
    }
    PopupComponent.prototype.closePopup = function (valueReturn) {
        this.confirmFn(valueReturn);
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ type: String, default: "Title Default" }),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "popTitle", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ type: String, default: "Confirm" }),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "popBtnPrimary", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ type: String, default: "Close" }),
        __metadata("design:type", String)
    ], PopupComponent.prototype, "popBtnSecond", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "modalShow", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ type: Boolean, default: false }),
        __metadata("design:type", Boolean)
    ], PopupComponent.prototype, "isDanger", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ type: Function }),
        __metadata("design:type", Function)
    ], PopupComponent.prototype, "confirmFn", void 0);
    PopupComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./popup.html */ "./ClientApp/src/components/common/popup/popup.html")
        }),
        __metadata("design:paramtypes", [])
    ], PopupComponent);
    return PopupComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));
/* harmony default export */ __webpack_exports__["default"] = (PopupComponent);


/***/ }),

/***/ "./ClientApp/src/components/goodbye/_/goodbye.html":
/*!*********************************************************!*\
  !*** ./ClientApp/src/components/goodbye/_/goodbye.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div v-if=\"isActive\">\r\n    <h1>\r\n        Good bye {{greeting}}! see you next lesson\r\n    </h1>\r\n</div>\r\n<div v-else>\r\n    No active\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/goodbye/_/goodbye.scss":
/*!*********************************************************!*\
  !*** ./ClientApp/src/components/goodbye/_/goodbye.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./goodbye.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/goodbye/_/goodbye.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./goodbye.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/goodbye/_/goodbye.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./goodbye.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/goodbye/_/goodbye.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/goodbye/_/goodbye.ts":
/*!*******************************************************!*\
  !*** ./ClientApp/src/components/goodbye/_/goodbye.ts ***!
  \*******************************************************/
/*! exports provided: GoodbyeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoodbyeComponent", function() { return GoodbyeComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _goodbye_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goodbye.scss */ "./ClientApp/src/components/goodbye/_/goodbye.scss");
/* harmony import */ var _goodbye_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_goodbye_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoodbyeComponent = /** @class */ (function (_super) {
    __extends(GoodbyeComponent, _super);
    function GoodbyeComponent() {
        return _super.call(this) || this;
    }
    GoodbyeComponent.prototype.mounted = function () {
        console.log("goodbye mounted");
        this.initial();
    };
    Object.defineProperty(GoodbyeComponent.prototype, "greeting", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    GoodbyeComponent.prototype.initial = function () {
        //this.greeting = this.name;
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "" }),
        __metadata("design:type", String)
    ], GoodbyeComponent.prototype, "name", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: false }),
        __metadata("design:type", Boolean)
    ], GoodbyeComponent.prototype, "isActive", void 0);
    GoodbyeComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./goodbye.html */ "./ClientApp/src/components/goodbye/_/goodbye.html")
        }),
        __metadata("design:paramtypes", [])
    ], GoodbyeComponent);
    return GoodbyeComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/goodbye/index.ts":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/goodbye/index.ts ***!
  \***************************************************/
/*! exports provided: GoodbyeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goodbye__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/goodbye */ "./ClientApp/src/components/goodbye/_/goodbye.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GoodbyeComponent", function() { return _goodbye__WEBPACK_IMPORTED_MODULE_0__["GoodbyeComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/hello/_/hello.html":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/hello/_/hello.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div v-if=\"isActive\">\r\n        <h1>\r\n                Hello {{greeting}}! I'm a Vue js\r\n            </h1>\r\n</div>\r\n<div v-else>\r\n    No active\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/hello/_/hello.scss":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/hello/_/hello.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./hello.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/hello/_/hello.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./hello.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/hello/_/hello.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./hello.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/hello/_/hello.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/hello/_/hello.ts":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/hello/_/hello.ts ***!
  \***************************************************/
/*! exports provided: HelloComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelloComponent", function() { return HelloComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hello_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hello.scss */ "./ClientApp/src/components/hello/_/hello.scss");
/* harmony import */ var _hello_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hello_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HelloComponent = /** @class */ (function (_super) {
    __extends(HelloComponent, _super);
    function HelloComponent() {
        return _super.call(this) || this;
    }
    HelloComponent.prototype.mounted = function () {
        console.log("hello mounted");
        this.initial();
    };
    Object.defineProperty(HelloComponent.prototype, "greeting", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    HelloComponent.prototype.initial = function () {
        //this.greeting = this.name;
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "" }),
        __metadata("design:type", String)
    ], HelloComponent.prototype, "name", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: false }),
        __metadata("design:type", Boolean)
    ], HelloComponent.prototype, "isActive", void 0);
    HelloComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./hello.html */ "./ClientApp/src/components/hello/_/hello.html")
        }),
        __metadata("design:paramtypes", [])
    ], HelloComponent);
    return HelloComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/hello/index.ts":
/*!*************************************************!*\
  !*** ./ClientApp/src/components/hello/index.ts ***!
  \*************************************************/
/*! exports provided: HelloComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/hello */ "./ClientApp/src/components/hello/_/hello.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HelloComponent", function() { return _hello__WEBPACK_IMPORTED_MODULE_0__["HelloComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/layout/index.ts":
/*!**************************************************!*\
  !*** ./ClientApp/src/components/layout/index.ts ***!
  \**************************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./ClientApp/src/components/layout/layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return _layout__WEBPACK_IMPORTED_MODULE_0__["LayoutComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/layout/layout.html":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/layout/layout.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div>\r\n    <b-row>\r\n        <b-col>\r\n            <div class=\"page-title\">\r\n                <div class=\"page-header\">\r\n                    <slot name=\"header\"></slot>\r\n                </div>\r\n            </div>\r\n        </b-col>\r\n    </b-row>\r\n    <b-row class=\"mt-md-1\">\r\n        <b-col>\r\n            <slot name=\"content\"></slot>\r\n        </b-col>\r\n    </b-row>\r\n    <b-row>\r\n        <b-col>\r\n            <slot name=\"popup\"></slot>\r\n        </b-col>\r\n    </b-row>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./ClientApp/src/components/layout/layout.scss":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/layout/layout.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./layout.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/layout/layout.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./layout.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/layout/layout.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./layout.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/layout/layout.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/layout/layout.ts":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/layout/layout.ts ***!
  \***************************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-vue/esm/directives/modal/modal */ "./node_modules/bootstrap-vue/esm/directives/modal/modal.js");
/* harmony import */ var _layout_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.scss */ "./ClientApp/src/components/layout/layout.scss");
/* harmony import */ var _layout_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_layout_scss__WEBPACK_IMPORTED_MODULE_2__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].directive("b-modal", bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_1__["default"]);

var LayoutComponent = /** @class */ (function (_super) {
    __extends(LayoutComponent, _super);
    function LayoutComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./layout.html */ "./ClientApp/src/components/layout/layout.html"),
            components: {}
        })
    ], LayoutComponent);
    return LayoutComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/link-account/_/link-account.html":
/*!*******************************************************************!*\
  !*** ./ClientApp/src/components/link-account/_/link-account.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<wa-layout>\r\n    <template slot=\"header\" v-if=\"isShowLoading==false\">\r\n        <h1>\r\n            <strong>\r\n                Link account selection\r\n            </strong>\r\n        </h1>\r\n    </template>\r\n\r\n    <template slot=\"content\" v-if=\"isShowLoading==false\">\r\n        <div id=\"profileContent\" class=\"pl-5\">\r\n            <div id=\"linkAccountSuggest\" v-if=\"linkAccountSuggest==true\" class=\"mt-3\">\r\n                <h6>There is no Link account with your email address</h6>\r\n                <a :href=\"linkCDPCreateAccount\">Create Link account</a>\r\n            </div>\r\n\r\n            <div id=\"linkAccountSelect\" v-if=\"linkAccountSuggest==false\" class=\"mt-3\">\r\n                <h6>Please select a Link account among the ones linked your email address</h6>\r\n\r\n                <div class=\"col-2 pl-0\">\r\n                    <b-form-group>\r\n                        <b-form-input id=\"cdpAccount\"\r\n                                      type=\"text\"\r\n                                      v-model=\"cdpAcount\"\r\n                                      disabled>\r\n                        </b-form-input>\r\n                        <br />\r\n                        <b-form-select id=\"linkAccountSelect\"\r\n                                       v-model=\"selectedLinkAccount\"\r\n                                       :options=\"arrLinkAccount\"\r\n                                       @change=\"$v.selectedLinkAccount.$touch()\"\r\n                                       class=\"mb-3\"\r\n                                       style=\"background-image: none\">\r\n                            <template slot=\"first\">\r\n                                <option value=\"null\" disabled>Select a LINK account</option>\r\n                            </template>\r\n                        </b-form-select>\r\n                        <p class=\"invalid-message\" v-if=\"!$v.selectedLinkAccount.required\">This field is required</p>\r\n                    </b-form-group>\r\n                </div>\r\n\r\n                <b-button variant=\"success\" v-on:click=\"saveLinkAccount\" :disabled=\"selectedLinkAccount == null\">OK</b-button>\r\n            </div>\r\n        </div>\r\n    </template>\r\n</wa-layout>"

/***/ }),

/***/ "./ClientApp/src/components/link-account/_/link-account.scss":
/*!*******************************************************************!*\
  !*** ./ClientApp/src/components/link-account/_/link-account.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./link-account.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/link-account/_/link-account.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./link-account.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/link-account/_/link-account.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./link-account.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/link-account/_/link-account.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/link-account/_/link-account.ts":
/*!*****************************************************************!*\
  !*** ./ClientApp/src/components/link-account/_/link-account.ts ***!
  \*****************************************************************/
/*! exports provided: LinkAccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkAccountComponent", function() { return LinkAccountComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _link_account_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./link-account.scss */ "./ClientApp/src/components/link-account/_/link-account.scss");
/* harmony import */ var _link_account_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_link_account_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_5__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var LinkAccountComponent = /** @class */ (function (_super) {
    __extends(LinkAccountComponent, _super);
    function LinkAccountComponent() {
        var _this = _super.call(this) || this;
        _this.cdpAcount = "";
        _this.selectedLinkAccount = null;
        _this.arrLinkAccount = [];
        _this.linkAccountSuggest = false;
        _this.linkCDPCreateAccount = "";
        _this.linkCDPCreateAccount = "http://link-rec.bollore-logistics.com/en-US/Account/LogOn";
        return _this;
    }
    LinkAccountComponent.prototype.created = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(true);
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowNavBar(false);
                        return [4 /*yield*/, this.GetPairedLinkAccountByMail()];
                    case 1:
                        _a.sent();
                        if (!(_store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].linkAccount != "")) return [3 /*break*/, 2];
                        this.$router.push({ name: "HomePage" });
                        return [3 /*break*/, 7];
                    case 2: return [4 /*yield*/, this.GetLinkAccountByMail()];
                    case 3:
                        _a.sent();
                        if (!(this.arrLinkAccount.length == 0)) return [3 /*break*/, 4];
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(false);
                        this.linkAccountSuggest = true;
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(this.arrLinkAccount.length == 1)) return [3 /*break*/, 6];
                        this.selectedLinkAccount = this.arrLinkAccount[0];
                        return [4 /*yield*/, this.SavePairedLinkAccount()];
                    case 5:
                        _a.sent();
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchLinkAccount(this.selectedLinkAccount);
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(false);
                        this.$router.push({ name: "HomePage" });
                        return [3 /*break*/, 7];
                    case 6:
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(false);
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(LinkAccountComponent.prototype, "isShowLoading", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].isShowLoading;
        },
        enumerable: true,
        configurable: true
    });
    LinkAccountComponent.prototype.GetPairedLinkAccountByMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Profile/GetPairedLinkAccountByMail", null).then(function (resp) {
                            if (resp.data.pairedAccount != "") {
                                _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchLinkAccount(resp.data.pairedAccount);
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LinkAccountComponent.prototype.GetLinkAccountByMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Profile/GetLinkAccountByMail", null).then(function (resp) {
                            if (resp.data.email != "") {
                                _this.cdpAcount = resp.data.email;
                                _this.arrLinkAccount = resp.data.lstLinkAccount;
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LinkAccountComponent.prototype.SavePairedLinkAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/ClientAlerting/Profile/SavePairedLinkAccount", { linkAccount: this.selectedLinkAccount }).then(function (resp) {
                            if (resp.data.result != "OK") {
                                console.log("Coundn't paired Link account");
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LinkAccountComponent.prototype.saveLinkAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.selectedLinkAccount == null || this.selectedLinkAccount.trim().length == 0) {
                            return [2 /*return*/];
                        }
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(true);
                        return [4 /*yield*/, Promise.all([
                                this.SavePairedLinkAccount()
                            ]).then(function (resp) {
                                _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(false);
                                _this.$router.push({ name: "HomePage" });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkAccountComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./link-account.html */ "./ClientApp/src/components/link-account/_/link-account.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_4__["LayoutComponent"],
            },
            validations: {
                selectedLinkAccount: {
                    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_5__["required"]
                }
            }
        }),
        __metadata("design:paramtypes", [])
    ], LinkAccountComponent);
    return LinkAccountComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/link-account/index.ts":
/*!********************************************************!*\
  !*** ./ClientApp/src/components/link-account/index.ts ***!
  \********************************************************/
/*! exports provided: LinkAccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _link_account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/link-account */ "./ClientApp/src/components/link-account/_/link-account.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkAccountComponent", function() { return _link_account__WEBPACK_IMPORTED_MODULE_0__["LinkAccountComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/login/index.ts":
/*!*************************************************!*\
  !*** ./ClientApp/src/components/login/index.ts ***!
  \*************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ "./ClientApp/src/components/login/login.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/login/login.html":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/login/login.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-row style=\"position: absolute; top: 400px; left: 800px\">\r\n    <b-col>\r\n        <a class=\"btn btn-success\" href='/ClientAlerting/Auth/ReplyUrl'>Login</a>\r\n    </b-col>\r\n</b-row>"

/***/ }),

/***/ "./ClientApp/src/components/login/login.ts":
/*!*************************************************!*\
  !*** ./ClientApp/src/components/login/login.ts ***!
  \*************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_vue_esm_components_layout_row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-vue/esm/components/layout/row */ "./node_modules/bootstrap-vue/esm/components/layout/row.js");
/* harmony import */ var bootstrap_vue_esm_components_layout_col__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-vue/esm/components/layout/col */ "./node_modules/bootstrap-vue/esm/components/layout/col.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./login.html */ "./ClientApp/src/components/login/login.html"),
            components: {
                "b-row": bootstrap_vue_esm_components_layout_row__WEBPACK_IMPORTED_MODULE_1__["default"],
                "b-col": bootstrap_vue_esm_components_layout_col__WEBPACK_IMPORTED_MODULE_2__["default"],
            }
        })
    ], LoginComponent);
    return LoginComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/navbar/index.ts":
/*!**************************************************!*\
  !*** ./ClientApp/src/components/navbar/index.ts ***!
  \**************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar */ "./ClientApp/src/components/navbar/navbar.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return _navbar__WEBPACK_IMPORTED_MODULE_0__["NavbarComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/navbar/link.ts":
/*!*************************************************!*\
  !*** ./ClientApp/src/components/navbar/link.ts ***!
  \*************************************************/
/*! exports provided: Link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var _config_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/helpers */ "./ClientApp/config/helpers.js");
/* harmony import */ var _config_helpers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_config_helpers__WEBPACK_IMPORTED_MODULE_0__);

var Link = /** @class */ (function () {
    function Link(name, path, isSubsite, isRedirect) {
        if (isSubsite === void 0) { isSubsite = true; }
        this.name = name;
        this.path = isSubsite ? Object(_config_helpers__WEBPACK_IMPORTED_MODULE_0__["subsite"])(path) : path;
        this.isRedirect = isRedirect;
    }
    return Link;
}());



/***/ }),

/***/ "./ClientApp/src/components/navbar/navbar.html":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/navbar/navbar.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <b-navbar-nav style=\"position: fixed;\" class=\"vertical-nav\" vertical>\r\n        <a :href=\"pathToLink\" style=\"margin-top: 15%;\">\r\n                <img :src=\"imgLink\" class=\"img-link\">\r\n            </a>         \r\n                <b-nav-item v-for=\"link in links\" :key=\"link.name\" v-if=\"isShowNavBar\" @click=\"clickLink(link.name, link.path, link.isRedirect)\">\r\n                    <div style=\"width: 200%;\" class=\"menu-modules\">\r\n                        <i class=\"fas fa-user menu-icons\"></i>\r\n                        <span class=\"menu-text\">{{link.name}}</span>\r\n                    </div>\r\n                </b-nav-item>  -->\r\n    <!-- <img :src=\"imgBollore\" class=\"img-bollore\"> -->\r\n\r\n    <!-- <div>\r\n        <logins-dropdown></logins-dropdown>\r\n    </div> -->\r\n<!-- </b-navbar-nav> -->\r\n\r\n<div class=\"d-none d-lg-block\" v-bind:class=\"collapseClassActive?'collapse-sidedrawer':''\">\r\n    \r\n        <div id=\"sidedrawer\"  @mouseleave=\"onMenuMouseLeave\" @mouseenter=\"onMenuMouseEnter\">\r\n            <div class=\"sidedrawer-header\">\r\n                <div id=\"sidedrawer-brand\">\r\n                        <a :href=\"pathToLink\" style=\"margin-top: 15%;\">\r\n                                <img :src=\"imgLink\" class=\"link-logo\">\r\n                            </a>  \r\n                </div>\r\n                <div class=\"collapsed-burger\">\r\n                    <i class=\"fas fa-bars fa-lg js-hide-sidedrawer\" aria-hidden=\"true\"></i>\r\n                </div>\r\n            </div>\r\n    \r\n            <div class=\"menu-modules\">\r\n                    <b-navbar-nav class=\"vertical-nav\" vertical>      \r\n                        <b-nav-item v-for=\"link in links\" :key=\"link.name\" v-if=\"isShowNavBar\" @click=\"clickLink(link.name, link.path, link.isRedirect)\">\r\n                            <div style=\"width: 200%;\" class=\"menu-module\">\r\n                                <span class=\"module-picto\">\r\n                                        <i class=\"fas fa-user menu-icons\"></i>\r\n                                </span>                                \r\n                                <span class=\"menu-text\">{{link.name}}</span>\r\n                            </div>\r\n                        </b-nav-item> \r\n                    </b-navbar-nav>\r\n            </div>\r\n            <div>\r\n                <ul>\r\n                    <li>\r\n                        <a style=\"display: inline-block;\" class=\"menu-module\" href='@Url.Action(\"Index\", \"Contact\")'>\r\n                            <span class=\"module-picto\">\r\n                                <i class=\"fas fa-at\" aria-hidden=\"true\"></i>{{collapseClassActive}}\r\n                            </span>\r\n                            <strong class=\"module-title\">@Html.DisplayNameFor(m => m.Contact)</strong>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n    \r\n                <div class=\"bollore-logo\" style=\"padding-top: 50px;\">\r\n                    <!-- <img alt=\" \" src='@Url.Content(\"~/Content/images/bollore-logo-white.png\")' /> -->\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./ClientApp/src/components/navbar/navbar.scss":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/navbar/navbar.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./navbar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/navbar/navbar.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./navbar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/navbar/navbar.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./navbar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/navbar/navbar.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/navbar/navbar.ts":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/navbar/navbar.ts ***!
  \***************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./link */ "./ClientApp/src/components/navbar/link.ts");
/* harmony import */ var _shared_logins_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_shared/logins-dropdown */ "./ClientApp/src/components/_shared/logins-dropdown/index.ts");
/* harmony import */ var _navbar_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navbar.scss */ "./ClientApp/src/components/navbar/navbar.scss");
/* harmony import */ var _navbar_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_navbar_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/root-module */ "./ClientApp/src/store/root-module.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IMG_LINK = "./assets/img/LINK_BLANC.png";
var IMG_BOLLORE = "./assets/img/bollore-logo-white.png";
var NavbarComponent = /** @class */ (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent() {
        var _this = _super.call(this) || this;
        _this.imgLink = IMG_LINK;
        _this.imgBollore = IMG_BOLLORE;
        _this.pathToLink = "http://link-rec.bollore-logistics.com";
        _this.pathToLinkProfile = "http://link-rec.bollore-logistics.com";
        _this.links = [
            new _link__WEBPACK_IMPORTED_MODULE_1__["Link"]("Profile", "", false, false),
            new _link__WEBPACK_IMPORTED_MODULE_1__["Link"]("StudyPage", "", false, false)
        ];
        _this.isMenuCollapsed = true;
        return _this;
    }
    Object.defineProperty(NavbarComponent.prototype, "isShowNavBar", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_4__["Root"].showNavBar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavbarComponent.prototype, "collapseClassActive", {
        get: function () {
            return this.isMenuCollapsed;
        },
        enumerable: true,
        configurable: true
    });
    NavbarComponent.prototype.clickLink = function (name, path, isRedirect) {
        if (isRedirect) {
            window.location.replace(path);
        }
        else {
            this.$router.push({ name: name });
        }
    };
    // @Watch("$route.path")
    // pathChanged() {
    //     this.logger.info("Changed current path to: " + this.$route.path);
    // }
    NavbarComponent.prototype.onMenuMouseEnter = function () {
        this.isMenuCollapsed = false;
        console.log("onMenuMouseEnter " + this.isMenuCollapsed);
    };
    NavbarComponent.prototype.onMenuMouseLeave = function () {
        this.isMenuCollapsed = true;
        console.log("onMenuMouseLeave " + this.isMenuCollapsed);
    };
    NavbarComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./navbar.html */ "./ClientApp/src/components/navbar/navbar.html"),
            components: {
                "logins-dropdown": _shared_logins_dropdown__WEBPACK_IMPORTED_MODULE_2__["LoginsDropdown"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/profile/_/profile.html":
/*!*********************************************************!*\
  !*** ./ClientApp/src/components/profile/_/profile.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<wa-layout>\r\n    <template slot=\"header\" v-if=\"isShowLoading==false\">\r\n        <h1>\r\n            <strong>\r\n                Profile\r\n            </strong>\r\n        </h1>\r\n        <div class=\"notification\" v-if=\"isShowNotification\">\r\n            <div class=\"content\">\r\n                <span class=\"fa fa-check-circle d-inline\"></span>&nbsp;&nbsp;\r\n                <span class=\"d-inline\">Your profile settings have been saved</span>\r\n            </div>\r\n        </div>\r\n    </template>\r\n\r\n    <template slot=\"content\" v-if=\"isShowLoading==false\">\r\n        <div id=\"profileContent\" class=\"pl-5\">\r\n            <h1>\r\n                <strong>\r\n                    LINK - CDP account pairing\r\n                </strong>\r\n            </h1>\r\n            <br />\r\n            <h6>Please select a LINK account to pair it with your CDP account</h6>\r\n\r\n            <div class=\"col-2 pl-0\">\r\n                <b-form-group>\r\n                    <b-form-input id=\"cdpAccount\"\r\n                                  type=\"text\"\r\n                                  v-model=\"cdpAcount\"\r\n                                  disabled>\r\n                    </b-form-input>\r\n                    <br />\r\n                    <b-form-select id=\"linkAccountSelect\"\r\n                                   v-model=\"selectedLinkAccount\"\r\n                                   :options=\"arrLinkAccount\"\r\n                                   @change=\"$v.selectedLinkAccount.$touch()\"\r\n                                   class=\"mb-3\"\r\n                                   style=\"background-image: none\">\r\n                        <template slot=\"first\">\r\n                            <option value=\"null\" disabled>Select a LINK account</option>\r\n                        </template>\r\n                    </b-form-select>\r\n                    <p class=\"invalid-message\" v-if=\"!$v.selectedLinkAccount.requiredLinkAccount\">This field is required</p>\r\n                </b-form-group>\r\n            </div>\r\n\r\n            <b-button variant=\"success\" v-on:click=\"saveProfile\" :disabled=\"selectedLinkAccount == null\">Confirm</b-button>\r\n        </div>\r\n    </template>\r\n</wa-layout>"

/***/ }),

/***/ "./ClientApp/src/components/profile/_/profile.scss":
/*!*********************************************************!*\
  !*** ./ClientApp/src/components/profile/_/profile.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./profile.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/profile/_/profile.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./profile.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/profile/_/profile.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./profile.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/profile/_/profile.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/profile/_/profile.ts":
/*!*******************************************************!*\
  !*** ./ClientApp/src/components/profile/_/profile.ts ***!
  \*******************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _profile_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.scss */ "./ClientApp/src/components/profile/_/profile.scss");
/* harmony import */ var _profile_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_profile_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../layout */ "./ClientApp/src/components/layout/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ProfileComponent = /** @class */ (function (_super) {
    __extends(ProfileComponent, _super);
    function ProfileComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cdpAcount = "";
        _this.selectedLinkAccount = null;
        _this.arrLinkAccount = [];
        _this.isShowNotification = false;
        return _this;
    }
    ProfileComponent.prototype.mounted = function () {
        if (_store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].linkAccount == "") {
            this.$router.push({ name: "LinkAccount" });
        }
    };
    ProfileComponent.prototype.created = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(true);
                        return [4 /*yield*/, Promise.all([
                                this.GetLinkAccountByMail(),
                                this.GetPairedLinkAccountByMail()
                            ]).then(function (resp) {
                                _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ProfileComponent.prototype, "isShowLoading", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].isShowLoading;
        },
        enumerable: true,
        configurable: true
    });
    ProfileComponent.prototype.linkAccountRequired = function () {
        if (this.selectedLinkAccount == null || this.selectedLinkAccount.trim().length == 0) {
            return false;
        }
        return true;
    };
    ProfileComponent.prototype.GetLinkAccountByMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Profile/GetLinkAccountByMail", null).then(function (resp) {
                            if (resp.data.email != "") {
                                _this.cdpAcount = resp.data.email;
                                _this.arrLinkAccount = resp.data.lstLinkAccount;
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileComponent.prototype.GetPairedLinkAccountByMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Profile/GetPairedLinkAccountByMail", null).then(function (resp) {
                            if (resp.data.pairedAccount != "") {
                                _this.selectedLinkAccount = resp.data.pairedAccount;
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileComponent.prototype.SavePairedLinkAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/ClientAlerting/Profile/SavePairedLinkAccount", { linkAccount: this.selectedLinkAccount }).then(function (resp) {
                            if (resp.data.result != "OK") {
                                console.log("Coundn't paired Link account");
                            }
                            return null;
                        }).catch(function (reason) {
                            console.log(reason);
                            return null;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ProfileComponent.prototype.saveProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.selectedLinkAccount == null || this.selectedLinkAccount.trim().length == 0) {
                            return [2 /*return*/];
                        }
                        _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(true);
                        return [4 /*yield*/, Promise.all([
                                this.SavePairedLinkAccount()
                            ]).then(function (resp) {
                                _store_root_module__WEBPACK_IMPORTED_MODULE_2__["Root"].fetchShowLoading(false);
                                _this.isShowNotification = true;
                                setTimeout(function () {
                                    _this.isShowNotification = false;
                                }, 3000);
                                //toastr.success("Your profile settings have been saved");
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./profile.html */ "./ClientApp/src/components/profile/_/profile.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_4__["LayoutComponent"],
            },
            validations: {
                selectedLinkAccount: {
                    requiredLinkAccount: function (value, vm) {
                        return vm.linkAccountRequired(value);
                    }
                }
            }
        })
    ], ProfileComponent);
    return ProfileComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/profile/index.ts":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/profile/index.ts ***!
  \***************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/profile */ "./ClientApp/src/components/profile/_/profile.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return _profile__WEBPACK_IMPORTED_MODULE_0__["ProfileComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study-page/_/example.json":
/*!************************************************************!*\
  !*** ./ClientApp/src/components/study-page/_/example.json ***!
  \************************************************************/
/*! exports provided: items, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"items\":[{\"key\":\"First\",\"value\":100},{\"key\":\"Second\",\"value\":false},{\"key\":\"Last\",\"value\":\"Mixed\"}]}");

/***/ }),

/***/ "./ClientApp/src/components/study-page/_/study-page.html":
/*!***************************************************************!*\
  !*** ./ClientApp/src/components/study-page/_/study-page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <wa-layout>\r\n    <template slot=\"header\" v-if=\"isShowLoading==false\">\r\n        <h1>\r\n                Study page\r\n            <strong>\r\n                Study page\r\n            </strong>\r\n        </h1>\r\n    </template>\r\n\r\n    <template slot=\"content\" v-if=\"isShowLoading==false\">\r\n        <div>\r\n                <h1>Study here</h1>\r\n        </div>         -->\r\n        <!-- <hello :name=\"name\"></hello> -->\r\n    <!-- </template>\r\n</wa-layout> -->\r\n<div>\r\n    <h3 style=\"color: blue\">Renderless component</h3>\r\n    <keep-alive>\r\n        <component :is=\"typeOfGreeting\" :name=\"name\" :isActive=\"isActive\"></component>\r\n    </keep-alive>\r\n    <!-- <hello :name=\"name\" :isActive=\"isActive\"></hello> -->\r\n\r\n    <button v-on:click=\"setName('Nhat')\">Nhat</button>\r\n    <button v-on:click=\"setName('Peter')\">Peter</button>\r\n    \r\n    <hr class=\"mt-5\">\r\n    <h3 style=\"color: blue\">event for textbox with listener</h3>\r\n    <text-box @focus=\"onFocus\"></text-box>\r\n    \r\n    <hr class=\"mt-5\">\r\n    <h3 style=\"color: blue\">slot scope: passing parameter from child to parent</h3>\r\n    <!--refer: https://adamwathan.me/renderless-components-in-vuejs/-->\r\n    <car>\r\n        <h1 slot=\"header\">Special Features</h1>\r\n        <div slot=\"body\">\r\n            <h5>Fish and Chips</h5>\r\n            <p>Super delicious tbh.</p>\r\n        </div>\r\n        <div slot=\"link\" slot-scope=\"{link, bookmark}\">\r\n            <a  :href=\"link.href\">{{ link.title }}</a>\r\n            <button v-show=\"!link.bookmarked\" @click=\"bookmark(link)\">Bookmark</button>\r\n        </div>        \r\n    </car>\r\n\r\n    <hr class=\"mt-5\">\r\n    <h3 style=\"color: blue\">slot scope: renderless component</h3>\r\n    <!--Renderless component-->\r\n    <renderless-component-example>\r\n        <h1 slot-scope={exampleProp}>Hello {{exampleProp}}!</h1>\r\n    </renderless-component-example>\r\n\r\n    <hr class=\"mt-5\">\r\n    <h4 style=\"color: blue\">slot scope: with slot scope nothing</h4>\r\n    <!--with slot scope nothing-->\r\n    <renderless-tags-input>\r\n        <div slot-scope=\"{}\" class=\"tags-input\">\r\n            <span class=\"tags-input-tag\">\r\n                <span>Testing</span>\r\n                <span>Design</span>\r\n                <button type=\"button\" class=\"tags-input-remove\">&times;</button>\r\n            </span>\r\n            <input class=\"tags-input-text\" placeholder=\"Add tag...\">\r\n        </div>\r\n    </renderless-tags-input>\r\n\r\n    <hr class=\"mt-5\">\r\n    <h4 style=\"color: blue\">slot scope: with slot scope is tags</h4>\r\n    <!--with slot scope is tags-->\r\n    <renderless-tags-input v-model=\"tags\">\r\n            <div slot-scope=\"{tags, removeTag, inputAttrs, inputEvents, addTag}\" class=\"tags-input\">                \r\n                <span class=\"tags-input-tag\" v-for=\"tag in tags\">\r\n                    <span>{{tag}}</span>\r\n                    <button type=\"button\" class=\"tags-input-remove\" @click=\"removeTag(tag)\">&times;</button>\r\n                </span>\r\n                <input class=\"tags-input-text\" placeholder=\"Add tag...\" v-bind=\"inputAttrs\" v-on=\"inputEvents\">\r\n                <button type=\"button\" class=\"tags-input-text\" @click=\"addTag\">Add tags</button>\r\n            </div>\r\n        </renderless-tags-input>\r\n        <hr class=\"mt-5\">\r\n        <h3 style=\"color: blue\">Study table</h3>\r\n        <table-demo></table-demo>\r\n\r\n    <hr class=\"mt-5\">\r\n    <h4 style=\"color: blue\">Tab grid drag drop</h4>    \r\n    <tab-grid-dragdrop></tab-grid-dragdrop>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/study-page/_/study-page.scss":
/*!***************************************************************!*\
  !*** ./ClientApp/src/components/study-page/_/study-page.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./study-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study-page/_/study-page.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./study-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study-page/_/study-page.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./study-page.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study-page/_/study-page.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study-page/_/study-page.ts":
/*!*************************************************************!*\
  !*** ./ClientApp/src/components/study-page/_/study-page.ts ***!
  \*************************************************************/
/*! exports provided: StudyPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudyPageComponent", function() { return StudyPageComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _study_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./study-page.scss */ "./ClientApp/src/components/study-page/_/study-page.scss");
/* harmony import */ var _study_page_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_study_page_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hello_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hello/index */ "./ClientApp/src/components/hello/index.ts");
/* harmony import */ var _goodbye_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../goodbye/index */ "./ClientApp/src/components/goodbye/index.ts");
/* harmony import */ var _textbox_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../textbox/index */ "./ClientApp/src/components/textbox/index.ts");
/* harmony import */ var _study_car_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../study/car/index */ "./ClientApp/src/components/study/car/index.ts");
/* harmony import */ var _study_renderless_component_example_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../study/renderless-component-example/index */ "./ClientApp/src/components/study/renderless-component-example/index.ts");
/* harmony import */ var _study_renderless_tags_input_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../study/renderless-tags-input/index */ "./ClientApp/src/components/study/renderless-tags-input/index.ts");
/* harmony import */ var _study_table_demo_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../study/table-demo/index */ "./ClientApp/src/components/study/table-demo/index.ts");
/* harmony import */ var _study_tab_grid_dragdrop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../study/tab-grid-dragdrop */ "./ClientApp/src/components/study/tab-grid-dragdrop/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};













var StudyPageComponent = /** @class */ (function (_super) {
    __extends(StudyPageComponent, _super);
    function StudyPageComponent() {
        var _this = _super.call(this) || this;
        _this.name = "Guest";
        _this.isActive = false;
        _this.typeOfGreeting = "";
        _this.txtBox = "";
        _this.tags = ["Testing", "Design"];
        _this.example = [];
        return _this;
    }
    StudyPageComponent.prototype.created = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("created");
                setTimeout(function () {
                    _this.name = "created";
                    _this.typeOfGreeting = "hello";
                    _this.isActive = true;
                }, 3000);
                return [2 /*return*/];
            });
        });
    };
    StudyPageComponent.prototype.beforeMount = function () {
        console.log("beforemount");
    };
    StudyPageComponent.prototype.mounted = function () {
        var _this = this;
        console.log("mounted");
        setTimeout(function () {
            _this.typeOfGreeting = "hello";
            _this.name = "mounted";
            _this.isActive = true;
        }, 5000);
        var fi = __webpack_require__(/*! ./example.json */ "./ClientApp/src/components/study-page/_/example.json");
        if (fi) {
            console.log(fi.items);
            this.example = fi.items;
        }
        // $.getJSON(fi, function(data){
        //     console.log( "success" );
        //     console.log(data);
        // })
        // .done(function(){
        //     console.log( "second success" );
        // })
        // .fail(function(error){
        //     console.log( "error:" + error );
        // })
        // .always(function(){
        //     console.log( "complete" );
        // });
    };
    StudyPageComponent.prototype.beforeUpdate = function () {
        var _this = this;
        console.log("before updated");
        setTimeout(function () {
            _this.typeOfGreeting = "goodbye";
            _this.name = "before updated";
            _this.isActive = true;
        }, 3000);
    };
    Object.defineProperty(StudyPageComponent.prototype, "isShowLoading", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_1__["Root"].isShowLoading;
        },
        enumerable: true,
        configurable: true
    });
    StudyPageComponent.prototype.setName = function (value) {
        this.name = value;
    };
    StudyPageComponent.prototype.onFocus = function () {
        console.log("you are focus text box");
    };
    StudyPageComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./study-page.html */ "./ClientApp/src/components/study-page/_/study-page.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_3__["LayoutComponent"],
                "hello": _hello_index__WEBPACK_IMPORTED_MODULE_5__["HelloComponent"],
                "goodbye": _goodbye_index__WEBPACK_IMPORTED_MODULE_6__["GoodbyeComponent"],
                "text-box": _textbox_index__WEBPACK_IMPORTED_MODULE_7__["TextboxComponent"],
                "car": _study_car_index__WEBPACK_IMPORTED_MODULE_8__["CarComponent"],
                "renderless-component-example": _study_renderless_component_example_index__WEBPACK_IMPORTED_MODULE_9__["RenderlessComponentExampleComponent"],
                "renderless-tags-input": _study_renderless_tags_input_index__WEBPACK_IMPORTED_MODULE_10__["RenderlessTagsInputComponent"],
                "table-demo": _study_table_demo_index__WEBPACK_IMPORTED_MODULE_11__["TableComponent"],
                "tab-grid-dragdrop": _study_tab_grid_dragdrop__WEBPACK_IMPORTED_MODULE_12__["TabGridDragdropComponent"]
            },
            validations: {
                selectedLinkAccount: {
                    required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_4__["required"]
                }
            }
        }),
        __metadata("design:paramtypes", [])
    ], StudyPageComponent);
    return StudyPageComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study-page/index.ts":
/*!******************************************************!*\
  !*** ./ClientApp/src/components/study-page/index.ts ***!
  \******************************************************/
/*! exports provided: StudyPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _study_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/study-page */ "./ClientApp/src/components/study-page/_/study-page.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StudyPageComponent", function() { return _study_page__WEBPACK_IMPORTED_MODULE_0__["StudyPageComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/car/_/car.html":
/*!*******************************************************!*\
  !*** ./ClientApp/src/components/study/car/_/car.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <div class=\"card-header\">\r\n        <slot name=\"header\"></slot>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <slot name=\"body\"></slot>\r\n    </div>\r\n    <li v-for=\"link in links\">\r\n        <slot name=\"link\"\r\n            :link=\"link\"\r\n            :bookmark=\"bookmark\"\r\n        ></slot>\r\n    </li>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/study/car/_/car.scss":
/*!*******************************************************!*\
  !*** ./ClientApp/src/components/study/car/_/car.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./car.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/car/_/car.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./car.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/car/_/car.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./car.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/car/_/car.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/car/_/car.ts":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/study/car/_/car.ts ***!
  \*****************************************************/
/*! exports provided: CarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarComponent", function() { return CarComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _car_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./car.scss */ "./ClientApp/src/components/study/car/_/car.scss");
/* harmony import */ var _car_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_car_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarComponent = /** @class */ (function (_super) {
    __extends(CarComponent, _super);
    function CarComponent() {
        var _this = _super.call(this) || this;
        _this.links = [
            { href: "http://...", title: "First Link", bookmarked: true },
            { href: "http://...", title: "Second Link", bookmarked: false }
        ];
        return _this;
    }
    CarComponent.prototype.mounted = function () {
        console.log("car component");
    };
    CarComponent.prototype.bookmark = function (link) {
        link.bookmarked = true;
    };
    CarComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./car.html */ "./ClientApp/src/components/study/car/_/car.html")
        }),
        __metadata("design:paramtypes", [])
    ], CarComponent);
    return CarComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/car/index.ts":
/*!*****************************************************!*\
  !*** ./ClientApp/src/components/study/car/index.ts ***!
  \*****************************************************/
/*! exports provided: CarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/car */ "./ClientApp/src/components/study/car/_/car.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CarComponent", function() { return _car__WEBPACK_IMPORTED_MODULE_0__["CarComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.html":
/*!*********************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss":
/*!*********************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./renderless-component-example.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./renderless-component-example.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./renderless-component-example.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.ts":
/*!*******************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.ts ***!
  \*******************************************************************************************************/
/*! exports provided: RenderlessComponentExampleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderlessComponentExampleComponent", function() { return RenderlessComponentExampleComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _renderless_component_example_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderless-component-example.scss */ "./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss");
/* harmony import */ var _renderless_component_example_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_renderless_component_example_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RenderlessComponentExampleComponent = /** @class */ (function (_super) {
    __extends(RenderlessComponentExampleComponent, _super);
    function RenderlessComponentExampleComponent() {
        return _super.call(this) || this;
    }
    RenderlessComponentExampleComponent.prototype.render = function () {
        return this.$scopedSlots.default({
            exampleProp: "universe",
        });
    };
    RenderlessComponentExampleComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./renderless-component-example.html */ "./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.html")
        }),
        __metadata("design:paramtypes", [])
    ], RenderlessComponentExampleComponent);
    return RenderlessComponentExampleComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/renderless-component-example/index.ts":
/*!******************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-component-example/index.ts ***!
  \******************************************************************************/
/*! exports provided: RenderlessComponentExampleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderless_component_example__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/renderless-component-example */ "./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderlessComponentExampleComponent", function() { return _renderless_component_example__WEBPACK_IMPORTED_MODULE_0__["RenderlessComponentExampleComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.html":
/*!*******************************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss":
/*!*******************************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./renderless-tags-input.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./renderless-tags-input.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./renderless-tags-input.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.ts":
/*!*****************************************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.ts ***!
  \*****************************************************************************************/
/*! exports provided: RenderlessTagsInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderlessTagsInputComponent", function() { return RenderlessTagsInputComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _renderless_tags_input_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderless-tags-input.scss */ "./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss");
/* harmony import */ var _renderless_tags_input_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_renderless_tags_input_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RenderlessTagsInputComponent = /** @class */ (function (_super) {
    __extends(RenderlessTagsInputComponent, _super);
    function RenderlessTagsInputComponent() {
        var _this = _super.call(this) || this;
        _this.newTag = "";
        return _this;
    }
    RenderlessTagsInputComponent.prototype.render = function () {
        var _this = this;
        return this.$scopedSlots.default({
            tags: this.value,
            removeTag: this.removeTag,
            addTag: this.addTag,
            inputAttrs: {
                value: this.newTag,
            },
            inputEvents: {
                input: function (e) { _this.newTag = e.target.value; },
                keydown: function (e) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        _this.addTag();
                    }
                }
            }
        });
    };
    RenderlessTagsInputComponent.prototype.removeTag = function (tag) {
        this.$emit("input", this.value.filter(function (t) { return t !== tag; }));
    };
    RenderlessTagsInputComponent.prototype.addTag = function () {
        var _this = this;
        if (this.newTag.trim().length === 0 || this.value.find(function (t) { return t.includes(_this.newTag.trim()); })) {
            this.newTag = "tag";
        }
        this.$emit("input", this.value.concat([this.newTag.trim()]));
        this.newTag = "";
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])(),
        __metadata("design:type", Array)
    ], RenderlessTagsInputComponent.prototype, "value", void 0);
    RenderlessTagsInputComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./renderless-tags-input.html */ "./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.html")
        }),
        __metadata("design:paramtypes", [])
    ], RenderlessTagsInputComponent);
    return RenderlessTagsInputComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/renderless-tags-input/index.ts":
/*!***********************************************************************!*\
  !*** ./ClientApp/src/components/study/renderless-tags-input/index.ts ***!
  \***********************************************************************/
/*! exports provided: RenderlessTagsInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderless_tags_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/renderless-tags-input */ "./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderlessTagsInputComponent", function() { return _renderless_tags_input__WEBPACK_IMPORTED_MODULE_0__["RenderlessTagsInputComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/_/tab-grid-dragdrop.html":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/_/tab-grid-dragdrop.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fluid id=\"transport-orders\">\r\n  <div class=\"page-header\">\r\n    <b-row class=\"title-info pt-5\">\r\n      <b-col>\r\n        <h3 class=\"title-info-text\">Transport Orders</h3>\r\n      </b-col>\r\n    </b-row>\r\n\r\n    <b-row class=\"pt-4\">\r\n      <b-col>\r\n        <!-- <header-comp></header-comp> -->\r\n      </b-col>\r\n    </b-row>\r\n\r\n    <b-row class=\"pt-4 pb-4\">\r\n      <b-col>\r\n        <b-tabs content-class=\"mt-3\" v-model=\"tabIndex\" fill>\r\n          <b-tab >\r\n            <template v-slot:title>\r\n              All ({{ allCount }})\r\n            </template>\r\n          </b-tab>\r\n          <b-tab>\r\n            <template v-slot:title>\r\n              Quotation ({{ quotationCount }})\r\n            </template>\r\n          </b-tab>\r\n          <b-tab>\r\n            <template v-slot:title>\r\n              Booking ({{ bookingCount }})\r\n            </template>\r\n          </b-tab>\r\n          <b-tab>\r\n            <template v-slot:title>\r\n              Start of Service ({{ startServiceCount }})\r\n            </template>\r\n          </b-tab>\r\n          <b-tab>\r\n            <template v-slot:title>\r\n              End of Service ({{ endServiceCount }})\r\n            </template>\r\n          </b-tab>\r\n        </b-tabs>\r\n      </b-col>\r\n    </b-row>\r\n  </div>\r\n\r\n  <div class=\"page-body\">\r\n    <b-row>\r\n      <b-col>\r\n        <gridview></gridview>\r\n      </b-col>\r\n    </b-row>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/_/tab-grid-dragdrop.ts":
/*!*********************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/_/tab-grid-dragdrop.ts ***!
  \*********************************************************************************/
/*! exports provided: bus, TabGridDragdropComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bus", function() { return bus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabGridDragdropComponent", function() { return TabGridDragdropComponent; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-class-component */ "./node_modules/vue-class-component/dist/vue-class-component.common.js");
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_class_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gridview_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gridview/index */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var bus = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]();
var TabGridDragdropComponent = /** @class */ (function (_super) {
    __extends(TabGridDragdropComponent, _super);
    function TabGridDragdropComponent(d) {
        var _this = _super.call(this, d) || this;
        _this.tabIndex = null;
        return _this;
    }
    Object.defineProperty(TabGridDragdropComponent.prototype, "allCount", {
        get: function () {
            return 0; //transportOrdersStore.computedAllCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabGridDragdropComponent.prototype, "quotationCount", {
        get: function () {
            return 0; //transportOrdersStore.computedQuoteCount ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabGridDragdropComponent.prototype, "bookingCount", {
        get: function () {
            return 0; //transportOrdersStore.computedBookingCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabGridDragdropComponent.prototype, "startServiceCount", {
        get: function () {
            return 0; //transportOrdersStore.computedStartServiceCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabGridDragdropComponent.prototype, "endServiceCount", {
        get: function () {
            return 0; //transportOrdersStore.computedEndServiceCount;
        },
        enumerable: true,
        configurable: true
    });
    TabGridDragdropComponent = __decorate([
        vue_class_component__WEBPACK_IMPORTED_MODULE_1___default()({
            template: __webpack_require__(/*! ./tab-grid-dragdrop.html */ "./ClientApp/src/components/study/tab-grid-dragdrop/_/tab-grid-dragdrop.html"),
            components: {
                "gridview": _gridview_index__WEBPACK_IMPORTED_MODULE_2__["GridviewComponent"]
            }
        }),
        __metadata("design:paramtypes", [Object])
    ], TabGridDragdropComponent);
    return TabGridDragdropComponent;
}(vue__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.html":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-row>\r\n    <b-col>\r\n        <!-- <div id=\"loadMore\" v-if=\"isDisplayLoadMore\" @click=\"loadMoreData\">\r\n            <div class=\"load-more-icon\"><i class=\"fa fa-angle-double-down\"></i></div>\r\n        </div> -->\r\n        <gvheader class=\"gv-header\"></gvheader>\r\n        <gvbody class=\"gv-body\"></gvbody>\r\n    </b-col>\r\n</b-row>"

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gridView.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gridView.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gridView.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.ts":
/*!*********************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.ts ***!
  \*********************************************************************************/
/*! exports provided: GridviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridviewComponent", function() { return GridviewComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gridView_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gridView.scss */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss");
/* harmony import */ var _gridView_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gridView_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gvheader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gvheader */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/index.ts");
/* harmony import */ var _gvbody_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gvbody/index */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GridviewComponent = /** @class */ (function (_super) {
    __extends(GridviewComponent, _super);
    function GridviewComponent() {
        return _super.call(this) || this;
    }
    GridviewComponent.prototype.mounted = function () {
        console.log("car component");
    };
    GridviewComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./gridView.html */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.html"),
            components: {
                "gvheader": _gvheader__WEBPACK_IMPORTED_MODULE_2__["GvheaderComponent"],
                "gvbody": _gvbody_index__WEBPACK_IMPORTED_MODULE_3__["GvbodyComponent"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], GridviewComponent);
    return GridviewComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.html":
/*!****************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-row>\r\n    <b-col>\r\n        <div v-if=\"gvData != null && gvData.length > 0\" class=\"gv-body\">\r\n            <gvrow class=\"gv-row-global\" v-for=\"(rowItem, index) in gvData\" :dataItem=\"rowItem\"\r\n                :key=\"index + '-' + rowItem.quoteRequestRef\" />\r\n        </div>\r\n    </b-col>\r\n</b-row>"

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss":
/*!****************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvbody.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvbody.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvbody.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.ts":
/*!**************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.ts ***!
  \**************************************************************************************/
/*! exports provided: GvbodyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GvbodyComponent", function() { return GvbodyComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gvbody_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gvbody.scss */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss");
/* harmony import */ var _gvbody_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gvbody_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gvrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gvrow */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GvbodyComponent = /** @class */ (function (_super) {
    __extends(GvbodyComponent, _super);
    function GvbodyComponent() {
        var _this = _super.call(this) || this;
        _this.mockData = [
            {
                quoteRequestRef: "IT101250145.1",
                transportMode: "Sea",
                risk: "",
                departure: "",
                arrival: "",
                startDate: null,
                endDate: null,
                stage: "Quotation",
                status: "Received",
                actions: "",
                lastUpdate: "",
                quotationNumber: 1,
                transportModeCode: "S"
            }
        ];
        return _this;
    }
    Object.defineProperty(GvbodyComponent.prototype, "gvData", {
        get: function () {
            return this.mockData;
        },
        enumerable: true,
        configurable: true
    });
    GvbodyComponent.prototype.mounted = function () {
        console.log("car component");
    };
    GvbodyComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./gvbody.html */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.html"),
            components: {
                "gvrow": _gvrow__WEBPACK_IMPORTED_MODULE_2__["GvrowComponent"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], GvbodyComponent);
    return GvbodyComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.html":
/*!*********************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"gv-row\" :class=\"{'is-display-details': displayRowDetails}\">\r\n    <div class=\"main-content\">\r\n        <div v-for=\"column in arrDraggableHeader\" :style=\"{width: column.widthPercentage }\">\r\n            <span v-if=\"column.modelData==='quoteRequestRef'\"\r\n                class=\"to-numbel-label\">{{dataItem[column.modelData]}}</span>\r\n\r\n            <span v-if=\"column.modelData==='transportMode'\"\r\n            class=\"to-numbel-label\">{{dataItem[column.modelData]}}</span>\r\n\r\n            <!-- <mode-icon v-if=\"column.modelData==='transportMode'\" :modeCode=\"dataItem.transportModeCode\"></mode-icon>\r\n\r\n            <risk-icon v-if=\"column.modelData==='risk'\" :state=\"dataItem[column.modelData]\"\r\n                :style=\"{visibility: getRiskVisibility(dataItem[column.modelData])}\"></risk-icon>\r\n\r\n            <status-icon v-if=\"column.modelData==='status'\" :code=\"dataItem[column.modelData]\" :numberOfQuotation=\"dataItem.quotationNumber\"\r\n                :displayQuotation.sync=\"displayRowDetails\">\r\n            </status-icon> -->\r\n\r\n            <span v-if=\"['quoteRequestRef','transportMode','risk','status'].indexOf(column.modelData) < 0\">\r\n                <span v-if=\"['startDate','endDate'].indexOf(column.modelData) > -1\">\r\n                    {{dataItem[column.modelData]}}\r\n                </span>\r\n                <span v-if=\"['startDate','endDate'].indexOf(column.modelData) < 0\">\r\n                    {{dataItem[column.modelData]}}\r\n                </span>\r\n            </span>\r\n        </div>\r\n\r\n        <div class=\"icon-collapse\" :display-details=\"String(displayRowDetails)\"\r\n            v-on:click=\"displayRowDetails = (!displayRowDetails)\"\r\n            v-if= \"dataItem.quotationNumber > 0\">\r\n            <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>\r\n            <i class=\"fa fa-angle-up\" aria-hidden=\"true\"></i>\r\n        </div>\r\n    </div>\r\n\r\n    <div v-if=\"displayRowDetails\" class=\"details-content\">\r\n        <!-- <row-details :quotationDetail=\"rowDetailsData\"></row-details> -->\r\n        <h1>row detail component here</h1>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss":
/*!*********************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvrow.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvrow.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvrow.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.ts":
/*!*******************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.ts ***!
  \*******************************************************************************************/
/*! exports provided: GvrowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GvrowComponent", function() { return GvrowComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gvrow_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gvrow.scss */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss");
/* harmony import */ var _gvrow_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gvrow_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_study_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../store/modules/study-page */ "./ClientApp/src/store/modules/study-page/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GvrowComponent = /** @class */ (function (_super) {
    __extends(GvrowComponent, _super);
    // private arrDraggableHeaderData: IDraggableHeader[] = [
    //     { id: 0, titleCriteria: "TO Number", typeCriteria: "inp", widthPercentage: "10%", modelData: "quoteRequestRef", isDisplayed: true },
    //     { id: 1, titleCriteria: "Mode", typeCriteria: "ddl", widthPercentage: "5%", modelData: "transportMode", isDisplayed: true },
    //     { id: 2, titleCriteria: "Risk", typeCriteria: "ddl", widthPercentage: "10%", modelData: "risk", isDisplayed: true },
    //     { id: 3, titleCriteria: "POL", typeCriteria: "ddl", widthPercentage: "10%", modelData: "departure", isDisplayed: true },
    //     { id: 4, titleCriteria: "POD", typeCriteria: "ddl", widthPercentage: "10%", modelData: "arrival", isDisplayed: true },
    //     { id: 5, titleCriteria: "Start Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "startDate", isDisplayed: true },
    //     { id: 6, titleCriteria: "End Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "endDate", isDisplayed: true },
    //     { id: 7, titleCriteria: "Stage", typeCriteria: "ddl", widthPercentage: "10%", modelData: "stage", isDisplayed: true },
    //     { id: 8, titleCriteria: "Status", typeCriteria: "ddl", widthPercentage: "12%", modelData: "status", isDisplayed: true },
    //     { id: 9, titleCriteria: "Actions", typeCriteria: null, widthPercentage: "10%", modelData: "actions", isDisplayed: true }
    // ];
    function GvrowComponent() {
        var _this = _super.call(this) || this;
        _this.displayRowDetails = false;
        return _this;
    }
    Object.defineProperty(GvrowComponent.prototype, "arrDraggableHeader", {
        get: function () {
            return _store_modules_study_page__WEBPACK_IMPORTED_MODULE_2__["studyPage"].arrDraggableHeader; //this.arrDraggableHeaderData;
        },
        enumerable: true,
        configurable: true
    });
    GvrowComponent.prototype.mounted = function () {
        console.log("car component");
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ required: true }),
        __metadata("design:type", Object)
    ], GvrowComponent.prototype, "dataItem", void 0);
    GvrowComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./gvrow.html */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.html"),
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], GvrowComponent);
    return GvrowComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/index.ts":
/*!*****************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: GvrowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gvrow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/gvrow */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GvrowComponent", function() { return _gvrow__WEBPACK_IMPORTED_MODULE_0__["GvrowComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/index.ts":
/*!***********************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/index.ts ***!
  \***********************************************************************************/
/*! exports provided: GvbodyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gvbody__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/gvbody */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GvbodyComponent", function() { return _gvbody__WEBPACK_IMPORTED_MODULE_0__["GvbodyComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.html":
/*!********************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-row>\r\n    <b-col>\r\n        <draggable v-model=\"arrDraggableHeader\" class=\"gv-header\">\r\n            <div draggable=\"false\" v-for=\"item in arrDraggableHeader\" :key=\"item.id\"\r\n                v-bind:style=\"{ width: item.widthPercentage }\">\r\n                <gvcriteria v-if=\"item.typeCriteria === 'inp'\" :titleCriteria=\"item.titleCriteria\"\r\n                    :typeCriteria=\"item.typeCriteria\" :dataInput.sync=\"filterCriteria[item.modelData]\"\r\n                    :columnName=\"item.modelData\" :orderColumn.sync=\"orderColumn\"></gvcriteria>\r\n\r\n                <gvcriteria v-if=\"item.typeCriteria === 'dtm'\" :titleCriteria=\"item.titleCriteria\"\r\n                    :typeCriteria=\"item.typeCriteria\" :dataDate.sync=\"filterCriteria[item.modelData]\"\r\n                    :columnName=\"item.modelData\" :orderColumn.sync=\"orderColumn\"></gvcriteria>\r\n\r\n                <gvcriteria v-if=\"item.typeCriteria === 'ddl'\" :titleCriteria=\"item.titleCriteria\"\r\n                    :typeCriteria=\"item.typeCriteria\" :listData=\"getItemList(item.modelData)\"\r\n                    :selectedItem.sync=\"filterCriteria[item.modelData]\" :columnName=\"item.modelData\"\r\n                    :orderColumn.sync=\"orderColumn\"></gvcriteria>\r\n\r\n                <gvcriteria v-if=\"item.typeCriteria === null\" :titleCriteria=\"item.titleCriteria\"\r\n                    :columnName=\"item.modelData\" :orderColumn.sync=\"orderColumn\" onlyTitle>\r\n                </gvcriteria>\r\n            </div>\r\n            <div style=\"width: 3%\"></div>\r\n        </draggable>\r\n    </b-col>\r\n</b-row>"

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss":
/*!********************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvheader.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvheader.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvheader.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.ts":
/*!******************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.ts ***!
  \******************************************************************************************/
/*! exports provided: GvheaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GvheaderComponent", function() { return GvheaderComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuedraggable */ "./node_modules/vuedraggable/dist/vuedraggable.common.js");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gvheader_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gvheader.scss */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss");
/* harmony import */ var _gvheader_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gvheader_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gvcriteria__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gvcriteria */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/index.ts");
/* harmony import */ var _store_modules_study_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../store/modules/study-page */ "./ClientApp/src/store/modules/study-page/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GvheaderComponent = /** @class */ (function (_super) {
    __extends(GvheaderComponent, _super);
    function GvheaderComponent() {
        var _this = _super.call(this) || this;
        // private arrDraggableHeaderData: IDraggableHeader[] = [
        //     { id: 0, titleCriteria: "TO Number", typeCriteria: "inp", widthPercentage: "10%", modelData: "quoteRequestRef", isDisplayed: true },
        //     { id: 1, titleCriteria: "Mode", typeCriteria: "ddl", widthPercentage: "5%", modelData: "transportMode", isDisplayed: true },
        //     { id: 2, titleCriteria: "Risk", typeCriteria: "ddl", widthPercentage: "10%", modelData: "risk", isDisplayed: true },
        //     { id: 3, titleCriteria: "POL", typeCriteria: "ddl", widthPercentage: "10%", modelData: "departure", isDisplayed: true },
        //     { id: 4, titleCriteria: "POD", typeCriteria: "ddl", widthPercentage: "10%", modelData: "arrival", isDisplayed: true },
        //     { id: 5, titleCriteria: "Start Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "startDate", isDisplayed: true },
        //     { id: 6, titleCriteria: "End Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "endDate", isDisplayed: true },
        //     { id: 7, titleCriteria: "Stage", typeCriteria: "ddl", widthPercentage: "10%", modelData: "stage", isDisplayed: true },
        //     { id: 8, titleCriteria: "Status", typeCriteria: "ddl", widthPercentage: "12%", modelData: "status", isDisplayed: true },
        //     { id: 9, titleCriteria: "Actions", typeCriteria: null, widthPercentage: "10%", modelData: "actions", isDisplayed: true }
        // ];
        _this.filterCriteriaData = {
            quoteRequestRef: "", transportMode: "", risk: "", departure: "", arrival: "",
            startDate: null, endDate: null, stage: "", status: "", actions: "",
            lastUpdate: "", transportModeCode: "", quotationNumber: 0
        };
        return _this;
    }
    Object.defineProperty(GvheaderComponent.prototype, "arrDraggableHeader", {
        //private orderColumnData: IOrderCriteria = { columName: null, isAscending: null }
        get: function () {
            return _store_modules_study_page__WEBPACK_IMPORTED_MODULE_4__["studyPage"].arrDraggableHeader; //this.arrDraggableHeaderData;
        },
        set: function (val) {
            _store_modules_study_page__WEBPACK_IMPORTED_MODULE_4__["studyPage"].setArrDraggableHeader(val); // this.arrDraggableHeaderData = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GvheaderComponent.prototype, "filterCriteria", {
        get: function () {
            return this.filterCriteriaData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GvheaderComponent.prototype, "orderColumn", {
        get: function () {
            return _store_modules_study_page__WEBPACK_IMPORTED_MODULE_4__["studyPage"].orderColumn; //this.orderColumnData;
        },
        set: function (val) {
            _store_modules_study_page__WEBPACK_IMPORTED_MODULE_4__["studyPage"].setOrderColumn(val); //this.orderColumnData = val;
        },
        enumerable: true,
        configurable: true
    });
    GvheaderComponent.prototype.mounted = function () {
        console.log("car component");
    };
    GvheaderComponent.prototype.getItemList = function (modelDataOf) {
        switch (modelDataOf) {
            case "transportMode":
            case "departure":
            case "arrival":
            case "stage":
            case "status":
            default:
                return [];
        }
    };
    GvheaderComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./gvheader.html */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.html"),
            components: {
                "draggable": vuedraggable__WEBPACK_IMPORTED_MODULE_1___default.a,
                "gvcriteria": _gvcriteria__WEBPACK_IMPORTED_MODULE_3__["GvcriteriaComponent"],
            }
        }),
        __metadata("design:paramtypes", [])
    ], GvheaderComponent);
    return GvheaderComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.html":
/*!*********************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"criteria-component\">\r\n    <div class=\"criteria-header\">\r\n        <span>{{titleCriteria}}</span>\r\n        <!-- <order-row-component v-if=\"!onlyTitle\" :columnName=\"columnName\"\r\n            :orderStatus.sync=\"syncOrderColumn.columName\" :orderAscDesc.sync=\"syncOrderColumn.isAscending\">\r\n        </order-row-component> -->\r\n        <!-- <div v-if=\"onlyTitle\" style=\"visibility: hidden\">\r\n            <label>Hidden</label>\r\n        </div> -->\r\n    </div>\r\n    <div v-if=\"!onlyTitle\" class=\"criteria-content\">\r\n        <!-- <b-form-input v-if=\"isInput\" v-model=\"syncDataInput\"></b-form-input>\r\n        <b-form-select v-if=\"isDropDownList\" v-model=\"syncSelectedItem\" :options=\"listData\" value-field=\"code\"\r\n            text-field=\"label\">\r\n        </b-form-select>\r\n        <div class=\"v-carlendar-input\">\r\n            <v-date-picker v-if=\"isDateTime\" v-model=\"syncDataDate\"\r\n                :popover=\"{ placement: 'bottom', visibility: 'click' }\">\r\n                <b-input-group>\r\n                    <b-input-group-prepend>\r\n                        <span class=\"input-group-text\"><i class=\"fa fa-calendar-alt fa-lg\"></i></span>\r\n                    </b-input-group-prepend>\r\n                    <b-form-input v-model=\"modelDataStringDate\"></b-form-input>\r\n                </b-input-group>\r\n            </v-date-picker>\r\n        </div> -->\r\n        <b-form-input v-if=\"isInput\" ></b-form-input>\r\n        <b-form-select v-if=\"isDropDownList\" :options=\"listData\" value-field=\"code\"\r\n            text-field=\"label\">\r\n        </b-form-select>\r\n        <div class=\"v-carlendar-input\">\r\n            <v-date-picker v-if=\"isDateTime\" \r\n                :popover=\"{ placement: 'bottom', visibility: 'click' }\">\r\n                <b-input-group>\r\n                    <b-input-group-prepend>\r\n                        <span class=\"input-group-text\"><i class=\"fa fa-calendar-alt fa-lg\"></i></span>\r\n                    </b-input-group-prepend>\r\n                    <b-form-input ></b-form-input>\r\n                </b-input-group>\r\n            </v-date-picker>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss":
/*!*********************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvcriteria.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvcriteria.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./gvcriteria.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.ts":
/*!*******************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.ts ***!
  \*******************************************************************************************************/
/*! exports provided: GvcriteriaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GvcriteriaComponent", function() { return GvcriteriaComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gvcriteria_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gvcriteria.scss */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss");
/* harmony import */ var _gvcriteria_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gvcriteria_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GvcriteriaComponent = /** @class */ (function (_super) {
    __extends(GvcriteriaComponent, _super);
    // @PropSync("selectedItem", { required: false }) public syncSelectedItem: string;
    // @PropSync("dataInput", { required: false }) public syncDataInput: string;
    // @PropSync("dataDate", { required: false }) public syncDataDate: Date;
    //  @PropSync("orderColumn", { required: false }) public syncOrderColumn: IOrderCriteria;
    function GvcriteriaComponent() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GvcriteriaComponent.prototype, "modelDataStringDate", {
        get: function () {
            // if(this.syncDataDate === null) {
            //   return "";
            // }
            // return moment(this.syncDataDate.toDateString()).format("DD/MM/YYYY");
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GvcriteriaComponent.prototype, "isInput", {
        get: function () {
            return this.typeCriteria === "inp";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GvcriteriaComponent.prototype, "isDropDownList", {
        get: function () {
            return this.typeCriteria === "ddl";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GvcriteriaComponent.prototype, "isDateTime", {
        get: function () {
            return this.typeCriteria === "dtm";
        },
        enumerable: true,
        configurable: true
    });
    GvcriteriaComponent.prototype.mounted = function () {
        console.log("car component");
    };
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: false }),
        __metadata("design:type", Boolean)
    ], GvcriteriaComponent.prototype, "onlyTitle", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ default: "ddl" }),
        __metadata("design:type", String)
    ], GvcriteriaComponent.prototype, "typeCriteria", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ required: true }),
        __metadata("design:type", String)
    ], GvcriteriaComponent.prototype, "titleCriteria", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ required: false }),
        __metadata("design:type", Array)
    ], GvcriteriaComponent.prototype, "listData", void 0);
    __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Prop"])({ required: true }),
        __metadata("design:type", String)
    ], GvcriteriaComponent.prototype, "columnName", void 0);
    GvcriteriaComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./gvcriteria.html */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.html")
        }),
        __metadata("design:paramtypes", [])
    ], GvcriteriaComponent);
    return GvcriteriaComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/index.ts":
/*!************************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/index.ts ***!
  \************************************************************************************************/
/*! exports provided: GvcriteriaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gvcriteria__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/gvcriteria */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GvcriteriaComponent", function() { return _gvcriteria__WEBPACK_IMPORTED_MODULE_0__["GvcriteriaComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/index.ts":
/*!*************************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/index.ts ***!
  \*************************************************************************************/
/*! exports provided: GvheaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gvheader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/gvheader */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GvheaderComponent", function() { return _gvheader__WEBPACK_IMPORTED_MODULE_0__["GvheaderComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/index.ts":
/*!****************************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/gridview/index.ts ***!
  \****************************************************************************/
/*! exports provided: GridviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gridView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/gridView */ "./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GridviewComponent", function() { return _gridView__WEBPACK_IMPORTED_MODULE_0__["GridviewComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/tab-grid-dragdrop/index.ts":
/*!*******************************************************************!*\
  !*** ./ClientApp/src/components/study/tab-grid-dragdrop/index.ts ***!
  \*******************************************************************/
/*! exports provided: bus, TabGridDragdropComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_grid_dragdrop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/tab-grid-dragdrop */ "./ClientApp/src/components/study/tab-grid-dragdrop/_/tab-grid-dragdrop.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bus", function() { return _tab_grid_dragdrop__WEBPACK_IMPORTED_MODULE_0__["bus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabGridDragdropComponent", function() { return _tab_grid_dragdrop__WEBPACK_IMPORTED_MODULE_0__["TabGridDragdropComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/study/table-demo/_/table-demo.html":
/*!*********************************************************************!*\
  !*** ./ClientApp/src/components/study/table-demo/_/table-demo.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"app\">\r\n  <!--Table 1-->\r\n  <b-table :items=\"items\" :fields=\"fields\">\r\n    <template v-for=\"(field, index) in fields\" :slot=\"field.key\" slot-scope=\"data\">\r\n      <div v-if=\"field.colType === 'button'\">\r\n        <h5>{{data.item.name}}</h5>\r\n        <b-button>Am Button</b-button>\r\n      </div>\r\n      <div v-else-if=\"field.colType === 'span'\">\r\n        <h5>{{data.item.name}}</h5>\r\n        <span>Am Span</span>\r\n      </div>\r\n      <div v-else>\r\n        <h5>{{data.item.name}}</h5>\r\n        Am Confused\r\n      </div>\r\n    </template>\r\n  </b-table>\r\n  <!--Table 2-->\r\n  <b-table small :items=\"items1\" :fields=\"fields1\">\r\n    <template slot=\"cell(index)\" slot-scope=\"data\">\r\n      {{data.index + 1}}\r\n    </template>\r\n    <template slot=\"cell(name)\" slot-scope=\"data\">\r\n      <b class=\"text-info\">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>\r\n    </template>\r\n    <template slot=\"cell(nameage)\" slot-scope=\"data\">\r\n      {{ data.item.name.first }} is {{ data.item.age }} years old\r\n    </template>\r\n    <template slot=\"cell()\" slot-scope=\"data\">\r\n      <i>{{ data.value }}</i>\r\n    </template>\r\n  </b-table>\r\n\r\n  <!--Table 3-->\r\n  <div>\r\n      <b-table :items=\"items2\" :fields=\"fields2\" striped responsive=\"sm\">\r\n        <template slot=\"cell(show_details)\" slot-scope=\"row\">\r\n          <b-button size=\"sm\" @click=\"row.toggleDetails\" class=\"mr-2\">\r\n            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details\r\n          </b-button>\r\n  \r\n          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->\r\n          <b-form-checkbox v-model=\"row.detailsShowing\" @change=\"row.toggleDetails\">\r\n            Details via check\r\n          </b-form-checkbox>\r\n        </template>\r\n  \r\n        <template slot=\"row-details\" slot-scope=\"row\">\r\n          <b-card>\r\n            <b-row class=\"mb-2\">\r\n              <b-col sm=\"3\" class=\"text-sm-right\"><b>Age:</b></b-col>\r\n              <b-col>{{ row.item.age }}</b-col>\r\n            </b-row>\r\n  \r\n            <b-row class=\"mb-2\">\r\n              <b-col sm=\"3\" class=\"text-sm-right\"><b>Is Active:</b></b-col>\r\n              <b-col>{{ row.item.isActive }}</b-col>\r\n            </b-row>\r\n  \r\n            <b-button size=\"sm\" @click=\"row.toggleDetails\">Hide Details</b-button>\r\n          </b-card>\r\n        </template>\r\n      </b-table>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/src/components/study/table-demo/_/table-demo.scss":
/*!*********************************************************************!*\
  !*** ./ClientApp/src/components/study/table-demo/_/table-demo.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./table-demo.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/table-demo/_/table-demo.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./table-demo.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/table-demo/_/table-demo.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./table-demo.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/table-demo/_/table-demo.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/study/table-demo/_/table-demo.ts":
/*!*******************************************************************!*\
  !*** ./ClientApp/src/components/study/table-demo/_/table-demo.ts ***!
  \*******************************************************************/
/*! exports provided: TableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return TableComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_demo_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table-demo.scss */ "./ClientApp/src/components/study/table-demo/_/table-demo.scss");
/* harmony import */ var _table_demo_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_table_demo_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Table 1
        _this.fields = [
            {
                key: "id",
                label: "Id",
                colType: "span"
            }, {
                key: "name",
                label: "Name",
                colType: "button"
            }, {
                key: "uhh",
                label: "uhh..",
                colType: "idk"
            }
        ];
        _this.items = [
            {
                id: 0,
                name: "Test 0"
            }, {
                id: 1,
                name: "Test 1"
            }, {
                id: 2,
                name: "Test 2"
            }
        ];
        // Table 2
        _this.fields1 = [
            // A virtual column that doesn't exist in items
            'index',
            // A column that needs custom formatting
            { key: 'name', label: 'Full Name' },
            // A regular column
            'age',
            // A regular column
            'sex',
            // A virtual column made up from two fields
            { key: 'nameage', label: 'First name and age' }
        ];
        _this.items1 = [
            { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
            { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
            { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
            { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
        ];
        // Table 3
        _this.fields2 = ['first_name', 'last_name', 'show_details'];
        _this.items2 = [
            { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
            { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
            {
                isActive: false,
                age: 89,
                first_name: 'Geneva',
                last_name: 'Wilson',
                _showDetails: true
            },
            { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ];
        return _this;
    }
    TableComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./table-demo.html */ "./ClientApp/src/components/study/table-demo/_/table-demo.html")
        })
    ], TableComponent);
    return TableComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/study/table-demo/index.ts":
/*!************************************************************!*\
  !*** ./ClientApp/src/components/study/table-demo/index.ts ***!
  \************************************************************/
/*! exports provided: TableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _table_demo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/table-demo */ "./ClientApp/src/components/study/table-demo/_/table-demo.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return _table_demo__WEBPACK_IMPORTED_MODULE_0__["TableComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/textbox/_/textbox.html":
/*!*********************************************************!*\
  !*** ./ClientApp/src/components/textbox/_/textbox.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper-comp\">\r\n    <label>My Label</label>\r\n    <input v-on=\"$listeners\" type=\"text\"/>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/textbox/_/textbox.scss":
/*!*********************************************************!*\
  !*** ./ClientApp/src/components/textbox/_/textbox.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./textbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/textbox/_/textbox.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./textbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/textbox/_/textbox.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./textbox.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/textbox/_/textbox.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/components/textbox/_/textbox.ts":
/*!*******************************************************!*\
  !*** ./ClientApp/src/components/textbox/_/textbox.ts ***!
  \*******************************************************/
/*! exports provided: TextboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextboxComponent", function() { return TextboxComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _textbox_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./textbox.scss */ "./ClientApp/src/components/textbox/_/textbox.scss");
/* harmony import */ var _textbox_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_textbox_scss__WEBPACK_IMPORTED_MODULE_1__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TextboxComponent = /** @class */ (function (_super) {
    __extends(TextboxComponent, _super);
    function TextboxComponent() {
        return _super.call(this) || this;
    }
    TextboxComponent.prototype.mounted = function () {
        console.log("textbox component");
    };
    TextboxComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./textbox.html */ "./ClientApp/src/components/textbox/_/textbox.html")
        }),
        __metadata("design:paramtypes", [])
    ], TextboxComponent);
    return TextboxComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/textbox/index.ts":
/*!***************************************************!*\
  !*** ./ClientApp/src/components/textbox/index.ts ***!
  \***************************************************/
/*! exports provided: TextboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _textbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_/textbox */ "./ClientApp/src/components/textbox/_/textbox.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextboxComponent", function() { return _textbox__WEBPACK_IMPORTED_MODULE_0__["TextboxComponent"]; });




/***/ }),

/***/ "./ClientApp/src/main.ts":
/*!*******************************!*\
  !*** ./ClientApp/src/main.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./ClientApp/src/router.ts");
/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/navbar */ "./ClientApp/src/components/navbar/index.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./ClientApp/src/store/index.ts");
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sass/main.scss */ "./ClientApp/src/sass/main.scss");
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _components_shared_wait_loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/_shared/wait-loading */ "./ClientApp/src/components/_shared/wait-loading/index.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store/root-module */ "./ClientApp/src/store/root-module.ts");
/* harmony import */ var _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store/modules/alert-form */ "./ClientApp/src/store/modules/alert-form/index.ts");









vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_5__["default"]);
// tslint:disable-next-line:no-unused-expression
var router = Object(_router__WEBPACK_IMPORTED_MODULE_1__["createRouter"])();
var app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    el: "#app-main",
    store: _store__WEBPACK_IMPORTED_MODULE_3__["store"],
    router: router,
    components: {
        "navbar": _components_navbar__WEBPACK_IMPORTED_MODULE_2__["NavbarComponent"],
        "wait-loading": _components_shared_wait_loading__WEBPACK_IMPORTED_MODULE_6__["WaitLoadingComponent"]
    }
});
router.afterEach(function (to, from) {
    if (to.name !== "login") {
        _store_root_module__WEBPACK_IMPORTED_MODULE_7__["Root"].fetchShowLoading(true);
    }
});
router.beforeEach(function (to, from, next) {
    if (to.name !== "Login") {
        if (to.name === "CreateTriggeredId") {
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_8__["AlertTriggerForm"].fetchDataAlertTrigger();
            _store_modules_alert_form__WEBPACK_IMPORTED_MODULE_8__["AlertTriggerForm"].fetchInitStatusForm(_store_modules_alert_form__WEBPACK_IMPORTED_MODULE_8__["EInitStatus"].CREATE);
        }
    }
    next();
});


/***/ }),

/***/ "./ClientApp/src/router.ts":
/*!*********************************!*\
  !*** ./ClientApp/src/router.ts ***!
  \*********************************/
/*! exports provided: createRoutes, createRoutesForLogin, createRouter, createRouterForLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRoutes", function() { return createRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRoutesForLogin", function() { return createRoutesForLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRouter", function() { return createRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRouterForLogin", function() { return createRouterForLogin; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _config_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/helpers */ "./ClientApp/config/helpers.js");
/* harmony import */ var _config_helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config_helpers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_alert_form_triggered_alert_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/alert-form/triggered-alert-page */ "./ClientApp/src/components/alert-form/triggered-alert-page/index.ts");
/* harmony import */ var _components_alert_form_sending_conditions_form_preview_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/alert-form/sending-conditions-form/preview-form */ "./ClientApp/src/components/alert-form/sending-conditions-form/preview-form/index.ts");
/* harmony import */ var _components_alert_form_mail_template_mail_template_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/alert-form/mail-template/mail-template-page */ "./ClientApp/src/components/alert-form/mail-template/mail-template-page.ts");
/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/login */ "./ClientApp/src/components/login/index.ts");
/* harmony import */ var _components_profile_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/profile/index */ "./ClientApp/src/components/profile/index.ts");
/* harmony import */ var _components_link_account_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/link-account/index */ "./ClientApp/src/components/link-account/index.ts");
/* harmony import */ var _components_study_page_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/study-page/index */ "./ClientApp/src/components/study-page/index.ts");










vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
var createRoutes = function () { return [
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/"),
        name: "study-page",
        component: _components_study_page_index__WEBPACK_IMPORTED_MODULE_9__["StudyPageComponent"]
    },
    //{
    //    path: subsite("/create-triggered-alert/"),
    //    component: TriggeredAlertPageComponent
    //},
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/create-triggered-alert/:id"),
        name: "CreateTriggeredId",
        component: _components_alert_form_triggered_alert_page__WEBPACK_IMPORTED_MODULE_3__["TriggeredAlertPageComponent"]
    },
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/create-triggered-alert/sending-conditions-preview"),
        name: "PreviewForm",
        component: _components_alert_form_sending_conditions_form_preview_form__WEBPACK_IMPORTED_MODULE_4__["PreviewFormComponent"]
    },
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/mail-tempalte-alert"),
        name: "MailTemplateAlert",
        component: _components_alert_form_mail_template_mail_template_page__WEBPACK_IMPORTED_MODULE_5__["MailTemplatePageComponent"]
    },
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/profile"),
        name: "Profile",
        component: _components_profile_index__WEBPACK_IMPORTED_MODULE_7__["ProfileComponent"]
    },
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/link-account"),
        name: "LinkAccount",
        component: _components_link_account_index__WEBPACK_IMPORTED_MODULE_8__["LinkAccountComponent"]
    },
    // {
    //     path: subsite("/study-page"),
    //     name: "StudyPage",
    //     component: StudyPageComponent
    // },
    {
        path: "*",
        redirect: {
            name: "study-page"
        }
    },
]; };
var createRoutesForLogin = function () { return [
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/login"),
        component: _components_login__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
        name: "Login"
    },
    {
        path: "*",
        redirect: {
            name: "Login"
        }
    }
]; };
var createRouter = function () { return new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({ mode: "history", routes: createRoutes() }); };
var createRouterForLogin = function () { return new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({ mode: "history", routes: createRoutesForLogin() }); };


/***/ }),

/***/ "./ClientApp/src/sass/main.scss":
/*!**************************************!*\
  !*** ./ClientApp/src/sass/main.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/sass/main.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/sass/main.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/lib/loader.js!../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/sass/main.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./ClientApp/src/store/index.ts":
/*!**************************************!*\
  !*** ./ClientApp/src/store/index.ts ***!
  \**************************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
var store = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({});


/***/ }),

/***/ "./ClientApp/src/store/modules/alert-form/index.ts":
/*!*********************************************************!*\
  !*** ./ClientApp/src/store/modules/alert-form/index.ts ***!
  \*********************************************************/
/*! exports provided: ETrigger, EInitStatus, AlertTriggerForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ETrigger", function() { return ETrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EInitStatus", function() { return EInitStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertTriggerForm", function() { return AlertTriggerForm; });
/* harmony import */ var vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex-module-decorators */ "./node_modules/vuex-module-decorators/dist/esm/index.js");
/* harmony import */ var _util_static_common_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/static-common-function */ "./ClientApp/src/util/static-common-function.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../.. */ "./ClientApp/src/store/index.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/_shared/styled-form-radio */ "./ClientApp/src/components/_shared/styled-form-radio/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ETrigger;
(function (ETrigger) {
    ETrigger[ETrigger["MAIN_INFORMATION"] = 0] = "MAIN_INFORMATION";
    ETrigger[ETrigger["SENDING_CONDITIONS"] = 1] = "SENDING_CONDITIONS";
    ETrigger[ETrigger["MAIL_RECIPIENTS"] = 2] = "MAIL_RECIPIENTS";
    ETrigger[ETrigger["MAIL_DETAILS"] = 3] = "MAIL_DETAILS";
    ETrigger[ETrigger["MAIL_STRUCTURE"] = 4] = "MAIL_STRUCTURE";
    ETrigger[ETrigger["ATTACHMENTS"] = 5] = "ATTACHMENTS";
    ETrigger[ETrigger["DATE_ACTIVATION_RANGE"] = 6] = "DATE_ACTIVATION_RANGE";
})(ETrigger || (ETrigger = {}));
var EInitStatus;
(function (EInitStatus) {
    EInitStatus[EInitStatus["CREATE"] = 0] = "CREATE";
    EInitStatus[EInitStatus["RECAP_NON_EDIT"] = 1] = "RECAP_NON_EDIT";
    EInitStatus[EInitStatus["RECAP_EDIT"] = 2] = "RECAP_EDIT";
})(EInitStatus || (EInitStatus = {}));
var SendingConditionsModule = {
    selectedCategory: null,
    selectedField: null,
    selectedOperator: null,
    inputValue: "",
    checkedAdvancedMode: "",
    arrStrConditions: []
};
var MailStructureModule = {
    dicCheckbox: [],
    arrMailStructureData: []
};
var AlertTriggerFormModule = /** @class */ (function (_super) {
    __extends(AlertTriggerFormModule, _super);
    function AlertTriggerFormModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alertTrigger = null;
        _this.arrStatusForm = [];
        _this.component = {
            MainInformationModule: {
                clientInfo: {
                    processName: "",
                    selectedClient: null
                },
                selectedModule: new _components_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["StyledFormRadioComponent"](),
                selectedType: new _components_shared_styled_form_radio__WEBPACK_IMPORTED_MODULE_4__["StyledFormRadioComponent"]()
            },
            SendingConditionsModule: JSON.parse(JSON.stringify(SendingConditionsModule)),
            MailStructureModule: JSON.parse(JSON.stringify(MailStructureModule))
        };
        return _this;
    }
    AlertTriggerFormModule.prototype.fetchDataAlertTrigger = function (newVal) {
        if (newVal === void 0) { newVal = null; }
        return __awaiter(this, void 0, void 0, function () {
            var returnData;
            return __generator(this, function (_a) {
                returnData = { alertTrigger: null };
                if (newVal === null) {
                    returnData.alertTrigger = {
                        SendingConditions: [], MailRecipients: [], MailStructure: [], Attachments: [], MailDetails: { Body: null, Id: null, Subject: null, Alert: null },
                        MainInformation: {
                            Id: null, Reference: null, ModuleType: null, AlertType: null, Name: null, Transac: null,
                            ActiveMinDate: null, ActiveMaxDate: null, IsComplete: null, IsActive: null, IsPaused: null, SQLCreationAuthor: null
                        }
                    };
                }
                else {
                    if (newVal.MainInformation.ActiveMinDate != null) {
                        newVal.MainInformation.ActiveMinDate = _util_static_common_function__WEBPACK_IMPORTED_MODULE_1__["StaticCommonFunc"].convertFromJsonDateToJsDate(String(newVal.MainInformation.ActiveMinDate));
                    }
                    if (newVal.MainInformation.ActiveMaxDate != null) {
                        newVal.MainInformation.ActiveMaxDate = _util_static_common_function__WEBPACK_IMPORTED_MODULE_1__["StaticCommonFunc"].convertFromJsonDateToJsDate(String(newVal.MainInformation.ActiveMaxDate));
                    }
                    returnData.alertTrigger = newVal;
                }
                return [2 /*return*/, returnData];
            });
        });
    };
    AlertTriggerFormModule.prototype.initStatusForm = function (initStatus) {
        var tc = ETrigger;
        if (initStatus === EInitStatus.CREATE) {
            this.arrStatusForm = [
                { nameComponent: tc.MAIN_INFORMATION, status: "active", nextComponent: tc.SENDING_CONDITIONS },
                { nameComponent: tc.SENDING_CONDITIONS, status: "empty", nextComponent: tc.MAIL_RECIPIENTS },
                { nameComponent: tc.MAIL_RECIPIENTS, status: "empty", nextComponent: tc.MAIL_DETAILS },
                { nameComponent: tc.MAIL_DETAILS, status: "empty", nextComponent: tc.MAIL_STRUCTURE },
                { nameComponent: tc.MAIL_STRUCTURE, status: "empty", nextComponent: tc.ATTACHMENTS },
                { nameComponent: tc.ATTACHMENTS, status: "empty", nextComponent: tc.DATE_ACTIVATION_RANGE },
                { nameComponent: tc.DATE_ACTIVATION_RANGE, status: "empty", nextComponent: null }
            ];
        }
        else if (initStatus === EInitStatus.RECAP_EDIT) {
            this.arrStatusForm.forEach(function (item) {
                item.status = "filled";
            });
        }
        else if (initStatus === EInitStatus.RECAP_NON_EDIT) {
            this.arrStatusForm.forEach(function (item) {
                item.status = "recapNonEdit";
            });
            this.arrStatusForm.find(function (item) { return item.nameComponent === tc.DATE_ACTIVATION_RANGE; }).status = "recapSpecial";
        }
    };
    AlertTriggerFormModule.prototype.fetchInitStatusForm = function (initStatus) { return initStatus; };
    AlertTriggerFormModule.prototype.processChangeStatus = function () {
        for (var i = 0; i < this.arrStatusForm.length; i++) {
            var iItem = this.arrStatusForm[i];
            if (iItem.status === "active") {
                for (var j = i + 1; j < this.arrStatusForm.length; j++) {
                    var jItem = this.arrStatusForm[j];
                    if (jItem.status === "empty") {
                        break;
                    }
                    else {
                        jItem.status = "empty";
                    }
                }
                break;
            }
            var k = i + 1;
            if (iItem.status === "filled" && k < this.arrStatusForm.length) {
                var kItem = this.arrStatusForm[k];
                if (kItem.status === "empty") {
                    kItem.status = "active";
                    break;
                }
            }
        }
    };
    //Component: Main Information
    AlertTriggerFormModule.prototype.resetMainInformation = function () {
        this.component.MainInformationModule.clientInfo.processName = "";
        this.component.MainInformationModule.clientInfo.selectedClient = null;
        this.alertTrigger.MainInformation.AlertType = null;
        this.alertTrigger.MainInformation.ModuleType = null;
        this.alertTrigger.MainInformation.Name = "";
        this.alertTrigger.MainInformation.Transac = "";
    };
    AlertTriggerFormModule.prototype.onResetMainInformation = function () { };
    //Component: Sending Conditions
    AlertTriggerFormModule.prototype.resetSendingConditions = function () {
        this.alertTrigger.SendingConditions = [];
        this.component.SendingConditionsModule = JSON.parse(JSON.stringify(SendingConditionsModule));
    };
    AlertTriggerFormModule.prototype.onResetSendingConditions = function () { };
    //Component: Mail Recipients
    AlertTriggerFormModule.prototype.resetMailRecipients = function () {
        this.alertTrigger.MailRecipients = [];
    };
    AlertTriggerFormModule.prototype.onResetMailRecipients = function () { };
    //Component: Mail Details
    AlertTriggerFormModule.prototype.resetMailDetails = function () {
        this.alertTrigger.MailDetails = { Body: null, Id: null, Subject: null, Alert: null };
    };
    AlertTriggerFormModule.prototype.onResetMailDetails = function () { };
    //Component: Mail Structure
    /////////// reset data
    AlertTriggerFormModule.prototype.resetMailStructure = function () {
        this.alertTrigger.MailStructure = [];
        if (this.component.MailStructureModule.dicCheckbox.length > 0) {
            this.component.MailStructureModule.dicCheckbox.forEach(function (item) {
                item.AllSelected = false;
                item.Indeterminate = false;
                item.Selected = [];
            });
        }
    };
    AlertTriggerFormModule.prototype.onResetMailStructure = function () { };
    /////////// structure
    AlertTriggerFormModule.prototype.setDataArrMailStructure = function (newVal) {
        this.component.MailStructureModule.dicCheckbox = [];
        this.component.MailStructureModule.arrMailStructureData = newVal;
    };
    AlertTriggerFormModule.prototype.fetchDataArrMailStructure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/ClientAlerting/Alert/GetMailStructure").then(function (resp) {
                            if (resp.data.dResult) {
                                _this.context.commit("setDataArrMailStructure", resp.data.dDicStructure);
                            }
                            return resp.data.dResult;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Component: Attachment
    AlertTriggerFormModule.prototype.resetAttachment = function () {
        this.alertTrigger.Attachments = [];
    };
    AlertTriggerFormModule.prototype.onResetAttachment = function () { };
    // Component: Date Activation Range
    AlertTriggerFormModule.prototype.resetDateActivationRange = function () {
        this.alertTrigger.MainInformation.ActiveMinDate = null;
        this.alertTrigger.MainInformation.ActiveMaxDate = null;
    };
    AlertTriggerFormModule.prototype.onResetDateActivationRange = function () { };
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["alertTrigger"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AlertTriggerFormModule.prototype, "fetchDataAlertTrigger", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "initStatusForm", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "initStatusForm" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "fetchInitStatusForm", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "processChangeStatus", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetMainInformation", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetMainInformation" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetMainInformation", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetSendingConditions", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetSendingConditions" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetSendingConditions", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetMailRecipients", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetMailRecipients" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetMailRecipients", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetMailDetails", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetMailDetails" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetMailDetails", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetMailStructure", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetMailStructure" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetMailStructure", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "setDataArrMailStructure", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], AlertTriggerFormModule.prototype, "fetchDataArrMailStructure", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetAttachment", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetAttachment" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetAttachment", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "resetDateActivationRange", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "resetDateActivationRange" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AlertTriggerFormModule.prototype, "onResetDateActivationRange", null);
    AlertTriggerFormModule = __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Module"])({ dynamic: true, store: ___WEBPACK_IMPORTED_MODULE_2__["store"], name: "alertTrigger" })
    ], AlertTriggerFormModule);
    return AlertTriggerFormModule;
}(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["VuexModule"]));
var AlertTriggerForm = Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["getModule"])(AlertTriggerFormModule);


/***/ }),

/***/ "./ClientApp/src/store/modules/study-page/index.ts":
/*!*********************************************************!*\
  !*** ./ClientApp/src/store/modules/study-page/index.ts ***!
  \*********************************************************/
/*! exports provided: studyPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "studyPage", function() { return studyPage; });
/* harmony import */ var vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex-module-decorators */ "./node_modules/vuex-module-decorators/dist/esm/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../.. */ "./ClientApp/src/store/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var StudyPageModule = /** @class */ (function (_super) {
    __extends(StudyPageModule, _super);
    function StudyPageModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrDraggableHeader = [
            { id: 0, titleCriteria: "TO Number", typeCriteria: "inp", widthPercentage: "10%", modelData: "quoteRequestRef", isDisplayed: true },
            { id: 1, titleCriteria: "Mode", typeCriteria: "ddl", widthPercentage: "5%", modelData: "transportMode", isDisplayed: true },
            { id: 2, titleCriteria: "Risk", typeCriteria: "ddl", widthPercentage: "10%", modelData: "risk", isDisplayed: true },
            { id: 3, titleCriteria: "POL", typeCriteria: "ddl", widthPercentage: "10%", modelData: "departure", isDisplayed: true },
            { id: 4, titleCriteria: "POD", typeCriteria: "ddl", widthPercentage: "10%", modelData: "arrival", isDisplayed: true },
            { id: 5, titleCriteria: "Start Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "startDate", isDisplayed: true },
            { id: 6, titleCriteria: "End Date", typeCriteria: "dtm", widthPercentage: "10%", modelData: "endDate", isDisplayed: true },
            { id: 7, titleCriteria: "Stage", typeCriteria: "ddl", widthPercentage: "10%", modelData: "stage", isDisplayed: true },
            { id: 8, titleCriteria: "Status", typeCriteria: "ddl", widthPercentage: "12%", modelData: "status", isDisplayed: true },
            { id: 9, titleCriteria: "Actions", typeCriteria: null, widthPercentage: "10%", modelData: "actions", isDisplayed: true }
        ];
        _this.filterCriteria = {
            quoteRequestRef: "", transportMode: "", risk: "", departure: "", arrival: "",
            startDate: null, endDate: null, stage: "", status: "", actions: "",
            lastUpdate: "", transportModeCode: "", quotationNumber: 0
        };
        _this.orderColumn = { columName: null, isAscending: null };
        return _this;
    }
    StudyPageModule.prototype.updateArrDraggableHeader = function (data) {
        this.arrDraggableHeader = data;
    };
    StudyPageModule.prototype.setArrDraggableHeader = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    StudyPageModule.prototype.updateOrderColumn = function (data) {
        this.orderColumn = data;
    };
    StudyPageModule.prototype.setOrderColumn = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], StudyPageModule.prototype, "updateArrDraggableHeader", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "updateArrDraggableHeader" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], StudyPageModule.prototype, "setArrDraggableHeader", null);
    __decorate([
        vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Mutation"],
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StudyPageModule.prototype, "updateOrderColumn", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Action"])({ commit: "updateOrderColumn" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], StudyPageModule.prototype, "setOrderColumn", null);
    StudyPageModule = __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Module"])({ dynamic: true, store: ___WEBPACK_IMPORTED_MODULE_1__["store"], name: "studyPage" })
    ], StudyPageModule);
    return StudyPageModule;
}(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["VuexModule"]));
var studyPage = Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["getModule"])(StudyPageModule);


/***/ }),

/***/ "./ClientApp/src/store/root-module.ts":
/*!********************************************!*\
  !*** ./ClientApp/src/store/root-module.ts ***!
  \********************************************/
/*! exports provided: Root */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return Root; });
/* harmony import */ var vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex-module-decorators */ "./node_modules/vuex-module-decorators/dist/esm/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./ClientApp/src/store/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var RootModule = /** @class */ (function (_super) {
    __extends(RootModule, _super);
    function RootModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // States
        _this.arrClients = [];
        _this.arrAlertType = [];
        _this.arrModuleType = [];
        _this.arrCategories = [];
        _this.arrOperators = [];
        _this.arrFields = [];
        _this.arrSubjectEmail = [];
        _this.arrBodyEmail = [];
        _this.arrRecipientType = [];
        _this.arrThirdPartyRole = [];
        _this.isShowLoading = true;
        _this.linkAccount = "";
        _this.showNavBar = true;
        return _this;
    }
    RootModule.prototype.fetchClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrClients: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetTransacs")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrClients = response.data.dTransacs;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchArlertType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrAlertType: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetArlertType")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrAlertType = response.data.dArlertType;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchModuleType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrModuleType: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetModuleType")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrModuleType = response.data.dModuleType;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrCategories: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetCategories")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrCategories = response.data.dCategories;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchOperators = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrOperators: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetOperators")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrOperators = response.data.dOperators;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrFields: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetFields")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrFields = response.data.dFields;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchSubjectEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrSubjectEmail: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetSubjectEmail")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrSubjectEmail = response.data.dSubjectEmail;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchBodyEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrBodyEmail: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetBodyEmail")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrBodyEmail = response.data.dBodyEmail;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchEmailRecipientType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrRecipientType: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetEmailRecipientType")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrRecipientType = response.data.dEmailRecipientType;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchThirdPartyRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var returnData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnData = {
                            arrThirdPartyRole: []
                        };
                        return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/ClientAlerting/Helper/GetThirdPartyRole")];
                    case 1:
                        response = _a.sent();
                        if (response.data.dResult) {
                            returnData.arrThirdPartyRole = response.data.dThirdPartyRole;
                        }
                        return [2 /*return*/, returnData];
                }
            });
        });
    };
    RootModule.prototype.fetchShowLoading = function (newVal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { isShowLoading: newVal }];
            });
        });
    };
    RootModule.prototype.fetchLinkAccount = function (newVal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { linkAccount: newVal }];
            });
        });
    };
    RootModule.prototype.fetchShowNavBar = function (newVal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { showNavBar: newVal }];
            });
        });
    };
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrClients"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchClients", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrAlertType"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchArlertType", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrModuleType"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchModuleType", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrCategories"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchCategories", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrOperators"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchOperators", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrFields"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchFields", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrSubjectEmail"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchSubjectEmail", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrBodyEmail"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchBodyEmail", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrRecipientType"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchEmailRecipientType", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["arrThirdPartyRole"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchThirdPartyRole", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["isShowLoading"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchShowLoading", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["linkAccount"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchLinkAccount", null);
    __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["MutationAction"])({ mutate: ["showNavBar"] }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", Promise)
    ], RootModule.prototype, "fetchShowNavBar", null);
    RootModule = __decorate([
        Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["Module"])({ name: "root", dynamic: true, store: _store__WEBPACK_IMPORTED_MODULE_2__["store"] })
    ], RootModule);
    return RootModule;
}(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["VuexModule"]));
var Root = Object(vuex_module_decorators__WEBPACK_IMPORTED_MODULE_0__["getModule"])(RootModule);


/***/ }),

/***/ "./ClientApp/src/util/static-common-function.ts":
/*!******************************************************!*\
  !*** ./ClientApp/src/util/static-common-function.ts ***!
  \******************************************************/
/*! exports provided: StaticCommonFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticCommonFunc", function() { return StaticCommonFunc; });
var StaticCommonFunc = /** @class */ (function () {
    function StaticCommonFunc() {
    }
    StaticCommonFunc.equalObject = function (obj_1, obj_2) {
        var json_1 = typeof obj_1 === "string" ? obj_1 : JSON.stringify(obj_1);
        var json_2 = typeof obj_2 === "string" ? obj_2 : JSON.stringify(obj_2);
        if (json_1.length !== json_2.length) {
            return false;
        }
        else if (json_1.indexOf(json_2) < 0) {
            return false;
        }
        else {
            return true;
        }
    };
    StaticCommonFunc.convertFromJsonDateToJsDate = function (strDate) {
        if (strDate != undefined && strDate.indexOf("/Date(") > -1) {
            return new Date(parseInt(String(strDate).replace("/Date(", "")));
        }
        return new Date(strDate);
    };
    StaticCommonFunc.getNowDate = function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };
    return StaticCommonFunc;
}());



/***/ }),

/***/ "./ClientApp/src/util/validators.ts":
/*!******************************************!*\
  !*** ./ClientApp/src/util/validators.ts ***!
  \******************************************/
/*! exports provided: isProcessExist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProcessExist", function() { return isProcessExist; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function isProcessExist(value) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!value) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, processExistAxios(value)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function processExistAxios(value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/ClientAlerting/Alert/ProcessExist", { params: { processname: value } })
                        .then(function (response) {
                        if (response.data.result) {
                            if (response.data.result === "Exist")
                                return true;
                            if (response.data.result === "NExist")
                                return false;
                        }
                    }).catch(function (reason) {
                        return false;
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/form-header/form-header.scss":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/_shared/form-header/form-header.scss ***!
  \*******************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\nstrong {\n  font-size: 1.2rem; }\n\n.active-badge {\n  padding: 0px 7px;\n  border-radius: 50%;\n  background-color: crimson;\n  font-weight: bold;\n  color: white;\n  font-size: 0.9rem; }\n\n.empty-badge {\n  padding: 0px 7px;\n  border-radius: 50%;\n  border: 1px solid gray;\n  font-weight: bold;\n  color: gray;\n  font-size: 0.9rem; }\n\n.filled-badge {\n  padding: 4px;\n  border-radius: 50%;\n  background-color: gray;\n  font-weight: bold;\n  color: white;\n  font-size: 0.9rem; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/_shared/logins-dropdown/logins-dropdown.scss ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/_shared/styled-form-radio/styled-form-radio.scss ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\ni {\n  margin-right: 7px; }\n\n.option-filled {\n  color: #93b8d0;\n  font-weight: 450;\n  font-size: 1rem;\n  margin-left: 13%; }\n\n.radio-btn-group {\n  display: flex; }\n  .radio-btn-group .radio {\n    margin-right: 1.5rem; }\n    .radio-btn-group .radio span {\n      position: absolute;\n      top: 1.5rem;\n      left: 33%; }\n    .radio-btn-group .radio label {\n      position: relative;\n      background: #fff;\n      border: 1px solid #ddd;\n      height: 5rem;\n      width: 21rem;\n      border-radius: 5px;\n      cursor: pointer;\n      color: #444;\n      transition: box-shadow 400ms ease; }\n      .radio-btn-group .radio label:hover {\n        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); }\n    .radio-btn-group .radio input[type=\"radio\"] {\n      display: none; }\n    .radio-btn-group .radio input[type=\"radio\"]:checked + label {\n      background: #2196F3;\n      color: #fff;\n      border-color: #2196F3; }\n  .radio-btn-group .radio--disable label {\n    color: #808080 !important;\n    cursor: default !important;\n    background-color: #c2c2c2 !important; }\n    .radio-btn-group .radio--disable label:hover {\n      box-shadow: none !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/_shared/wait-loading/_/wait-loading.scss ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.loader {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  text-align: center;\n  z-index: 100;\n  background-color: rgba(0, 0, 0, 0.5); }\n  .loader:before {\n    content: '';\n    display: block;\n    padding-top: 100%; }\n\n.circular {\n  animation: rotate 2s linear infinite;\n  height: 200px;\n  transform-origin: center center;\n  width: 200px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  text-align: center;\n  vertical-align: central; }\n  .circular .path {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n    animation: dash 1.5s ease-in-out infinite;\n    stroke: #2196F3;\n    stroke-linecap: round; }\n\n@keyframes rotate {\n  100% {\n    transform: rotate(360deg); } }\n\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px; }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px; } }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/attachment-section/_/attachment-section.scss ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.pointer {\n  cursor: pointer; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/attachment-section/_/list-selected-files/_/selected-file.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.selected-file {\n  background-color: #e9ecef;\n  border-radius: .25rem;\n  border: 1px solid #ced4da; }\n  .selected-file i {\n    cursor: pointer; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/date-activation-range-section/_/date-activation-range-section.scss ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.vdp-datepicker input {\n  width: 100%; }\n\n.vdp-datepicker__calendar-button {\n  position: absolute;\n  margin-left: 91%;\n  top: 4px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/mail-detail-form/_/mail-detail-form.scss ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.size-select-subject {\n  width: 20% !important; }\n\n#Addsubject div:first-child {\n  display: inline-flex; }\n\n.align-element {\n  margin-right: 10px; }\n\n#frmMailDetail .row {\n  padding-top: 10px; }\n\n.mailBody {\n  width: 100%;\n  height: 138px; }\n\n#AddBody div:first-child {\n  display: inline-flex; }\n\n.align-right {\n  float: right; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/mail-recipients/_/mail-recipients.scss ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n#mail-recipients-container .mail__recipients__label {\n  color: gray;\n  font-size: 1rem; }\n\n#mail-recipients-container .mail__recipients__add__email {\n  color: black;\n  font-weight: bold;\n  font-size: 0.9rem; }\n\n#mail-recipients-container .mail__recipients__box__add__email {\n  border: 1px solid;\n  border-color: grey;\n  border-radius: 4px;\n  background-color: white;\n  height: 180px;\n  width: 100%; }\n\n#mail-recipients-container .input__multi__line__border {\n  border: 1px solid;\n  border-color: #cdd4da;\n  border-radius: 3px;\n  background-color: white;\n  width: 100%; }\n  #mail-recipients-container .input__multi__line__border .input__multi__line__control {\n    margin-top: -0.25rem;\n    padding-top: 0px;\n    color: black;\n    border: none;\n    background-color: transparent;\n    box-shadow: none;\n    margin-top: 0.5rem; }\n  #mail-recipients-container .input__multi__line__border .mail__control__container {\n    border: 1px solid;\n    border-color: grey;\n    border-radius: 1.6rem;\n    height: 1.5rem;\n    background-color: white;\n    font-size: 0.8rem;\n    display: inline-block; }\n    #mail-recipients-container .input__multi__line__border .mail__control__container .opiton__btn__close {\n      font-size: 1.2rem;\n      outline: none; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/mail-structure-form/_/mail-structure-form.scss ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.b--col--mod {\n  padding-left: 12px !important; }\n\n.padding--mod {\n  padding-top: 43px;\n  /*padding-bottom: 43px;*/ }\n\n.sub--mailstruct--header {\n  color: #6C7E96; }\n\n.col--count--2 {\n  column-count: 2;\n  /*column-gap: 66%;*/ }\n  .col--count--2 .custom-control {\n    padding-bottom: 15px; }\n\n.custom--fa--arrow {\n  color: #6C7E96 !important;\n  cursor: pointer; }\n\n.list--items {\n  display: none;\n  padding: 0 7px 0 7px; }\n\n.display--items {\n  display: block; }\n\n.label--category {\n  font-size: 18px; }\n\n.label--item {\n  color: #6C7E96; }\n\n.rotate {\n  -moz-transition: all .3s linear;\n  -webkit-transition: all .5s linear;\n  transition: all .2s linear; }\n\n.rotate.up {\n  -moz-transform: rotate(180deg);\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg); }\n\n.custom--disable {\n  color: #b0c5e0 !important;\n  cursor: not-allowed; }\n\n.custom-control-input:checked ~ .custom-control-label::before {\n  color: #fff;\n  border-color: #6C7E96 !important;\n  background-color: #6C7E96 !important; }\n\n.custom-control-input:indeterminate ~ .custom-control-label::before {\n  color: #fff;\n  border-color: #6C7E96 !important;\n  background-color: #6C7E96 !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/mail-structure-form/custom-checkbox/_/custom-checkbox.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/mail-template/mail-template-page.scss ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.font-size {\n  font-size: 25px; }\n\n.title-header {\n  vertical-align: middle;\n  display: table-cell;\n  height: 25px; }\n\n.icon-header {\n  float: left; }\n\n.title-content {\n  font-size: 14pt; }\n\n.mail-tempalte-header {\n  padding-bottom: 15px; }\n\n.mail-tempalte-content {\n  background-color: #FFFFFF;\n  min-height: 100px;\n  border: 1px solid #e1e0e0;\n  align-items: center;\n  display: flex;\n  padding-top: 10px; }\n\n.message-content {\n  padding-left: 15px; }\n\n.mail-content .row {\n  padding-top: 10px;\n  padding-bottom: 15px; }\n\n.mail-tempalte-content .row {\n  width: 100%;\n  padding-left: 10px; }\n\n.event-header {\n  font-weight: bold; }\n\n.shipment-align-data {\n  padding-bottom: 20px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/main-information-form/_/main-information-form.scss ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/main-information-form/client-info/_/client-info.scss ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.section {\n  margin-top: 8px;\n  font-size: 0.7rem;\n  color: #b3bfd0; }\n\n.value {\n  font-size: 0.9rem;\n  font-weight: 450;\n  color: #8896aa; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/sending-conditions-form/_/sending-conditions-form.scss ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.custom-button {\n  width: 100px; }\n\n.custom-list-selected {\n  -moz-appearance: none !important;\n  -webkit-appearance: none !important;\n  appearance: none !important;\n  overflow-x: scroll; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/sending-conditions-form/add-condition/condition/_/condition.scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.select-condition {\n  background-image: none !important; }\n  .select-condition option:first-child {\n    color: #9faab9 !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/alert-form/triggered-alert-page/_/triggered-alert-page.scss ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.invalid-input {\n  border: 1px solid red !important;\n  background-color: #ffccaa !important; }\n\n.invalid-message {\n  color: red; }\n\n.save-button {\n  margin-top: 40px; }\n\n.align-button {\n  padding-left: 10%; }\n\n.header-component {\n  margin-left: -30px; }\n\n.font-explain {\n  color: #8896aa;\n  font-size: 0.9rem; }\n\n.recap-mode .title-recap {\n  margin-top: 8px;\n  font-size: 0.7rem;\n  color: #b3bfd0; }\n\n.recap-mode .content-recap {\n  font-size: 0.9rem;\n  font-weight: 450;\n  color: #8896aa; }\n\n.home--page--button {\n  font-size: 20px;\n  cursor: pointer; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/common/button-icon-add/_/button-icon-add.scss ***!
  \****************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.text-button {\n  font-size: 0.9rem;\n  font-weight: 450;\n  color: #8896aa; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/common/popup/popup.scss":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/common/popup/popup.scss ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n#popup-container .popup__header__text {\n  font-size: 1.3rem;\n  font-weight: 500;\n  margin-left: 10px; }\n\n#popup-container .popup__header__btn--close {\n  margin-right: 10%;\n  outline: none; }\n\n#popup-container .popup__body {\n  margin-left: 10px;\n  margin-right: 10px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/goodbye/_/goodbye.scss":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/goodbye/_/goodbye.scss ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/hello/_/hello.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/hello/_/hello.scss ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/layout/layout.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/layout/layout.scss ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.page-title {\n  background-color: #FFFFFF;\n  height: 100px;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1); }\n  .page-title .page-header {\n    font-size: 28px;\n    border: none;\n    padding: 0px 10px; }\n\n::placeholder {\n  color: #9faab9 !important;\n  opacity: 1;\n  /* Firefox */ }\n\n:-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #9faab9 !important; }\n\n::-ms-input-placeholder {\n  /* Microsoft Edge */\n  color: #9faab9 !important; }\n\n.custom-select {\n  -webkit-appearance: menulist !important; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/link-account/_/link-account.scss":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/link-account/_/link-account.scss ***!
  \***************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/navbar/navbar.scss":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/navbar/navbar.scss ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.vertical-nav {\n  height: 100%;\n  background-color: #3a75c4;\n  position: relative;\n  z-index: 3;\n  width: 80px;\n  transition: width 0.5s;\n  -webkit-transition: width 0.5s;\n  /* Safari and Chrome */\n  -moz-transition: width 0.5s;\n  /* Firefox */\n  -o-transition: width 0.5s;\n  /* Opera */ }\n\n.vertical-nav:hover {\n  width: 180px; }\n\n.img-link {\n  height: 100%;\n  width: 50%;\n  margin: auto;\n  display: block; }\n\n.vertical-nav:hover .nav-item {\n  left: 15%;\n  top: 150px; }\n\n.menu-icons {\n  font-size: 2rem;\n  color: white; }\n\n.menu-text {\n  font-size: 1.2rem;\n  color: white;\n  font-weight: bolder;\n  margin-left: 5%;\n  opacity: 0.0;\n  text-decoration: underline;\n  animation: opacity 2s;\n  -webkit-animation: opacity 2s;\n  /* Safari and Chrome */\n  -moz-animation: opacity 2s;\n  /* Firefox */\n  -o-animation: opacity 2s;\n  /* Opera */ }\n\n.vertical-nav:hover .menu-text {\n  opacity: 1.0; }\n\n.img-bollore {\n  width: 5%;\n  margin: auto;\n  display: block;\n  transform: rotateZ(-90deg);\n  position: fixed;\n  bottom: 5%;\n  left: -5px;\n  transition: all .5s ease-out;\n  -webkit-transition: all .5s ease-out;\n  /* Safari and Chrome */\n  -moz-transition: all .5s ease-out;\n  /* Firefox */\n  -o-transition: all .5s ease-out;\n  /* Opera */ }\n\n.vertical-nav:hover .img-bollore {\n  left: 15px;\n  width: 150px;\n  transform: rotateZ(0deg); }\n\n#sidedrawer {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  width: 200px;\n  z-index: 101;\n  background-color: #3A75C4;\n  color: #fff;\n  transition: width 0.3s;\n  transition-delay: 0.1s;\n  overflow-y: hidden;\n  overflow-x: hidden; }\n  #sidedrawer .menu-modules {\n    min-height: calc(91% - 240px); }\n    #sidedrawer .menu-modules ul .menu-home {\n      display: none; }\n    #sidedrawer .menu-modules .subMenu {\n      position: fixed;\n      left: 200px;\n      background-color: #3A75C4;\n      z-index: 1;\n      margin-top: -60px;\n      width: 0px; }\n      #sidedrawer .menu-modules .subMenu.showSubMenu {\n        transition: ease width 0.3s;\n        width: 220px; }\n        #sidedrawer .menu-modules .subMenu.showSubMenu .subMenuBorder {\n          border-left: solid 2px rgba(255, 255, 255, 0.4); }\n  #sidedrawer .collapsed-burger {\n    display: none; }\n  #sidedrawer #sidedrawer-brand {\n    height: 100px;\n    padding: 10px;\n    text-align: center; }\n    #sidedrawer #sidedrawer-brand .link-logo {\n      width: 100px;\n      position: relative;\n      top: 50%;\n      -ms-transform: translateY(-50%);\n      -moz-transform: translateY(-50%);\n      -webkit-transform: translateY(-50%);\n      -o-transform: translateY(-50%);\n      transform: translateY(-50%);\n      margin: 0;\n      transition: width 0.3s; }\n  #sidedrawer ul {\n    list-style: none;\n    padding-left: 0px;\n    margin-bottom: 0; }\n    #sidedrawer ul > li {\n      height: 54px;\n      display: block; }\n      #sidedrawer ul > li.sidedrawer-burger {\n        cursor: pointer;\n        padding: 16px;\n        font-size: 24px;\n        text-align: center;\n        border-top: 1px solid #0F4D75; }\n    #sidedrawer ul .menu-module {\n      height: 100%;\n      overflow: hidden;\n      display: inline-block;\n      color: #fff;\n      cursor: pointer;\n      width: 100%; }\n      #sidedrawer ul .menu-module:hover {\n        color: #e0e0e0;\n        text-decoration: none; }\n        #sidedrawer ul .menu-module:hover .module-title {\n          text-decoration: underline; }\n      #sidedrawer ul .menu-module .module-picto {\n        text-align: center;\n        overflow: hidden;\n        vertical-align: middle; }\n        #sidedrawer ul .menu-module .module-picto i {\n          width: 70px;\n          height: 100%;\n          font-size: 20px;\n          padding: 16px;\n          vertical-align: middle;\n          text-align: center; }\n      #sidedrawer ul .menu-module strong {\n        overflow: hidden;\n        width: calc(100% - 60px); }\n    #sidedrawer ul #menu-search.hide-pd {\n      padding-top: 0px; }\n    #sidedrawer ul #menu-search.show-pd {\n      padding-top: 15px; }\n  #sidedrawer > ul > li:first-child strong:hover {\n    background-color: #e0e0e0; }\n  #sidedrawer > ul > li:first-child strong + ul > li {\n    padding: 6px 0px; }\n  #sidedrawer .bollore-logo img {\n    transform: rotateZ(360deg);\n    position: relative;\n    right: 0;\n    transition: all 0.3s ease-out;\n    max-width: 190px; }\n\n.collapse-sidedrawer #sidedrawer {\n  overflow: hidden;\n  width: 70px; }\n  .collapse-sidedrawer #sidedrawer #sidedrawer-brand .link-logo {\n    width: 50px; }\n  .collapse-sidedrawer #sidedrawer .bollore-logo img {\n    transform: rotateZ(270deg);\n    transform-origin: bottom left;\n    left: 68px;\n    height: 60px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/profile/_/profile.scss":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/profile/_/profile.scss ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.notification {\n  display: block;\n  position: absolute;\n  z-index: 10;\n  background-color: #60ca8d;\n  width: 15%;\n  height: 60px;\n  border-radius: 4px;\n  margin-left: 82%; }\n  .notification .content {\n    color: white;\n    font-size: 12px;\n    position: absolute;\n    top: -10px;\n    left: 50%;\n    color: white;\n    transform: translate(-50%, 0%);\n    -ms-transform: translate(-50%, 0%); }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study-page/_/study-page.scss":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study-page/_/study-page.scss ***!
  \***********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/car/_/car.scss":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/car/_/car.scss ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/renderless-component-example/_/renderless-component-example.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/renderless-tags-input/_/renderless-tags-input.scss ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/_/gridView.scss ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n#loadMore {\n  position: absolute;\n  bottom: 100px;\n  right: 50px;\n  z-index: 10 !important;\n  background-color: #FFFFFF;\n  border-radius: 30px;\n  width: 60px;\n  height: 60px;\n  -webkit-box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.3);\n  -moz-box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.3);\n  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.3); }\n  #loadMore .load-more-icon {\n    position: absolute;\n    z-index: 1;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    font-size: 11px;\n    color: #F7981C; }\n\n.gv-header {\n  z-index: 2; }\n  .gv-header * {\n    z-index: 2; }\n\n.gv-body {\n  z-index: 1; }\n  .gv-body * {\n    z-index: 1; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/_/gvbody.scss ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.gv-body {\n  width: 100%;\n  position: relative; }\n  .gv-body .gv-row-global {\n    width: 100%;\n    min-height: 80px;\n    margin: 10px 0;\n    border: 1px solid #d7dae0;\n    border-radius: 10px; }\n    .gv-body .gv-row-global:nth-child(even) {\n      background-color: #ffffff; }\n    .gv-body .gv-row-global:nth-child(odd) {\n      background-color: #f1f4f8; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvbody/gvrow/_/gvrow.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.gv-row.is-display-details {\n  box-shadow: 10px 5px 5px 10px #f1f4f8;\n  border-color: #6e95cb !important; }\n\n.gv-row .main-content {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  padding: 5px 0;\n  height: 80px;\n  position: relative; }\n  .gv-row .main-content .icon-collapse {\n    position: absolute;\n    right: 10px;\n    top: 35px;\n    color: #6492d3;\n    cursor: pointer; }\n    .gv-row .main-content .icon-collapse[display-details=\"true\"] .fa-angle-down {\n      display: none; }\n    .gv-row .main-content .icon-collapse[display-details=\"false\"] .fa-angle-up {\n      display: none; }\n  .gv-row .main-content .to-numbel-label {\n    color: blue; }\n  .gv-row .main-content > div {\n    display: flex;\n    padding: 0 5px 0 10px;\n    align-items: center; }\n\n.gv-row .details-content {\n  width: 100%;\n  margin-top: 10px 0;\n  background-color: #ffffff;\n  border-top: 1px solid #d7dae0;\n  border-radius: 10px; }\n\n.gv-row .show-details {\n  cursor: pointer;\n  padding-left: 10px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/_/gvheader.scss ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.gv-header {\n  width: 100%;\n  display: flex;\n  flex-direction: row; }\n  .gv-header > div,\n  .gv-header > .sortable-ghost,\n  .gv-header > .sortable-chosen {\n    display: flex; }\n    .gv-header > div[draggable=\"false\"],\n    .gv-header > .sortable-ghost[draggable=\"false\"],\n    .gv-header > .sortable-chosen[draggable=\"false\"] {\n      cursor: -webkit-grab !important;\n      cursor: -moz-grab !important; }\n    .gv-header > div[draggable=\"true\"],\n    .gv-header > .sortable-ghost[draggable=\"true\"],\n    .gv-header > .sortable-chosen[draggable=\"true\"] {\n      cursor: -webkit-grabbing !important;\n      cursor: -moz-grabbing !important; }\n  .gv-header > div:first-child {\n    margin-right: 5px; }\n  .gv-header > div:last-child {\n    margin-left: 5px; }\n  .gv-header > div:nth-child(2n + 1):not(:first-child):not(:last-child) {\n    margin: 0 5px; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/tab-grid-dragdrop/gridview/gvheader/gvcriteria/_/gvcriteria.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.criteria-component {\n  position: relative;\n  width: 100%; }\n  .criteria-component .criteria-header {\n    width: 100%;\n    padding: 0 5px;\n    margin-top: 10px;\n    display: inline-flex;\n    justify-content: space-between;\n    align-items: flex-end; }\n  .criteria-component .criteria-content {\n    width: 100%;\n    margin-top: 5px; }\n    .criteria-component .criteria-content .v-carlendar-input {\n      position: relative;\n      width: 100%; }\n      .criteria-component .criteria-content .v-carlendar-input .input-group-text {\n        border-right: none;\n        background: #fff;\n        cursor: pointer; }\n      .criteria-component .criteria-content .v-carlendar-input input {\n        border-left: none; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/study/table-demo/_/table-demo.scss":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/study/table-demo/_/table-demo.scss ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/textbox/_/textbox.scss":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/textbox/_/textbox.scss ***!
  \*****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/sass/main.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/sass/main.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var getUrl = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot"));
var ___CSS_LOADER_URL___1___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.eot */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") + "?#iefix");
var ___CSS_LOADER_URL___2___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2 */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"));
var ___CSS_LOADER_URL___3___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.woff */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff"));
var ___CSS_LOADER_URL___4___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf"));
var ___CSS_LOADER_URL___5___ = getUrl(__webpack_require__(/*! @fortawesome/fontawesome-free/webfonts/fa-solid-900.svg */ "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") + "#fontawesome");
// Module
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n/*!\n * Bootstrap v4.3.1 (https://getbootstrap.com/)\n * Copyright 2011-2019 The Bootstrap Authors\n * Copyright 2011-2019 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n:root {\n  --blue: #007bff;\n  --indigo: #6610f2;\n  --purple: #6f42c1;\n  --pink: #e83e8c;\n  --red: #dc3545;\n  --orange: #fd7e14;\n  --yellow: #ffc107;\n  --green: #28a745;\n  --teal: #20c997;\n  --cyan: #17a2b8;\n  --white: #fff;\n  --gray: #6c757d;\n  --gray-dark: #343a40;\n  --primary: #007bff;\n  --secondary: #6c757d;\n  --success: #28a745;\n  --info: #17a2b8;\n  --warning: #ffc107;\n  --danger: #dc3545;\n  --light: #f8f9fa;\n  --dark: #343a40;\n  --breakpoint-xs: 0;\n  --breakpoint-sm: 576px;\n  --breakpoint-md: 768px;\n  --breakpoint-lg: 992px;\n  --breakpoint-xl: 1200px;\n  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box; }\n\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n\narticle, aside, figcaption, figure, footer, header, hgroup, main, nav, section {\n  display: block; }\n\nbody {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: 0 !important; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: 0.5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  text-decoration: underline;\n  text-decoration: underline dotted;\n  cursor: help;\n  border-bottom: 0;\n  text-decoration-skip-ink: none; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: 700; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -.25em; }\n\nsup {\n  top: -.5em; }\n\na {\n  color: #007bff;\n  text-decoration: none;\n  background-color: transparent; }\n  a:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):hover, a:not([href]):not([tabindex]):focus {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: 0; }\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  font-size: 1em; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle;\n  border-style: none; }\n\nsvg {\n  overflow: hidden;\n  vertical-align: middle; }\n\ntable {\n  border-collapse: collapse; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #6c757d;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: inherit; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: 0.5rem; }\n\nbutton {\n  border-radius: 0; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nselect {\n  word-wrap: normal; }\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton:not(:disabled),\n[type=\"button\"]:not(:disabled),\n[type=\"reset\"]:not(:disabled),\n[type=\"submit\"]:not(:disabled) {\n  cursor: pointer; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  padding: 0;\n  border-style: none; }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  overflow: auto;\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n  color: inherit;\n  white-space: normal; }\n\nprogress {\n  vertical-align: baseline; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  outline-offset: -2px;\n  -webkit-appearance: none; }\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button; }\n\noutput {\n  display: inline-block; }\n\nsummary {\n  display: list-item;\n  cursor: pointer; }\n\ntemplate {\n  display: none; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  line-height: 1.2; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.2; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: 400; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 0.5rem; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.25rem; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #6c757d; }\n  .blockquote-footer::before {\n    content: \"\\2014\\00A0\"; }\n\n.img-fluid {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #6c757d; }\n\ncode {\n  font-size: 87.5%;\n  color: #e83e8c;\n  word-break: break-word; }\n  a > code {\n    color: inherit; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 87.5%;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: 700; }\n\npre {\n  display: block;\n  font-size: 87.5%;\n  color: #212529; }\n  pre code {\n    font-size: inherit;\n    color: inherit;\n    word-break: normal; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n  @media (min-width: 576px) {\n    .container {\n      max-width: 540px; } }\n  @media (min-width: 768px) {\n    .container {\n      max-width: 720px; } }\n  @media (min-width: 992px) {\n    .container {\n      max-width: 960px; } }\n  @media (min-width: 1200px) {\n    .container {\n      max-width: 1140px; } }\n\n.container-fluid {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto; }\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px; }\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0; }\n  .no-gutters > .col,\n  .no-gutters > [class*=\"col-\"] {\n    padding-right: 0;\n    padding-left: 0; }\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col,\n.col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm,\n.col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md,\n.col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg,\n.col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl,\n.col-xl-auto {\n  position: relative;\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px; }\n\n.col {\n  flex-basis: 0;\n  flex-grow: 1;\n  max-width: 100%; }\n\n.col-auto {\n  flex: 0 0 auto;\n  width: auto;\n  max-width: 100%; }\n\n.col-1 {\n  flex: 0 0 8.33333%;\n  max-width: 8.33333%; }\n\n.col-2 {\n  flex: 0 0 16.66667%;\n  max-width: 16.66667%; }\n\n.col-3 {\n  flex: 0 0 25%;\n  max-width: 25%; }\n\n.col-4 {\n  flex: 0 0 33.33333%;\n  max-width: 33.33333%; }\n\n.col-5 {\n  flex: 0 0 41.66667%;\n  max-width: 41.66667%; }\n\n.col-6 {\n  flex: 0 0 50%;\n  max-width: 50%; }\n\n.col-7 {\n  flex: 0 0 58.33333%;\n  max-width: 58.33333%; }\n\n.col-8 {\n  flex: 0 0 66.66667%;\n  max-width: 66.66667%; }\n\n.col-9 {\n  flex: 0 0 75%;\n  max-width: 75%; }\n\n.col-10 {\n  flex: 0 0 83.33333%;\n  max-width: 83.33333%; }\n\n.col-11 {\n  flex: 0 0 91.66667%;\n  max-width: 91.66667%; }\n\n.col-12 {\n  flex: 0 0 100%;\n  max-width: 100%; }\n\n.order-first {\n  order: -1; }\n\n.order-last {\n  order: 13; }\n\n.order-0 {\n  order: 0; }\n\n.order-1 {\n  order: 1; }\n\n.order-2 {\n  order: 2; }\n\n.order-3 {\n  order: 3; }\n\n.order-4 {\n  order: 4; }\n\n.order-5 {\n  order: 5; }\n\n.order-6 {\n  order: 6; }\n\n.order-7 {\n  order: 7; }\n\n.order-8 {\n  order: 8; }\n\n.order-9 {\n  order: 9; }\n\n.order-10 {\n  order: 10; }\n\n.order-11 {\n  order: 11; }\n\n.order-12 {\n  order: 12; }\n\n.offset-1 {\n  margin-left: 8.33333%; }\n\n.offset-2 {\n  margin-left: 16.66667%; }\n\n.offset-3 {\n  margin-left: 25%; }\n\n.offset-4 {\n  margin-left: 33.33333%; }\n\n.offset-5 {\n  margin-left: 41.66667%; }\n\n.offset-6 {\n  margin-left: 50%; }\n\n.offset-7 {\n  margin-left: 58.33333%; }\n\n.offset-8 {\n  margin-left: 66.66667%; }\n\n.offset-9 {\n  margin-left: 75%; }\n\n.offset-10 {\n  margin-left: 83.33333%; }\n\n.offset-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-sm-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .col-sm-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-sm-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-sm-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-sm-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-sm-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-sm-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-sm-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-sm-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-sm-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-sm-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-sm-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-sm-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-sm-first {\n    order: -1; }\n  .order-sm-last {\n    order: 13; }\n  .order-sm-0 {\n    order: 0; }\n  .order-sm-1 {\n    order: 1; }\n  .order-sm-2 {\n    order: 2; }\n  .order-sm-3 {\n    order: 3; }\n  .order-sm-4 {\n    order: 4; }\n  .order-sm-5 {\n    order: 5; }\n  .order-sm-6 {\n    order: 6; }\n  .order-sm-7 {\n    order: 7; }\n  .order-sm-8 {\n    order: 8; }\n  .order-sm-9 {\n    order: 9; }\n  .order-sm-10 {\n    order: 10; }\n  .order-sm-11 {\n    order: 11; }\n  .order-sm-12 {\n    order: 12; }\n  .offset-sm-0 {\n    margin-left: 0; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-md-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .col-md-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-md-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-md-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-md-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-md-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-md-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-md-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-md-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-md-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-md-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-md-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-md-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-md-first {\n    order: -1; }\n  .order-md-last {\n    order: 13; }\n  .order-md-0 {\n    order: 0; }\n  .order-md-1 {\n    order: 1; }\n  .order-md-2 {\n    order: 2; }\n  .order-md-3 {\n    order: 3; }\n  .order-md-4 {\n    order: 4; }\n  .order-md-5 {\n    order: 5; }\n  .order-md-6 {\n    order: 6; }\n  .order-md-7 {\n    order: 7; }\n  .order-md-8 {\n    order: 8; }\n  .order-md-9 {\n    order: 9; }\n  .order-md-10 {\n    order: 10; }\n  .order-md-11 {\n    order: 11; }\n  .order-md-12 {\n    order: 12; }\n  .offset-md-0 {\n    margin-left: 0; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-lg-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .col-lg-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-lg-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-lg-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-lg-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-lg-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-lg-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-lg-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-lg-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-lg-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-lg-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-lg-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-lg-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-lg-first {\n    order: -1; }\n  .order-lg-last {\n    order: 13; }\n  .order-lg-0 {\n    order: 0; }\n  .order-lg-1 {\n    order: 1; }\n  .order-lg-2 {\n    order: 2; }\n  .order-lg-3 {\n    order: 3; }\n  .order-lg-4 {\n    order: 4; }\n  .order-lg-5 {\n    order: 5; }\n  .order-lg-6 {\n    order: 6; }\n  .order-lg-7 {\n    order: 7; }\n  .order-lg-8 {\n    order: 8; }\n  .order-lg-9 {\n    order: 9; }\n  .order-lg-10 {\n    order: 10; }\n  .order-lg-11 {\n    order: 11; }\n  .order-lg-12 {\n    order: 12; }\n  .offset-lg-0 {\n    margin-left: 0; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl {\n    flex-basis: 0;\n    flex-grow: 1;\n    max-width: 100%; }\n  .col-xl-auto {\n    flex: 0 0 auto;\n    width: auto;\n    max-width: 100%; }\n  .col-xl-1 {\n    flex: 0 0 8.33333%;\n    max-width: 8.33333%; }\n  .col-xl-2 {\n    flex: 0 0 16.66667%;\n    max-width: 16.66667%; }\n  .col-xl-3 {\n    flex: 0 0 25%;\n    max-width: 25%; }\n  .col-xl-4 {\n    flex: 0 0 33.33333%;\n    max-width: 33.33333%; }\n  .col-xl-5 {\n    flex: 0 0 41.66667%;\n    max-width: 41.66667%; }\n  .col-xl-6 {\n    flex: 0 0 50%;\n    max-width: 50%; }\n  .col-xl-7 {\n    flex: 0 0 58.33333%;\n    max-width: 58.33333%; }\n  .col-xl-8 {\n    flex: 0 0 66.66667%;\n    max-width: 66.66667%; }\n  .col-xl-9 {\n    flex: 0 0 75%;\n    max-width: 75%; }\n  .col-xl-10 {\n    flex: 0 0 83.33333%;\n    max-width: 83.33333%; }\n  .col-xl-11 {\n    flex: 0 0 91.66667%;\n    max-width: 91.66667%; }\n  .col-xl-12 {\n    flex: 0 0 100%;\n    max-width: 100%; }\n  .order-xl-first {\n    order: -1; }\n  .order-xl-last {\n    order: 13; }\n  .order-xl-0 {\n    order: 0; }\n  .order-xl-1 {\n    order: 1; }\n  .order-xl-2 {\n    order: 2; }\n  .order-xl-3 {\n    order: 3; }\n  .order-xl-4 {\n    order: 4; }\n  .order-xl-5 {\n    order: 5; }\n  .order-xl-6 {\n    order: 6; }\n  .order-xl-7 {\n    order: 7; }\n  .order-xl-8 {\n    order: 8; }\n  .order-xl-9 {\n    order: 9; }\n  .order-xl-10 {\n    order: 10; }\n  .order-xl-11 {\n    order: 11; }\n  .order-xl-12 {\n    order: 12; }\n  .offset-xl-0 {\n    margin-left: 0; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  margin-bottom: 1rem;\n  color: #212529; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #dee2e6; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #dee2e6; }\n  .table tbody + tbody {\n    border-top: 2px solid #dee2e6; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #dee2e6; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #dee2e6; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-borderless th,\n.table-borderless td,\n.table-borderless thead th,\n.table-borderless tbody + tbody {\n  border: 0; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  color: #212529;\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-primary,\n.table-primary > th,\n.table-primary > td {\n  background-color: #b8daff; }\n\n.table-primary th,\n.table-primary td,\n.table-primary thead th,\n.table-primary tbody + tbody {\n  border-color: #7abaff; }\n\n.table-hover .table-primary:hover {\n  background-color: #9fcdff; }\n  .table-hover .table-primary:hover > td,\n  .table-hover .table-primary:hover > th {\n    background-color: #9fcdff; }\n\n.table-secondary,\n.table-secondary > th,\n.table-secondary > td {\n  background-color: #d6d8db; }\n\n.table-secondary th,\n.table-secondary td,\n.table-secondary thead th,\n.table-secondary tbody + tbody {\n  border-color: #b3b7bb; }\n\n.table-hover .table-secondary:hover {\n  background-color: #c8cbcf; }\n  .table-hover .table-secondary:hover > td,\n  .table-hover .table-secondary:hover > th {\n    background-color: #c8cbcf; }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #c3e6cb; }\n\n.table-success th,\n.table-success td,\n.table-success thead th,\n.table-success tbody + tbody {\n  border-color: #8fd19e; }\n\n.table-hover .table-success:hover {\n  background-color: #b1dfbb; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #b1dfbb; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #bee5eb; }\n\n.table-info th,\n.table-info td,\n.table-info thead th,\n.table-info tbody + tbody {\n  border-color: #86cfda; }\n\n.table-hover .table-info:hover {\n  background-color: #abdde5; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #abdde5; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #ffeeba; }\n\n.table-warning th,\n.table-warning td,\n.table-warning thead th,\n.table-warning tbody + tbody {\n  border-color: #ffdf7e; }\n\n.table-hover .table-warning:hover {\n  background-color: #ffe8a1; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #ffe8a1; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f5c6cb; }\n\n.table-danger th,\n.table-danger td,\n.table-danger thead th,\n.table-danger tbody + tbody {\n  border-color: #ed969e; }\n\n.table-hover .table-danger:hover {\n  background-color: #f1b0b7; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #f1b0b7; }\n\n.table-light,\n.table-light > th,\n.table-light > td {\n  background-color: #fdfdfe; }\n\n.table-light th,\n.table-light td,\n.table-light thead th,\n.table-light tbody + tbody {\n  border-color: #fbfcfc; }\n\n.table-hover .table-light:hover {\n  background-color: #ececf6; }\n  .table-hover .table-light:hover > td,\n  .table-hover .table-light:hover > th {\n    background-color: #ececf6; }\n\n.table-dark,\n.table-dark > th,\n.table-dark > td {\n  background-color: #c6c8ca; }\n\n.table-dark th,\n.table-dark td,\n.table-dark thead th,\n.table-dark tbody + tbody {\n  border-color: #95999c; }\n\n.table-hover .table-dark:hover {\n  background-color: #b9bbbe; }\n  .table-hover .table-dark:hover > td,\n  .table-hover .table-dark:hover > th {\n    background-color: #b9bbbe; }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table .thead-dark th {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #454d55; }\n\n.table .thead-light th {\n  color: #495057;\n  background-color: #e9ecef;\n  border-color: #dee2e6; }\n\n.table-dark {\n  color: #fff;\n  background-color: #343a40; }\n  .table-dark th,\n  .table-dark td,\n  .table-dark thead th {\n    border-color: #454d55; }\n  .table-dark.table-bordered {\n    border: 0; }\n  .table-dark.table-striped tbody tr:nth-of-type(odd) {\n    background-color: rgba(255, 255, 255, 0.05); }\n  .table-dark.table-hover tbody tr:hover {\n    color: #fff;\n    background-color: rgba(255, 255, 255, 0.075); }\n\n@media (max-width: 575.98px) {\n  .table-responsive-sm {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .table-responsive-sm > .table-bordered {\n      border: 0; } }\n\n@media (max-width: 767.98px) {\n  .table-responsive-md {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .table-responsive-md > .table-bordered {\n      border: 0; } }\n\n@media (max-width: 991.98px) {\n  .table-responsive-lg {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .table-responsive-lg > .table-bordered {\n      border: 0; } }\n\n@media (max-width: 1199.98px) {\n  .table-responsive-xl {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n    .table-responsive-xl > .table-bordered {\n      border: 0; } }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch; }\n  .table-responsive > .table-bordered {\n    border: 0; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .form-control {\n      transition: none; } }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #495057;\n    background-color: #fff;\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .form-control::placeholder {\n    color: #6c757d;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #e9ecef;\n    opacity: 1; }\n\nselect.form-control:focus::-ms-value {\n  color: #495057;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block;\n  width: 100%; }\n\n.col-form-label {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5; }\n\n.col-form-label-lg {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n  line-height: 1.5; }\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  margin-bottom: 0;\n  line-height: 1.5;\n  color: #212529;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.form-control-lg {\n  height: calc(1.5em + 1rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\nselect.form-control[size], select.form-control[multiple] {\n  height: auto; }\n\ntextarea.form-control {\n  height: auto; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-row {\n  display: flex;\n  flex-wrap: wrap;\n  margin-right: -5px;\n  margin-left: -5px; }\n  .form-row > .col,\n  .form-row > [class*=\"col-\"] {\n    padding-right: 5px;\n    padding-left: 5px; }\n\n.form-check {\n  position: relative;\n  display: block;\n  padding-left: 1.25rem; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.3rem;\n  margin-left: -1.25rem; }\n  .form-check-input:disabled ~ .form-check-label {\n    color: #6c757d; }\n\n.form-check-label {\n  margin-bottom: 0; }\n\n.form-check-inline {\n  display: inline-flex;\n  align-items: center;\n  padding-left: 0;\n  margin-right: 0.75rem; }\n  .form-check-inline .form-check-input {\n    position: static;\n    margin-top: 0;\n    margin-right: 0.3125rem;\n    margin-left: 0; }\n\n.valid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #28a745; }\n\n.valid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(40, 167, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.was-validated .form-control:valid, .form-control.is-valid {\n  border-color: #28a745;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: center right calc(0.375em + 0.1875rem);\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .form-control:valid:focus, .form-control.is-valid:focus {\n    border-color: #28a745;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n  .was-validated .form-control:valid ~ .valid-feedback,\n  .was-validated .form-control:valid ~ .valid-tooltip, .form-control.is-valid ~ .valid-feedback,\n  .form-control.is-valid ~ .valid-tooltip {\n    display: block; }\n\n.was-validated textarea.form-control:valid, textarea.form-control.is-valid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem); }\n\n.was-validated .custom-select:valid, .custom-select.is-valid {\n  border-color: #28a745;\n  padding-right: calc((1em + 0.75rem) * 3 / 4 + 1.75rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .custom-select:valid:focus, .custom-select.is-valid:focus {\n    border-color: #28a745;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n  .was-validated .custom-select:valid ~ .valid-feedback,\n  .was-validated .custom-select:valid ~ .valid-tooltip, .custom-select.is-valid ~ .valid-feedback,\n  .custom-select.is-valid ~ .valid-tooltip {\n    display: block; }\n\n.was-validated .form-control-file:valid ~ .valid-feedback,\n.was-validated .form-control-file:valid ~ .valid-tooltip, .form-control-file.is-valid ~ .valid-feedback,\n.form-control-file.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {\n  color: #28a745; }\n\n.was-validated .form-check-input:valid ~ .valid-feedback,\n.was-validated .form-check-input:valid ~ .valid-tooltip, .form-check-input.is-valid ~ .valid-feedback,\n.form-check-input.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:valid ~ .custom-control-label, .custom-control-input.is-valid ~ .custom-control-label {\n  color: #28a745; }\n  .was-validated .custom-control-input:valid ~ .custom-control-label::before, .custom-control-input.is-valid ~ .custom-control-label::before {\n    border-color: #28a745; }\n\n.was-validated .custom-control-input:valid ~ .valid-feedback,\n.was-validated .custom-control-input:valid ~ .valid-tooltip, .custom-control-input.is-valid ~ .valid-feedback,\n.custom-control-input.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:valid:checked ~ .custom-control-label::before, .custom-control-input.is-valid:checked ~ .custom-control-label::before {\n  border-color: #34ce57;\n  background-color: #34ce57; }\n\n.was-validated .custom-control-input:valid:focus ~ .custom-control-label::before, .custom-control-input.is-valid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.was-validated .custom-control-input:valid:focus:not(:checked) ~ .custom-control-label::before, .custom-control-input.is-valid:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #28a745; }\n\n.was-validated .custom-file-input:valid ~ .custom-file-label, .custom-file-input.is-valid ~ .custom-file-label {\n  border-color: #28a745; }\n\n.was-validated .custom-file-input:valid ~ .valid-feedback,\n.was-validated .custom-file-input:valid ~ .valid-tooltip, .custom-file-input.is-valid ~ .valid-feedback,\n.custom-file-input.is-valid ~ .valid-tooltip {\n  display: block; }\n\n.was-validated .custom-file-input:valid:focus ~ .custom-file-label, .custom-file-input.is-valid:focus ~ .custom-file-label {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); }\n\n.invalid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #dc3545; }\n\n.invalid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: .1rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.9);\n  border-radius: 0.25rem; }\n\n.was-validated .form-control:invalid, .form-control.is-invalid {\n  border-color: #dc3545;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center right calc(0.375em + 0.1875rem);\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n  .was-validated .form-control:invalid ~ .invalid-feedback,\n  .was-validated .form-control:invalid ~ .invalid-tooltip, .form-control.is-invalid ~ .invalid-feedback,\n  .form-control.is-invalid ~ .invalid-tooltip {\n    display: block; }\n\n.was-validated textarea.form-control:invalid, textarea.form-control.is-invalid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem); }\n\n.was-validated .custom-select:invalid, .custom-select.is-invalid {\n  border-color: #dc3545;\n  padding-right: calc((1em + 0.75rem) * 3 / 4 + 1.75rem);\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px, url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E\") #fff no-repeat center right 1.75rem/calc(0.75em + 0.375rem) calc(0.75em + 0.375rem); }\n  .was-validated .custom-select:invalid:focus, .custom-select.is-invalid:focus {\n    border-color: #dc3545;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n  .was-validated .custom-select:invalid ~ .invalid-feedback,\n  .was-validated .custom-select:invalid ~ .invalid-tooltip, .custom-select.is-invalid ~ .invalid-feedback,\n  .custom-select.is-invalid ~ .invalid-tooltip {\n    display: block; }\n\n.was-validated .form-control-file:invalid ~ .invalid-feedback,\n.was-validated .form-control-file:invalid ~ .invalid-tooltip, .form-control-file.is-invalid ~ .invalid-feedback,\n.form-control-file.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {\n  color: #dc3545; }\n\n.was-validated .form-check-input:invalid ~ .invalid-feedback,\n.was-validated .form-check-input:invalid ~ .invalid-tooltip, .form-check-input.is-invalid ~ .invalid-feedback,\n.form-check-input.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:invalid ~ .custom-control-label, .custom-control-input.is-invalid ~ .custom-control-label {\n  color: #dc3545; }\n  .was-validated .custom-control-input:invalid ~ .custom-control-label::before, .custom-control-input.is-invalid ~ .custom-control-label::before {\n    border-color: #dc3545; }\n\n.was-validated .custom-control-input:invalid ~ .invalid-feedback,\n.was-validated .custom-control-input:invalid ~ .invalid-tooltip, .custom-control-input.is-invalid ~ .invalid-feedback,\n.custom-control-input.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .custom-control-input:invalid:checked ~ .custom-control-label::before, .custom-control-input.is-invalid:checked ~ .custom-control-label::before {\n  border-color: #e4606d;\n  background-color: #e4606d; }\n\n.was-validated .custom-control-input:invalid:focus ~ .custom-control-label::before, .custom-control-input.is-invalid:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.was-validated .custom-control-input:invalid:focus:not(:checked) ~ .custom-control-label::before, .custom-control-input.is-invalid:focus:not(:checked) ~ .custom-control-label::before {\n  border-color: #dc3545; }\n\n.was-validated .custom-file-input:invalid ~ .custom-file-label, .custom-file-input.is-invalid ~ .custom-file-label {\n  border-color: #dc3545; }\n\n.was-validated .custom-file-input:invalid ~ .invalid-feedback,\n.was-validated .custom-file-input:invalid ~ .invalid-tooltip, .custom-file-input.is-invalid ~ .invalid-feedback,\n.custom-file-input.is-invalid ~ .invalid-tooltip {\n  display: block; }\n\n.was-validated .custom-file-input:invalid:focus ~ .custom-file-label, .custom-file-input.is-invalid:focus ~ .custom-file-label {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25); }\n\n.form-inline {\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center; }\n  .form-inline .form-check {\n    width: 100%; }\n  @media (min-width: 576px) {\n    .form-inline label {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 0; }\n    .form-inline .form-group {\n      display: flex;\n      flex: 0 0 auto;\n      flex-flow: row wrap;\n      align-items: center;\n      margin-bottom: 0; }\n    .form-inline .form-control {\n      display: inline-block;\n      width: auto;\n      vertical-align: middle; }\n    .form-inline .form-control-plaintext {\n      display: inline-block; }\n    .form-inline .input-group,\n    .form-inline .custom-select {\n      width: auto; }\n    .form-inline .form-check {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: auto;\n      padding-left: 0; }\n    .form-inline .form-check-input {\n      position: relative;\n      flex-shrink: 0;\n      margin-top: 0;\n      margin-right: 0.25rem;\n      margin-left: 0; }\n    .form-inline .custom-control {\n      align-items: center;\n      justify-content: center; }\n    .form-inline .custom-control-label {\n      margin-bottom: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  color: #212529;\n  text-align: center;\n  vertical-align: middle;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .btn {\n      transition: none; } }\n  .btn:hover {\n    color: #212529;\n    text-decoration: none; }\n  .btn:focus, .btn.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .btn.disabled, .btn:disabled {\n    opacity: 0.65; }\n\na.btn.disabled,\nfieldset:disabled a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #0069d9;\n    border-color: #0062cc; }\n  .btn-primary:focus, .btn-primary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5); }\n  .btn-primary.disabled, .btn-primary:disabled {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active,\n  .show > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0062cc;\n    border-color: #005cbf; }\n    .btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-primary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5); }\n\n.btn-secondary {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d; }\n  .btn-secondary:hover {\n    color: #fff;\n    background-color: #5a6268;\n    border-color: #545b62; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5); }\n  .btn-secondary.disabled, .btn-secondary:disabled {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,\n  .show > .btn-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #545b62;\n    border-color: #4e555b; }\n    .btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-secondary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5); }\n\n.btn-success {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #218838;\n    border-color: #1e7e34; }\n  .btn-success:focus, .btn-success.focus {\n    box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5); }\n  .btn-success.disabled, .btn-success:disabled {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n  .btn-success:not(:disabled):not(.disabled):active, .btn-success:not(:disabled):not(.disabled).active,\n  .show > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #1e7e34;\n    border-color: #1c7430; }\n    .btn-success:not(:disabled):not(.disabled):active:focus, .btn-success:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-success.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5); }\n\n.btn-info {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #138496;\n    border-color: #117a8b; }\n  .btn-info:focus, .btn-info.focus {\n    box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5); }\n  .btn-info.disabled, .btn-info:disabled {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n  .btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active,\n  .show > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #117a8b;\n    border-color: #10707f; }\n    .btn-info:not(:disabled):not(.disabled):active:focus, .btn-info:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-info.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5); }\n\n.btn-warning {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107; }\n  .btn-warning:hover {\n    color: #212529;\n    background-color: #e0a800;\n    border-color: #d39e00; }\n  .btn-warning:focus, .btn-warning.focus {\n    box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5); }\n  .btn-warning.disabled, .btn-warning:disabled {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .btn-warning:not(:disabled):not(.disabled):active, .btn-warning:not(:disabled):not(.disabled).active,\n  .show > .btn-warning.dropdown-toggle {\n    color: #212529;\n    background-color: #d39e00;\n    border-color: #c69500; }\n    .btn-warning:not(:disabled):not(.disabled):active:focus, .btn-warning:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-warning.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5); }\n\n.btn-danger {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c82333;\n    border-color: #bd2130; }\n  .btn-danger:focus, .btn-danger.focus {\n    box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5); }\n  .btn-danger.disabled, .btn-danger:disabled {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .btn-danger:not(:disabled):not(.disabled):active, .btn-danger:not(:disabled):not(.disabled).active,\n  .show > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #bd2130;\n    border-color: #b21f2d; }\n    .btn-danger:not(:disabled):not(.disabled):active:focus, .btn-danger:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-danger.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5); }\n\n.btn-light {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .btn-light:hover {\n    color: #212529;\n    background-color: #e2e6ea;\n    border-color: #dae0e5; }\n  .btn-light:focus, .btn-light.focus {\n    box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5); }\n  .btn-light.disabled, .btn-light:disabled {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .btn-light:not(:disabled):not(.disabled):active, .btn-light:not(:disabled):not(.disabled).active,\n  .show > .btn-light.dropdown-toggle {\n    color: #212529;\n    background-color: #dae0e5;\n    border-color: #d3d9df; }\n    .btn-light:not(:disabled):not(.disabled):active:focus, .btn-light:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-light.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5); }\n\n.btn-dark {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40; }\n  .btn-dark:hover {\n    color: #fff;\n    background-color: #23272b;\n    border-color: #1d2124; }\n  .btn-dark:focus, .btn-dark.focus {\n    box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5); }\n  .btn-dark.disabled, .btn-dark:disabled {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n  .btn-dark:not(:disabled):not(.disabled):active, .btn-dark:not(:disabled):not(.disabled).active,\n  .show > .btn-dark.dropdown-toggle {\n    color: #fff;\n    background-color: #1d2124;\n    border-color: #171a1d; }\n    .btn-dark:not(:disabled):not(.disabled):active:focus, .btn-dark:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-dark.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5); }\n\n.btn-outline-primary {\n  color: #007bff;\n  border-color: #007bff; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n  .btn-outline-primary.disabled, .btn-outline-primary:disabled {\n    color: #007bff;\n    background-color: transparent; }\n  .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n    .btn-outline-primary:not(:disabled):not(.disabled):active:focus, .btn-outline-primary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-primary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n  .btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n    color: #6c757d;\n    background-color: transparent; }\n  .btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #6c757d;\n    border-color: #6c757d; }\n    .btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-secondary.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n\n.btn-outline-success {\n  color: #28a745;\n  border-color: #28a745; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n  .btn-outline-success.disabled, .btn-outline-success:disabled {\n    color: #28a745;\n    background-color: transparent; }\n  .btn-outline-success:not(:disabled):not(.disabled):active, .btn-outline-success:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #28a745;\n    border-color: #28a745; }\n    .btn-outline-success:not(:disabled):not(.disabled):active:focus, .btn-outline-success:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-success.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n\n.btn-outline-info {\n  color: #17a2b8;\n  border-color: #17a2b8; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n  .btn-outline-info.disabled, .btn-outline-info:disabled {\n    color: #17a2b8;\n    background-color: transparent; }\n  .btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #17a2b8;\n    border-color: #17a2b8; }\n    .btn-outline-info:not(:disabled):not(.disabled):active:focus, .btn-outline-info:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-info.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n\n.btn-outline-warning {\n  color: #ffc107;\n  border-color: #ffc107; }\n  .btn-outline-warning:hover {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n  .btn-outline-warning.disabled, .btn-outline-warning:disabled {\n    color: #ffc107;\n    background-color: transparent; }\n  .btn-outline-warning:not(:disabled):not(.disabled):active, .btn-outline-warning:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-warning.dropdown-toggle {\n    color: #212529;\n    background-color: #ffc107;\n    border-color: #ffc107; }\n    .btn-outline-warning:not(:disabled):not(.disabled):active:focus, .btn-outline-warning:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-warning.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n\n.btn-outline-danger {\n  color: #dc3545;\n  border-color: #dc3545; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n  .btn-outline-danger.disabled, .btn-outline-danger:disabled {\n    color: #dc3545;\n    background-color: transparent; }\n  .btn-outline-danger:not(:disabled):not(.disabled):active, .btn-outline-danger:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #dc3545;\n    border-color: #dc3545; }\n    .btn-outline-danger:not(:disabled):not(.disabled):active:focus, .btn-outline-danger:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-danger.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n\n.btn-outline-light {\n  color: #f8f9fa;\n  border-color: #f8f9fa; }\n  .btn-outline-light:hover {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n  .btn-outline-light:focus, .btn-outline-light.focus {\n    box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n  .btn-outline-light.disabled, .btn-outline-light:disabled {\n    color: #f8f9fa;\n    background-color: transparent; }\n  .btn-outline-light:not(:disabled):not(.disabled):active, .btn-outline-light:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-light.dropdown-toggle {\n    color: #212529;\n    background-color: #f8f9fa;\n    border-color: #f8f9fa; }\n    .btn-outline-light:not(:disabled):not(.disabled):active:focus, .btn-outline-light:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-light.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n\n.btn-outline-dark {\n  color: #343a40;\n  border-color: #343a40; }\n  .btn-outline-dark:hover {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n  .btn-outline-dark:focus, .btn-outline-dark.focus {\n    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n  .btn-outline-dark.disabled, .btn-outline-dark:disabled {\n    color: #343a40;\n    background-color: transparent; }\n  .btn-outline-dark:not(:disabled):not(.disabled):active, .btn-outline-dark:not(:disabled):not(.disabled).active,\n  .show > .btn-outline-dark.dropdown-toggle {\n    color: #fff;\n    background-color: #343a40;\n    border-color: #343a40; }\n    .btn-outline-dark:not(:disabled):not(.disabled):active:focus, .btn-outline-dark:not(:disabled):not(.disabled).active:focus,\n    .show > .btn-outline-dark.dropdown-toggle:focus {\n      box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n\n.btn-link {\n  font-weight: 400;\n  color: #007bff;\n  text-decoration: none; }\n  .btn-link:hover {\n    color: #0056b3;\n    text-decoration: underline; }\n  .btn-link:focus, .btn-link.focus {\n    text-decoration: underline;\n    box-shadow: none; }\n  .btn-link:disabled, .btn-link.disabled {\n    color: #6c757d;\n    pointer-events: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n  .btn-block + .btn-block {\n    margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  transition: opacity 0.15s linear; }\n  @media (prefers-reduced-motion: reduce) {\n    .fade {\n      transition: none; } }\n  .fade:not(.show) {\n    opacity: 0; }\n\n.collapse:not(.show) {\n  display: none; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .collapsing {\n      transition: none; } }\n\n.dropup,\n.dropright,\n.dropdown,\n.dropleft {\n  position: relative; }\n\n.dropdown-toggle {\n  white-space: nowrap; }\n  .dropdown-toggle::after {\n    display: inline-block;\n    margin-left: 0.255em;\n    vertical-align: 0.255em;\n    content: \"\";\n    border-top: 0.3em solid;\n    border-right: 0.3em solid transparent;\n    border-bottom: 0;\n    border-left: 0.3em solid transparent; }\n  .dropdown-toggle:empty::after {\n    margin-left: 0; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n@media (min-width: 576px) {\n  .dropdown-menu-sm-left {\n    right: auto;\n    left: 0; }\n  .dropdown-menu-sm-right {\n    right: 0;\n    left: auto; } }\n\n@media (min-width: 768px) {\n  .dropdown-menu-md-left {\n    right: auto;\n    left: 0; }\n  .dropdown-menu-md-right {\n    right: 0;\n    left: auto; } }\n\n@media (min-width: 992px) {\n  .dropdown-menu-lg-left {\n    right: auto;\n    left: 0; }\n  .dropdown-menu-lg-right {\n    right: 0;\n    left: auto; } }\n\n@media (min-width: 1200px) {\n  .dropdown-menu-xl-left {\n    right: auto;\n    left: 0; }\n  .dropdown-menu-xl-right {\n    right: 0;\n    left: auto; } }\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem; }\n\n.dropup .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent; }\n\n.dropup .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropright .dropdown-menu {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem; }\n\n.dropright .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid; }\n\n.dropright .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropright .dropdown-toggle::after {\n  vertical-align: 0; }\n\n.dropleft .dropdown-menu {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem; }\n\n.dropleft .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\"; }\n\n.dropleft .dropdown-toggle::after {\n  display: none; }\n\n.dropleft .dropdown-toggle::before {\n  display: inline-block;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent; }\n\n.dropleft .dropdown-toggle:empty::after {\n  margin-left: 0; }\n\n.dropleft .dropdown-toggle::before {\n  vertical-align: 0; }\n\n.dropdown-menu[x-placement^=\"top\"], .dropdown-menu[x-placement^=\"right\"], .dropdown-menu[x-placement^=\"bottom\"], .dropdown-menu[x-placement^=\"left\"] {\n  right: auto;\n  bottom: auto; }\n\n.dropdown-divider {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid #e9ecef; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0; }\n  .dropdown-item:hover, .dropdown-item:focus {\n    color: #16181b;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .dropdown-item.active, .dropdown-item:active {\n    color: #fff;\n    text-decoration: none;\n    background-color: #007bff; }\n  .dropdown-item.disabled, .dropdown-item:disabled {\n    color: #6c757d;\n    pointer-events: none;\n    background-color: transparent; }\n\n.dropdown-menu.show {\n  display: block; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap; }\n\n.dropdown-item-text {\n  display: block;\n  padding: 0.25rem 1.5rem;\n  color: #212529; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    flex: 1 1 auto; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 1; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 1; }\n\n.btn-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start; }\n  .btn-toolbar .input-group {\n    width: auto; }\n\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) {\n  margin-left: -1px; }\n\n.btn-group > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem; }\n  .dropdown-toggle-split::after,\n  .dropup .dropdown-toggle-split::after,\n  .dropright .dropdown-toggle-split::after {\n    margin-left: 0; }\n  .dropleft .dropdown-toggle-split::before {\n    margin-right: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n\n.btn-group-vertical {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center; }\n  .btn-group-vertical > .btn,\n  .btn-group-vertical > .btn-group {\n    width: 100%; }\n  .btn-group-vertical > .btn:not(:first-child),\n  .btn-group-vertical > .btn-group:not(:first-child) {\n    margin-top: -1px; }\n  .btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),\n  .btn-group-vertical > .btn-group:not(:last-child) > .btn {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .btn-group-vertical > .btn:not(:first-child),\n  .btn-group-vertical > .btn-group:not(:first-child) > .btn {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group-toggle > .btn,\n.btn-group-toggle > .btn-group > .btn {\n  margin-bottom: 0; }\n  .btn-group-toggle > .btn input[type=\"radio\"],\n  .btn-group-toggle > .btn input[type=\"checkbox\"],\n  .btn-group-toggle > .btn-group > .btn input[type=\"radio\"],\n  .btn-group-toggle > .btn-group > .btn input[type=\"checkbox\"] {\n    position: absolute;\n    clip: rect(0, 0, 0, 0);\n    pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  width: 100%; }\n  .input-group > .form-control,\n  .input-group > .form-control-plaintext,\n  .input-group > .custom-select,\n  .input-group > .custom-file {\n    position: relative;\n    flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0; }\n    .input-group > .form-control + .form-control,\n    .input-group > .form-control + .custom-select,\n    .input-group > .form-control + .custom-file,\n    .input-group > .form-control-plaintext + .form-control,\n    .input-group > .form-control-plaintext + .custom-select,\n    .input-group > .form-control-plaintext + .custom-file,\n    .input-group > .custom-select + .form-control,\n    .input-group > .custom-select + .custom-select,\n    .input-group > .custom-select + .custom-file,\n    .input-group > .custom-file + .form-control,\n    .input-group > .custom-file + .custom-select,\n    .input-group > .custom-file + .custom-file {\n      margin-left: -1px; }\n  .input-group > .form-control:focus,\n  .input-group > .custom-select:focus,\n  .input-group > .custom-file .custom-file-input:focus ~ .custom-file-label {\n    z-index: 3; }\n  .input-group > .custom-file .custom-file-input:focus {\n    z-index: 4; }\n  .input-group > .form-control:not(:last-child),\n  .input-group > .custom-select:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0; }\n  .input-group > .form-control:not(:first-child),\n  .input-group > .custom-select:not(:first-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0; }\n  .input-group > .custom-file {\n    display: flex;\n    align-items: center; }\n    .input-group > .custom-file:not(:last-child) .custom-file-label,\n    .input-group > .custom-file:not(:last-child) .custom-file-label::after {\n      border-top-right-radius: 0;\n      border-bottom-right-radius: 0; }\n    .input-group > .custom-file:not(:first-child) .custom-file-label {\n      border-top-left-radius: 0;\n      border-bottom-left-radius: 0; }\n\n.input-group-prepend,\n.input-group-append {\n  display: flex; }\n  .input-group-prepend .btn,\n  .input-group-append .btn {\n    position: relative;\n    z-index: 2; }\n    .input-group-prepend .btn:focus,\n    .input-group-append .btn:focus {\n      z-index: 3; }\n  .input-group-prepend .btn + .btn,\n  .input-group-prepend .btn + .input-group-text,\n  .input-group-prepend .input-group-text + .input-group-text,\n  .input-group-prepend .input-group-text + .btn,\n  .input-group-append .btn + .btn,\n  .input-group-append .btn + .input-group-text,\n  .input-group-append .input-group-text + .input-group-text,\n  .input-group-append .input-group-text + .btn {\n    margin-left: -1px; }\n\n.input-group-prepend {\n  margin-right: -1px; }\n\n.input-group-append {\n  margin-left: -1px; }\n\n.input-group-text {\n  display: flex;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n  .input-group-text input[type=\"radio\"],\n  .input-group-text input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group-lg > .form-control:not(textarea),\n.input-group-lg > .custom-select {\n  height: calc(1.5em + 1rem + 2px); }\n\n.input-group-lg > .form-control,\n.input-group-lg > .custom-select,\n.input-group-lg > .input-group-prepend > .input-group-text,\n.input-group-lg > .input-group-append > .input-group-text,\n.input-group-lg > .input-group-prepend > .btn,\n.input-group-lg > .input-group-append > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem; }\n\n.input-group-sm > .form-control:not(textarea),\n.input-group-sm > .custom-select {\n  height: calc(1.5em + 0.5rem + 2px); }\n\n.input-group-sm > .form-control,\n.input-group-sm > .custom-select,\n.input-group-sm > .input-group-prepend > .input-group-text,\n.input-group-sm > .input-group-append > .input-group-text,\n.input-group-sm > .input-group-prepend > .btn,\n.input-group-sm > .input-group-append > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.input-group-lg > .custom-select,\n.input-group-sm > .custom-select {\n  padding-right: 1.75rem; }\n\n.input-group > .input-group-prepend > .btn,\n.input-group > .input-group-prepend > .input-group-text,\n.input-group > .input-group-append:not(:last-child) > .btn,\n.input-group > .input-group-append:not(:last-child) > .input-group-text,\n.input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.input-group > .input-group-append > .btn,\n.input-group > .input-group-append > .input-group-text,\n.input-group > .input-group-prepend:not(:first-child) > .btn,\n.input-group > .input-group-prepend:not(:first-child) > .input-group-text,\n.input-group > .input-group-prepend:first-child > .btn:not(:first-child),\n.input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.custom-control {\n  position: relative;\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5rem; }\n\n.custom-control-inline {\n  display: inline-flex;\n  margin-right: 1rem; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-label::before {\n    color: #fff;\n    border-color: #007bff;\n    background-color: #007bff; }\n  .custom-control-input:focus ~ .custom-control-label::before {\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {\n    border-color: #80bdff; }\n  .custom-control-input:not(:disabled):active ~ .custom-control-label::before {\n    color: #fff;\n    background-color: #b3d7ff;\n    border-color: #b3d7ff; }\n  .custom-control-input:disabled ~ .custom-control-label {\n    color: #6c757d; }\n    .custom-control-input:disabled ~ .custom-control-label::before {\n      background-color: #e9ecef; }\n\n.custom-control-label {\n  position: relative;\n  margin-bottom: 0;\n  vertical-align: top; }\n  .custom-control-label::before {\n    position: absolute;\n    top: 0.25rem;\n    left: -1.5rem;\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    pointer-events: none;\n    content: \"\";\n    background-color: #fff;\n    border: #adb5bd solid 1px; }\n  .custom-control-label::after {\n    position: absolute;\n    top: 0.25rem;\n    left: -1.5rem;\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    content: \"\";\n    background: no-repeat 50% / 50% 50%; }\n\n.custom-checkbox .custom-control-label::before {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {\n  border-color: #007bff;\n  background-color: #007bff; }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e\"); }\n\n.custom-checkbox .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-checkbox .custom-control-input:disabled:indeterminate ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-radio .custom-control-label::before {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-label::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\"); }\n\n.custom-radio .custom-control-input:disabled:checked ~ .custom-control-label::before {\n  background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-switch {\n  padding-left: 2.25rem; }\n  .custom-switch .custom-control-label::before {\n    left: -2.25rem;\n    width: 1.75rem;\n    pointer-events: all;\n    border-radius: 0.5rem; }\n  .custom-switch .custom-control-label::after {\n    top: calc(0.25rem + 2px);\n    left: calc(-2.25rem + 2px);\n    width: calc(1rem - 4px);\n    height: calc(1rem - 4px);\n    background-color: #adb5bd;\n    border-radius: 0.5rem;\n    transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n    @media (prefers-reduced-motion: reduce) {\n      .custom-switch .custom-control-label::after {\n        transition: none; } }\n  .custom-switch .custom-control-input:checked ~ .custom-control-label::after {\n    background-color: #fff;\n    transform: translateX(0.75rem); }\n  .custom-switch .custom-control-input:disabled:checked ~ .custom-control-label::before {\n    background-color: rgba(0, 123, 255, 0.5); }\n\n.custom-select {\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  vertical-align: middle;\n  background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  appearance: none; }\n  .custom-select:focus {\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .custom-select:focus::-ms-value {\n      color: #495057;\n      background-color: #fff; }\n  .custom-select[multiple], .custom-select[size]:not([size=\"1\"]) {\n    height: auto;\n    padding-right: 0.75rem;\n    background-image: none; }\n  .custom-select:disabled {\n    color: #6c757d;\n    background-color: #e9ecef; }\n  .custom-select::-ms-expand {\n    display: none; }\n\n.custom-select-sm {\n  height: calc(1.5em + 0.5rem + 2px);\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  font-size: 0.875rem; }\n\n.custom-select-lg {\n  height: calc(1.5em + 1rem + 2px);\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  font-size: 1.25rem; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin-bottom: 0; }\n\n.custom-file-input {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  height: calc(1.5em + 0.75rem + 2px);\n  margin: 0;\n  opacity: 0; }\n  .custom-file-input:focus ~ .custom-file-label {\n    border-color: #80bdff;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .custom-file-input:disabled ~ .custom-file-label {\n    background-color: #e9ecef; }\n  .custom-file-input:lang(en) ~ .custom-file-label::after {\n    content: \"Browse\"; }\n  .custom-file-input ~ .custom-file-label[data-browse]::after {\n    content: attr(data-browse); }\n\n.custom-file-label {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1;\n  height: calc(1.5em + 0.75rem + 2px);\n  padding: 0.375rem 0.75rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem; }\n  .custom-file-label::after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 3;\n    display: block;\n    height: calc(1.5em + 0.75rem);\n    padding: 0.375rem 0.75rem;\n    line-height: 1.5;\n    color: #495057;\n    content: \"Browse\";\n    background-color: #e9ecef;\n    border-left: inherit;\n    border-radius: 0 0.25rem 0.25rem 0; }\n\n.custom-range {\n  width: 100%;\n  height: calc(1rem + 0.4rem);\n  padding: 0;\n  background-color: transparent;\n  appearance: none; }\n  .custom-range:focus {\n    outline: none; }\n    .custom-range:focus::-webkit-slider-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .custom-range:focus::-moz-range-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n    .custom-range:focus::-ms-thumb {\n      box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n  .custom-range::-moz-focus-outer {\n    border: 0; }\n  .custom-range::-webkit-slider-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: -0.25rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .custom-range::-webkit-slider-thumb {\n        transition: none; } }\n    .custom-range::-webkit-slider-thumb:active {\n      background-color: #b3d7ff; }\n  .custom-range::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .custom-range::-moz-range-thumb {\n    width: 1rem;\n    height: 1rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .custom-range::-moz-range-thumb {\n        transition: none; } }\n    .custom-range::-moz-range-thumb:active {\n      background-color: #b3d7ff; }\n  .custom-range::-moz-range-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: #dee2e6;\n    border-color: transparent;\n    border-radius: 1rem; }\n  .custom-range::-ms-thumb {\n    width: 1rem;\n    height: 1rem;\n    margin-top: 0;\n    margin-right: 0.2rem;\n    margin-left: 0.2rem;\n    background-color: #007bff;\n    border: 0;\n    border-radius: 1rem;\n    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n    appearance: none; }\n    @media (prefers-reduced-motion: reduce) {\n      .custom-range::-ms-thumb {\n        transition: none; } }\n    .custom-range::-ms-thumb:active {\n      background-color: #b3d7ff; }\n  .custom-range::-ms-track {\n    width: 100%;\n    height: 0.5rem;\n    color: transparent;\n    cursor: pointer;\n    background-color: transparent;\n    border-color: transparent;\n    border-width: 0.5rem; }\n  .custom-range::-ms-fill-lower {\n    background-color: #dee2e6;\n    border-radius: 1rem; }\n  .custom-range::-ms-fill-upper {\n    margin-right: 15px;\n    background-color: #dee2e6;\n    border-radius: 1rem; }\n  .custom-range:disabled::-webkit-slider-thumb {\n    background-color: #adb5bd; }\n  .custom-range:disabled::-webkit-slider-runnable-track {\n    cursor: default; }\n  .custom-range:disabled::-moz-range-thumb {\n    background-color: #adb5bd; }\n  .custom-range:disabled::-moz-range-track {\n    cursor: default; }\n  .custom-range:disabled::-ms-thumb {\n    background-color: #adb5bd; }\n\n.custom-control-label::before,\n.custom-file-label,\n.custom-select {\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .custom-control-label::before,\n    .custom-file-label,\n    .custom-select {\n      transition: none; } }\n\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: block;\n  padding: 0.5rem 1rem; }\n  .nav-link:hover, .nav-link:focus {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #6c757d;\n    pointer-events: none;\n    cursor: default; }\n\n.nav-tabs {\n  border-bottom: 1px solid #dee2e6; }\n  .nav-tabs .nav-item {\n    margin-bottom: -1px; }\n  .nav-tabs .nav-link {\n    border: 1px solid transparent;\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n    .nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {\n      border-color: #e9ecef #e9ecef #dee2e6; }\n    .nav-tabs .nav-link.disabled {\n      color: #6c757d;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active,\n  .nav-tabs .nav-item.show .nav-link {\n    color: #495057;\n    background-color: #fff;\n    border-color: #dee2e6 #dee2e6 #fff; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active,\n.nav-pills .show > .nav-link {\n  color: #fff;\n  background-color: #007bff; }\n\n.nav-fill .nav-item {\n  flex: 1 1 auto;\n  text-align: center; }\n\n.nav-justified .nav-item {\n  flex-basis: 0;\n  flex-grow: 1;\n  text-align: center; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.5rem 1rem; }\n  .navbar > .container,\n  .navbar > .container-fluid {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between; }\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap; }\n  .navbar-brand:hover, .navbar-brand:focus {\n    text-decoration: none; }\n\n.navbar-nav {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n  .navbar-nav .nav-link {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-nav .dropdown-menu {\n    position: static;\n    float: none; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem; }\n\n.navbar-collapse {\n  flex-basis: 100%;\n  flex-grow: 1;\n  align-items: center; }\n\n.navbar-toggler {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:hover, .navbar-toggler:focus {\n    text-decoration: none; }\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%; }\n\n@media (max-width: 575.98px) {\n  .navbar-expand-sm > .container,\n  .navbar-expand-sm > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-expand-sm {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-sm .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-sm .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-sm .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-sm > .container,\n    .navbar-expand-sm > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-sm .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-sm .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 767.98px) {\n  .navbar-expand-md > .container,\n  .navbar-expand-md > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-expand-md {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-md .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-md .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-md .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-md > .container,\n    .navbar-expand-md > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-md .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-md .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 991.98px) {\n  .navbar-expand-lg > .container,\n  .navbar-expand-lg > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-expand-lg {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-lg .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-lg .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-lg .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-lg > .container,\n    .navbar-expand-lg > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-lg .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-lg .navbar-toggler {\n      display: none; } }\n\n@media (max-width: 1199.98px) {\n  .navbar-expand-xl > .container,\n  .navbar-expand-xl > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; } }\n\n@media (min-width: 1200px) {\n  .navbar-expand-xl {\n    flex-flow: row nowrap;\n    justify-content: flex-start; }\n    .navbar-expand-xl .navbar-nav {\n      flex-direction: row; }\n      .navbar-expand-xl .navbar-nav .dropdown-menu {\n        position: absolute; }\n      .navbar-expand-xl .navbar-nav .nav-link {\n        padding-right: 0.5rem;\n        padding-left: 0.5rem; }\n    .navbar-expand-xl > .container,\n    .navbar-expand-xl > .container-fluid {\n      flex-wrap: nowrap; }\n    .navbar-expand-xl .navbar-collapse {\n      display: flex !important;\n      flex-basis: auto; }\n    .navbar-expand-xl .navbar-toggler {\n      display: none; } }\n\n.navbar-expand {\n  flex-flow: row nowrap;\n  justify-content: flex-start; }\n  .navbar-expand > .container,\n  .navbar-expand > .container-fluid {\n    padding-right: 0;\n    padding-left: 0; }\n  .navbar-expand .navbar-nav {\n    flex-direction: row; }\n    .navbar-expand .navbar-nav .dropdown-menu {\n      position: absolute; }\n    .navbar-expand .navbar-nav .nav-link {\n      padding-right: 0.5rem;\n      padding-left: 0.5rem; }\n  .navbar-expand > .container,\n  .navbar-expand > .container-fluid {\n    flex-wrap: nowrap; }\n  .navbar-expand .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto; }\n  .navbar-expand .navbar-toggler {\n    display: none; }\n\n.navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {\n    color: rgba(0, 0, 0, 0.7); }\n  .navbar-light .navbar-nav .nav-link.disabled {\n    color: rgba(0, 0, 0, 0.3); }\n\n.navbar-light .navbar-nav .show > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.show,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\"); }\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-text a {\n    color: rgba(0, 0, 0, 0.9); }\n    .navbar-light .navbar-text a:hover, .navbar-light .navbar-text a:focus {\n      color: rgba(0, 0, 0, 0.9); }\n\n.navbar-dark .navbar-brand {\n  color: #fff; }\n  .navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus {\n    color: #fff; }\n\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {\n    color: rgba(255, 255, 255, 0.75); }\n  .navbar-dark .navbar-nav .nav-link.disabled {\n    color: rgba(255, 255, 255, 0.25); }\n\n.navbar-dark .navbar-nav .show > .nav-link,\n.navbar-dark .navbar-nav .active > .nav-link,\n.navbar-dark .navbar-nav .nav-link.show,\n.navbar-dark .navbar-nav .nav-link.active {\n  color: #fff; }\n\n.navbar-dark .navbar-toggler {\n  color: rgba(255, 255, 255, 0.5);\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-dark .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\"); }\n\n.navbar-dark .navbar-text {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-text a {\n    color: #fff; }\n    .navbar-dark .navbar-text a:hover, .navbar-dark .navbar-text a:focus {\n      color: #fff; }\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem; }\n  .card > hr {\n    margin-right: 0;\n    margin-left: 0; }\n  .card > .list-group:first-child .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .card > .list-group:last-child .list-group-item:last-child {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n\n.card-body {\n  flex: 1 1 auto;\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n  .card-header + .list-group .list-group-item:first-child {\n    border-top: 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img {\n  width: 100%;\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-top {\n  width: 100%;\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  width: 100%;\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n.card-deck {\n  display: flex;\n  flex-direction: column; }\n  .card-deck .card {\n    margin-bottom: 15px; }\n  @media (min-width: 576px) {\n    .card-deck {\n      flex-flow: row wrap;\n      margin-right: -15px;\n      margin-left: -15px; }\n      .card-deck .card {\n        display: flex;\n        flex: 1 0 0%;\n        flex-direction: column;\n        margin-right: 15px;\n        margin-bottom: 0;\n        margin-left: 15px; } }\n\n.card-group {\n  display: flex;\n  flex-direction: column; }\n  .card-group > .card {\n    margin-bottom: 15px; }\n  @media (min-width: 576px) {\n    .card-group {\n      flex-flow: row wrap; }\n      .card-group > .card {\n        flex: 1 0 0%;\n        margin-bottom: 0; }\n        .card-group > .card + .card {\n          margin-left: 0;\n          border-left: 0; }\n        .card-group > .card:not(:last-child) {\n          border-top-right-radius: 0;\n          border-bottom-right-radius: 0; }\n          .card-group > .card:not(:last-child) .card-img-top,\n          .card-group > .card:not(:last-child) .card-header {\n            border-top-right-radius: 0; }\n          .card-group > .card:not(:last-child) .card-img-bottom,\n          .card-group > .card:not(:last-child) .card-footer {\n            border-bottom-right-radius: 0; }\n        .card-group > .card:not(:first-child) {\n          border-top-left-radius: 0;\n          border-bottom-left-radius: 0; }\n          .card-group > .card:not(:first-child) .card-img-top,\n          .card-group > .card:not(:first-child) .card-header {\n            border-top-left-radius: 0; }\n          .card-group > .card:not(:first-child) .card-img-bottom,\n          .card-group > .card:not(:first-child) .card-footer {\n            border-bottom-left-radius: 0; } }\n\n.card-columns .card {\n  margin-bottom: 0.75rem; }\n\n@media (min-width: 576px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem;\n    orphans: 1;\n    widows: 1; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%; } }\n\n.accordion > .card {\n  overflow: hidden; }\n  .accordion > .card:not(:first-of-type) .card-header:first-child {\n    border-radius: 0; }\n  .accordion > .card:not(:first-of-type):not(:last-of-type) {\n    border-bottom: 0;\n    border-radius: 0; }\n  .accordion > .card:first-of-type {\n    border-bottom: 0;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n  .accordion > .card:last-of-type {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0; }\n  .accordion > .card .card-header {\n    margin-bottom: -1px; }\n\n.breadcrumb {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.breadcrumb-item + .breadcrumb-item {\n  padding-left: 0.5rem; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    color: #6c757d;\n    content: \"/\"; }\n\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: underline; }\n\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: none; }\n\n.breadcrumb-item.active {\n  color: #6c757d; }\n\n.pagination {\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem; }\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #007bff;\n  background-color: #fff;\n  border: 1px solid #dee2e6; }\n  .page-link:hover {\n    z-index: 2;\n    color: #0056b3;\n    text-decoration: none;\n    background-color: #e9ecef;\n    border-color: #dee2e6; }\n  .page-link:focus {\n    z-index: 2;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.page-item:last-child .page-link {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem; }\n\n.page-item.active .page-link {\n  z-index: 1;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff; }\n\n.page-item.disabled .page-link {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: auto;\n  background-color: #fff;\n  border-color: #dee2e6; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.5; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem; }\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .badge {\n      transition: none; } }\n  a.badge:hover, a.badge:focus {\n    text-decoration: none; }\n  .badge:empty {\n    display: none; }\n\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-primary {\n  color: #fff;\n  background-color: #007bff; }\n  a.badge-primary:hover, a.badge-primary:focus {\n    color: #fff;\n    background-color: #0062cc; }\n  a.badge-primary:focus, a.badge-primary.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }\n\n.badge-secondary {\n  color: #fff;\n  background-color: #6c757d; }\n  a.badge-secondary:hover, a.badge-secondary:focus {\n    color: #fff;\n    background-color: #545b62; }\n  a.badge-secondary:focus, a.badge-secondary.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5); }\n\n.badge-success {\n  color: #fff;\n  background-color: #28a745; }\n  a.badge-success:hover, a.badge-success:focus {\n    color: #fff;\n    background-color: #1e7e34; }\n  a.badge-success:focus, a.badge-success.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5); }\n\n.badge-info {\n  color: #fff;\n  background-color: #17a2b8; }\n  a.badge-info:hover, a.badge-info:focus {\n    color: #fff;\n    background-color: #117a8b; }\n  a.badge-info:focus, a.badge-info.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5); }\n\n.badge-warning {\n  color: #212529;\n  background-color: #ffc107; }\n  a.badge-warning:hover, a.badge-warning:focus {\n    color: #212529;\n    background-color: #d39e00; }\n  a.badge-warning:focus, a.badge-warning.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5); }\n\n.badge-danger {\n  color: #fff;\n  background-color: #dc3545; }\n  a.badge-danger:hover, a.badge-danger:focus {\n    color: #fff;\n    background-color: #bd2130; }\n  a.badge-danger:focus, a.badge-danger.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5); }\n\n.badge-light {\n  color: #212529;\n  background-color: #f8f9fa; }\n  a.badge-light:hover, a.badge-light:focus {\n    color: #212529;\n    background-color: #dae0e5; }\n  a.badge-light:focus, a.badge-light.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5); }\n\n.badge-dark {\n  color: #fff;\n  background-color: #343a40; }\n  a.badge-dark:hover, a.badge-dark:focus {\n    color: #fff;\n    background-color: #1d2124; }\n  a.badge-dark:focus, a.badge-dark.focus {\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5); }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #e9ecef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: 700; }\n\n.alert-dismissible {\n  padding-right: 4rem; }\n  .alert-dismissible .close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 0.75rem 1.25rem;\n    color: inherit; }\n\n.alert-primary {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff; }\n  .alert-primary hr {\n    border-top-color: #9fcdff; }\n  .alert-primary .alert-link {\n    color: #002752; }\n\n.alert-secondary {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db; }\n  .alert-secondary hr {\n    border-top-color: #c8cbcf; }\n  .alert-secondary .alert-link {\n    color: #202326; }\n\n.alert-success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb; }\n  .alert-success hr {\n    border-top-color: #b1dfbb; }\n  .alert-success .alert-link {\n    color: #0b2e13; }\n\n.alert-info {\n  color: #0c5460;\n  background-color: #d1ecf1;\n  border-color: #bee5eb; }\n  .alert-info hr {\n    border-top-color: #abdde5; }\n  .alert-info .alert-link {\n    color: #062c33; }\n\n.alert-warning {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba; }\n  .alert-warning hr {\n    border-top-color: #ffe8a1; }\n  .alert-warning .alert-link {\n    color: #533f03; }\n\n.alert-danger {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb; }\n  .alert-danger hr {\n    border-top-color: #f1b0b7; }\n  .alert-danger .alert-link {\n    color: #491217; }\n\n.alert-light {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe; }\n  .alert-light hr {\n    border-top-color: #ececf6; }\n  .alert-light .alert-link {\n    color: #686868; }\n\n.alert-dark {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca; }\n  .alert-dark hr {\n    border-top-color: #b9bbbe; }\n  .alert-dark .alert-link {\n    color: #040505; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem; }\n\n.progress-bar {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #007bff;\n  transition: width 0.6s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .progress-bar {\n      transition: none; } }\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-bar-animated {\n  animation: progress-bar-stripes 1s linear infinite; }\n  @media (prefers-reduced-motion: reduce) {\n    .progress-bar-animated {\n      animation: none; } }\n\n.media {\n  display: flex;\n  align-items: flex-start; }\n\n.media-body {\n  flex: 1; }\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #495057;\n  text-align: inherit; }\n  .list-group-item-action:hover, .list-group-item-action:focus {\n    z-index: 1;\n    color: #495057;\n    text-decoration: none;\n    background-color: #f8f9fa; }\n  .list-group-item-action:active {\n    color: #212529;\n    background-color: #e9ecef; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n  .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item.disabled, .list-group-item:disabled {\n    color: #6c757d;\n    pointer-events: none;\n    background-color: #fff; }\n  .list-group-item.active {\n    z-index: 2;\n    color: #fff;\n    background-color: #007bff;\n    border-color: #007bff; }\n\n.list-group-horizontal {\n  flex-direction: row; }\n  .list-group-horizontal .list-group-item {\n    margin-right: -1px;\n    margin-bottom: 0; }\n    .list-group-horizontal .list-group-item:first-child {\n      border-top-left-radius: 0.25rem;\n      border-bottom-left-radius: 0.25rem;\n      border-top-right-radius: 0; }\n    .list-group-horizontal .list-group-item:last-child {\n      margin-right: 0;\n      border-top-right-radius: 0.25rem;\n      border-bottom-right-radius: 0.25rem;\n      border-bottom-left-radius: 0; }\n\n@media (min-width: 576px) {\n  .list-group-horizontal-sm {\n    flex-direction: row; }\n    .list-group-horizontal-sm .list-group-item {\n      margin-right: -1px;\n      margin-bottom: 0; }\n      .list-group-horizontal-sm .list-group-item:first-child {\n        border-top-left-radius: 0.25rem;\n        border-bottom-left-radius: 0.25rem;\n        border-top-right-radius: 0; }\n      .list-group-horizontal-sm .list-group-item:last-child {\n        margin-right: 0;\n        border-top-right-radius: 0.25rem;\n        border-bottom-right-radius: 0.25rem;\n        border-bottom-left-radius: 0; } }\n\n@media (min-width: 768px) {\n  .list-group-horizontal-md {\n    flex-direction: row; }\n    .list-group-horizontal-md .list-group-item {\n      margin-right: -1px;\n      margin-bottom: 0; }\n      .list-group-horizontal-md .list-group-item:first-child {\n        border-top-left-radius: 0.25rem;\n        border-bottom-left-radius: 0.25rem;\n        border-top-right-radius: 0; }\n      .list-group-horizontal-md .list-group-item:last-child {\n        margin-right: 0;\n        border-top-right-radius: 0.25rem;\n        border-bottom-right-radius: 0.25rem;\n        border-bottom-left-radius: 0; } }\n\n@media (min-width: 992px) {\n  .list-group-horizontal-lg {\n    flex-direction: row; }\n    .list-group-horizontal-lg .list-group-item {\n      margin-right: -1px;\n      margin-bottom: 0; }\n      .list-group-horizontal-lg .list-group-item:first-child {\n        border-top-left-radius: 0.25rem;\n        border-bottom-left-radius: 0.25rem;\n        border-top-right-radius: 0; }\n      .list-group-horizontal-lg .list-group-item:last-child {\n        margin-right: 0;\n        border-top-right-radius: 0.25rem;\n        border-bottom-right-radius: 0.25rem;\n        border-bottom-left-radius: 0; } }\n\n@media (min-width: 1200px) {\n  .list-group-horizontal-xl {\n    flex-direction: row; }\n    .list-group-horizontal-xl .list-group-item {\n      margin-right: -1px;\n      margin-bottom: 0; }\n      .list-group-horizontal-xl .list-group-item:first-child {\n        border-top-left-radius: 0.25rem;\n        border-bottom-left-radius: 0.25rem;\n        border-top-right-radius: 0; }\n      .list-group-horizontal-xl .list-group-item:last-child {\n        margin-right: 0;\n        border-top-right-radius: 0.25rem;\n        border-bottom-right-radius: 0.25rem;\n        border-bottom-left-radius: 0; } }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n  .list-group-flush .list-group-item:last-child {\n    margin-bottom: -1px; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom: 0; }\n\n.list-group-item-primary {\n  color: #004085;\n  background-color: #b8daff; }\n  .list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {\n    color: #004085;\n    background-color: #9fcdff; }\n  .list-group-item-primary.list-group-item-action.active {\n    color: #fff;\n    background-color: #004085;\n    border-color: #004085; }\n\n.list-group-item-secondary {\n  color: #383d41;\n  background-color: #d6d8db; }\n  .list-group-item-secondary.list-group-item-action:hover, .list-group-item-secondary.list-group-item-action:focus {\n    color: #383d41;\n    background-color: #c8cbcf; }\n  .list-group-item-secondary.list-group-item-action.active {\n    color: #fff;\n    background-color: #383d41;\n    border-color: #383d41; }\n\n.list-group-item-success {\n  color: #155724;\n  background-color: #c3e6cb; }\n  .list-group-item-success.list-group-item-action:hover, .list-group-item-success.list-group-item-action:focus {\n    color: #155724;\n    background-color: #b1dfbb; }\n  .list-group-item-success.list-group-item-action.active {\n    color: #fff;\n    background-color: #155724;\n    border-color: #155724; }\n\n.list-group-item-info {\n  color: #0c5460;\n  background-color: #bee5eb; }\n  .list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus {\n    color: #0c5460;\n    background-color: #abdde5; }\n  .list-group-item-info.list-group-item-action.active {\n    color: #fff;\n    background-color: #0c5460;\n    border-color: #0c5460; }\n\n.list-group-item-warning {\n  color: #856404;\n  background-color: #ffeeba; }\n  .list-group-item-warning.list-group-item-action:hover, .list-group-item-warning.list-group-item-action:focus {\n    color: #856404;\n    background-color: #ffe8a1; }\n  .list-group-item-warning.list-group-item-action.active {\n    color: #fff;\n    background-color: #856404;\n    border-color: #856404; }\n\n.list-group-item-danger {\n  color: #721c24;\n  background-color: #f5c6cb; }\n  .list-group-item-danger.list-group-item-action:hover, .list-group-item-danger.list-group-item-action:focus {\n    color: #721c24;\n    background-color: #f1b0b7; }\n  .list-group-item-danger.list-group-item-action.active {\n    color: #fff;\n    background-color: #721c24;\n    border-color: #721c24; }\n\n.list-group-item-light {\n  color: #818182;\n  background-color: #fdfdfe; }\n  .list-group-item-light.list-group-item-action:hover, .list-group-item-light.list-group-item-action:focus {\n    color: #818182;\n    background-color: #ececf6; }\n  .list-group-item-light.list-group-item-action.active {\n    color: #fff;\n    background-color: #818182;\n    border-color: #818182; }\n\n.list-group-item-dark {\n  color: #1b1e21;\n  background-color: #c6c8ca; }\n  .list-group-item-dark.list-group-item-action:hover, .list-group-item-dark.list-group-item-action:focus {\n    color: #1b1e21;\n    background-color: #b9bbbe; }\n  .list-group-item-dark.list-group-item-action.active {\n    color: #fff;\n    background-color: #1b1e21;\n    border-color: #1b1e21; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close:hover {\n    color: #000;\n    text-decoration: none; }\n  .close:not(:disabled):not(.disabled):hover, .close:not(:disabled):not(.disabled):focus {\n    opacity: .75; }\n\nbutton.close {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n  appearance: none; }\n\na.close.disabled {\n  pointer-events: none; }\n\n.toast {\n  max-width: 350px;\n  overflow: hidden;\n  font-size: 0.875rem;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);\n  backdrop-filter: blur(10px);\n  opacity: 0;\n  border-radius: 0.25rem; }\n  .toast:not(:last-child) {\n    margin-bottom: 0.75rem; }\n  .toast.showing {\n    opacity: 1; }\n  .toast.show {\n    display: block;\n    opacity: 1; }\n  .toast.hide {\n    display: none; }\n\n.toast-header {\n  display: flex;\n  align-items: center;\n  padding: 0.25rem 0.75rem;\n  color: #6c757d;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05); }\n\n.toast-body {\n  padding: 0.75rem; }\n\n.modal-open {\n  overflow: hidden; }\n  .modal-open .modal {\n    overflow-x: hidden;\n    overflow-y: auto; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  outline: 0; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none; }\n  .modal.fade .modal-dialog {\n    transition: transform 0.3s ease-out;\n    transform: translate(0, -50px); }\n    @media (prefers-reduced-motion: reduce) {\n      .modal.fade .modal-dialog {\n        transition: none; } }\n  .modal.show .modal-dialog {\n    transform: none; }\n\n.modal-dialog-scrollable {\n  display: flex;\n  max-height: calc(100% - 1rem); }\n  .modal-dialog-scrollable .modal-content {\n    max-height: calc(100vh - 1rem);\n    overflow: hidden; }\n  .modal-dialog-scrollable .modal-header,\n  .modal-dialog-scrollable .modal-footer {\n    flex-shrink: 0; }\n  .modal-dialog-scrollable .modal-body {\n    overflow-y: auto; }\n\n.modal-dialog-centered {\n  display: flex;\n  align-items: center;\n  min-height: calc(100% - 1rem); }\n  .modal-dialog-centered::before {\n    display: block;\n    height: calc(100vh - 1rem);\n    content: \"\"; }\n  .modal-dialog-centered.modal-dialog-scrollable {\n    flex-direction: column;\n    justify-content: center;\n    height: 100%; }\n    .modal-dialog-centered.modal-dialog-scrollable .modal-content {\n      max-height: none; }\n    .modal-dialog-centered.modal-dialog-scrollable::before {\n      content: none; }\n\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.show {\n    opacity: 0.5; }\n\n.modal-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 1rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n  .modal-header .close {\n    padding: 1rem 1rem;\n    margin: -1rem -1rem -1rem auto; }\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 1rem; }\n\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 1rem;\n  border-top: 1px solid #dee2e6;\n  border-bottom-right-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem; }\n  .modal-footer > :not(:first-child) {\n    margin-left: .25rem; }\n  .modal-footer > :not(:last-child) {\n    margin-right: .25rem; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 1.75rem auto; }\n  .modal-dialog-scrollable {\n    max-height: calc(100% - 3.5rem); }\n    .modal-dialog-scrollable .modal-content {\n      max-height: calc(100vh - 3.5rem); }\n  .modal-dialog-centered {\n    min-height: calc(100% - 3.5rem); }\n    .modal-dialog-centered::before {\n      height: calc(100vh - 3.5rem); }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg,\n  .modal-xl {\n    max-width: 800px; } }\n\n@media (min-width: 1200px) {\n  .modal-xl {\n    max-width: 1140px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.show {\n    opacity: 0.9; }\n  .tooltip .arrow {\n    position: absolute;\n    display: block;\n    width: 0.8rem;\n    height: 0.4rem; }\n    .tooltip .arrow::before {\n      position: absolute;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.bs-tooltip-top, .bs-tooltip-auto[x-placement^=\"top\"] {\n  padding: 0.4rem 0; }\n  .bs-tooltip-top .arrow, .bs-tooltip-auto[x-placement^=\"top\"] .arrow {\n    bottom: 0; }\n    .bs-tooltip-top .arrow::before, .bs-tooltip-auto[x-placement^=\"top\"] .arrow::before {\n      top: 0;\n      border-width: 0.4rem 0.4rem 0;\n      border-top-color: #000; }\n\n.bs-tooltip-right, .bs-tooltip-auto[x-placement^=\"right\"] {\n  padding: 0 0.4rem; }\n  .bs-tooltip-right .arrow, .bs-tooltip-auto[x-placement^=\"right\"] .arrow {\n    left: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .bs-tooltip-right .arrow::before, .bs-tooltip-auto[x-placement^=\"right\"] .arrow::before {\n      right: 0;\n      border-width: 0.4rem 0.4rem 0.4rem 0;\n      border-right-color: #000; }\n\n.bs-tooltip-bottom, .bs-tooltip-auto[x-placement^=\"bottom\"] {\n  padding: 0.4rem 0; }\n  .bs-tooltip-bottom .arrow, .bs-tooltip-auto[x-placement^=\"bottom\"] .arrow {\n    top: 0; }\n    .bs-tooltip-bottom .arrow::before, .bs-tooltip-auto[x-placement^=\"bottom\"] .arrow::before {\n      bottom: 0;\n      border-width: 0 0.4rem 0.4rem;\n      border-bottom-color: #000; }\n\n.bs-tooltip-left, .bs-tooltip-auto[x-placement^=\"left\"] {\n  padding: 0 0.4rem; }\n  .bs-tooltip-left .arrow, .bs-tooltip-auto[x-placement^=\"left\"] .arrow {\n    right: 0;\n    width: 0.4rem;\n    height: 0.8rem; }\n    .bs-tooltip-left .arrow::before, .bs-tooltip-auto[x-placement^=\"left\"] .arrow::before {\n      left: 0;\n      border-width: 0.4rem 0 0.4rem 0.4rem;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover .arrow {\n    position: absolute;\n    display: block;\n    width: 1rem;\n    height: 0.5rem;\n    margin: 0 0.3rem; }\n    .popover .arrow::before, .popover .arrow::after {\n      position: absolute;\n      display: block;\n      content: \"\";\n      border-color: transparent;\n      border-style: solid; }\n\n.bs-popover-top, .bs-popover-auto[x-placement^=\"top\"] {\n  margin-bottom: 0.5rem; }\n  .bs-popover-top > .arrow, .bs-popover-auto[x-placement^=\"top\"] > .arrow {\n    bottom: calc((0.5rem + 1px) * -1); }\n    .bs-popover-top > .arrow::before, .bs-popover-auto[x-placement^=\"top\"] > .arrow::before {\n      bottom: 0;\n      border-width: 0.5rem 0.5rem 0;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .bs-popover-top > .arrow::after, .bs-popover-auto[x-placement^=\"top\"] > .arrow::after {\n      bottom: 1px;\n      border-width: 0.5rem 0.5rem 0;\n      border-top-color: #fff; }\n\n.bs-popover-right, .bs-popover-auto[x-placement^=\"right\"] {\n  margin-left: 0.5rem; }\n  .bs-popover-right > .arrow, .bs-popover-auto[x-placement^=\"right\"] > .arrow {\n    left: calc((0.5rem + 1px) * -1);\n    width: 0.5rem;\n    height: 1rem;\n    margin: 0.3rem 0; }\n    .bs-popover-right > .arrow::before, .bs-popover-auto[x-placement^=\"right\"] > .arrow::before {\n      left: 0;\n      border-width: 0.5rem 0.5rem 0.5rem 0;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .bs-popover-right > .arrow::after, .bs-popover-auto[x-placement^=\"right\"] > .arrow::after {\n      left: 1px;\n      border-width: 0.5rem 0.5rem 0.5rem 0;\n      border-right-color: #fff; }\n\n.bs-popover-bottom, .bs-popover-auto[x-placement^=\"bottom\"] {\n  margin-top: 0.5rem; }\n  .bs-popover-bottom > .arrow, .bs-popover-auto[x-placement^=\"bottom\"] > .arrow {\n    top: calc((0.5rem + 1px) * -1); }\n    .bs-popover-bottom > .arrow::before, .bs-popover-auto[x-placement^=\"bottom\"] > .arrow::before {\n      top: 0;\n      border-width: 0 0.5rem 0.5rem 0.5rem;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .bs-popover-bottom > .arrow::after, .bs-popover-auto[x-placement^=\"bottom\"] > .arrow::after {\n      top: 1px;\n      border-width: 0 0.5rem 0.5rem 0.5rem;\n      border-bottom-color: #fff; }\n  .bs-popover-bottom .popover-header::before, .bs-popover-auto[x-placement^=\"bottom\"] .popover-header::before {\n    position: absolute;\n    top: 0;\n    left: 50%;\n    display: block;\n    width: 1rem;\n    margin-left: -0.5rem;\n    content: \"\";\n    border-bottom: 1px solid #f7f7f7; }\n\n.bs-popover-left, .bs-popover-auto[x-placement^=\"left\"] {\n  margin-right: 0.5rem; }\n  .bs-popover-left > .arrow, .bs-popover-auto[x-placement^=\"left\"] > .arrow {\n    right: calc((0.5rem + 1px) * -1);\n    width: 0.5rem;\n    height: 1rem;\n    margin: 0.3rem 0; }\n    .bs-popover-left > .arrow::before, .bs-popover-auto[x-placement^=\"left\"] > .arrow::before {\n      right: 0;\n      border-width: 0.5rem 0 0.5rem 0.5rem;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .bs-popover-left > .arrow::after, .bs-popover-auto[x-placement^=\"left\"] > .arrow::after {\n      right: 1px;\n      border-width: 0.5rem 0 0.5rem 0.5rem;\n      border-left-color: #fff; }\n\n.popover-header {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px); }\n  .popover-header:empty {\n    display: none; }\n\n.popover-body {\n  padding: 0.5rem 0.75rem;\n  color: #212529; }\n\n.carousel {\n  position: relative; }\n\n.carousel.pointer-event {\n  touch-action: pan-y; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n  .carousel-inner::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n\n.carousel-item {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  backface-visibility: hidden;\n  transition: transform 0.6s ease-in-out; }\n  @media (prefers-reduced-motion: reduce) {\n    .carousel-item {\n      transition: none; } }\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: block; }\n\n.carousel-item-next:not(.carousel-item-left),\n.active.carousel-item-right {\n  transform: translateX(100%); }\n\n.carousel-item-prev:not(.carousel-item-right),\n.active.carousel-item-left {\n  transform: translateX(-100%); }\n\n.carousel-fade .carousel-item {\n  opacity: 0;\n  transition-property: opacity;\n  transform: none; }\n\n.carousel-fade .carousel-item.active,\n.carousel-fade .carousel-item-next.carousel-item-left,\n.carousel-fade .carousel-item-prev.carousel-item-right {\n  z-index: 1;\n  opacity: 1; }\n\n.carousel-fade .active.carousel-item-left,\n.carousel-fade .active.carousel-item-right {\n  z-index: 0;\n  opacity: 0;\n  transition: 0s 0.6s opacity; }\n  @media (prefers-reduced-motion: reduce) {\n    .carousel-fade .active.carousel-item-left,\n    .carousel-fade .active.carousel-item-right {\n      transition: none; } }\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5;\n  transition: opacity 0.15s ease; }\n  @media (prefers-reduced-motion: reduce) {\n    .carousel-control-prev,\n    .carousel-control-next {\n      transition: none; } }\n  .carousel-control-prev:hover, .carousel-control-prev:focus,\n  .carousel-control-next:hover,\n  .carousel-control-next:focus {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: 0.9; }\n\n.carousel-control-prev {\n  left: 0; }\n\n.carousel-control-next {\n  right: 0; }\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: no-repeat 50% / 100% 100%; }\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e\"); }\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3e%3c/svg%3e\"); }\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 15;\n  display: flex;\n  justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none; }\n  .carousel-indicators li {\n    box-sizing: content-box;\n    flex: 0 1 auto;\n    width: 30px;\n    height: 3px;\n    margin-right: 3px;\n    margin-left: 3px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: #fff;\n    background-clip: padding-box;\n    border-top: 10px solid transparent;\n    border-bottom: 10px solid transparent;\n    opacity: .5;\n    transition: opacity 0.6s ease; }\n    @media (prefers-reduced-motion: reduce) {\n      .carousel-indicators li {\n        transition: none; } }\n  .carousel-indicators .active {\n    opacity: 1; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center; }\n\n@keyframes spinner-border {\n  to {\n    transform: rotate(360deg); } }\n\n.spinner-border {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  border: 0.25em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  animation: spinner-border .75s linear infinite; }\n\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.2em; }\n\n@keyframes spinner-grow {\n  0% {\n    transform: scale(0); }\n  50% {\n    opacity: 1; } }\n\n.spinner-grow {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: text-bottom;\n  background-color: currentColor;\n  border-radius: 50%;\n  opacity: 0;\n  animation: spinner-grow .75s linear infinite; }\n\n.spinner-grow-sm {\n  width: 1rem;\n  height: 1rem; }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-primary {\n  background-color: #007bff !important; }\n\na.bg-primary:hover, a.bg-primary:focus,\nbutton.bg-primary:hover,\nbutton.bg-primary:focus {\n  background-color: #0062cc !important; }\n\n.bg-secondary {\n  background-color: #6c757d !important; }\n\na.bg-secondary:hover, a.bg-secondary:focus,\nbutton.bg-secondary:hover,\nbutton.bg-secondary:focus {\n  background-color: #545b62 !important; }\n\n.bg-success {\n  background-color: #28a745 !important; }\n\na.bg-success:hover, a.bg-success:focus,\nbutton.bg-success:hover,\nbutton.bg-success:focus {\n  background-color: #1e7e34 !important; }\n\n.bg-info {\n  background-color: #17a2b8 !important; }\n\na.bg-info:hover, a.bg-info:focus,\nbutton.bg-info:hover,\nbutton.bg-info:focus {\n  background-color: #117a8b !important; }\n\n.bg-warning {\n  background-color: #ffc107 !important; }\n\na.bg-warning:hover, a.bg-warning:focus,\nbutton.bg-warning:hover,\nbutton.bg-warning:focus {\n  background-color: #d39e00 !important; }\n\n.bg-danger {\n  background-color: #dc3545 !important; }\n\na.bg-danger:hover, a.bg-danger:focus,\nbutton.bg-danger:hover,\nbutton.bg-danger:focus {\n  background-color: #bd2130 !important; }\n\n.bg-light {\n  background-color: #f8f9fa !important; }\n\na.bg-light:hover, a.bg-light:focus,\nbutton.bg-light:hover,\nbutton.bg-light:focus {\n  background-color: #dae0e5 !important; }\n\n.bg-dark {\n  background-color: #343a40 !important; }\n\na.bg-dark:hover, a.bg-dark:focus,\nbutton.bg-dark:hover,\nbutton.bg-dark:focus {\n  background-color: #1d2124 !important; }\n\n.bg-white {\n  background-color: #fff !important; }\n\n.bg-transparent {\n  background-color: transparent !important; }\n\n.border {\n  border: 1px solid #dee2e6 !important; }\n\n.border-top {\n  border-top: 1px solid #dee2e6 !important; }\n\n.border-right {\n  border-right: 1px solid #dee2e6 !important; }\n\n.border-bottom {\n  border-bottom: 1px solid #dee2e6 !important; }\n\n.border-left {\n  border-left: 1px solid #dee2e6 !important; }\n\n.border-0 {\n  border: 0 !important; }\n\n.border-top-0 {\n  border-top: 0 !important; }\n\n.border-right-0 {\n  border-right: 0 !important; }\n\n.border-bottom-0 {\n  border-bottom: 0 !important; }\n\n.border-left-0 {\n  border-left: 0 !important; }\n\n.border-primary {\n  border-color: #007bff !important; }\n\n.border-secondary {\n  border-color: #6c757d !important; }\n\n.border-success {\n  border-color: #28a745 !important; }\n\n.border-info {\n  border-color: #17a2b8 !important; }\n\n.border-warning {\n  border-color: #ffc107 !important; }\n\n.border-danger {\n  border-color: #dc3545 !important; }\n\n.border-light {\n  border-color: #f8f9fa !important; }\n\n.border-dark {\n  border-color: #343a40 !important; }\n\n.border-white {\n  border-color: #fff !important; }\n\n.rounded-sm {\n  border-radius: 0.2rem !important; }\n\n.rounded {\n  border-radius: 0.25rem !important; }\n\n.rounded-top {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important; }\n\n.rounded-right {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.rounded-left {\n  border-top-left-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important; }\n\n.rounded-lg {\n  border-radius: 0.3rem !important; }\n\n.rounded-circle {\n  border-radius: 50% !important; }\n\n.rounded-pill {\n  border-radius: 50rem !important; }\n\n.rounded-0 {\n  border-radius: 0 !important; }\n\n.clearfix::after {\n  display: block;\n  clear: both;\n  content: \"\"; }\n\n.d-none {\n  display: none !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-block {\n  display: block !important; }\n\n.d-table {\n  display: table !important; }\n\n.d-table-row {\n  display: table-row !important; }\n\n.d-table-cell {\n  display: table-cell !important; }\n\n.d-flex {\n  display: flex !important; }\n\n.d-inline-flex {\n  display: inline-flex !important; }\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important; }\n  .d-sm-inline {\n    display: inline !important; }\n  .d-sm-inline-block {\n    display: inline-block !important; }\n  .d-sm-block {\n    display: block !important; }\n  .d-sm-table {\n    display: table !important; }\n  .d-sm-table-row {\n    display: table-row !important; }\n  .d-sm-table-cell {\n    display: table-cell !important; }\n  .d-sm-flex {\n    display: flex !important; }\n  .d-sm-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important; }\n  .d-md-inline {\n    display: inline !important; }\n  .d-md-inline-block {\n    display: inline-block !important; }\n  .d-md-block {\n    display: block !important; }\n  .d-md-table {\n    display: table !important; }\n  .d-md-table-row {\n    display: table-row !important; }\n  .d-md-table-cell {\n    display: table-cell !important; }\n  .d-md-flex {\n    display: flex !important; }\n  .d-md-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important; }\n  .d-lg-inline {\n    display: inline !important; }\n  .d-lg-inline-block {\n    display: inline-block !important; }\n  .d-lg-block {\n    display: block !important; }\n  .d-lg-table {\n    display: table !important; }\n  .d-lg-table-row {\n    display: table-row !important; }\n  .d-lg-table-cell {\n    display: table-cell !important; }\n  .d-lg-flex {\n    display: flex !important; }\n  .d-lg-inline-flex {\n    display: inline-flex !important; } }\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important; }\n  .d-xl-inline {\n    display: inline !important; }\n  .d-xl-inline-block {\n    display: inline-block !important; }\n  .d-xl-block {\n    display: block !important; }\n  .d-xl-table {\n    display: table !important; }\n  .d-xl-table-row {\n    display: table-row !important; }\n  .d-xl-table-cell {\n    display: table-cell !important; }\n  .d-xl-flex {\n    display: flex !important; }\n  .d-xl-inline-flex {\n    display: inline-flex !important; } }\n\n@media print {\n  .d-print-none {\n    display: none !important; }\n  .d-print-inline {\n    display: inline !important; }\n  .d-print-inline-block {\n    display: inline-block !important; }\n  .d-print-block {\n    display: block !important; }\n  .d-print-table {\n    display: table !important; }\n  .d-print-table-row {\n    display: table-row !important; }\n  .d-print-table-cell {\n    display: table-cell !important; }\n  .d-print-flex {\n    display: flex !important; }\n  .d-print-inline-flex {\n    display: inline-flex !important; } }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive::before {\n    display: block;\n    content: \"\"; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.embed-responsive-21by9::before {\n  padding-top: 42.85714%; }\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%; }\n\n.embed-responsive-4by3::before {\n  padding-top: 75%; }\n\n.embed-responsive-1by1::before {\n  padding-top: 100%; }\n\n.flex-row {\n  flex-direction: row !important; }\n\n.flex-column {\n  flex-direction: column !important; }\n\n.flex-row-reverse {\n  flex-direction: row-reverse !important; }\n\n.flex-column-reverse {\n  flex-direction: column-reverse !important; }\n\n.flex-wrap {\n  flex-wrap: wrap !important; }\n\n.flex-nowrap {\n  flex-wrap: nowrap !important; }\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important; }\n\n.flex-fill {\n  flex: 1 1 auto !important; }\n\n.flex-grow-0 {\n  flex-grow: 0 !important; }\n\n.flex-grow-1 {\n  flex-grow: 1 !important; }\n\n.flex-shrink-0 {\n  flex-shrink: 0 !important; }\n\n.flex-shrink-1 {\n  flex-shrink: 1 !important; }\n\n.justify-content-start {\n  justify-content: flex-start !important; }\n\n.justify-content-end {\n  justify-content: flex-end !important; }\n\n.justify-content-center {\n  justify-content: center !important; }\n\n.justify-content-between {\n  justify-content: space-between !important; }\n\n.justify-content-around {\n  justify-content: space-around !important; }\n\n.align-items-start {\n  align-items: flex-start !important; }\n\n.align-items-end {\n  align-items: flex-end !important; }\n\n.align-items-center {\n  align-items: center !important; }\n\n.align-items-baseline {\n  align-items: baseline !important; }\n\n.align-items-stretch {\n  align-items: stretch !important; }\n\n.align-content-start {\n  align-content: flex-start !important; }\n\n.align-content-end {\n  align-content: flex-end !important; }\n\n.align-content-center {\n  align-content: center !important; }\n\n.align-content-between {\n  align-content: space-between !important; }\n\n.align-content-around {\n  align-content: space-around !important; }\n\n.align-content-stretch {\n  align-content: stretch !important; }\n\n.align-self-auto {\n  align-self: auto !important; }\n\n.align-self-start {\n  align-self: flex-start !important; }\n\n.align-self-end {\n  align-self: flex-end !important; }\n\n.align-self-center {\n  align-self: center !important; }\n\n.align-self-baseline {\n  align-self: baseline !important; }\n\n.align-self-stretch {\n  align-self: stretch !important; }\n\n@media (min-width: 576px) {\n  .flex-sm-row {\n    flex-direction: row !important; }\n  .flex-sm-column {\n    flex-direction: column !important; }\n  .flex-sm-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-sm-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-sm-wrap {\n    flex-wrap: wrap !important; }\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-sm-fill {\n    flex: 1 1 auto !important; }\n  .flex-sm-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-sm-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-sm-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-sm-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-sm-start {\n    justify-content: flex-start !important; }\n  .justify-content-sm-end {\n    justify-content: flex-end !important; }\n  .justify-content-sm-center {\n    justify-content: center !important; }\n  .justify-content-sm-between {\n    justify-content: space-between !important; }\n  .justify-content-sm-around {\n    justify-content: space-around !important; }\n  .align-items-sm-start {\n    align-items: flex-start !important; }\n  .align-items-sm-end {\n    align-items: flex-end !important; }\n  .align-items-sm-center {\n    align-items: center !important; }\n  .align-items-sm-baseline {\n    align-items: baseline !important; }\n  .align-items-sm-stretch {\n    align-items: stretch !important; }\n  .align-content-sm-start {\n    align-content: flex-start !important; }\n  .align-content-sm-end {\n    align-content: flex-end !important; }\n  .align-content-sm-center {\n    align-content: center !important; }\n  .align-content-sm-between {\n    align-content: space-between !important; }\n  .align-content-sm-around {\n    align-content: space-around !important; }\n  .align-content-sm-stretch {\n    align-content: stretch !important; }\n  .align-self-sm-auto {\n    align-self: auto !important; }\n  .align-self-sm-start {\n    align-self: flex-start !important; }\n  .align-self-sm-end {\n    align-self: flex-end !important; }\n  .align-self-sm-center {\n    align-self: center !important; }\n  .align-self-sm-baseline {\n    align-self: baseline !important; }\n  .align-self-sm-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 768px) {\n  .flex-md-row {\n    flex-direction: row !important; }\n  .flex-md-column {\n    flex-direction: column !important; }\n  .flex-md-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-md-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-md-wrap {\n    flex-wrap: wrap !important; }\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-md-fill {\n    flex: 1 1 auto !important; }\n  .flex-md-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-md-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-md-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-md-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-md-start {\n    justify-content: flex-start !important; }\n  .justify-content-md-end {\n    justify-content: flex-end !important; }\n  .justify-content-md-center {\n    justify-content: center !important; }\n  .justify-content-md-between {\n    justify-content: space-between !important; }\n  .justify-content-md-around {\n    justify-content: space-around !important; }\n  .align-items-md-start {\n    align-items: flex-start !important; }\n  .align-items-md-end {\n    align-items: flex-end !important; }\n  .align-items-md-center {\n    align-items: center !important; }\n  .align-items-md-baseline {\n    align-items: baseline !important; }\n  .align-items-md-stretch {\n    align-items: stretch !important; }\n  .align-content-md-start {\n    align-content: flex-start !important; }\n  .align-content-md-end {\n    align-content: flex-end !important; }\n  .align-content-md-center {\n    align-content: center !important; }\n  .align-content-md-between {\n    align-content: space-between !important; }\n  .align-content-md-around {\n    align-content: space-around !important; }\n  .align-content-md-stretch {\n    align-content: stretch !important; }\n  .align-self-md-auto {\n    align-self: auto !important; }\n  .align-self-md-start {\n    align-self: flex-start !important; }\n  .align-self-md-end {\n    align-self: flex-end !important; }\n  .align-self-md-center {\n    align-self: center !important; }\n  .align-self-md-baseline {\n    align-self: baseline !important; }\n  .align-self-md-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 992px) {\n  .flex-lg-row {\n    flex-direction: row !important; }\n  .flex-lg-column {\n    flex-direction: column !important; }\n  .flex-lg-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-lg-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-lg-wrap {\n    flex-wrap: wrap !important; }\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-lg-fill {\n    flex: 1 1 auto !important; }\n  .flex-lg-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-lg-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-lg-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-lg-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-lg-start {\n    justify-content: flex-start !important; }\n  .justify-content-lg-end {\n    justify-content: flex-end !important; }\n  .justify-content-lg-center {\n    justify-content: center !important; }\n  .justify-content-lg-between {\n    justify-content: space-between !important; }\n  .justify-content-lg-around {\n    justify-content: space-around !important; }\n  .align-items-lg-start {\n    align-items: flex-start !important; }\n  .align-items-lg-end {\n    align-items: flex-end !important; }\n  .align-items-lg-center {\n    align-items: center !important; }\n  .align-items-lg-baseline {\n    align-items: baseline !important; }\n  .align-items-lg-stretch {\n    align-items: stretch !important; }\n  .align-content-lg-start {\n    align-content: flex-start !important; }\n  .align-content-lg-end {\n    align-content: flex-end !important; }\n  .align-content-lg-center {\n    align-content: center !important; }\n  .align-content-lg-between {\n    align-content: space-between !important; }\n  .align-content-lg-around {\n    align-content: space-around !important; }\n  .align-content-lg-stretch {\n    align-content: stretch !important; }\n  .align-self-lg-auto {\n    align-self: auto !important; }\n  .align-self-lg-start {\n    align-self: flex-start !important; }\n  .align-self-lg-end {\n    align-self: flex-end !important; }\n  .align-self-lg-center {\n    align-self: center !important; }\n  .align-self-lg-baseline {\n    align-self: baseline !important; }\n  .align-self-lg-stretch {\n    align-self: stretch !important; } }\n\n@media (min-width: 1200px) {\n  .flex-xl-row {\n    flex-direction: row !important; }\n  .flex-xl-column {\n    flex-direction: column !important; }\n  .flex-xl-row-reverse {\n    flex-direction: row-reverse !important; }\n  .flex-xl-column-reverse {\n    flex-direction: column-reverse !important; }\n  .flex-xl-wrap {\n    flex-wrap: wrap !important; }\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important; }\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important; }\n  .flex-xl-fill {\n    flex: 1 1 auto !important; }\n  .flex-xl-grow-0 {\n    flex-grow: 0 !important; }\n  .flex-xl-grow-1 {\n    flex-grow: 1 !important; }\n  .flex-xl-shrink-0 {\n    flex-shrink: 0 !important; }\n  .flex-xl-shrink-1 {\n    flex-shrink: 1 !important; }\n  .justify-content-xl-start {\n    justify-content: flex-start !important; }\n  .justify-content-xl-end {\n    justify-content: flex-end !important; }\n  .justify-content-xl-center {\n    justify-content: center !important; }\n  .justify-content-xl-between {\n    justify-content: space-between !important; }\n  .justify-content-xl-around {\n    justify-content: space-around !important; }\n  .align-items-xl-start {\n    align-items: flex-start !important; }\n  .align-items-xl-end {\n    align-items: flex-end !important; }\n  .align-items-xl-center {\n    align-items: center !important; }\n  .align-items-xl-baseline {\n    align-items: baseline !important; }\n  .align-items-xl-stretch {\n    align-items: stretch !important; }\n  .align-content-xl-start {\n    align-content: flex-start !important; }\n  .align-content-xl-end {\n    align-content: flex-end !important; }\n  .align-content-xl-center {\n    align-content: center !important; }\n  .align-content-xl-between {\n    align-content: space-between !important; }\n  .align-content-xl-around {\n    align-content: space-around !important; }\n  .align-content-xl-stretch {\n    align-content: stretch !important; }\n  .align-self-xl-auto {\n    align-self: auto !important; }\n  .align-self-xl-start {\n    align-self: flex-start !important; }\n  .align-self-xl-end {\n    align-self: flex-end !important; }\n  .align-self-xl-center {\n    align-self: center !important; }\n  .align-self-xl-baseline {\n    align-self: baseline !important; }\n  .align-self-xl-stretch {\n    align-self: stretch !important; } }\n\n.float-left {\n  float: left !important; }\n\n.float-right {\n  float: right !important; }\n\n.float-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.overflow-auto {\n  overflow: auto !important; }\n\n.overflow-hidden {\n  overflow: hidden !important; }\n\n.position-static {\n  position: static !important; }\n\n.position-relative {\n  position: relative !important; }\n\n.position-absolute {\n  position: absolute !important; }\n\n.position-fixed {\n  position: fixed !important; }\n\n.position-sticky {\n  position: sticky !important; }\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030; }\n\n@supports (position: sticky) {\n  .sticky-top {\n    position: sticky;\n    top: 0;\n    z-index: 1020; } }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal; }\n\n.shadow-sm {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important; }\n\n.shadow {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; }\n\n.shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important; }\n\n.shadow-none {\n  box-shadow: none !important; }\n\n.w-25 {\n  width: 25% !important; }\n\n.w-50 {\n  width: 50% !important; }\n\n.w-75 {\n  width: 75% !important; }\n\n.w-100 {\n  width: 100% !important; }\n\n.w-auto {\n  width: auto !important; }\n\n.h-25 {\n  height: 25% !important; }\n\n.h-50 {\n  height: 50% !important; }\n\n.h-75 {\n  height: 75% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.h-auto {\n  height: auto !important; }\n\n.mw-100 {\n  max-width: 100% !important; }\n\n.mh-100 {\n  max-height: 100% !important; }\n\n.min-vw-100 {\n  min-width: 100vw !important; }\n\n.min-vh-100 {\n  min-height: 100vh !important; }\n\n.vw-100 {\n  width: 100vw !important; }\n\n.vh-100 {\n  height: 100vh !important; }\n\n.stretched-link::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  pointer-events: auto;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0); }\n\n.m-0 {\n  margin: 0 !important; }\n\n.mt-0,\n.my-0 {\n  margin-top: 0 !important; }\n\n.mr-0,\n.mx-0 {\n  margin-right: 0 !important; }\n\n.mb-0,\n.my-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0,\n.mx-0 {\n  margin-left: 0 !important; }\n\n.m-1 {\n  margin: 0.25rem !important; }\n\n.mt-1,\n.my-1 {\n  margin-top: 0.25rem !important; }\n\n.mr-1,\n.mx-1 {\n  margin-right: 0.25rem !important; }\n\n.mb-1,\n.my-1 {\n  margin-bottom: 0.25rem !important; }\n\n.ml-1,\n.mx-1 {\n  margin-left: 0.25rem !important; }\n\n.m-2 {\n  margin: 0.5rem !important; }\n\n.mt-2,\n.my-2 {\n  margin-top: 0.5rem !important; }\n\n.mr-2,\n.mx-2 {\n  margin-right: 0.5rem !important; }\n\n.mb-2,\n.my-2 {\n  margin-bottom: 0.5rem !important; }\n\n.ml-2,\n.mx-2 {\n  margin-left: 0.5rem !important; }\n\n.m-3 {\n  margin: 1rem !important; }\n\n.mt-3,\n.my-3 {\n  margin-top: 1rem !important; }\n\n.mr-3,\n.mx-3 {\n  margin-right: 1rem !important; }\n\n.mb-3,\n.my-3 {\n  margin-bottom: 1rem !important; }\n\n.ml-3,\n.mx-3 {\n  margin-left: 1rem !important; }\n\n.m-4 {\n  margin: 1.5rem !important; }\n\n.mt-4,\n.my-4 {\n  margin-top: 1.5rem !important; }\n\n.mr-4,\n.mx-4 {\n  margin-right: 1.5rem !important; }\n\n.mb-4,\n.my-4 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-4,\n.mx-4 {\n  margin-left: 1.5rem !important; }\n\n.m-5 {\n  margin: 3rem !important; }\n\n.mt-5,\n.my-5 {\n  margin-top: 3rem !important; }\n\n.mr-5,\n.mx-5 {\n  margin-right: 3rem !important; }\n\n.mb-5,\n.my-5 {\n  margin-bottom: 3rem !important; }\n\n.ml-5,\n.mx-5 {\n  margin-left: 3rem !important; }\n\n.p-0 {\n  padding: 0 !important; }\n\n.pt-0,\n.py-0 {\n  padding-top: 0 !important; }\n\n.pr-0,\n.px-0 {\n  padding-right: 0 !important; }\n\n.pb-0,\n.py-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0,\n.px-0 {\n  padding-left: 0 !important; }\n\n.p-1 {\n  padding: 0.25rem !important; }\n\n.pt-1,\n.py-1 {\n  padding-top: 0.25rem !important; }\n\n.pr-1,\n.px-1 {\n  padding-right: 0.25rem !important; }\n\n.pb-1,\n.py-1 {\n  padding-bottom: 0.25rem !important; }\n\n.pl-1,\n.px-1 {\n  padding-left: 0.25rem !important; }\n\n.p-2 {\n  padding: 0.5rem !important; }\n\n.pt-2,\n.py-2 {\n  padding-top: 0.5rem !important; }\n\n.pr-2,\n.px-2 {\n  padding-right: 0.5rem !important; }\n\n.pb-2,\n.py-2 {\n  padding-bottom: 0.5rem !important; }\n\n.pl-2,\n.px-2 {\n  padding-left: 0.5rem !important; }\n\n.p-3 {\n  padding: 1rem !important; }\n\n.pt-3,\n.py-3 {\n  padding-top: 1rem !important; }\n\n.pr-3,\n.px-3 {\n  padding-right: 1rem !important; }\n\n.pb-3,\n.py-3 {\n  padding-bottom: 1rem !important; }\n\n.pl-3,\n.px-3 {\n  padding-left: 1rem !important; }\n\n.p-4 {\n  padding: 1.5rem !important; }\n\n.pt-4,\n.py-4 {\n  padding-top: 1.5rem !important; }\n\n.pr-4,\n.px-4 {\n  padding-right: 1.5rem !important; }\n\n.pb-4,\n.py-4 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-4,\n.px-4 {\n  padding-left: 1.5rem !important; }\n\n.p-5 {\n  padding: 3rem !important; }\n\n.pt-5,\n.py-5 {\n  padding-top: 3rem !important; }\n\n.pr-5,\n.px-5 {\n  padding-right: 3rem !important; }\n\n.pb-5,\n.py-5 {\n  padding-bottom: 3rem !important; }\n\n.pl-5,\n.px-5 {\n  padding-left: 3rem !important; }\n\n.m-n1 {\n  margin: -0.25rem !important; }\n\n.mt-n1,\n.my-n1 {\n  margin-top: -0.25rem !important; }\n\n.mr-n1,\n.mx-n1 {\n  margin-right: -0.25rem !important; }\n\n.mb-n1,\n.my-n1 {\n  margin-bottom: -0.25rem !important; }\n\n.ml-n1,\n.mx-n1 {\n  margin-left: -0.25rem !important; }\n\n.m-n2 {\n  margin: -0.5rem !important; }\n\n.mt-n2,\n.my-n2 {\n  margin-top: -0.5rem !important; }\n\n.mr-n2,\n.mx-n2 {\n  margin-right: -0.5rem !important; }\n\n.mb-n2,\n.my-n2 {\n  margin-bottom: -0.5rem !important; }\n\n.ml-n2,\n.mx-n2 {\n  margin-left: -0.5rem !important; }\n\n.m-n3 {\n  margin: -1rem !important; }\n\n.mt-n3,\n.my-n3 {\n  margin-top: -1rem !important; }\n\n.mr-n3,\n.mx-n3 {\n  margin-right: -1rem !important; }\n\n.mb-n3,\n.my-n3 {\n  margin-bottom: -1rem !important; }\n\n.ml-n3,\n.mx-n3 {\n  margin-left: -1rem !important; }\n\n.m-n4 {\n  margin: -1.5rem !important; }\n\n.mt-n4,\n.my-n4 {\n  margin-top: -1.5rem !important; }\n\n.mr-n4,\n.mx-n4 {\n  margin-right: -1.5rem !important; }\n\n.mb-n4,\n.my-n4 {\n  margin-bottom: -1.5rem !important; }\n\n.ml-n4,\n.mx-n4 {\n  margin-left: -1.5rem !important; }\n\n.m-n5 {\n  margin: -3rem !important; }\n\n.mt-n5,\n.my-n5 {\n  margin-top: -3rem !important; }\n\n.mr-n5,\n.mx-n5 {\n  margin-right: -3rem !important; }\n\n.mb-n5,\n.my-n5 {\n  margin-bottom: -3rem !important; }\n\n.ml-n5,\n.mx-n5 {\n  margin-left: -3rem !important; }\n\n.m-auto {\n  margin: auto !important; }\n\n.mt-auto,\n.my-auto {\n  margin-top: auto !important; }\n\n.mr-auto,\n.mx-auto {\n  margin-right: auto !important; }\n\n.mb-auto,\n.my-auto {\n  margin-bottom: auto !important; }\n\n.ml-auto,\n.mx-auto {\n  margin-left: auto !important; }\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 !important; }\n  .mt-sm-0,\n  .my-sm-0 {\n    margin-top: 0 !important; }\n  .mr-sm-0,\n  .mx-sm-0 {\n    margin-right: 0 !important; }\n  .mb-sm-0,\n  .my-sm-0 {\n    margin-bottom: 0 !important; }\n  .ml-sm-0,\n  .mx-sm-0 {\n    margin-left: 0 !important; }\n  .m-sm-1 {\n    margin: 0.25rem !important; }\n  .mt-sm-1,\n  .my-sm-1 {\n    margin-top: 0.25rem !important; }\n  .mr-sm-1,\n  .mx-sm-1 {\n    margin-right: 0.25rem !important; }\n  .mb-sm-1,\n  .my-sm-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-sm-1,\n  .mx-sm-1 {\n    margin-left: 0.25rem !important; }\n  .m-sm-2 {\n    margin: 0.5rem !important; }\n  .mt-sm-2,\n  .my-sm-2 {\n    margin-top: 0.5rem !important; }\n  .mr-sm-2,\n  .mx-sm-2 {\n    margin-right: 0.5rem !important; }\n  .mb-sm-2,\n  .my-sm-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-sm-2,\n  .mx-sm-2 {\n    margin-left: 0.5rem !important; }\n  .m-sm-3 {\n    margin: 1rem !important; }\n  .mt-sm-3,\n  .my-sm-3 {\n    margin-top: 1rem !important; }\n  .mr-sm-3,\n  .mx-sm-3 {\n    margin-right: 1rem !important; }\n  .mb-sm-3,\n  .my-sm-3 {\n    margin-bottom: 1rem !important; }\n  .ml-sm-3,\n  .mx-sm-3 {\n    margin-left: 1rem !important; }\n  .m-sm-4 {\n    margin: 1.5rem !important; }\n  .mt-sm-4,\n  .my-sm-4 {\n    margin-top: 1.5rem !important; }\n  .mr-sm-4,\n  .mx-sm-4 {\n    margin-right: 1.5rem !important; }\n  .mb-sm-4,\n  .my-sm-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-sm-4,\n  .mx-sm-4 {\n    margin-left: 1.5rem !important; }\n  .m-sm-5 {\n    margin: 3rem !important; }\n  .mt-sm-5,\n  .my-sm-5 {\n    margin-top: 3rem !important; }\n  .mr-sm-5,\n  .mx-sm-5 {\n    margin-right: 3rem !important; }\n  .mb-sm-5,\n  .my-sm-5 {\n    margin-bottom: 3rem !important; }\n  .ml-sm-5,\n  .mx-sm-5 {\n    margin-left: 3rem !important; }\n  .p-sm-0 {\n    padding: 0 !important; }\n  .pt-sm-0,\n  .py-sm-0 {\n    padding-top: 0 !important; }\n  .pr-sm-0,\n  .px-sm-0 {\n    padding-right: 0 !important; }\n  .pb-sm-0,\n  .py-sm-0 {\n    padding-bottom: 0 !important; }\n  .pl-sm-0,\n  .px-sm-0 {\n    padding-left: 0 !important; }\n  .p-sm-1 {\n    padding: 0.25rem !important; }\n  .pt-sm-1,\n  .py-sm-1 {\n    padding-top: 0.25rem !important; }\n  .pr-sm-1,\n  .px-sm-1 {\n    padding-right: 0.25rem !important; }\n  .pb-sm-1,\n  .py-sm-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-sm-1,\n  .px-sm-1 {\n    padding-left: 0.25rem !important; }\n  .p-sm-2 {\n    padding: 0.5rem !important; }\n  .pt-sm-2,\n  .py-sm-2 {\n    padding-top: 0.5rem !important; }\n  .pr-sm-2,\n  .px-sm-2 {\n    padding-right: 0.5rem !important; }\n  .pb-sm-2,\n  .py-sm-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-sm-2,\n  .px-sm-2 {\n    padding-left: 0.5rem !important; }\n  .p-sm-3 {\n    padding: 1rem !important; }\n  .pt-sm-3,\n  .py-sm-3 {\n    padding-top: 1rem !important; }\n  .pr-sm-3,\n  .px-sm-3 {\n    padding-right: 1rem !important; }\n  .pb-sm-3,\n  .py-sm-3 {\n    padding-bottom: 1rem !important; }\n  .pl-sm-3,\n  .px-sm-3 {\n    padding-left: 1rem !important; }\n  .p-sm-4 {\n    padding: 1.5rem !important; }\n  .pt-sm-4,\n  .py-sm-4 {\n    padding-top: 1.5rem !important; }\n  .pr-sm-4,\n  .px-sm-4 {\n    padding-right: 1.5rem !important; }\n  .pb-sm-4,\n  .py-sm-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-sm-4,\n  .px-sm-4 {\n    padding-left: 1.5rem !important; }\n  .p-sm-5 {\n    padding: 3rem !important; }\n  .pt-sm-5,\n  .py-sm-5 {\n    padding-top: 3rem !important; }\n  .pr-sm-5,\n  .px-sm-5 {\n    padding-right: 3rem !important; }\n  .pb-sm-5,\n  .py-sm-5 {\n    padding-bottom: 3rem !important; }\n  .pl-sm-5,\n  .px-sm-5 {\n    padding-left: 3rem !important; }\n  .m-sm-n1 {\n    margin: -0.25rem !important; }\n  .mt-sm-n1,\n  .my-sm-n1 {\n    margin-top: -0.25rem !important; }\n  .mr-sm-n1,\n  .mx-sm-n1 {\n    margin-right: -0.25rem !important; }\n  .mb-sm-n1,\n  .my-sm-n1 {\n    margin-bottom: -0.25rem !important; }\n  .ml-sm-n1,\n  .mx-sm-n1 {\n    margin-left: -0.25rem !important; }\n  .m-sm-n2 {\n    margin: -0.5rem !important; }\n  .mt-sm-n2,\n  .my-sm-n2 {\n    margin-top: -0.5rem !important; }\n  .mr-sm-n2,\n  .mx-sm-n2 {\n    margin-right: -0.5rem !important; }\n  .mb-sm-n2,\n  .my-sm-n2 {\n    margin-bottom: -0.5rem !important; }\n  .ml-sm-n2,\n  .mx-sm-n2 {\n    margin-left: -0.5rem !important; }\n  .m-sm-n3 {\n    margin: -1rem !important; }\n  .mt-sm-n3,\n  .my-sm-n3 {\n    margin-top: -1rem !important; }\n  .mr-sm-n3,\n  .mx-sm-n3 {\n    margin-right: -1rem !important; }\n  .mb-sm-n3,\n  .my-sm-n3 {\n    margin-bottom: -1rem !important; }\n  .ml-sm-n3,\n  .mx-sm-n3 {\n    margin-left: -1rem !important; }\n  .m-sm-n4 {\n    margin: -1.5rem !important; }\n  .mt-sm-n4,\n  .my-sm-n4 {\n    margin-top: -1.5rem !important; }\n  .mr-sm-n4,\n  .mx-sm-n4 {\n    margin-right: -1.5rem !important; }\n  .mb-sm-n4,\n  .my-sm-n4 {\n    margin-bottom: -1.5rem !important; }\n  .ml-sm-n4,\n  .mx-sm-n4 {\n    margin-left: -1.5rem !important; }\n  .m-sm-n5 {\n    margin: -3rem !important; }\n  .mt-sm-n5,\n  .my-sm-n5 {\n    margin-top: -3rem !important; }\n  .mr-sm-n5,\n  .mx-sm-n5 {\n    margin-right: -3rem !important; }\n  .mb-sm-n5,\n  .my-sm-n5 {\n    margin-bottom: -3rem !important; }\n  .ml-sm-n5,\n  .mx-sm-n5 {\n    margin-left: -3rem !important; }\n  .m-sm-auto {\n    margin: auto !important; }\n  .mt-sm-auto,\n  .my-sm-auto {\n    margin-top: auto !important; }\n  .mr-sm-auto,\n  .mx-sm-auto {\n    margin-right: auto !important; }\n  .mb-sm-auto,\n  .my-sm-auto {\n    margin-bottom: auto !important; }\n  .ml-sm-auto,\n  .mx-sm-auto {\n    margin-left: auto !important; } }\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 !important; }\n  .mt-md-0,\n  .my-md-0 {\n    margin-top: 0 !important; }\n  .mr-md-0,\n  .mx-md-0 {\n    margin-right: 0 !important; }\n  .mb-md-0,\n  .my-md-0 {\n    margin-bottom: 0 !important; }\n  .ml-md-0,\n  .mx-md-0 {\n    margin-left: 0 !important; }\n  .m-md-1 {\n    margin: 0.25rem !important; }\n  .mt-md-1,\n  .my-md-1 {\n    margin-top: 0.25rem !important; }\n  .mr-md-1,\n  .mx-md-1 {\n    margin-right: 0.25rem !important; }\n  .mb-md-1,\n  .my-md-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-md-1,\n  .mx-md-1 {\n    margin-left: 0.25rem !important; }\n  .m-md-2 {\n    margin: 0.5rem !important; }\n  .mt-md-2,\n  .my-md-2 {\n    margin-top: 0.5rem !important; }\n  .mr-md-2,\n  .mx-md-2 {\n    margin-right: 0.5rem !important; }\n  .mb-md-2,\n  .my-md-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-md-2,\n  .mx-md-2 {\n    margin-left: 0.5rem !important; }\n  .m-md-3 {\n    margin: 1rem !important; }\n  .mt-md-3,\n  .my-md-3 {\n    margin-top: 1rem !important; }\n  .mr-md-3,\n  .mx-md-3 {\n    margin-right: 1rem !important; }\n  .mb-md-3,\n  .my-md-3 {\n    margin-bottom: 1rem !important; }\n  .ml-md-3,\n  .mx-md-3 {\n    margin-left: 1rem !important; }\n  .m-md-4 {\n    margin: 1.5rem !important; }\n  .mt-md-4,\n  .my-md-4 {\n    margin-top: 1.5rem !important; }\n  .mr-md-4,\n  .mx-md-4 {\n    margin-right: 1.5rem !important; }\n  .mb-md-4,\n  .my-md-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-md-4,\n  .mx-md-4 {\n    margin-left: 1.5rem !important; }\n  .m-md-5 {\n    margin: 3rem !important; }\n  .mt-md-5,\n  .my-md-5 {\n    margin-top: 3rem !important; }\n  .mr-md-5,\n  .mx-md-5 {\n    margin-right: 3rem !important; }\n  .mb-md-5,\n  .my-md-5 {\n    margin-bottom: 3rem !important; }\n  .ml-md-5,\n  .mx-md-5 {\n    margin-left: 3rem !important; }\n  .p-md-0 {\n    padding: 0 !important; }\n  .pt-md-0,\n  .py-md-0 {\n    padding-top: 0 !important; }\n  .pr-md-0,\n  .px-md-0 {\n    padding-right: 0 !important; }\n  .pb-md-0,\n  .py-md-0 {\n    padding-bottom: 0 !important; }\n  .pl-md-0,\n  .px-md-0 {\n    padding-left: 0 !important; }\n  .p-md-1 {\n    padding: 0.25rem !important; }\n  .pt-md-1,\n  .py-md-1 {\n    padding-top: 0.25rem !important; }\n  .pr-md-1,\n  .px-md-1 {\n    padding-right: 0.25rem !important; }\n  .pb-md-1,\n  .py-md-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-md-1,\n  .px-md-1 {\n    padding-left: 0.25rem !important; }\n  .p-md-2 {\n    padding: 0.5rem !important; }\n  .pt-md-2,\n  .py-md-2 {\n    padding-top: 0.5rem !important; }\n  .pr-md-2,\n  .px-md-2 {\n    padding-right: 0.5rem !important; }\n  .pb-md-2,\n  .py-md-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-md-2,\n  .px-md-2 {\n    padding-left: 0.5rem !important; }\n  .p-md-3 {\n    padding: 1rem !important; }\n  .pt-md-3,\n  .py-md-3 {\n    padding-top: 1rem !important; }\n  .pr-md-3,\n  .px-md-3 {\n    padding-right: 1rem !important; }\n  .pb-md-3,\n  .py-md-3 {\n    padding-bottom: 1rem !important; }\n  .pl-md-3,\n  .px-md-3 {\n    padding-left: 1rem !important; }\n  .p-md-4 {\n    padding: 1.5rem !important; }\n  .pt-md-4,\n  .py-md-4 {\n    padding-top: 1.5rem !important; }\n  .pr-md-4,\n  .px-md-4 {\n    padding-right: 1.5rem !important; }\n  .pb-md-4,\n  .py-md-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-md-4,\n  .px-md-4 {\n    padding-left: 1.5rem !important; }\n  .p-md-5 {\n    padding: 3rem !important; }\n  .pt-md-5,\n  .py-md-5 {\n    padding-top: 3rem !important; }\n  .pr-md-5,\n  .px-md-5 {\n    padding-right: 3rem !important; }\n  .pb-md-5,\n  .py-md-5 {\n    padding-bottom: 3rem !important; }\n  .pl-md-5,\n  .px-md-5 {\n    padding-left: 3rem !important; }\n  .m-md-n1 {\n    margin: -0.25rem !important; }\n  .mt-md-n1,\n  .my-md-n1 {\n    margin-top: -0.25rem !important; }\n  .mr-md-n1,\n  .mx-md-n1 {\n    margin-right: -0.25rem !important; }\n  .mb-md-n1,\n  .my-md-n1 {\n    margin-bottom: -0.25rem !important; }\n  .ml-md-n1,\n  .mx-md-n1 {\n    margin-left: -0.25rem !important; }\n  .m-md-n2 {\n    margin: -0.5rem !important; }\n  .mt-md-n2,\n  .my-md-n2 {\n    margin-top: -0.5rem !important; }\n  .mr-md-n2,\n  .mx-md-n2 {\n    margin-right: -0.5rem !important; }\n  .mb-md-n2,\n  .my-md-n2 {\n    margin-bottom: -0.5rem !important; }\n  .ml-md-n2,\n  .mx-md-n2 {\n    margin-left: -0.5rem !important; }\n  .m-md-n3 {\n    margin: -1rem !important; }\n  .mt-md-n3,\n  .my-md-n3 {\n    margin-top: -1rem !important; }\n  .mr-md-n3,\n  .mx-md-n3 {\n    margin-right: -1rem !important; }\n  .mb-md-n3,\n  .my-md-n3 {\n    margin-bottom: -1rem !important; }\n  .ml-md-n3,\n  .mx-md-n3 {\n    margin-left: -1rem !important; }\n  .m-md-n4 {\n    margin: -1.5rem !important; }\n  .mt-md-n4,\n  .my-md-n4 {\n    margin-top: -1.5rem !important; }\n  .mr-md-n4,\n  .mx-md-n4 {\n    margin-right: -1.5rem !important; }\n  .mb-md-n4,\n  .my-md-n4 {\n    margin-bottom: -1.5rem !important; }\n  .ml-md-n4,\n  .mx-md-n4 {\n    margin-left: -1.5rem !important; }\n  .m-md-n5 {\n    margin: -3rem !important; }\n  .mt-md-n5,\n  .my-md-n5 {\n    margin-top: -3rem !important; }\n  .mr-md-n5,\n  .mx-md-n5 {\n    margin-right: -3rem !important; }\n  .mb-md-n5,\n  .my-md-n5 {\n    margin-bottom: -3rem !important; }\n  .ml-md-n5,\n  .mx-md-n5 {\n    margin-left: -3rem !important; }\n  .m-md-auto {\n    margin: auto !important; }\n  .mt-md-auto,\n  .my-md-auto {\n    margin-top: auto !important; }\n  .mr-md-auto,\n  .mx-md-auto {\n    margin-right: auto !important; }\n  .mb-md-auto,\n  .my-md-auto {\n    margin-bottom: auto !important; }\n  .ml-md-auto,\n  .mx-md-auto {\n    margin-left: auto !important; } }\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 !important; }\n  .mt-lg-0,\n  .my-lg-0 {\n    margin-top: 0 !important; }\n  .mr-lg-0,\n  .mx-lg-0 {\n    margin-right: 0 !important; }\n  .mb-lg-0,\n  .my-lg-0 {\n    margin-bottom: 0 !important; }\n  .ml-lg-0,\n  .mx-lg-0 {\n    margin-left: 0 !important; }\n  .m-lg-1 {\n    margin: 0.25rem !important; }\n  .mt-lg-1,\n  .my-lg-1 {\n    margin-top: 0.25rem !important; }\n  .mr-lg-1,\n  .mx-lg-1 {\n    margin-right: 0.25rem !important; }\n  .mb-lg-1,\n  .my-lg-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-lg-1,\n  .mx-lg-1 {\n    margin-left: 0.25rem !important; }\n  .m-lg-2 {\n    margin: 0.5rem !important; }\n  .mt-lg-2,\n  .my-lg-2 {\n    margin-top: 0.5rem !important; }\n  .mr-lg-2,\n  .mx-lg-2 {\n    margin-right: 0.5rem !important; }\n  .mb-lg-2,\n  .my-lg-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-lg-2,\n  .mx-lg-2 {\n    margin-left: 0.5rem !important; }\n  .m-lg-3 {\n    margin: 1rem !important; }\n  .mt-lg-3,\n  .my-lg-3 {\n    margin-top: 1rem !important; }\n  .mr-lg-3,\n  .mx-lg-3 {\n    margin-right: 1rem !important; }\n  .mb-lg-3,\n  .my-lg-3 {\n    margin-bottom: 1rem !important; }\n  .ml-lg-3,\n  .mx-lg-3 {\n    margin-left: 1rem !important; }\n  .m-lg-4 {\n    margin: 1.5rem !important; }\n  .mt-lg-4,\n  .my-lg-4 {\n    margin-top: 1.5rem !important; }\n  .mr-lg-4,\n  .mx-lg-4 {\n    margin-right: 1.5rem !important; }\n  .mb-lg-4,\n  .my-lg-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-lg-4,\n  .mx-lg-4 {\n    margin-left: 1.5rem !important; }\n  .m-lg-5 {\n    margin: 3rem !important; }\n  .mt-lg-5,\n  .my-lg-5 {\n    margin-top: 3rem !important; }\n  .mr-lg-5,\n  .mx-lg-5 {\n    margin-right: 3rem !important; }\n  .mb-lg-5,\n  .my-lg-5 {\n    margin-bottom: 3rem !important; }\n  .ml-lg-5,\n  .mx-lg-5 {\n    margin-left: 3rem !important; }\n  .p-lg-0 {\n    padding: 0 !important; }\n  .pt-lg-0,\n  .py-lg-0 {\n    padding-top: 0 !important; }\n  .pr-lg-0,\n  .px-lg-0 {\n    padding-right: 0 !important; }\n  .pb-lg-0,\n  .py-lg-0 {\n    padding-bottom: 0 !important; }\n  .pl-lg-0,\n  .px-lg-0 {\n    padding-left: 0 !important; }\n  .p-lg-1 {\n    padding: 0.25rem !important; }\n  .pt-lg-1,\n  .py-lg-1 {\n    padding-top: 0.25rem !important; }\n  .pr-lg-1,\n  .px-lg-1 {\n    padding-right: 0.25rem !important; }\n  .pb-lg-1,\n  .py-lg-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-lg-1,\n  .px-lg-1 {\n    padding-left: 0.25rem !important; }\n  .p-lg-2 {\n    padding: 0.5rem !important; }\n  .pt-lg-2,\n  .py-lg-2 {\n    padding-top: 0.5rem !important; }\n  .pr-lg-2,\n  .px-lg-2 {\n    padding-right: 0.5rem !important; }\n  .pb-lg-2,\n  .py-lg-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-lg-2,\n  .px-lg-2 {\n    padding-left: 0.5rem !important; }\n  .p-lg-3 {\n    padding: 1rem !important; }\n  .pt-lg-3,\n  .py-lg-3 {\n    padding-top: 1rem !important; }\n  .pr-lg-3,\n  .px-lg-3 {\n    padding-right: 1rem !important; }\n  .pb-lg-3,\n  .py-lg-3 {\n    padding-bottom: 1rem !important; }\n  .pl-lg-3,\n  .px-lg-3 {\n    padding-left: 1rem !important; }\n  .p-lg-4 {\n    padding: 1.5rem !important; }\n  .pt-lg-4,\n  .py-lg-4 {\n    padding-top: 1.5rem !important; }\n  .pr-lg-4,\n  .px-lg-4 {\n    padding-right: 1.5rem !important; }\n  .pb-lg-4,\n  .py-lg-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-lg-4,\n  .px-lg-4 {\n    padding-left: 1.5rem !important; }\n  .p-lg-5 {\n    padding: 3rem !important; }\n  .pt-lg-5,\n  .py-lg-5 {\n    padding-top: 3rem !important; }\n  .pr-lg-5,\n  .px-lg-5 {\n    padding-right: 3rem !important; }\n  .pb-lg-5,\n  .py-lg-5 {\n    padding-bottom: 3rem !important; }\n  .pl-lg-5,\n  .px-lg-5 {\n    padding-left: 3rem !important; }\n  .m-lg-n1 {\n    margin: -0.25rem !important; }\n  .mt-lg-n1,\n  .my-lg-n1 {\n    margin-top: -0.25rem !important; }\n  .mr-lg-n1,\n  .mx-lg-n1 {\n    margin-right: -0.25rem !important; }\n  .mb-lg-n1,\n  .my-lg-n1 {\n    margin-bottom: -0.25rem !important; }\n  .ml-lg-n1,\n  .mx-lg-n1 {\n    margin-left: -0.25rem !important; }\n  .m-lg-n2 {\n    margin: -0.5rem !important; }\n  .mt-lg-n2,\n  .my-lg-n2 {\n    margin-top: -0.5rem !important; }\n  .mr-lg-n2,\n  .mx-lg-n2 {\n    margin-right: -0.5rem !important; }\n  .mb-lg-n2,\n  .my-lg-n2 {\n    margin-bottom: -0.5rem !important; }\n  .ml-lg-n2,\n  .mx-lg-n2 {\n    margin-left: -0.5rem !important; }\n  .m-lg-n3 {\n    margin: -1rem !important; }\n  .mt-lg-n3,\n  .my-lg-n3 {\n    margin-top: -1rem !important; }\n  .mr-lg-n3,\n  .mx-lg-n3 {\n    margin-right: -1rem !important; }\n  .mb-lg-n3,\n  .my-lg-n3 {\n    margin-bottom: -1rem !important; }\n  .ml-lg-n3,\n  .mx-lg-n3 {\n    margin-left: -1rem !important; }\n  .m-lg-n4 {\n    margin: -1.5rem !important; }\n  .mt-lg-n4,\n  .my-lg-n4 {\n    margin-top: -1.5rem !important; }\n  .mr-lg-n4,\n  .mx-lg-n4 {\n    margin-right: -1.5rem !important; }\n  .mb-lg-n4,\n  .my-lg-n4 {\n    margin-bottom: -1.5rem !important; }\n  .ml-lg-n4,\n  .mx-lg-n4 {\n    margin-left: -1.5rem !important; }\n  .m-lg-n5 {\n    margin: -3rem !important; }\n  .mt-lg-n5,\n  .my-lg-n5 {\n    margin-top: -3rem !important; }\n  .mr-lg-n5,\n  .mx-lg-n5 {\n    margin-right: -3rem !important; }\n  .mb-lg-n5,\n  .my-lg-n5 {\n    margin-bottom: -3rem !important; }\n  .ml-lg-n5,\n  .mx-lg-n5 {\n    margin-left: -3rem !important; }\n  .m-lg-auto {\n    margin: auto !important; }\n  .mt-lg-auto,\n  .my-lg-auto {\n    margin-top: auto !important; }\n  .mr-lg-auto,\n  .mx-lg-auto {\n    margin-right: auto !important; }\n  .mb-lg-auto,\n  .my-lg-auto {\n    margin-bottom: auto !important; }\n  .ml-lg-auto,\n  .mx-lg-auto {\n    margin-left: auto !important; } }\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 !important; }\n  .mt-xl-0,\n  .my-xl-0 {\n    margin-top: 0 !important; }\n  .mr-xl-0,\n  .mx-xl-0 {\n    margin-right: 0 !important; }\n  .mb-xl-0,\n  .my-xl-0 {\n    margin-bottom: 0 !important; }\n  .ml-xl-0,\n  .mx-xl-0 {\n    margin-left: 0 !important; }\n  .m-xl-1 {\n    margin: 0.25rem !important; }\n  .mt-xl-1,\n  .my-xl-1 {\n    margin-top: 0.25rem !important; }\n  .mr-xl-1,\n  .mx-xl-1 {\n    margin-right: 0.25rem !important; }\n  .mb-xl-1,\n  .my-xl-1 {\n    margin-bottom: 0.25rem !important; }\n  .ml-xl-1,\n  .mx-xl-1 {\n    margin-left: 0.25rem !important; }\n  .m-xl-2 {\n    margin: 0.5rem !important; }\n  .mt-xl-2,\n  .my-xl-2 {\n    margin-top: 0.5rem !important; }\n  .mr-xl-2,\n  .mx-xl-2 {\n    margin-right: 0.5rem !important; }\n  .mb-xl-2,\n  .my-xl-2 {\n    margin-bottom: 0.5rem !important; }\n  .ml-xl-2,\n  .mx-xl-2 {\n    margin-left: 0.5rem !important; }\n  .m-xl-3 {\n    margin: 1rem !important; }\n  .mt-xl-3,\n  .my-xl-3 {\n    margin-top: 1rem !important; }\n  .mr-xl-3,\n  .mx-xl-3 {\n    margin-right: 1rem !important; }\n  .mb-xl-3,\n  .my-xl-3 {\n    margin-bottom: 1rem !important; }\n  .ml-xl-3,\n  .mx-xl-3 {\n    margin-left: 1rem !important; }\n  .m-xl-4 {\n    margin: 1.5rem !important; }\n  .mt-xl-4,\n  .my-xl-4 {\n    margin-top: 1.5rem !important; }\n  .mr-xl-4,\n  .mx-xl-4 {\n    margin-right: 1.5rem !important; }\n  .mb-xl-4,\n  .my-xl-4 {\n    margin-bottom: 1.5rem !important; }\n  .ml-xl-4,\n  .mx-xl-4 {\n    margin-left: 1.5rem !important; }\n  .m-xl-5 {\n    margin: 3rem !important; }\n  .mt-xl-5,\n  .my-xl-5 {\n    margin-top: 3rem !important; }\n  .mr-xl-5,\n  .mx-xl-5 {\n    margin-right: 3rem !important; }\n  .mb-xl-5,\n  .my-xl-5 {\n    margin-bottom: 3rem !important; }\n  .ml-xl-5,\n  .mx-xl-5 {\n    margin-left: 3rem !important; }\n  .p-xl-0 {\n    padding: 0 !important; }\n  .pt-xl-0,\n  .py-xl-0 {\n    padding-top: 0 !important; }\n  .pr-xl-0,\n  .px-xl-0 {\n    padding-right: 0 !important; }\n  .pb-xl-0,\n  .py-xl-0 {\n    padding-bottom: 0 !important; }\n  .pl-xl-0,\n  .px-xl-0 {\n    padding-left: 0 !important; }\n  .p-xl-1 {\n    padding: 0.25rem !important; }\n  .pt-xl-1,\n  .py-xl-1 {\n    padding-top: 0.25rem !important; }\n  .pr-xl-1,\n  .px-xl-1 {\n    padding-right: 0.25rem !important; }\n  .pb-xl-1,\n  .py-xl-1 {\n    padding-bottom: 0.25rem !important; }\n  .pl-xl-1,\n  .px-xl-1 {\n    padding-left: 0.25rem !important; }\n  .p-xl-2 {\n    padding: 0.5rem !important; }\n  .pt-xl-2,\n  .py-xl-2 {\n    padding-top: 0.5rem !important; }\n  .pr-xl-2,\n  .px-xl-2 {\n    padding-right: 0.5rem !important; }\n  .pb-xl-2,\n  .py-xl-2 {\n    padding-bottom: 0.5rem !important; }\n  .pl-xl-2,\n  .px-xl-2 {\n    padding-left: 0.5rem !important; }\n  .p-xl-3 {\n    padding: 1rem !important; }\n  .pt-xl-3,\n  .py-xl-3 {\n    padding-top: 1rem !important; }\n  .pr-xl-3,\n  .px-xl-3 {\n    padding-right: 1rem !important; }\n  .pb-xl-3,\n  .py-xl-3 {\n    padding-bottom: 1rem !important; }\n  .pl-xl-3,\n  .px-xl-3 {\n    padding-left: 1rem !important; }\n  .p-xl-4 {\n    padding: 1.5rem !important; }\n  .pt-xl-4,\n  .py-xl-4 {\n    padding-top: 1.5rem !important; }\n  .pr-xl-4,\n  .px-xl-4 {\n    padding-right: 1.5rem !important; }\n  .pb-xl-4,\n  .py-xl-4 {\n    padding-bottom: 1.5rem !important; }\n  .pl-xl-4,\n  .px-xl-4 {\n    padding-left: 1.5rem !important; }\n  .p-xl-5 {\n    padding: 3rem !important; }\n  .pt-xl-5,\n  .py-xl-5 {\n    padding-top: 3rem !important; }\n  .pr-xl-5,\n  .px-xl-5 {\n    padding-right: 3rem !important; }\n  .pb-xl-5,\n  .py-xl-5 {\n    padding-bottom: 3rem !important; }\n  .pl-xl-5,\n  .px-xl-5 {\n    padding-left: 3rem !important; }\n  .m-xl-n1 {\n    margin: -0.25rem !important; }\n  .mt-xl-n1,\n  .my-xl-n1 {\n    margin-top: -0.25rem !important; }\n  .mr-xl-n1,\n  .mx-xl-n1 {\n    margin-right: -0.25rem !important; }\n  .mb-xl-n1,\n  .my-xl-n1 {\n    margin-bottom: -0.25rem !important; }\n  .ml-xl-n1,\n  .mx-xl-n1 {\n    margin-left: -0.25rem !important; }\n  .m-xl-n2 {\n    margin: -0.5rem !important; }\n  .mt-xl-n2,\n  .my-xl-n2 {\n    margin-top: -0.5rem !important; }\n  .mr-xl-n2,\n  .mx-xl-n2 {\n    margin-right: -0.5rem !important; }\n  .mb-xl-n2,\n  .my-xl-n2 {\n    margin-bottom: -0.5rem !important; }\n  .ml-xl-n2,\n  .mx-xl-n2 {\n    margin-left: -0.5rem !important; }\n  .m-xl-n3 {\n    margin: -1rem !important; }\n  .mt-xl-n3,\n  .my-xl-n3 {\n    margin-top: -1rem !important; }\n  .mr-xl-n3,\n  .mx-xl-n3 {\n    margin-right: -1rem !important; }\n  .mb-xl-n3,\n  .my-xl-n3 {\n    margin-bottom: -1rem !important; }\n  .ml-xl-n3,\n  .mx-xl-n3 {\n    margin-left: -1rem !important; }\n  .m-xl-n4 {\n    margin: -1.5rem !important; }\n  .mt-xl-n4,\n  .my-xl-n4 {\n    margin-top: -1.5rem !important; }\n  .mr-xl-n4,\n  .mx-xl-n4 {\n    margin-right: -1.5rem !important; }\n  .mb-xl-n4,\n  .my-xl-n4 {\n    margin-bottom: -1.5rem !important; }\n  .ml-xl-n4,\n  .mx-xl-n4 {\n    margin-left: -1.5rem !important; }\n  .m-xl-n5 {\n    margin: -3rem !important; }\n  .mt-xl-n5,\n  .my-xl-n5 {\n    margin-top: -3rem !important; }\n  .mr-xl-n5,\n  .mx-xl-n5 {\n    margin-right: -3rem !important; }\n  .mb-xl-n5,\n  .my-xl-n5 {\n    margin-bottom: -3rem !important; }\n  .ml-xl-n5,\n  .mx-xl-n5 {\n    margin-left: -3rem !important; }\n  .m-xl-auto {\n    margin: auto !important; }\n  .mt-xl-auto,\n  .my-xl-auto {\n    margin-top: auto !important; }\n  .mr-xl-auto,\n  .mx-xl-auto {\n    margin-right: auto !important; }\n  .mb-xl-auto,\n  .my-xl-auto {\n    margin-bottom: auto !important; }\n  .ml-xl-auto,\n  .mx-xl-auto {\n    margin-left: auto !important; } }\n\n.text-monospace {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace !important; }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-wrap {\n  white-space: normal !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-left {\n  text-align: left !important; }\n\n.text-right {\n  text-align: right !important; }\n\n.text-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-light {\n  font-weight: 300 !important; }\n\n.font-weight-lighter {\n  font-weight: lighter !important; }\n\n.font-weight-normal {\n  font-weight: 400 !important; }\n\n.font-weight-bold {\n  font-weight: 700 !important; }\n\n.font-weight-bolder {\n  font-weight: bolder !important; }\n\n.font-italic {\n  font-style: italic !important; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-primary {\n  color: #007bff !important; }\n\na.text-primary:hover, a.text-primary:focus {\n  color: #0056b3 !important; }\n\n.text-secondary {\n  color: #6c757d !important; }\n\na.text-secondary:hover, a.text-secondary:focus {\n  color: #494f54 !important; }\n\n.text-success {\n  color: #28a745 !important; }\n\na.text-success:hover, a.text-success:focus {\n  color: #19692c !important; }\n\n.text-info {\n  color: #17a2b8 !important; }\n\na.text-info:hover, a.text-info:focus {\n  color: #0f6674 !important; }\n\n.text-warning {\n  color: #ffc107 !important; }\n\na.text-warning:hover, a.text-warning:focus {\n  color: #ba8b00 !important; }\n\n.text-danger {\n  color: #dc3545 !important; }\n\na.text-danger:hover, a.text-danger:focus {\n  color: #a71d2a !important; }\n\n.text-light {\n  color: #f8f9fa !important; }\n\na.text-light:hover, a.text-light:focus {\n  color: #cbd3da !important; }\n\n.text-dark {\n  color: #343a40 !important; }\n\na.text-dark:hover, a.text-dark:focus {\n  color: #121416 !important; }\n\n.text-body {\n  color: #212529 !important; }\n\n.text-muted {\n  color: #6c757d !important; }\n\n.text-black-50 {\n  color: rgba(0, 0, 0, 0.5) !important; }\n\n.text-white-50 {\n  color: rgba(255, 255, 255, 0.5) !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.text-decoration-none {\n  text-decoration: none !important; }\n\n.text-break {\n  word-break: break-word !important;\n  overflow-wrap: break-word !important; }\n\n.text-reset {\n  color: inherit !important; }\n\n.visible {\n  visibility: visible !important; }\n\n.invisible {\n  visibility: hidden !important; }\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a:not(.btn) {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #adb5bd;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  @page {\n    size: a3; }\n  body {\n    min-width: 992px !important; }\n  .container {\n    min-width: 992px !important; }\n  .navbar {\n    display: none; }\n  .badge {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #dee2e6 !important; }\n  .table-dark {\n    color: inherit; }\n    .table-dark th,\n    .table-dark td,\n    .table-dark thead th,\n    .table-dark tbody + tbody {\n      border-color: #dee2e6; }\n  .table .thead-dark th {\n    color: inherit;\n    border-color: #dee2e6; } }\n\nhtml, body, #app-main {\n  height: 100%;\n  background-color: #f7f9fc; }\n\n.content {\n  margin-top: 30px; }\n", ""]);


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ 1:
/*!*******************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:9000 (webpack)/hot/dev-server.js ./ClientApp/src/main.ts ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\zzz\Studies\github\Researching\Researching\AspNet_Vue\node_modules\webpack-dev-server\client\index.js?http://localhost:9000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:9000");
__webpack_require__(/*! C:\zzz\Studies\github\Researching\Researching\AspNet_Vue\node_modules\webpack\hot\dev-server.js */"./node_modules/webpack/hot/dev-server.js");
module.exports = __webpack_require__(/*! C:\zzz\Studies\github\Researching\Researching\AspNet_Vue\ClientApp\src\main.ts */"./ClientApp/src/main.ts");


/***/ })

/******/ });
//# sourceMappingURL=main.bf753d05dbe6a4054f09.js.map