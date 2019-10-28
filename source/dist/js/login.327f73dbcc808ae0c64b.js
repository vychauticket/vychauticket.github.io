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
/******/ 	var hotCurrentHash = "327f73dbcc808ae0c64b";
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
/******/ 		"login": 0
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
/******/ 	deferredModules.push([2,"common","vendors","vue"]);
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

/***/ "./ClientApp/src/components/home/home.html":
/*!*************************************************!*\
  !*** ./ClientApp/src/components/home/home.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<wa-layout>    \r\n    <template slot=\"content\">\r\n            <div class=\"site-wrap\"  id=\"home-section\">\r\n            <div class=\"site-mobile-menu site-navbar-target\">\r\n                    <div class=\"site-mobile-menu-header\">\r\n                      <div class=\"site-mobile-menu-close mt-3\">\r\n                        <span class=\"icon-close2 js-menu-toggle\"></span>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"site-mobile-menu-body\"></div>\r\n                  </div>\r\n                 \r\n                    \r\n                  <header class=\"site-navbar js-sticky-header site-navbar-target\" role=\"banner\">\r\n              \r\n                    <div class=\"container\">\r\n                      <div class=\"row align-items-center position-relative\">\r\n                        \r\n                          \r\n                          <div class=\"site-logo\">\r\n                            <a href=\"index.html\" class=\"text-black\"><span class=\"text-primary\">Vy Châu</span> Ticket</a>\r\n                          </div>\r\n                          \r\n                          <div class=\"col-12\">\r\n                            <nav class=\"site-navigation text-center \" role=\"navigation\">\r\n              \r\n                              <ul class=\"site-menu main-menu js-clone-nav ml-auto d-none d-lg-block\">\r\n                              <li><a href=\"#home-section\" class=\"nav-link\">Trang chủ</a></li>\r\n                              <li><a href=\"#services-section\" class=\"nav-link\">Dịch vụ</a></li>\r\n                              <li><a href=\"#about-section\" class=\"nav-link\">Giới thiệu</a></li>\r\n                              <li><a href=\"#team-section\" class=\"nav-link\">Booker</a></li>\r\n                              \r\n                              <li><a href=\"#testimonials-section\" class=\"nav-link\">Chứng nhận</a></li>\r\n                              <li><a href=\"#blog-section\" class=\"nav-link\">Blogs</a></li>\r\n                              <li><a href=\"#contact-section\" class=\"nav-link\">Liên hệ</a></li>\r\n                            </ul>\r\n                            </nav>\r\n                        \r\n                          </div>\r\n              \r\n                        <div class=\"toggle-button d-inline-block d-lg-none\"><a href=\"#\" class=\"site-menu-toggle py-5 js-menu-toggle text-black\"><span class=\"icon-menu h3\"></span></a></div>\r\n              \r\n                      </div>\r\n                    </div>\r\n                    \r\n                  </header>\r\n                  \r\n              \r\n                  <div class=\"site-section-cover img-bg-section\" v-bind:style=\"{backgroundImage: 'url('+ imgBgSection + ')'}\" data-aos=\"fade\">\r\n                    \r\n                    <div class=\"container\">\r\n                      <div class=\"row align-items-center\">\r\n                        <div class=\"col-lg-5\">\r\n              \r\n                          <div class=\"box-shadow-content\">\r\n                            <div class=\"block-heading-1\">\r\n                              <span class=\"d-block mb-3\"  data-aos=\"fade-up\">Welcome To Vy Chau Ticket</span>\r\n                              <h1 class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"100\">Chuyến bay của bạn</h1>\r\n                            </div>\r\n                            \r\n                            <p class=\"mb-4\" data-aos=\"fade-up\" data-aos-delay=\"200\">Các bạn hãy yên tâm và đừng lo lắng gì về chuẩn bị cho thủ tục 1 chuyến bay. Mọi vấn đề đã có chúng tôi.</p>\r\n                            <p data-aos=\"fade-up\" data-aos-delay=\"300\"><a href=\"#contact-section\" class=\"btn btn-primary text-white py-3 px-5\">Liên hệ</a></p>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <!-- <div class=\"img-absolute\">\r\n                      <img src=\"images/person-transparent-2.png\" alt=\"Image\" class=\"img-fluid\">\r\n                    </div> -->\r\n                  </div>\r\n              \r\n              \r\n              \r\n                  <div class=\"site-section block-feature-1-wrap\" id=\"services-section\">\r\n                    <div class=\"container\">\r\n                      <div class=\"row mb-5\">\r\n                        <div class=\"col-12\">\r\n                          <div class=\"block-heading-1\">\r\n                            <span>Các loại dịch vụ</span>\r\n                            <h2>Dịch vụ vé máy bay</h2>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-4 col-md-6 mb-5\" data-aos=\"fade-up\">\r\n                          <div class=\"block-feature-1\">\r\n                            <span class=\"icon\">\r\n                              <span class=\"flaticon-dentist\"></span>\r\n                            </span>\r\n                            <h2 class=\"text-black\">Mua vé tàu</h2>\r\n                            <p>Nếu các bạn cần đi tàu thì chúng tôi hỗ trợ các bạn mua vé tàu và giao vé tận nơi giúp các bạn.</p>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div class=\"col-lg-4 col-md-6 mb-5\" data-aos=\"fade-up\" data-aos-delay=\"100\">\r\n                          <div class=\"block-feature-1\">\r\n                            <span class=\"icon\">\r\n                              <span class=\"flaticon-dental-care\"></span>\r\n                            </span>\r\n                            <h2 class=\"text-black\">Khách sạn</h2>\r\n                            <p>Quý khách cần ở lại qua đêm chúng tôi sẽ tìm khách sạn giúp cho quý khách.</p>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div class=\"col-lg-4 col-md-6 mb-5\" data-aos=\"fade-up\" data-aos-delay=\"200\">\r\n                          <div class=\"block-feature-1\">\r\n                            <span class=\"icon\">\r\n                              <span class=\"flaticon-dental-1\"></span>\r\n                            </span>\r\n                            <h2 class=\"text-black\">Xe đưa rước</h2>\r\n                            <p>Nếu các bạn không quen với giao thông Hồ Chí Minh. Chúng tối sẽ hỗ trợ các bạn.</p>\r\n                          </div>\r\n                        </div>              \r\n                        \r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n              \r\n              \r\n                  <div class=\"site-section gradient-bg-1\" id=\"about-section\">\r\n                    <div class=\"container\">\r\n                      <div class=\"row justify-content-center mb-4 block-img-video-1-wrap\">\r\n                        <div class=\"col-8 mb-5\">\r\n                          <figure class=\"block-img-video-1\" data-aos=\"fade\">\r\n                            <a href=\"https://vimeo.com/45830194\" class=\"popup-vimeo\">\r\n                              <span class=\"icon\"><span class=\"icon-play\"></span></span>\r\n                              <img :src=\"imgVideo\" alt=\"Image\" class=\"img-fluid\">\r\n                            </a>\r\n                          </figure>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-12\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-md-6 mb-4 col-lg-0 col-lg-3\">\r\n                              <div class=\"block-counter-1\">\r\n                                <span class=\"number\"><span data-number=\"8\">0</span>+</span>\r\n                                <span class=\"caption\">Year of Experience</span>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-md-6 mb-4 col-lg-0 col-lg-3\">\r\n                              <div class=\"block-counter-1\">\r\n                                <span class=\"number\"><span data-number=\"15\">0</span>+</span>\r\n                                <span class=\"caption\">Expert Doctors</span>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-md-6 mb-4 col-lg-0 col-lg-3\">\r\n                              <div class=\"block-counter-1\">\r\n                                <span class=\"number\"><span data-number=\"320\">0</span>+</span>\r\n                                <span class=\"caption\">Health Sections</span>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"col-md-6 mb-4 col-lg-0 col-lg-3\">\r\n                              <div class=\"block-counter-1\">\r\n                                <span class=\"number\"><span data-number=\"1500\">0</span>+</span>\r\n                                <span class=\"caption\">Happy Smiles</span>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n              \r\n                  <div class=\"site-section\" id=\"team-section\">\r\n                    <div class=\"container\">\r\n                      <div class=\"row mb-5\">\r\n                        <div class=\"col-12\">\r\n                          <div class=\"block-heading-1\">\r\n                            <span>Expert Booker</span>\r\n                            <h2>Thông tin đội ngũ</h2>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-4 col-md-6 mb-4 mb-lg-0\" data-aos=\"fade-up\">\r\n                          <div class=\"block-team-member-1 text-center rounded\">\r\n                            <figure>\r\n                              <img :src=\"imgDocPerson2\" alt=\"Image\" class=\"img-fluid rounded-circle\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Lê Thị Huyên</h3>\r\n                            <span class=\"d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3\">Booker trưởng</span>\r\n                            <p class=\"px-3 mb-3\">Kinh nghiệm nhiều năm trong ngành booker cho nhiều hãng lớn ở thành phố Hồ Chí Minh</p>\r\n                            <div class=\"block-social-1\">\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-facebook\"></span></a>\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-twitter\"></span></a>\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-instagram\"></span></a>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div class=\"col-lg-4 col-md-6 mb-4 mb-lg-0\" data-aos=\"fade-up\" data-aos-delay=\"100\">\r\n                          <div class=\"block-team-member-1 text-center rounded\">\r\n                            <figure>\r\n                              <img :src=\"imgDocPerson1\" alt=\"Image\" class=\"img-fluid rounded-circle\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Lê Minh Nhật</h3>\r\n                            <span class=\"d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3\">Booker phó</span>\r\n                            <p class=\"px-3 mb-3\">Kinh nghiệm trong lĩnh vực booking vé máy bay, tàu lửa và xe</p>\r\n                            <div class=\"block-social-1\">\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-facebook\"></span></a>\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-twitter\"></span></a>\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-instagram\"></span></a>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div class=\"col-lg-4 col-md-6 mb-4 mb-lg-0\" data-aos=\"fade-up\" data-aos-delay=\"200\">\r\n                          <div class=\"block-team-member-1 text-center rounded\">\r\n                            <figure>\r\n                              <img :src=\"imgDocPerson3\" alt=\"Image\" class=\"img-fluid rounded-circle\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Ricky Fisher</h3>\r\n                            <span class=\"d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3\">Giám đốc</span>\r\n                            <p class=\"px-3 mb-3\">Quản lý và điều hành hệ thống book vé Vy Châu</p>\r\n                            <div class=\"block-social-1\">\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-facebook\"></span></a>\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-twitter\"></span></a>\r\n                              <a href=\"#\" class=\"btn border-w-2 rounded primary-primary-outline--hover\"><span class=\"icon-instagram\"></span></a>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n              \r\n                  <div class=\"site-section bg-light block-13\" id=\"testimonials-section\" data-aos=\"fade\">\r\n                    <div class=\"container\">\r\n                      \r\n                      <div class=\"text-center mb-5\">\r\n                        <div class=\"block-heading-1\">\r\n                          <span>Khách hàng thân thiết</span>\r\n                          <h2>Nhận xét của họ</h2>\r\n                        </div>\r\n                      </div>\r\n              \r\n                      <div class=\"owl-carousel nonloop-block-13\">\r\n                        <div>\r\n                          <div class=\"block-testimony-1 text-center\">\r\n                            \r\n                            <blockquote class=\"mb-4\">\r\n                              <p>&ldquo;Vy Châu là đại lý vé máy bay đáng tin cậy. Nhờ họ mà tôi chưa bao giờ lo lắng về thủ tục&rdquo;</p>\r\n                            </blockquote>\r\n              \r\n                            <figure>\r\n                              <img :src=\"imgPerson4\" alt=\"Image\" class=\"img-fluid rounded-circle mx-auto\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Ricky Fisher</h3>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div>\r\n                          <div class=\"block-testimony-1 text-center\">\r\n                            <blockquote class=\"mb-4\">\r\n                              <p>&ldquo;Tôi là khách hàng lần đầu tiên đi máy bay. Và khi tìm đến với Vy Châu tôi chỉ biết lên máy bay và xuống máy bay.&rdquo;</p>\r\n                            </blockquote>\r\n              \r\n                            <figure>\r\n                              <img :src=\"imgPerson2\" alt=\"Image\" class=\"img-fluid rounded-circle mx-auto\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Ken Davis</h3>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div>\r\n                          <div class=\"block-testimony-1 text-center\">\r\n                            <blockquote class=\"mb-4\">\r\n                              <p>&ldquo;Tôi cảm thấy hài lòng về dịch vụ của Vy Châu&rdquo;</p>\r\n                            </blockquote>\r\n              \r\n                            <figure>\r\n                              <img :src=\"imgPerson1\" alt=\"Image\" class=\"img-fluid rounded-circle mx-auto\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Mellisa Griffin</h3>\r\n                          </div>\r\n                        </div>\r\n              \r\n                        <div>\r\n                          <div class=\"block-testimony-1 text-center\">\r\n                            <blockquote class=\"mb-4\">\r\n                              <p>&ldquo;Tôi là khách hàng ở tỉnh và không rành về thủ tục đến sân bay. Nhờ có Vy Châu tôi đã an tâm và học thêm dược kiến thức về hành trình bay. Tôi thật sự biết ơn Vy Châu.&rdquo;</p>\r\n                            </blockquote>\r\n              \r\n                            <figure>\r\n                              <img :src=\"imgPerson3\" alt=\"Image\" class=\"img-fluid rounded-circle mx-auto\">\r\n                            </figure>\r\n                            <h3 class=\"font-size-20 text-black\">Robert Steward</h3>\r\n                          </div>\r\n                        </div>\r\n              \r\n              \r\n                      </div>\r\n              \r\n                    </div>\r\n                  </div>\r\n              \r\n                  <div class=\"site-section\" id=\"blog-section\">\r\n                    <div class=\"container\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-12 text-center mb-5\">\r\n                          <div class=\"block-heading-1\">\r\n                            <span>Bài viết mới nhất</span>\r\n                            <h2>Blogs</h2>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-6\">\r\n                          <div>\r\n                            <a href=\"single.html\" class=\"mb-4 d-block\"><img :src=\"imgVideo\" alt=\"Image\" class=\"img-fluid rounded\"></a>\r\n                            <h2><a href=\"single.html\">Every Smile Is Precious</a></h2>\r\n                            <p class=\"text-muted mb-3 text-uppercase small\"><span class=\"mr-2\">January 18, 2019</span> By <a href=\"single.html\" class=\"by\">James Cooper</a></p>\r\n                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat et suscipit iste libero neque. Vitae quidem ducimus voluptatibus nemo cum odio ab enim nisi, itaque, libero fuga veritatis culpa quis!</p>\r\n                            <p><a href=\"single.html\">Read More</a></p>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-lg-6\">\r\n                          <div class=\"post-entry mb-4\">\r\n                            <h2><a href=\"single.html\">Consectetur adipisicing elit veritatis culpa</a></h2>\r\n                            <p class=\"text-muted text-uppercase small\"><span class=\"mr-2\">January 18, 2019</span> by <a href=\"single.html\" class=\"by\">James Cooper</a></p>\r\n                          </div>              \r\n                          \r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n              \r\n              \r\n                  <div class=\"site-section bg-light\" id=\"contact-section\">\r\n                    <div class=\"container\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-12 text-center mb-5\">\r\n                          <div class=\"block-heading-1\">\r\n                            <span>Liên hệ</span>\r\n                            <h2>Thông tin liên hệ</h2>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-6 mb-5\">\r\n                          <form action=\"#\" method=\"post\">\r\n                            <div class=\"form-group row\">\r\n                              <div class=\"col-md-6 mb-4 mb-lg-0\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Tên\">\r\n                              </div>\r\n                              <div class=\"col-md-6\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Họ\">\r\n                              </div>\r\n                            </div>\r\n              \r\n                            <div class=\"form-group row\">\r\n                              <div class=\"col-md-12\">\r\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Email\">\r\n                              </div>\r\n                            </div>\r\n              \r\n                            <div class=\"form-group row\">\r\n                              <div class=\"col-md-12\">\r\n                                <textarea name=\"\" id=\"\" class=\"form-control\" placeholder=\"Nội dung cần liên hệ\" cols=\"30\" rows=\"10\"></textarea>\r\n                              </div>\r\n                            </div>\r\n                            <div class=\"form-group row\">\r\n                              <div class=\"col-md-6 ml-auto\">\r\n                                <input type=\"submit\" class=\"btn btn-block btn-primary text-white py-3 px-5\" value=\"Gửi\">\r\n                              </div>\r\n                            </div>\r\n                          </form>\r\n                        </div>\r\n                        <div class=\"col-lg-4 ml-auto\">\r\n                          <h2 class=\"text-black\">Cần gọi ngay?</h2>\r\n                          <p>Nếu các bạn cần liên hệ ngày có thể gọi vào số máy <a href=\"#\">0982-880-258</a> để gặp người tiếp nhận thông tin của chúng tôi.</p>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n              \r\n              \r\n                  <footer class=\"site-footer\">\r\n                    <div class=\"container\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-md-6\">\r\n                          <div class=\"row\">\r\n                            <div class=\"col-md-5\">\r\n                              <h2 class=\"footer-heading mb-4\">Về chúng tôi</h2>\r\n                              <p>Chúng tôi là đội ngũ những người muốn mang lại sự trung thực và thuận lợi cho khách hàng. Chúng tôi muốn mọi người không phải có nhiều nghi ngờ về dịch vụ mà mình đang sử dụng</p>\r\n                            </div>\r\n                            <div class=\"col-md-3 ml-auto\">\r\n                              <h2 class=\"footer-heading mb-4\">Chi tiết</h2>\r\n                              <ul class=\"list-unstyled\">\r\n                                <li><a href=\"#about-section\">Về chúng tôi</a></li>\r\n                                <li><a href=\"#services-section\">Dịch vụ</a></li>\r\n                                <li><a href=\"#testimonials-section\">Khách hàng nói</a></li>\r\n                                <li><a href=\"#contact-section\">Liên hệ chúng tôi</a></li>\r\n                              </ul>\r\n                            </div>\r\n                            <!-- <div class=\"col-md-3\">\r\n                              \r\n                            </div> -->\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"col-md-4 ml-auto\">\r\n              \r\n                          <div class=\"mb-5\">\r\n                            <h2 class=\"footer-heading mb-4\">Nhận tin mới</h2>\r\n                            <form action=\"#\" method=\"post\">\r\n                              <div class=\"input-group mb-3\">\r\n                                <input type=\"text\" class=\"form-control border-secondary text-white bg-transparent\" placeholder=\"Nhập Email\" aria-label=\"Nhập Email\" aria-describedby=\"button-addon2\">\r\n                                <div class=\"input-group-append\">\r\n                                  <button class=\"btn btn-primary text-white\" type=\"button\" id=\"button-addon2\">Subscribe</button>\r\n                                </div>\r\n                              </div>\r\n                            </form>\r\n              \r\n              \r\n                            <h2 class=\"footer-heading mb-4\">Theo dõi chúng tôi</h2>\r\n                              <a href=\"#about-section\" class=\"smoothscroll pl-0 pr-3\"><span class=\"icon-facebook\"></span></a>\r\n                              <a href=\"#\" class=\"pl-3 pr-3\"><span class=\"icon-twitter\"></span></a>\r\n                              <a href=\"#\" class=\"pl-3 pr-3\"><span class=\"icon-instagram\"></span></a>\r\n                              <a href=\"#\" class=\"pl-3 pr-3\"><span class=\"icon-linkedin\"></span></a>\r\n                        </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row pt-5 mt-5 text-center\">\r\n                        <div class=\"col-md-12\">\r\n                          <div class=\"border-top pt-5\">\r\n                          <p>\r\n                          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->\r\n                          <!-- Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class=\"icon-heart\" aria-hidden=\"true\"></i> by <a href=\"https://colorlib.com\" target=\"_blank\" >Colorlib</a> -->\r\n                          <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->\r\n                          </p>\r\n                          </div>\r\n                        </div>\r\n                        \r\n                      </div>\r\n                    </div>\r\n                  </footer>\r\n              \r\n                </div>\r\n    </template>\r\n\r\n    <template slot=\"popup\">\r\n        \r\n    </template>\r\n</wa-layout>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/home/home.scss":
/*!*************************************************!*\
  !*** ./ClientApp/src/components/home/home.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/home.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/home.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/home.scss");

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

/***/ "./ClientApp/src/components/home/home.ts":
/*!***********************************************!*\
  !*** ./ClientApp/src/components/home/home.ts ***!
  \***********************************************/
