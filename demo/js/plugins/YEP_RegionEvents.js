//=============================================================================
// Yanfly Engine Plugins - Region Events
// YEP_RegionEvents.js
// Last Updated: 2015.07.18
//=============================================================================

if ($imported == undefined) { var $imported = {}; }
$imported["YEP_RegionEvents"] = true;

//=============================================================================
 /*:
 * @plugindesc Make it so that whenever players step on certain Region ID's,
 * the game will play certain common events.
 * @author Yanfly Engine Plugins
 *
 * @param Region 1
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 2
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 3
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 4
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 5
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 6
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 7
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 8
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 9
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 10
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 11
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 12
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 13
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 14
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 15
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 16
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 17
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 18
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 19
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 20
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 21
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 22
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 23
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 24
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 25
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 26
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 27
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 28
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 29
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 30
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 31
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 32
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 33
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 34
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 35
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 36
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 37
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 38
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 39
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 40
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 41
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 42
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 43
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 44
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 45
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 46
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 47
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 48
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 49
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 50
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 51
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 52
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 53
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 54
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 55
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 56
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 57
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 58
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 59
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 60
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 61
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 62
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 63
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 64
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 65
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 66
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 67
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 68
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 69
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 70
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 71
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 72
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 73
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 74
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 75
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 76
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 77
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 78
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 79
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 80
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 81
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 82
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 83
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 84
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 85
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 86
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 87
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 88
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 89
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 90
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 91
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 92
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 93
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 94
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 95
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 96
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 97
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 98
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 99
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 100
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 101
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 102
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 103
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 104
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 105
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 106
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 107
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 108
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 109
 * @desc What common event to play for this region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 110
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 111
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 112
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 113
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 114
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 115
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 116
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 117
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 118
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 119
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 120
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 121
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 122
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 123
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 124
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 125
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 126
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 127
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 128
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 129
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 130
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 131
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 132
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 133
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 134
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 135
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 136
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 137
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 138
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 139
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 140
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 141
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 142
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 143
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 144
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 145
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 146
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 147
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 148
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 149
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 150
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 151
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 152
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 153
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 154
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 155
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 156
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 157
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 158
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 159
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 160
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 161
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 162
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 163
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 164
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 165
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 166
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 167
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 168
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 169
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 170
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 171
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 172
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 173
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 174
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 175
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 176
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 177
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 178
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 179
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 180
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 181
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 182
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 183
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 184
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 185
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 186
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 187
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 188
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 189
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 190
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 191
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 192
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 193
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 194
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 195
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 196
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 197
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 198
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 199
 * @desc What common event to play for this Region 1when stepped upon.
 * Use 0 to have that Region 1not trigger a common event.
 * @default 0
 *
 * @param Region 200
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 201
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 202
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 203
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 204
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 205
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 206
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 207
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 208
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 209
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 210
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 211
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 212
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 213
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 214
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 215
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 216
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 217
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 218
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 219
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 220
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 221
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 222
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 223
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 224
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 225
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 226
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 227
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 228
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 229
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 230
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 231
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 232
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 233
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 234
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 235
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 236
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 237
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 238
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 239
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 240
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 241
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 242
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 243
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 244
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 245
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 246
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 247
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 248
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 249
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 250
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 251
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 252
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 253
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 254
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @param Region 255
 * @desc What common event to play for this Region 2when stepped upon.
 * Use 0 to have that Region 2not trigger a common event.
 * @default 0
 *
 * @help
 * There are 255 Regions you can mark on your map. You can set it so that when
 * players step on those specific Regions, a Common Event will play each time
 * they step on it. To do so, bind a Common Event's ID to the Region number in
 * this plugin's parameters. It will make it so that any tile with that very
 * specific Region ID to trigger an on-Player Touch event using the Common
 * Event ID that you have marked for it.
 *
 * ChangeLog:
 *   2015.07.18 - Completed.
 */
//=============================================================================

var parameters = PluginManager.parameters('YEP_RegionEvents');
var regionEvents = {};
for (var i = 1; i <= 255; ++i) {
  regionEvents[i] = eval("Number(parameters['Region " + String(i) + "'] || 0)");
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.isRegionEvent = function(mx, my) {
    return (this.isValid(mx, my) && this.RegionEventTag(mx, my));
};

Game_Map.prototype.RegionEventTag = function(mx, my) {
    if (this.regionId(mx, my) <= 0) return false;
    return regionEvents[this.regionId(mx, my)] > 0;
};

//=============================================================================
// Game_Player
//=============================================================================

var _YEP_RCE_Game_Player_checkEventTriggerHere =
    Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (!this.canStartLocalEvents()) return;
    this.processRegionEvent();
    _YEP_RCE_Game_Player_checkEventTriggerHere.call(this, triggers);
};

Game_Player.prototype.processRegionEvent = function() {
    if (!$gameMap.isRegionEvent(this.x, this.y)) return;
    var commonEventId = regionEvents[$gameMap.regionId(this.x, this.y)];
    $gameTemp.reserveCommonEvent(commonEventId);
};

//=============================================================================
// End of File
//=============================================================================
