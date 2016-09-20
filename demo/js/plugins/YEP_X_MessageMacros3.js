//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Macros 3
// YEP_X_MessageMacros3.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageMacros3 = true;

var Yanfly = Yanfly || {};
Yanfly.MsgMacro = Yanfly.MsgMacro || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_MessageCore.js) Adds macros 201 to 300
 * for your game's message system.
 * @author Yanfly Engine Plugins
 *
 * @param ---Macro 201---
 * @default
 *
 * @param Macro 201 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 201 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 202---
 * @default
 *
 * @param Macro 202 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 202 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 203---
 * @default
 *
 * @param Macro 203 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 203 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 204---
 * @default
 *
 * @param Macro 204 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 204 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 205---
 * @default
 *
 * @param Macro 205 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 205 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 206---
 * @default
 *
 * @param Macro 206 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 206 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 207---
 * @default
 *
 * @param Macro 207 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 207 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 208---
 * @default
 *
 * @param Macro 208 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 208 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 209---
 * @default
 *
 * @param Macro 209 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 209 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 210---
 * @default
 *
 * @param Macro 210 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 210 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 211---
 * @default
 *
 * @param Macro 211 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 211 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 212---
 * @default
 *
 * @param Macro 212 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 212 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 213---
 * @default
 *
 * @param Macro 213 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 213 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 214---
 * @default
 *
 * @param Macro 214 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 214 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 215---
 * @default
 *
 * @param Macro 215 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 215 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 216---
 * @default
 *
 * @param Macro 216 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 216 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 217---
 * @default
 *
 * @param Macro 217 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 217 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 218---
 * @default
 *
 * @param Macro 218 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 218 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 219---
 * @default
 *
 * @param Macro 219 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 219 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 220---
 * @default
 *
 * @param Macro 220 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 220 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 221---
 * @default
 *
 * @param Macro 221 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 221 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 222---
 * @default
 *
 * @param Macro 222 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 222 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 223---
 * @default
 *
 * @param Macro 223 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 223 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 224---
 * @default
 *
 * @param Macro 224 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 224 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 225---
 * @default
 *
 * @param Macro 225 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 225 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 226---
 * @default
 *
 * @param Macro 226 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 226 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 227---
 * @default
 *
 * @param Macro 227 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 227 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 228---
 * @default
 *
 * @param Macro 228 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 228 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 229---
 * @default
 *
 * @param Macro 229 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 229 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 230---
 * @default
 *
 * @param Macro 230 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 230 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 231---
 * @default
 *
 * @param Macro 231 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 231 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 232---
 * @default
 *
 * @param Macro 232 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 232 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 233---
 * @default
 *
 * @param Macro 233 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 233 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 234---
 * @default
 *
 * @param Macro 234 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 234 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 235---
 * @default
 *
 * @param Macro 235 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 235 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 236---
 * @default
 *
 * @param Macro 236 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 236 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 237---
 * @default
 *
 * @param Macro 237 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 237 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 238---
 * @default
 *
 * @param Macro 238 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 238 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 239---
 * @default
 *
 * @param Macro 239 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 239 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 240---
 * @default
 *
 * @param Macro 240 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 240 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 241---
 * @default
 *
 * @param Macro 241 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 241 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 242---
 * @default
 *
 * @param Macro 242 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 242 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 243---
 * @default
 *
 * @param Macro 243 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 243 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 244---
 * @default
 *
 * @param Macro 244 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 244 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 245---
 * @default
 *
 * @param Macro 245 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 245 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 246---
 * @default
 *
 * @param Macro 246 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 246 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 247---
 * @default
 *
 * @param Macro 247 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 247 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 248---
 * @default
 *
 * @param Macro 248 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 248 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 249---
 * @default
 *
 * @param Macro 249 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 249 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 250---
 * @default
 *
 * @param Macro 250 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 250 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 251---
 * @default
 *
 * @param Macro 251 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 251 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 252---
 * @default
 *
 * @param Macro 252 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 252 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 253---
 * @default
 *
 * @param Macro 253 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 253 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 254---
 * @default
 *
 * @param Macro 254 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 254 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 255---
 * @default
 *
 * @param Macro 255 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 255 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 256---
 * @default
 *
 * @param Macro 256 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 256 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 257---
 * @default
 *
 * @param Macro 257 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 257 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 258---
 * @default
 *
 * @param Macro 258 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 258 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 259---
 * @default
 *
 * @param Macro 259 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 259 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 260---
 * @default
 *
 * @param Macro 260 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 260 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 261---
 * @default
 *
 * @param Macro 261 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 261 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 262---
 * @default
 *
 * @param Macro 262 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 262 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 263---
 * @default
 *
 * @param Macro 263 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 263 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 264---
 * @default
 *
 * @param Macro 264 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 264 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 265---
 * @default
 *
 * @param Macro 265 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 265 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 266---
 * @default
 *
 * @param Macro 266 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 266 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 267---
 * @default
 *
 * @param Macro 267 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 267 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 268---
 * @default
 *
 * @param Macro 268 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 268 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 269---
 * @default
 *
 * @param Macro 269 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 269 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 270---
 * @default
 *
 * @param Macro 270 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 270 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 271---
 * @default
 *
 * @param Macro 271 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 271 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 272---
 * @default
 *
 * @param Macro 272 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 272 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 273---
 * @default
 *
 * @param Macro 273 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 273 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 274---
 * @default
 *
 * @param Macro 274 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 274 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 275---
 * @default
 *
 * @param Macro 275 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 275 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 276---
 * @default
 *
 * @param Macro 276 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 276 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 277---
 * @default
 *
 * @param Macro 277 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 277 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 278---
 * @default
 *
 * @param Macro 278 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 278 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 279---
 * @default
 *
 * @param Macro 279 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 279 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 280---
 * @default
 *
 * @param Macro 280 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 280 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 281---
 * @default
 *
 * @param Macro 281 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 281 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 282---
 * @default
 *
 * @param Macro 282 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 282 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 283---
 * @default
 *
 * @param Macro 283 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 283 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 284---
 * @default
 *
 * @param Macro 284 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 284 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 285---
 * @default
 *
 * @param Macro 285 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 285 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 286---
 * @default
 *
 * @param Macro 286 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 286 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 287---
 * @default
 *
 * @param Macro 287 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 287 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 288---
 * @default
 *
 * @param Macro 288 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 288 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 289---
 * @default
 *
 * @param Macro 289 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 289 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 290---
 * @default
 *
 * @param Macro 290 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 290 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 291---
 * @default
 *
 * @param Macro 291 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 291 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 292---
 * @default
 *
 * @param Macro 292 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 292 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 293---
 * @default
 *
 * @param Macro 293 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 293 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 294---
 * @default
 *
 * @param Macro 294 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 294 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 295---
 * @default
 *
 * @param Macro 295 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 295 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 296---
 * @default
 *
 * @param Macro 296 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 296 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 297---
 * @default
 *
 * @param Macro 297 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 297 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 298---
 * @default
 *
 * @param Macro 298 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 298 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 299---
 * @default
 *
 * @param Macro 299 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 299 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 300---
 * @default
 *
 * @param Macro 300 Text
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 200 Name
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MessageCore.js to run.
 * Place this plugin under YEP_MessageCore.js in the plugin list.
 *
 * Ever get tired of having to do \n<\c[6]\n[1]\c[0]>? With this plugin you can
 * create a macro where you can type \m[1] and it will do just that. This
 * is a utility plugin for RPG Maker MV developers. Using this plugin, you can
 * now develop macros for the message system or anywhere that uses text codes
 * in general. This plugin will allow you to define what macro ID's will change
 * into what text in-game!
 *
 * If you are using the other Message Macro extension plugins, place these
 * plugins in the Plugin Manager List in sequential order.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Refer to YEP_X_MessageMacros1.js's help file for instructions.
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageMacros3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MacroMax = 300;
for (Yanfly.i = 201; Yanfly.i < Yanfly.Param.MacroMax + 1; ++Yanfly.i) {
  Yanfly.tx = 'Macro ' + Yanfly.i + ' Text';
  Yanfly.MsgMacro[Yanfly.i] = String(Yanfly.Parameters[Yanfly.tx]);
  Yanfly.MsgMacro[Yanfly.i] = Yanfly.MsgMacro[Yanfly.i].replace(/\\/g, '\x1b');
  Yanfly.tx = 'Macro ' + Yanfly.i + ' Name';
  Yanfly.tx = String(Yanfly.Parameters[Yanfly.tx]);
  if (!Yanfly.MsgMacroRef[Yanfly.tx.toUpperCase()]) {
    Yanfly.MsgMacroRef[Yanfly.tx.toUpperCase()] = Yanfly.i;
  }
  Yanfly.MsgMacroArr[Yanfly.i] = new RegExp('\x1b' + Yanfly.tx, 'gi');
};

//=============================================================================
// End of File
//=============================================================================
};