/*! exports provided: eventBus, HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return eventBus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/popup/popup */ "./ClientApp/src/components/common/popup/popup.ts");
/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/scss/bootstrap.scss */ "./node_modules/bootstrap/scss/bootstrap.scss");
/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home.scss */ "./ClientApp/src/components/home/home.scss");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_home_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @progress/kendo-theme-default/scss/all.scss */ "./node_modules/@progress/kendo-theme-default/scss/all.scss");
/* harmony import */ var _progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @progress/kendo-grid-vue-wrapper */ "./node_modules/@progress/kendo-grid-vue-wrapper/dist/es/index.js");
/* harmony import */ var _progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mainpage_condition__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mainpage_condition */ "./ClientApp/src/components/home/mainpage_condition/index.ts");
/* harmony import */ var bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bootstrap-vue/esm/directives/modal/modal */ "./node_modules/bootstrap-vue/esm/directives/modal/modal.js");
/* harmony import */ var _row_item_template_row__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./row_item_template/row */ "./ClientApp/src/components/home/row_item_template/row.ts");
/* harmony import */ var _progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @progress/kendo-datasource-vue-wrapper */ "./node_modules/@progress/kendo-datasource-vue-wrapper/dist/es/index.js");
/* harmony import */ var _progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _util_validators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/validators */ "./ClientApp/src/util/validators.ts");
/* harmony import */ var _store_root_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../store/root-module */ "./ClientApp/src/store/root-module.ts");
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






__webpack_require__(/*! @progress/kendo-ui */ "./node_modules/@progress/kendo-ui/js/kendo.all.js");



vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(_progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__["GridInstaller"]);

vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].directive("b-modal", bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_9__["default"]);




var eventBus = new vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]();
var IMG_BGSECTION = "./assets/images/person-transparent-2.png";
var IMG_VIDEO = "./assets/images/img-video-1.jpg";
var IMG_DOCPERSON2 = "./assets/images/doc_person_2.jpg";
var IMG_DOCPERSON1 = "./assets/images/doc_person_1.jpg";
var IMG_DOCPERSON3 = "./assets/images/doc_person_3.jpg";
var IMG_PERSON2 = "./assets/images/person_2.jpg";
var IMG_PERSON1 = "./assets/images/person_1.jpg";
var IMG_PERSON3 = "./assets/images/person_3.jpg";
var IMG_PERSON4 = "./assets/images/person_4.jpg";
vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(_progress_kendo_datasource_vue_wrapper__WEBPACK_IMPORTED_MODULE_11__["DataSourceInstaller"]);
var HomeComponent = /** @class */ (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent() {
        var _this = _super.call(this) || this;
        _this.package = "vue-webpack-typescript";
        _this.repo = "https://github.com/ducksoupdev/vue-webpack-typescript";
        _this.mode = "development";
        _this.showDuplicate = false;
        _this.showDuplicateWarning = false;
        _this.showDelete = false;
        _this.localDataSource = [];
        _this.localDataSourceFilter = [];
        _this.quickFilter = -1;
        _this.idProcess = 0;
        _this.processName = "";
        _this.processClient = "";
        _this.processClientCode = "";
        _this.processModule = "";
        _this.processAlertType = "";
        _this.processActivated = "";
        _this.popTitle = "";
        _this.dupProcessName = "";
        _this.isExplored = false;
        _this.customWidth = 330;
        _this.pageSize = 20;
        _this.existProcess = false;
        _this.initialImage();
        _this.rowItemTemplate = function (e) { return _this.generateRowItemTemplate(e); };
        return _this;
    }
    Object.defineProperty(HomeComponent.prototype, "getArrClient", {
        get: function () {
            return _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].arrClients;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowNavBar(true);
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.refreshData = function (isOnClickRefesh) {
        if (isOnClickRefesh === void 0) { isOnClickRefesh = true; }
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(true);
                        return [4 /*yield*/, that.getData().then(function (response) {
                                that.localDataSource = response.data.GridTable;
                                that.localDataSourceFilter = that.localDataSource;
                                if (isOnClickRefesh == true) {
                                    that.sortby(that.quickFilter);
                                }
                                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                            }).catch(function (reason) {
                                console.log(reason);
                                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.initialImage = function () {
        this.imgBgSection = IMG_BGSECTION;
        this.imgVideo = IMG_VIDEO;
        this.imgDocPerson2 = IMG_DOCPERSON2;
        this.imgDocPerson1 = IMG_DOCPERSON1;
        this.imgDocPerson3 = IMG_DOCPERSON3;
        this.imgPerson2 = IMG_PERSON2;
        this.imgPerson1 = IMG_PERSON1;
        this.imgPerson3 = IMG_PERSON3;
        this.imgPerson4 = IMG_PERSON4;
    };
    HomeComponent.prototype.generateRowItemTemplate = function (e) {
        return {
            template: vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].component(_row_item_template_row__WEBPACK_IMPORTED_MODULE_10__["RowItemTemplate"].name, _row_item_template_row__WEBPACK_IMPORTED_MODULE_10__["RowItemTemplate"]),
            templateArgs: Object.assign({
                showDuplicate: this.showDuplicate,
                showDuplicateWarning: this.showDuplicateWarning,
                showDelete: this.showDelete,
                isExplored: this.isExplored,
                grid: this.$refs.grid,
            }, e)
        };
    };
    HomeComponent.prototype.created = function () {
        var _this = this;
        eventBus.$on("showDuplicateModal", function (_idProcess, _showDuplicate, _processName, _processClientCode, _processModule, _processAlertType, _processActivated) {
            _this.assignValueFromEvent(_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated);
            _this.popTitle = "Duplicate process: " + _processName;
            _this.dupProcessName = _processName + "- Copy";
            _this.showDuplicate = _showDuplicate;
        });
        eventBus.$on("showDeleteModal", function (_idProcess, _showDelete, _processName, _processClientCode, _processModule, _processAlertType, _processActivated) {
            _this.assignValueFromEvent(_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated);
            _this.popTitle = "Delete process: " + _processName;
            _this.showDelete = _showDelete;
        });
        eventBus.$on("refreshData", function () {
            _this.refreshData();
        });
        eventBus.$on("onClickView", function (id) {
            _this.$router.push({ name: "CreateTriggeredId", params: { id: String(id) } });
        });
    };
    HomeComponent.prototype.assignValueFromEvent = function (_idProcess, _processName, _processClientCode, _processModule, _processAlertType, _processActivated) {
        this.idProcess = _idProcess;
        this.processName = _processName;
        this.processClientCode = _processClientCode;
        this.processModule = _processModule;
        this.processAlertType = _processAlertType;
        this.processActivated = _processActivated;
    };
    HomeComponent.prototype.resultDuplicate = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        if (!value) return [3 /*break*/, 2];
                        return [4 /*yield*/, Object(_util_validators__WEBPACK_IMPORTED_MODULE_12__["isProcessExist"])(this.dupProcessName).then(function (result) {
                                that.existProcess = result;
                            })];
                    case 1:
                        _a.sent();
                        if (!this.existProcess) {
                            this.showDuplicateWarning = true;
                            this.showDuplicate = false;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.showDuplicate = false;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.resultDuplicateWarning = function (value) {
        var _this = this;
        _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(value);
        var self = this;
        self.showDuplicateWarning = false;
        if (value) {
            axios__WEBPACK_IMPORTED_MODULE_5___default.a.post("/ClientAlerting/MainPage/DuplicateProcess", {
                alert: {
                    Id: this.idProcess,
                    Name: this.dupProcessName,
                    Transac: this.processClientCode
                }
            }).then(function (response) {
                if (response.data.result === "OK") {
                    _this.refreshData();
                }
                else {
                    _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                }
            }).catch(function (error) {
                console.log("Unknow error play/pause process!");
                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
            });
        }
    };
    HomeComponent.prototype.resultDelete = function (value) {
        var _this = this;
        _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(value);
        var self = this;
        self.showDelete = false;
        if (value) {
            axios__WEBPACK_IMPORTED_MODULE_5___default.a.post("/ClientAlerting/MainPage/DeleteProcess", {
                alert: {
                    Id: this.idProcess
                }
            }).then(function (response) {
                if (response.data.result === "OK") {
                    _this.refreshData();
                }
                else {
                    _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
                }
            }).catch(function (error) {
                console.log("Error: " + error);
                _store_root_module__WEBPACK_IMPORTED_MODULE_13__["Root"].fetchShowLoading(false);
            });
        }
    };
    HomeComponent.prototype.sortby = function (sorttype) {
        this.quickFilter = sorttype;
        switch (sorttype) {
            case 1: {
                this.localDataSourceFilter = this.localDataSource;
                break;
            }
            case 2: {
                this.localDataSourceFilter = this.localDataSource.filter(function (f) { return f.Alert.AlertType.Label.toLowerCase().indexOf("triggered") >= 0; });
                break;
            }
            case 3: {
                this.localDataSourceFilter = this.localDataSource.filter(function (f) { return f.Alert.AlertType.Label.toLowerCase().indexOf("scheduled") >= 0; });
                break;
            }
        }
    };
    HomeComponent.prototype.refresh_click = function () {
        this.refreshData();
    };
    HomeComponent.prototype.explore_click = function (isExplore) {
        this.isExplored = isExplore;
        if (isExplore) {
            this.customWidth = 200;
        }
        else {
            this.customWidth = 330;
        }
    };
    HomeComponent.prototype.createprocess_click = function () {
        this.$router.push({ name: "CreateTriggeredId", params: { id: "-1" } });
    };
    HomeComponent.prototype.txtSearch_input = function (term) {
        this.localDataSourceFilter = this.localDataSource
            .filter(function (item) { return item.Alert.Name
            .concat(item[" "])
            .concat(item.ClientName)
            .concat(item[" "])
            .concat(item.Alert.ModuleType.Label)
            .concat(item[" "])
            .concat(item.Alert.AlertType.Label)
            .concat(item[" "])
            .concat(item.Alert.SQLCreationAuthor)
            .toLowerCase()
            .includes(term.toLowerCase(), 0); });
    };
    HomeComponent.prototype.getData = function () {
        return axios__WEBPACK_IMPORTED_MODULE_5___default.a.get("/ClientAlerting/MainPage/GetAllAlerts");
    };
    HomeComponent.prototype.activeFilterTemplate = function (e) {
        if (e.field == "all") {
            //handle the check-all checkbox template
            return "<div><label><strong><input type=\"checkbox\" />#= all#</strong></label></div>";
        }
        else {
            //handle the other checkboxes
            return "<div>\n                        <span>\n                            <label>\n                                <input type=\"checkbox\" name=\"\" + e.field + \"\" value=\"#=Activated#\"/>\n                                <span>#= Activated #</span>\n                            </label>\n                        </span>\n                    </div>";
        }
    };
    HomeComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./home.html */ "./ClientApp/src/components/home/home.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_1__["LayoutComponent"],
                "mpCondition": _mainpage_condition__WEBPACK_IMPORTED_MODULE_8__["MPConditionComponent"],
                "popup": _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__["default"],
                "row-item-template": _row_item_template_row__WEBPACK_IMPORTED_MODULE_10__["RowItemTemplate"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/home/index.ts":
/*!************************************************!*\
  !*** ./ClientApp/src/components/home/index.ts ***!
  \************************************************/
/*! exports provided: eventBus, HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ "./ClientApp/src/components/home/home.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventBus", function() { return _home__WEBPACK_IMPORTED_MODULE_0__["eventBus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _home__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/home/mainpage_condition/index.ts":
/*!*******************************************************************!*\
  !*** ./ClientApp/src/components/home/mainpage_condition/index.ts ***!
  \*******************************************************************/
/*! exports provided: MPConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mp_condition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mp_condition */ "./ClientApp/src/components/home/mainpage_condition/mp_condition.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MPConditionComponent", function() { return _mp_condition__WEBPACK_IMPORTED_MODULE_0__["MPConditionComponent"]; });




/***/ }),

/***/ "./ClientApp/src/components/home/mainpage_condition/mp_condition.html":
/*!****************************************************************************!*\
  !*** ./ClientApp/src/components/home/mainpage_condition/mp_condition.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<b-container fluid class=\"mpcontent pt-3\">\r\n    <b-row>\r\n        <b-col>\r\n            <span id=\"sort-process-all-id\" class=\" sort-process\" v-bind:class=\"{active: sortProcessActive === 1 && !isExplore, explore: isExplore, activeE: sortProcessActive === 1 && isExplore}\" v-on:click=\"sortby\">All</span>\r\n            <span id=\"sort-process-triggered-id\" class=\"sort-process\" v-bind:class=\"{active: sortProcessActive === 2 && !isExplore, explore: isExplore, activeE: sortProcessActive === 2 && isExplore}\" v-on:click=\"sortby\">Triggered</span>\r\n            <span id=\"sort-process-scheduled-id\" class=\"sort-process\" v-bind:class=\"{active: sortProcessActive === 3 && !isExplore, explore: isExplore, activeE: sortProcessActive === 3 && isExplore}\" v-on:click=\"sortby\">Scheduled</span>\r\n\r\n        </b-col>\r\n        <b-col>\r\n            <b-input-group>\r\n                <b-input-group-prepend style=\"align-self: center;\">\r\n                    <span v-on:click=\"refresh_click\" class=\"refresh-button\" v-bind:class=\"{explore: isExplore}\"><i class=\"fas fa-sync-alt\"></i></span>\r\n                </b-input-group-prepend>\r\n                <b-form-input type='text' placeholder=\"Search\" v-model=\"searchContent\" v-on:input=\"txtSearch_input\"></b-form-input>\r\n                <b-input-group-append class=\"ml-2\">\r\n                    <button class=\"btn-explore\" v-bind:class=\"{explore: isExplore}\" v-on:click=\"explore_click\">{{exploreText}}</button>\r\n                    <button class=\"ml-2 btn-new-process\" v-on:click=\"createprocess_click\">+ New process</button>\r\n                </b-input-group-append>\r\n            </b-input-group>\r\n\r\n        </b-col>\r\n    </b-row>\r\n</b-container>\r\n"

/***/ }),

/***/ "./ClientApp/src/components/home/mainpage_condition/mp_condition.scss":
/*!****************************************************************************!*\
  !*** ./ClientApp/src/components/home/mainpage_condition/mp_condition.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mp_condition.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/mainpage_condition/mp_condition.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mp_condition.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/mainpage_condition/mp_condition.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./mp_condition.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/mainpage_condition/mp_condition.scss");

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

/***/ "./ClientApp/src/components/home/mainpage_condition/mp_condition.ts":
/*!**************************************************************************!*\
  !*** ./ClientApp/src/components/home/mainpage_condition/mp_condition.ts ***!
  \**************************************************************************/
/*! exports provided: MPConditionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MPConditionComponent", function() { return MPConditionComponent; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/log */ "./ClientApp/src/util/log.ts");
/* harmony import */ var _mp_condition_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mp_condition.scss */ "./ClientApp/src/components/home/mainpage_condition/mp_condition.scss");
/* harmony import */ var _mp_condition_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mp_condition_scss__WEBPACK_IMPORTED_MODULE_2__);
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



var MPConditionComponent = /** @class */ (function (_super) {
    __extends(MPConditionComponent, _super);
    function MPConditionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.repo = "https://github.com/ducksoupdev/vue-webpack-typescript";
        _this.sortProcessActive = 1;
        _this.searchContent = "";
        _this.emitCount = 1;
        _this.isExplore = false;
        _this.exploreText = "Explore";
        return _this;
    }
    MPConditionComponent.prototype.mounted = function () {
        var _this = this;
        if (!this.logger)
            this.logger = new _util_log__WEBPACK_IMPORTED_MODULE_1__["Logger"]();
        this.$nextTick(function () { return _this.logger.info("about is ready!"); });
    };
    MPConditionComponent.prototype.sortby = function (event) {
        switch (event.currentTarget.id) {
            case "sort-process-all-id": {
                this.sortProcessActive = 1;
                break;
            }
            case "sort-process-triggered-id": {
                this.sortProcessActive = 2;
                break;
            }
            case "sort-process-scheduled-id": {
                this.sortProcessActive = 3;
                break;
            }
        }
        this.$emit("sort-by", this.sortProcessActive);
    };
    MPConditionComponent.prototype.refresh_click = function (event) {
        this.$emit("refresh-click");
    };
    MPConditionComponent.prototype.explore_click = function (event) {
        this.isExplore = !this.isExplore;
        this.exploreText = this.isExplore ? "Back to my processes" : "Explore";
        this.$emit("explore-click", this.isExplore);
    };
    MPConditionComponent.prototype.createprocess_click = function (event) {
        this.$emit("create-process-click");
    };
    MPConditionComponent.prototype.txtSearch_input = function (event) {
        if (this.emitCount === 1) {
            this.$emit("txtsearch-input", this.searchContent);
        }
        else {
            this.emitCount = 1;
        }
    };
    MPConditionComponent = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./mp_condition.html */ "./ClientApp/src/components/home/mainpage_condition/mp_condition.html")
        })
    ], MPConditionComponent);
    return MPConditionComponent;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



/***/ }),

/***/ "./ClientApp/src/components/home/row_item_template/row.html":
/*!******************************************************************!*\
  !*** ./ClientApp/src/components/home/row_item_template/row.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<tr v-on:mouseover=\"mouseOver($event)\" v-on:mouseleave=\"mouseLeave($event)\" style=\"height: 70px\">\r\n    <td hidden>\r\n        <span class=\"id\"> {{ idProcess }} </span>\r\n    </td>\r\n    <td>\r\n        <span class=\"row-template-name\" v-on:click=\"onClickView($event)\"> {{ processName }} </span>\r\n    </td>\r\n    <td>\r\n        <span class=\"client\"> {{ processClient }} </span>\r\n    </td>\r\n    <td>\r\n        <span class=\"module\"> {{ processModuleType }} </span>\r\n    </td>\r\n    <td>\r\n        <span class=\"alert-type\"> {{ processAlertType }} </span>\r\n    </td>\r\n    <td>\r\n        <div class=\"row\">\r\n            <div class=\"col-3\">\r\n                <span class=\"activated\"> {{ processActivated }} </span>\r\n            </div>\r\n\r\n            <div class=\"col-9\" v-show=\"!args.isExplored\">\r\n                <transition name=\"slide\">\r\n\r\n                    <div id=\"command-buttons\" v-show=\"isShowCommandButtons\">\r\n\r\n                        <!-- DUPLICATE Btn -->\r\n                        <b-button ref=\"dupBtn\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  v-on:click=\"onClickShowDuplicate($event)\">\r\n\r\n                            <i class='fas fa-lg fa-copy'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.dupBtn\" title=\"Duplicate\">\r\n                        </b-tooltip>\r\n                        <!-- END -->\r\n                        <!-- ************************************************************* -->\r\n                        <!-- DELETE Btn -->\r\n                        <b-button ref=\"delBtn\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  v-on:click=\"onClickShowDelete($event)\">\r\n                            <i class='fas fa-lg fa-trash-alt'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.delBtn\" title=\"Delete\"></b-tooltip>\r\n                        <!-- END -->\r\n                        <!-- ************************************************************* -->\r\n                        <!-- PAUSE Btn -->\r\n                        <b-button ref=\"pauseBtn\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  type=\"submit\"\r\n                                  v-on:click=\"onClickPause($event)\"\r\n                                  v-show=\"!isShowPauseButton\">\r\n                            <i class='fas fa-lg fa-pause'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.pauseBtn\" title=\"Pause\"></b-tooltip>\r\n                        <!-- END -->\r\n                        <!-- ************************************************************* -->\r\n                        <!-- PLAY Btn -->\r\n                        <b-button ref=\"playBtn\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  v-on:click=\"onClickPlay($event)\"\r\n                                  v-show=\"isShowPauseButton\">\r\n                            <i class='fas fa-lg fa-play'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.playBtn\" title=\"Resume\"></b-tooltip>\r\n                        <!-- END -->\r\n                        <!-- ************************************************************* -->\r\n                        <!-- VIEW Btn -->\r\n                        <b-button ref=\"viewBtn\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  v-on:click=\"onClickView($event)\">\r\n                            <i class='fas fa-lg fa-eye'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.viewBtn\" title=\"View\"></b-tooltip>\r\n                        <!-- END -->\r\n\r\n                    </div>\r\n\r\n                </transition>\r\n            </div>\r\n        </div>\r\n    </td>\r\n    <td v-show=\"args.isExplored\">\r\n        <div class=\"row\">\r\n            <div class=\"col-7\">\r\n                <span class=\"alert-type\"> {{ processCreatedBy }} </span>\r\n            </div>\r\n\r\n            <div class=\"col-5\">\r\n                <transition name=\"slide\">\r\n\r\n                    <div id=\"command-buttons-is-explored\" v-show=\"isShowCommandButtons\">\r\n\r\n                        <!-- DUPLICATE Btn -->\r\n                        <b-button ref=\"dupBtnExplored\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  v-on:click=\"onClickShowDuplicate($event)\">\r\n\r\n                            <i class='fas fa-lg fa-copy'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.dupBtnExplored\" title=\"Duplicate\">\r\n                        </b-tooltip>\r\n                        <!-- END -->\r\n                        <!-- ************************************************************* -->\r\n                        <!-- VIEW Btn -->\r\n                        <b-button ref=\"viewBtnExplored\"\r\n                                  class='k-button k-button-icontext k-grid-edit'\r\n                                  v-on:click=\"onClickView($event)\">\r\n                            <i class='fas fa-lg fa-eye'></i>\r\n                        </b-button>\r\n                        <b-tooltip :target=\"() => $refs.viewBtnExplored\" title=\"View\"></b-tooltip>\r\n                        <!-- END -->\r\n\r\n                    </div>\r\n\r\n                </transition>\r\n            </div>\r\n        </div>\r\n    </td>\r\n</tr>"

/***/ }),

/***/ "./ClientApp/src/components/home/row_item_template/row.ts":
/*!****************************************************************!*\
  !*** ./ClientApp/src/components/home/row_item_template/row.ts ***!
  \****************************************************************/
/*! exports provided: RowItemTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowItemTemplate", function() { return RowItemTemplate; });
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-property-decorator */ "./node_modules/vue-property-decorator/lib/vue-property-decorator.umd.js");
/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../layout */ "./ClientApp/src/components/layout/index.ts");
/* harmony import */ var _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/popup/popup */ "./ClientApp/src/components/common/popup/popup.ts");
/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/scss/bootstrap.scss */ "./node_modules/bootstrap/scss/bootstrap.scss");
/* harmony import */ var bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_scss_bootstrap_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _home_home_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../home/home.scss */ "./ClientApp/src/components/home/home.scss");
/* harmony import */ var _home_home_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_home_home_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @progress/kendo-theme-default/scss/all.scss */ "./node_modules/@progress/kendo-theme-default/scss/all.scss");
/* harmony import */ var _progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_theme_default_scss_all_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @progress/kendo-grid-vue-wrapper */ "./node_modules/@progress/kendo-grid-vue-wrapper/dist/es/index.js");
/* harmony import */ var _progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap-vue/esm/directives/modal/modal */ "./node_modules/bootstrap-vue/esm/directives/modal/modal.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../home */ "./ClientApp/src/components/home/home.ts");
/* harmony import */ var _config_helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../config/helpers */ "./ClientApp/config/helpers.js");
/* harmony import */ var _config_helpers__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_config_helpers__WEBPACK_IMPORTED_MODULE_10__);
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






__webpack_require__(/*! @progress/kendo-ui */ "./node_modules/@progress/kendo-ui/js/kendo.all.js");


vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].use(_progress_kendo_grid_vue_wrapper__WEBPACK_IMPORTED_MODULE_7__["GridInstaller"]);

vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"].directive("b-modal", bootstrap_vue_esm_directives_modal_modal__WEBPACK_IMPORTED_MODULE_8__["default"]);


var RowItemTemplate = /** @class */ (function (_super) {
    __extends(RowItemTemplate, _super);
    function RowItemTemplate() {
        var _this = _super.call(this) || this;
        _this.args = {};
        _this.name = "rowItemTemplate";
        _this.isShowCommandButtons = false;
        _this.isShowPauseButton = false;
        _this.idProcess = 0;
        _this.processName = "";
        _this.processClient = "";
        _this.processClientCode = "";
        _this.processModuleType = "";
        _this.processAlertType = "";
        _this.processActivated = "";
        _this.processCreatedBy = "";
        _this.quickAccessLink = "";
        return _this;
    }
    RowItemTemplate.prototype.mounted = function () {
        var _this = this;
        this.$nextTick(function () {
            _this.args = _this.$data.templateArgs;
            _this.getDataFormTempArg();
            if (_this.args.Alert.IsPaused == true) {
                _this.isShowPauseButton = true;
            }
        });
    };
    RowItemTemplate.prototype.mouseOver = function (e) {
        this.isShowCommandButtons = true;
    };
    RowItemTemplate.prototype.mouseLeave = function (e) {
        this.isShowCommandButtons = false;
    };
    RowItemTemplate.prototype.onClickShowDuplicate = function (e) {
        this.args.showDuplicate = true;
        _home__WEBPACK_IMPORTED_MODULE_9__["eventBus"].$emit("showDuplicateModal", this.idProcess, this.args.showDuplicate, this.processName, this.processClientCode, this.processModuleType, this.processAlertType, this.processActivated);
    };
    RowItemTemplate.prototype.onClickShowDelete = function (e) {
        this.args.showDelete = true;
        _home__WEBPACK_IMPORTED_MODULE_9__["eventBus"].$emit("showDeleteModal", this.idProcess, this.args.showDelete, this.processName, this.processClientCode, this.processModuleType, this.processAlertType, this.processActivated);
    };
    RowItemTemplate.prototype.onClickPause = function (e) {
        var self = this;
        axios__WEBPACK_IMPORTED_MODULE_5___default.a.post("/ClientAlerting/MainPage/ChangeActiveStatusOfProcess", {
            alert: {
                Id: self.idProcess,
                IsPaused: true
            }
        }).then(function (response) {
            if (response.data.result === "OK") {
                self.isShowPauseButton = true;
                _home__WEBPACK_IMPORTED_MODULE_9__["eventBus"].$emit("refreshData");
            }
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    };
    RowItemTemplate.prototype.onClickPlay = function (e) {
        var self = this;
        axios__WEBPACK_IMPORTED_MODULE_5___default.a.post("/ClientAlerting/MainPage/ChangeActiveStatusOfProcess", {
            alert: {
                Id: self.idProcess,
                IsPaused: false
            }
        }).then(function (response) {
            if (response.data.result === "OK") {
                self.isShowPauseButton = false;
                _home__WEBPACK_IMPORTED_MODULE_9__["eventBus"].$emit("refreshData");
            }
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    };
    RowItemTemplate.prototype.onClickView = function (e) {
        var processId = this.args.Alert.Id;
        _home__WEBPACK_IMPORTED_MODULE_9__["eventBus"].$emit("onClickView", processId);
    };
    RowItemTemplate.prototype.getDataFormTempArg = function () {
        this.idProcess = this.args.Alert.Id;
        this.processName = this.args.Alert.Name;
        this.processClient = this.args.ClientName;
        this.processClientCode = this.args.Alert.Transac;
        this.processModuleType = this.args.Alert.ModuleType.Label;
        this.processAlertType = this.args.Alert.AlertType.Label;
        this.processActivated = this.args.Activated;
        this.processCreatedBy = this.args.Alert.SQLCreationAuthor;
        this.quickAccessLink = Object(_config_helpers__WEBPACK_IMPORTED_MODULE_10__["subsite"])("/create-triggered-alert/") + this.args.Alert.Id;
    };
    RowItemTemplate = __decorate([
        Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./row.html */ "./ClientApp/src/components/home/row_item_template/row.html"),
            components: {
                "wa-layout": _layout__WEBPACK_IMPORTED_MODULE_1__["LayoutComponent"],
                "popup": _common_popup_popup__WEBPACK_IMPORTED_MODULE_2__["default"]
            }
        }),
        __metadata("design:paramtypes", [])
    ], RowItemTemplate);
    return RowItemTemplate;
}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_0__["Vue"]));



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

module.exports = "\r\n<div>\r\n    <!-- <b-row>\r\n        <b-col>\r\n            <div class=\"page-title\">\r\n                <div class=\"page-header\">\r\n                    <slot name=\"header\"></slot>\r\n                </div>\r\n            </div>\r\n        </b-col>\r\n    </b-row> -->\r\n    <b-row class=\"mt-md-1\">\r\n        <b-col>\r\n            <slot name=\"content\"></slot>\r\n        </b-col>\r\n    </b-row>\r\n    <b-row>\r\n        <b-col>\r\n            <slot name=\"popup\"></slot>\r\n        </b-col>\r\n    </b-row>\r\n</div>\r\n\r\n"

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

/***/ "./ClientApp/src/login.ts":
/*!********************************!*\
  !*** ./ClientApp/src/login.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./ClientApp/src/router.ts");
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sass/main.scss */ "./ClientApp/src/sass/main.scss");
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-vue */ "./node_modules/bootstrap-vue/esm/index.js");
/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/login */ "./ClientApp/src/components/login/index.ts");





vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_3__["default"]);
// tslint:disable-next-line:no-unused-expression
var app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
    el: "#app-login",
    router: Object(_router__WEBPACK_IMPORTED_MODULE_1__["createRouterForLogin"])(),
    components: {
        "login": _components_login__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
    }
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
/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/home */ "./ClientApp/src/components/home/index.ts");
/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/login */ "./ClientApp/src/components/login/index.ts");
/* harmony import */ var _components_profile_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/profile/index */ "./ClientApp/src/components/profile/index.ts");
/* harmony import */ var _components_link_account_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/link-account/index */ "./ClientApp/src/components/link-account/index.ts");







vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
var createRoutes = function () { return [
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/"),
        name: "home-page",
        component: _components_home__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"]
    },
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/profile"),
        name: "Profile",
        component: _components_profile_index__WEBPACK_IMPORTED_MODULE_5__["ProfileComponent"]
    },
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/link-account"),
        name: "LinkAccount",
        component: _components_link_account_index__WEBPACK_IMPORTED_MODULE_6__["LinkAccountComponent"]
    },
    // {
    //     path: subsite("/study-page"),
    //     name: "StudyPage",
    //     component: StudyPageComponent
    // },
    {
        path: "*",
        redirect: {
            name: "home-page"
        }
    },
]; };
var createRoutesForLogin = function () { return [
    {
        path: Object(_config_helpers__WEBPACK_IMPORTED_MODULE_2__["subsite"])("/login"),
        component: _components_login__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
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

/***/ "./ClientApp/src/util/log.ts":
/*!***********************************!*\
  !*** ./ClientApp/src/util/log.ts ***!
  \***********************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function (msg) {
        console.info(msg);
    };
    Logger.prototype.warn = function (msg) {
        console.warn(msg);
    };
    Logger.prototype.error = function (msg) {
        console.error(msg);
    };
    return Logger;
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/home.scss":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/home/home.scss ***!
  \*********************************************************************************************************************************************************************************************/
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
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n/* Base */\n.font-size-10 {\n  font-size: 10px; }\n\n.font-size-11 {\n  font-size: 11px; }\n\n.font-size-12 {\n  font-size: 12px; }\n\n.font-size-13 {\n  font-size: 13px; }\n\n.font-size-14 {\n  font-size: 14px; }\n\n.font-size-15 {\n  font-size: 15px; }\n\n.font-size-16 {\n  font-size: 16px; }\n\n.font-size-17 {\n  font-size: 17px; }\n\n.font-size-18 {\n  font-size: 18px; }\n\n.font-size-19 {\n  font-size: 19px; }\n\n.font-size-20 {\n  font-size: 20px; }\n\n.font-size-21 {\n  font-size: 21px; }\n\n.font-size-22 {\n  font-size: 22px; }\n\n.font-size-23 {\n  font-size: 23px; }\n\n.font-size-24 {\n  font-size: 24px; }\n\n.font-size-25 {\n  font-size: 25px; }\n\n.font-size-26 {\n  font-size: 26px; }\n\n.font-size-27 {\n  font-size: 27px; }\n\n.font-size-28 {\n  font-size: 28px; }\n\n.font-size-29 {\n  font-size: 29px; }\n\n.font-size-30 {\n  font-size: 30px; }\n\n.font-gray-1 {\n  color: #f7f7f7; }\n\n.font-gray-2 {\n  color: #e9e9e9; }\n\n.font-gray-3 {\n  color: #d9d9d9; }\n\n.font-gray-4 {\n  color: #c9c9c9; }\n\n.font-gray-5, .block-heading-1 span {\n  color: #b8b8b8; }\n\n.font-gray-6 {\n  color: #a8a8a8; }\n\n.font-gray-7, body {\n  color: #939393; }\n\n.font-gray-8 {\n  color: #7b7b7b; }\n\n.font-gray-9 {\n  color: #636363 #4d4d4d; }\n\n.font-gray-10 {\n  color: #353535; }\n\n.border-gray-1 {\n  border-color: #f7f7f7; }\n\n.border-gray-2 {\n  border-color: #e9e9e9; }\n\n.border-gray-3 {\n  border-color: #d9d9d9; }\n\n.border-gray-4 {\n  border-color: #c9c9c9; }\n\n.border-gray-5 {\n  border-color: #b8b8b8; }\n\n.border-gray-6 {\n  border-color: #a8a8a8; }\n\n.border-gray-7 {\n  border-color: #939393; }\n\n.border-gray-8 {\n  border-color: #7b7b7b; }\n\n.border-gray-9 {\n  border-color: #636363 #4d4d4d; }\n\n.border-gray-10 {\n  border-color: #353535; }\n\n.bg-gray-1 {\n  border-color: #f7f7f7; }\n\n.bg-gray-2 {\n  border-color: #e9e9e9; }\n\n.bg-gray-3 {\n  border-color: #d9d9d9; }\n\n.bg-gray-4 {\n  border-color: #c9c9c9; }\n\n.bg-gray-5 {\n  border-color: #b8b8b8; }\n\n.bg-gray-6 {\n  border-color: #a8a8a8; }\n\n.bg-gray-7 {\n  border-color: #939393; }\n\n.bg-gray-8 {\n  border-color: #7b7b7b; }\n\n.bg-gray-9 {\n  border-color: #636363 #4d4d4d; }\n\n.bg-gray-10 {\n  border-color: #353535; }\n\n.letter-spacing-1 {\n  letter-spacing: 0.1em; }\n\n.letter-spacing-2 {\n  letter-spacing: 0.2em; }\n\n.border-w-1 {\n  border-width: 1px; }\n\n.border-w-2 {\n  border-width: 2px; }\n\n.border-w-3 {\n  border-width: 3px; }\n\n.border-w-4 {\n  border-width: 4px; }\n\n.border-w-5 {\n  border-width: 5px; }\n\n.primary-black--hover {\n  background: #007bff;\n  color: #fff; }\n  .primary-black--hover:hover {\n    background: #000;\n    color: #fff; }\n\n.primary-dark--hover {\n  background: #007bff;\n  color: #fff; }\n  .primary-dark--hover:hover {\n    background: gray;\n    color: #fff; }\n\n.primary-primary-outline--hover {\n  background: #007bff;\n  color: #fff; }\n  .primary-primary-outline--hover:hover {\n    border-color: #007bff;\n    background: transparent; }\n\n.primary-outline-primary--hover {\n  background: transparent;\n  border-color: #007bff; }\n  .primary-outline-primary--hover:hover {\n    color: #fff;\n    background: #007bff; }\n\nbody {\n  line-height: 1.7;\n  font-weight: 400;\n  font-size: 1rem; }\n\n::-moz-selection {\n  background: #000;\n  color: #fff; }\n\n::selection {\n  background: #000;\n  color: #fff; }\n\na {\n  transition: .3s all ease; }\n  a:hover {\n    text-decoration: none; }\n\nh1, h2, h3, h4, h5,\n.h1, .h2, .h3, .h4, .h5 {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; }\n\n.border-2 {\n  border-width: 2px; }\n\n.text-black {\n  color: #000 !important; }\n\n.bg-black {\n  background: #000 !important; }\n\n.color-black-opacity-5 {\n  color: rgba(0, 0, 0, 0.5); }\n\n.color-white-opacity-5 {\n  color: rgba(255, 255, 255, 0.5); }\n\n.site-wrap:before {\n  display: none;\n  transition: .3s all ease-in-out;\n  background: rgba(0, 0, 0, 0.6);\n  content: \"\";\n  position: absolute;\n  z-index: 2000;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0;\n  visibility: hidden; }\n\n.offcanvas-menu .site-wrap {\n  height: 100%;\n  width: 100%;\n  z-index: 2; }\n  .offcanvas-menu .site-wrap:before {\n    opacity: 1;\n    visibility: visible; }\n\n.line-height-1 {\n  line-height: 1 !important; }\n\n.bg-black {\n  background: #000; }\n\n.form-control {\n  height: 55px;\n  background: #fff !important;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; }\n  .form-control:active, .form-control:focus {\n    border-color: #007bff; }\n  .form-control:hover, .form-control:active, .form-control:focus {\n    box-shadow: none !important; }\n\n.site-section {\n  padding: 2.5em 0; }\n  @media (min-width: 768px) {\n    .site-section {\n      padding: 5em 0; } }\n  .site-section.site-section-sm {\n    padding: 4em 0; }\n\n.site-footer {\n  padding: 4em 0;\n  background: #333333; }\n  @media (min-width: 768px) {\n    .site-footer {\n      padding: 8em 0; } }\n  .site-footer .border-top {\n    border-top: 1px solid rgba(255, 255, 255, 0.1) !important; }\n  .site-footer p {\n    color: #737373; }\n  .site-footer h2, .site-footer h3, .site-footer h4, .site-footer h5 {\n    color: #fff; }\n  .site-footer a {\n    color: #999999; }\n    .site-footer a:hover {\n      color: white; }\n  .site-footer ul li {\n    margin-bottom: 10px; }\n  .site-footer .footer-heading {\n    font-size: 16px;\n    color: #fff; }\n\n.bg-text-line {\n  display: inline;\n  background: #000;\n  box-shadow: 20px 0 0 #000, -20px 0 0 #000; }\n\n.text-white-opacity-05 {\n  color: rgba(255, 255, 255, 0.5); }\n\n.text-black-opacity-05 {\n  color: rgba(0, 0, 0, 0.5); }\n\n.hover-bg-enlarge {\n  overflow: hidden;\n  position: relative; }\n  @media (max-width: 991.98px) {\n    .hover-bg-enlarge {\n      height: auto !important; } }\n  .hover-bg-enlarge > div {\n    transform: scale(1);\n    transition: .8s all ease-in-out; }\n  .hover-bg-enlarge:hover > div, .hover-bg-enlarge:focus > div, .hover-bg-enlarge:active > div {\n    transform: scale(1.2); }\n  @media (max-width: 991.98px) {\n    .hover-bg-enlarge .bg-image-md-height {\n      height: 300px !important; } }\n\n.bg-image {\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-attachment: fixed; }\n  .bg-image.overlay {\n    position: relative; }\n    .bg-image.overlay:after {\n      position: absolute;\n      content: \"\";\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 0;\n      width: 100%;\n      background: rgba(0, 0, 0, 0.7); }\n  .bg-image > .container {\n    position: relative;\n    z-index: 1; }\n\n@media (max-width: 991.98px) {\n  .img-md-fluid {\n    max-width: 100%; } }\n\n@media (max-width: 991.98px) {\n  .display-1, .display-3 {\n    font-size: 3rem; } }\n\n.play-single-big {\n  width: 90px;\n  height: 90px;\n  display: inline-block;\n  border: 2px solid #fff;\n  color: #fff !important;\n  border-radius: 50%;\n  position: relative;\n  transition: .3s all ease-in-out; }\n  .play-single-big > span {\n    font-size: 50px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-40%, -50%); }\n  .play-single-big:hover {\n    width: 120px;\n    height: 120px; }\n\n.overlap-to-top {\n  margin-top: -150px; }\n\n.ul-check {\n  margin-bottom: 50px; }\n  .ul-check li {\n    position: relative;\n    padding-left: 35px;\n    margin-bottom: 15px;\n    line-height: 1.5; }\n    .ul-check li:before {\n      left: 0;\n      font-size: 20px;\n      top: -.3rem;\n      font-family: \"icomoon\";\n      content: \"\\e5ca\";\n      position: absolute; }\n  .ul-check.white li:before {\n    color: #fff; }\n  .ul-check.success li:before {\n    color: #28a745; }\n  .ul-check.primary li:before {\n    color: #007bff; }\n\n.select-wrap, .wrap-icon {\n  position: relative; }\n  .select-wrap .icon, .wrap-icon .icon {\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    font-size: 22px; }\n  .select-wrap select, .wrap-icon select {\n    appearance: none;\n    width: 100%; }\n\n.top-bar {\n  border-bottom: 1px solid #e9ecef !important; }\n\n/* Navbar */\n.site-navbar {\n  margin-bottom: 0px;\n  z-index: 1999;\n  position: relative;\n  width: 100%;\n  padding: 1rem; }\n  @media (max-width: 991.98px) {\n    .site-navbar {\n      padding: 3rem; } }\n  .site-navbar .toggle-button {\n    position: absolute;\n    right: 0px; }\n  .site-navbar .site-logo {\n    position: absolute;\n    font-size: 1.2rem;\n    text-transform: uppercase;\n    font-weight: 900;\n    line-height: 0;\n    margin: 0;\n    padding: 0;\n    z-index: 3; }\n    @media (max-width: 991.98px) {\n      .site-navbar .site-logo {\n        float: left;\n        position: relative; } }\n  .site-navbar .site-navigation.border-bottom {\n    border-bottom: 1px solid #f3f3f4 !important; }\n  .site-navbar .site-navigation .site-menu {\n    margin-bottom: 0; }\n    .site-navbar .site-navigation .site-menu .active {\n      color: #007bff !important;\n      display: inline-block;\n      border-bottom: 2px solid #007bff; }\n    .site-navbar .site-navigation .site-menu a {\n      text-decoration: none !important;\n      display: inline-block; }\n    .site-navbar .site-navigation .site-menu > li {\n      display: inline-block; }\n      .site-navbar .site-navigation .site-menu > li > a {\n        margin-left: 15px;\n        margin-right: 15px;\n        padding: 20px 0px;\n        color: #000 !important;\n        display: inline-block;\n        text-decoration: none !important;\n        border-bottom: 2px solid transparent; }\n        .site-navbar .site-navigation .site-menu > li > a:hover {\n          color: #007bff; }\n    .site-navbar .site-navigation .site-menu .has-children {\n      position: relative; }\n      .site-navbar .site-navigation .site-menu .has-children > a {\n        position: relative;\n        padding-right: 20px; }\n        .site-navbar .site-navigation .site-menu .has-children > a:before {\n          position: absolute;\n          content: \"\\e313\";\n          font-size: 16px;\n          top: 50%;\n          right: 0;\n          transform: translateY(-50%);\n          font-family: 'icomoon'; }\n      .site-navbar .site-navigation .site-menu .has-children .dropdown {\n        visibility: hidden;\n        opacity: 0;\n        top: 100%;\n        position: absolute;\n        text-align: left;\n        border-top: 2px solid #007bff;\n        box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.1);\n        border-left: 1px solid #edf0f5;\n        border-right: 1px solid #edf0f5;\n        border-bottom: 1px solid #edf0f5;\n        padding: 0px 0;\n        margin-top: 20px;\n        margin-left: 0px;\n        background: #fff;\n        transition: 0.2s 0s; }\n        .site-navbar .site-navigation .site-menu .has-children .dropdown.arrow-top {\n          position: absolute; }\n          .site-navbar .site-navigation .site-menu .has-children .dropdown.arrow-top:before {\n            bottom: 100%;\n            left: 20%;\n            border: solid transparent;\n            content: \" \";\n            height: 0;\n            width: 0;\n            position: absolute;\n            pointer-events: none; }\n          .site-navbar .site-navigation .site-menu .has-children .dropdown.arrow-top:before {\n            border-color: rgba(136, 183, 213, 0);\n            border-bottom-color: #fff;\n            border-width: 10px;\n            margin-left: -10px; }\n        .site-navbar .site-navigation .site-menu .has-children .dropdown a {\n          text-transform: none;\n          letter-spacing: normal;\n          transition: 0s all;\n          color: #343a40; }\n        .site-navbar .site-navigation .site-menu .has-children .dropdown .active > a {\n          color: #007bff !important; }\n        .site-navbar .site-navigation .site-menu .has-children .dropdown > li {\n          list-style: none;\n          padding: 0;\n          margin: 0;\n          min-width: 200px; }\n          .site-navbar .site-navigation .site-menu .has-children .dropdown > li > a {\n            padding: 9px 20px;\n            display: block; }\n            .site-navbar .site-navigation .site-menu .has-children .dropdown > li > a:hover {\n              background: #f4f5f9;\n              color: #25262a; }\n          .site-navbar .site-navigation .site-menu .has-children .dropdown > li.has-children > a:before {\n            content: \"\\e315\";\n            right: 20px; }\n          .site-navbar .site-navigation .site-menu .has-children .dropdown > li.has-children > .dropdown, .site-navbar .site-navigation .site-menu .has-children .dropdown > li.has-children > ul {\n            left: 100%;\n            top: 0; }\n          .site-navbar .site-navigation .site-menu .has-children .dropdown > li.has-children:hover > a, .site-navbar .site-navigation .site-menu .has-children .dropdown > li.has-children:active > a, .site-navbar .site-navigation .site-menu .has-children .dropdown > li.has-children:focus > a {\n            background: #f4f5f9;\n            color: #25262a; }\n      .site-navbar .site-navigation .site-menu .has-children:hover > a, .site-navbar .site-navigation .site-menu .has-children:focus > a, .site-navbar .site-navigation .site-menu .has-children:active > a {\n        color: #007bff; }\n      .site-navbar .site-navigation .site-menu .has-children:hover, .site-navbar .site-navigation .site-menu .has-children:focus, .site-navbar .site-navigation .site-menu .has-children:active {\n        cursor: pointer; }\n        .site-navbar .site-navigation .site-menu .has-children:hover > .dropdown, .site-navbar .site-navigation .site-menu .has-children:focus > .dropdown, .site-navbar .site-navigation .site-menu .has-children:active > .dropdown {\n          transition-delay: 0s;\n          margin-top: 0px;\n          visibility: visible;\n          opacity: 1; }\n\n.site-mobile-menu {\n  width: 300px;\n  position: fixed;\n  right: 0;\n  z-index: 2000;\n  padding-top: 20px;\n  background: #fff;\n  height: calc(100vh);\n  transform: translateX(110%);\n  box-shadow: -10px 0 20px -10px rgba(0, 0, 0, 0.1);\n  transition: .3s all ease-in-out; }\n  .offcanvas-menu .site-mobile-menu {\n    transform: translateX(0%); }\n  .site-mobile-menu .site-mobile-menu-header {\n    width: 100%;\n    float: left;\n    padding-left: 20px;\n    padding-right: 20px; }\n    .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-close {\n      float: right;\n      margin-top: 8px; }\n      .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-close span {\n        font-size: 30px;\n        display: inline-block;\n        padding-left: 10px;\n        padding-right: 0px;\n        line-height: 1;\n        cursor: pointer;\n        transition: .3s all ease; }\n        .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-close span:hover {\n          color: #25262a; }\n    .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-logo {\n      float: left;\n      margin-top: 10px;\n      margin-left: 0px; }\n      .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-logo a {\n        display: inline-block;\n        text-transform: uppercase; }\n        .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-logo a img {\n          max-width: 70px; }\n        .site-mobile-menu .site-mobile-menu-header .site-mobile-menu-logo a:hover {\n          text-decoration: none; }\n  .site-mobile-menu .site-mobile-menu-body {\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch;\n    position: relative;\n    padding: 0 20px 20px 20px;\n    height: calc(100vh - 52px);\n    padding-bottom: 150px; }\n  .site-mobile-menu .site-nav-wrap {\n    padding: 0;\n    margin: 0;\n    list-style: none;\n    position: relative; }\n    .site-mobile-menu .site-nav-wrap a {\n      padding: 10px 20px;\n      display: block;\n      position: relative;\n      color: #212529; }\n      .site-mobile-menu .site-nav-wrap a:hover {\n        color: #007bff; }\n    .site-mobile-menu .site-nav-wrap li {\n      position: relative;\n      display: block; }\n      .site-mobile-menu .site-nav-wrap li .nav-link.active {\n        color: #007bff; }\n    .site-mobile-menu .site-nav-wrap .arrow-collapse {\n      position: absolute;\n      right: 0px;\n      top: 10px;\n      z-index: 20;\n      width: 36px;\n      height: 36px;\n      text-align: center;\n      cursor: pointer;\n      border-radius: 50%; }\n      .site-mobile-menu .site-nav-wrap .arrow-collapse:hover {\n        background: #f8f9fa; }\n      .site-mobile-menu .site-nav-wrap .arrow-collapse:before {\n        font-size: 12px;\n        z-index: 20;\n        font-family: \"icomoon\";\n        content: \"\\f078\";\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%) rotate(-180deg);\n        transition: .3s all ease; }\n      .site-mobile-menu .site-nav-wrap .arrow-collapse.collapsed:before {\n        transform: translate(-50%, -50%); }\n    .site-mobile-menu .site-nav-wrap > li {\n      display: block;\n      position: relative;\n      float: left;\n      width: 100%; }\n      .site-mobile-menu .site-nav-wrap > li > a {\n        padding-left: 20px;\n        font-size: 20px; }\n      .site-mobile-menu .site-nav-wrap > li > ul {\n        padding: 0;\n        margin: 0;\n        list-style: none; }\n        .site-mobile-menu .site-nav-wrap > li > ul > li {\n          display: block; }\n          .site-mobile-menu .site-nav-wrap > li > ul > li > a {\n            padding-left: 40px;\n            font-size: 16px; }\n          .site-mobile-menu .site-nav-wrap > li > ul > li > ul {\n            padding: 0;\n            margin: 0; }\n            .site-mobile-menu .site-nav-wrap > li > ul > li > ul > li {\n              display: block; }\n              .site-mobile-menu .site-nav-wrap > li > ul > li > ul > li > a {\n                font-size: 16px;\n                padding-left: 60px; }\n    .site-mobile-menu .site-nav-wrap[data-class=\"social\"] {\n      float: left;\n      width: 100%;\n      margin-top: 30px;\n      padding-bottom: 5em; }\n      .site-mobile-menu .site-nav-wrap[data-class=\"social\"] > li {\n        width: auto; }\n        .site-mobile-menu .site-nav-wrap[data-class=\"social\"] > li:first-child a {\n          padding-left: 15px !important; }\n\n.sticky-wrapper {\n  position: relative;\n  z-index: 100;\n  width: 100%; }\n  .sticky-wrapper .site-navbar {\n    transition: .3s all ease; }\n  .sticky-wrapper .site-navbar {\n    background: #fff; }\n    .sticky-wrapper .site-navbar .site-logo a {\n      color: #fff; }\n    .sticky-wrapper .site-navbar ul li a {\n      color: rgba(255, 255, 255, 0.7) !important; }\n      .sticky-wrapper .site-navbar ul li a.active {\n        color: #fff !important; }\n  .sticky-wrapper.is-sticky .site-navbar {\n    background: #fff;\n    box-shadow: 4px 0 20px -5px rgba(0, 0, 0, 0.2); }\n    .sticky-wrapper.is-sticky .site-navbar .site-logo a {\n      color: #007bff; }\n    .sticky-wrapper.is-sticky .site-navbar ul li a {\n      color: #000 !important; }\n      .sticky-wrapper.is-sticky .site-navbar ul li a.active {\n        color: #007bff !important; }\n  .sticky-wrapper .shrink {\n    padding-top: 0px !important;\n    padding-bottom: 0px !important; }\n    @media (max-width: 991.98px) {\n      .sticky-wrapper .shrink {\n        padding-top: 30px !important;\n        padding-bottom: 30px !important; } }\n\n/* Blocks */\n.site-section {\n  padding: 7em 0; }\n\n.site-section-cover {\n  position: relative; }\n  .site-section-cover, .site-section-cover .container > .row {\n    height: 100vh;\n    min-height: 700px; }\n  .site-section-cover.inner-page, .site-section-cover.inner-page .container > .row {\n    height: auto;\n    min-height: auto;\n    padding: 2em 0; }\n  .site-section-cover.img-bg-section {\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    background-position: bottom right; }\n  .site-section-cover .img-absolute {\n    position: absolute;\n    right: 0;\n    top: 0;\n    z-index: 2; }\n    @media (max-width: 991.98px) {\n      .site-section-cover .img-absolute {\n        position: relative;\n        right: auto; }\n        .site-section-cover .img-absolute img {\n          max-width: 100%; } }\n  .site-section-cover h1 {\n    font-size: 2.5rem;\n    color: #007bff;\n    line-height: 1; }\n  .site-section-cover p {\n    font-size: 18px;\n    color: #999999;\n    max-width: 400px; }\n  @media (max-width: 991.98px) {\n    .site-section-cover .box-shadow-content {\n      background: rgba(255, 255, 255, 0.5);\n      padding: 30px; }\n      .site-section-cover .box-shadow-content p {\n        color: #000; } }\n\n.gradient-bg-1, .block-feature-1 .icon, .block-img-video-1 > a .icon {\n  background: #51eaea;\n  background: -moz-linear-gradient(top, #51eaea 0%, #499bea 100%);\n  background: -webkit-gradient(left top, left bottom, color-stop(0%, #51eaea), color-stop(100%, #499bea));\n  background: -webkit-linear-gradient(top, #51eaea 0%, #499bea 100%);\n  background: -o-linear-gradient(top, #51eaea 0%, #499bea 100%);\n  background: -ms-linear-gradient(top, #51eaea 0%, #499bea 100%);\n  background: linear-gradient(to bottom, #51eaea 0%, #499bea 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#51eaea', endColorstr='#499bea', GradientType=0 ); }\n\n.block-heading-1 span {\n  text-transform: uppercase;\n  font-size: 12px;\n  letter-spacing: .1em;\n  font-weight: bold; }\n\n.block-heading-1 h2 {\n  font-size: 3rem;\n  color: #007bff; }\n\n.block-feature-1-wrap {\n  margin-bottom: 7rem; }\n  .block-feature-1-wrap > .container > .row {\n    margin-left: -18px;\n    margin-right: -18px; }\n    .block-feature-1-wrap > .container > .row > .col,\n    .block-feature-1-wrap > .container > .row > [class*=\"col-\"] {\n      padding-right: 36px;\n      padding-left: 36px; }\n\n.block-feature-1 {\n  background: #f2f2f2;\n  padding: 30px 30px 30px 50px;\n  position: relative; }\n  .block-feature-1 h2 {\n    font-size: 18px; }\n  .block-feature-1 .icon {\n    width: 80px;\n    height: 80px;\n    display: inline-block;\n    border-radius: 50%;\n    position: absolute;\n    left: -40px;\n    top: 50%;\n    border: 4px solid #fff;\n    transform: translateY(-50%);\n    text-align: center; }\n    .block-feature-1 .icon > span {\n      font-size: 40px;\n      color: #fff;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%); }\n\n.block-img-video-1-wrap .block-img-video-1 {\n  position: relative;\n  margin-top: -10rem; }\n\n.block-img-video-1 > a {\n  display: block;\n  position: relative;\n  cursor: pointer; }\n  .block-img-video-1 > a .icon {\n    position: absolute;\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    display: inline-block;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%); }\n    .block-img-video-1 > a .icon > span {\n      position: absolute;\n      font-size: 20px;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      color: #fff; }\n\n.block-counter-1 {\n  text-align: center; }\n  .block-counter-1 .number, .block-counter-1 .caption {\n    display: block;\n    line-height: 1; }\n  .block-counter-1 .number {\n    color: #fff;\n    font-size: 4rem;\n    position: relative;\n    padding-bottom: 20px;\n    margin-bottom: 20px; }\n    .block-counter-1 .number:after {\n      position: absolute;\n      content: \"\";\n      width: 50px;\n      height: 3px;\n      left: 50%;\n      bottom: 0;\n      transform: translateX(-50%);\n      background: rgba(255, 255, 255, 0.3); }\n  .block-counter-1 .caption {\n    font-size: 14px;\n    color: #fff;\n    letter-spacing: .05em; }\n\n.block-team-member-1 {\n  padding: 30px;\n  border: 1px solid #e9ecef; }\n  .block-team-member-1 figure img {\n    width: 130px; }\n\n.block-social-1 > a {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  position: relative; }\n  .block-social-1 > a span {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%); }\n\n.block-testimony-1 {\n  padding: 20px; }\n  .block-testimony-1 blockquote {\n    background: #fff;\n    padding: 30px;\n    font-style: italic;\n    font-size: 18px;\n    color: #000;\n    font-family: 'Georgia', Times, serif; }\n  .block-testimony-1 figure {\n    position: relative;\n    padding-top: 20px; }\n    .block-testimony-1 figure:before {\n      position: absolute;\n      content: \"\";\n      width: 50px;\n      left: 50%;\n      top: 0;\n      transform: translateX(-50%);\n      background: #007bff;\n      height: 2px; }\n    .block-testimony-1 figure img {\n      max-width: 60px; }\n  .block-testimony-1 h3 {\n    font-size: 18px; }\n\n.block-13 .owl-nav {\n  display: none; }\n\n.block-13 .owl-dots {\n  text-align: center;\n  position: relative;\n  bottom: -30px; }\n  .block-13 .owl-dots .owl-dot {\n    display: inline-block;\n    margin: 4px; }\n    .block-13 .owl-dots .owl-dot span {\n      display: inline-block;\n      width: 7px;\n      height: 7px;\n      border-radius: 50%;\n      background: #cccccc; }\n    .block-13 .owl-dots .owl-dot.active span {\n      background: #007bff; }\n\n.post-entry {\n  background: #fff;\n  padding: 30px;\n  border: 1px solid #e6e6e6;\n  border-radius: 4px;\n  transition: .3s all ease; }\n  .post-entry:hover {\n    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1); }\n  .post-entry h2 {\n    font-size: 20px; }\n  .post-entry *:last-child {\n    margin-bottom: 0; }\n\n.by {\n  color: #000;\n  border-bottom: 1px dotted #ccc; }\n  .by:hover {\n    border-bottom: 1px dotted #007bff; }\n\n.form-control {\n  border: none;\n  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.2) !important; }\n  .form-control:hover, .form-control:active, .form-control:focus {\n    box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.2) !important; }\n\n.sidebar-box {\n  margin-bottom: 30px;\n  padding: 25px;\n  font-size: 15px;\n  width: 100%;\n  float: left;\n  background: #fff; }\n  .sidebar-box *:last-child {\n    margin-bottom: 0; }\n  .sidebar-box h3 {\n    font-size: 18px;\n    margin-bottom: 15px; }\n\n.categories li, .sidelink li {\n  position: relative;\n  margin-bottom: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px dotted #dee2e6;\n  list-style: none; }\n  .categories li:last-child, .sidelink li:last-child {\n    margin-bottom: 0;\n    border-bottom: none;\n    padding-bottom: 0; }\n  .categories li a, .sidelink li a {\n    display: block; }\n    .categories li a span, .sidelink li a span {\n      position: absolute;\n      right: 0;\n      top: 0;\n      color: #ccc; }\n  .categories li.active a, .sidelink li.active a {\n    color: #000;\n    font-style: italic; }\n\n.comment-form-wrap {\n  clear: both; }\n\n.comment-list {\n  padding: 0;\n  margin: 0; }\n  .comment-list .children {\n    padding: 50px 0 0 40px;\n    margin: 0;\n    float: left;\n    width: 100%; }\n  .comment-list li {\n    padding: 0;\n    margin: 0 0 30px 0;\n    float: left;\n    width: 100%;\n    clear: both;\n    list-style: none; }\n    .comment-list li .vcard {\n      width: 80px;\n      float: left; }\n      .comment-list li .vcard img {\n        width: 50px;\n        border-radius: 50%; }\n    .comment-list li .comment-body {\n      float: right;\n      width: calc(100% - 80px); }\n      .comment-list li .comment-body h3 {\n        font-size: 20px; }\n      .comment-list li .comment-body .meta {\n        text-transform: uppercase;\n        font-size: 13px;\n        letter-spacing: .1em;\n        color: #ccc; }\n      .comment-list li .comment-body .reply {\n        padding: 5px 10px;\n        background: #e6e6e6;\n        color: #000;\n        text-transform: uppercase;\n        font-size: 14px; }\n        .comment-list li .comment-body .reply:hover {\n          color: #000;\n          background: #e3e3e3; }\n\n.search-form {\n  background: #f7f7f7;\n  padding: 10px; }\n  .search-form .form-group {\n    position: relative; }\n    .search-form .form-group input {\n      padding-right: 50px; }\n  .search-form .icon {\n    position: absolute;\n    top: 50%;\n    right: 20px;\n    transform: translateY(-50%); }\n\n.post-meta {\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: .2em; }\n  .post-meta a {\n    color: #fff;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.5); }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js?!./ClientApp/src/components/home/mainpage_condition/mp_condition.scss":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./node_modules/sass-resources-loader/lib/loader.js??ref--7-3!./ClientApp/src/components/home/mainpage_condition/mp_condition.scss ***!
  \************************************************************************************************************************************************************************************************************************/
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
exports.push([module.i, "/*!\n * Font Awesome Free 5.11.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: 'Font Awesome 5 Free';\n  font-style: normal;\n  font-weight: 900;\n  font-display: auto;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n  src: url(" + ___CSS_LOADER_URL___1___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL___2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL___3___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL___4___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL___5___ + ") format(\"svg\"); }\n\n.fa,\n.fas {\n  font-family: 'Font Awesome 5 Free';\n  font-weight: 900; }\n\n.mpcontent h1 {\n  text-align: center; }\n\n.mpcontent span {\n  float: left;\n  width: 100px;\n  text-align: center;\n  cursor: pointer; }\n\n.sort-process {\n  color: #5E95B8;\n  padding: 7px;\n  font-family: Lato;\n  font-size: 14px;\n  font-weight: bold;\n  border-radius: 17px; }\n\n.mpcontent .active {\n  color: white;\n  background-color: #2670A1; }\n\n.mpcontent .explore {\n  color: #F6B63A; }\n\n.mpcontent .activeE {\n  color: white;\n  background-color: #F6B63A; }\n\n.refresh-button {\n  color: #0b5e95; }\n\n.refresh-button .explore {\n  color: #F6B63A; }\n\n.btn-explore {\n  background-color: #2670A1;\n  border-color: #2670A1;\n  color: white; }\n\n.input-group .input-group-append .explore {\n  color: white;\n  background-color: #F6B63A;\n  border-color: #F6B63A; }\n\n.input-group .input-group-append .explore {\n  color: white;\n  background-color: #F6B63A; }\n\n.btn-new-process {\n  background-color: #3AC474;\n  border-color: #3AC474;\n  color: white; }\n", ""]);


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

/***/ 2:
/*!********************************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:9000 (webpack)/hot/dev-server.js ./ClientApp/src/login.ts ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\zzz\Studies\github\vychauticket.github.io\source\node_modules\webpack-dev-server\client\index.js?http://localhost:9000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:9000");
__webpack_require__(/*! C:\zzz\Studies\github\vychauticket.github.io\source\node_modules\webpack\hot\dev-server.js */"./node_modules/webpack/hot/dev-server.js");
module.exports = __webpack_require__(/*! C:\zzz\Studies\github\vychauticket.github.io\source\ClientApp\src\login.ts */"./ClientApp/src/login.ts");


/***/ })

/******/ });
//# sourceMappingURL=login.327f73dbcc808ae0c64b.js.map