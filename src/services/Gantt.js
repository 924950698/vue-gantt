// let tasks = [
//   {
//     id: 1,
//     label:
//       '<a href="https://www.baidu.com" target="_blank" style="color:blue;">需求：直播课</a>',
//     user: "John Doe",
//     start: 1594828800000,//getDate(-24 * 5),
//     endDate: "2020-07-21",
//     duration: 14 * 24 * 60 * 60 * 1000,
//     percent: 85,
//     type: "milestone",
//     proType: "产品需求",
//     risk: "风险预警xxx",
//     style: {
//       base: {
//         fill: "#0287D0",
//         stroke: "#0077C0",
//       },
//     },
//     //collapsed: true,
//   },
//   {
//     id: 2,
//     label: "开发排期",
//     user: "Peter Parker",
//     parentId: 1,
//     start: getDate(-24 * 4),
//     duration: 4 * 24 * 60 * 60 * 1000,
//     percent: 50,
//     type: "milestone",
//     collapsed: true,
//     style: {
//       base: {
//         fill: "#1EBC61",
//         stroke: "#0EAC51",
//       },
//     },
//   },
//   {
//     id: 3,
//     label: "前端",
//     user: "John Wayne",
//     parentId: 2,
//     start: getDate(-24 * 3),
//     duration: 2 * 24 * 60 * 60 * 1000,
//     percent: 100,
//     type: "task",
//   },
//   {
//     id: 4,
//     label: "后端",
//     user: "Clark Kent",
//     parentId: 2,
//     start: getDate(-24 * 2),
//     duration: 2 * 24 * 60 * 60 * 1000,
//     percent: 50,
//     type: "task",
//     dependentOn: [3],
//   },
//   {
//     id: 5,
//     label: "Android",
//     user: "Austin Powers",
//     parentId: 2,
//     start: getDate(0),
//     duration: 2 * 24 * 60 * 60 * 1000,
//     percent: 10,
//     type: "milestone",
//     style: {
//       base: {
//         fill: "#0287D0",
//         stroke: "#0077C0",
//       },
//     },
//   },
//   {
//     id: 6,
//     label: "iOS",
//     user: "Mario Bros",
//     parentId: 2,
//     start: getDate(24),
//     duration: 1 * 24 * 60 * 60 * 1000,
//     percent: 50,
//     type: "task",
//     collapsed: true,
//     style: {
//       base: {
//         fill: "#8E44AD",
//         stroke: "#7E349D",
//       },
//     },
//   },
//   {
//     id: 7,
//     label: "测试排期",
//     user: "Knight Rider",
//     parentId: 1,
//     dependentOn: [6],
//     start: getDate(24 * 2),
//     duration: 4 * 60 * 60 * 1000,
//     percent: 20,
//     type: "task",
//     collapsed: true,
//   },
//   {
//     id: 8,
//     label: "直播课 - 模块1",
//     user: "Johhny Bravo",
//     parentId: 7,
//     dependentOn: [7],
//     start: getDate(24 * 3),
//     duration: 1 * 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//   },
//   {
//     id: 9,
//     label: "直播课 - 模块2",
//     user: "Dexter's Laboratory",
//     parentId: 7,
//     dependentOn: [8, 7],
//     start: getDate(24 * 4),
//     duration: 4 * 60 * 60 * 1000,
//     percent: 20,
//     type: "task",
//     style: {
//       base: {
//         fill: "#8E44AD",
//         stroke: "#7E349D",
//       },
//     },
//   },
//   {
//     id: 10,
//     label: "current task",
//     user: "Johnattan Owens",
//     start: getDate(24 * 5),
//     duration: 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//   },
//   {
//     id: 11,
//     label: "test task",
//     user: "Johnattan Owens",
//     start: getDate(24 * 6),
//     duration: 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//   },
//   {
//     id: 12,
//     label: "test task",
//     user: "Johnattan Owens",
//     start: getDate(24 * 7),
//     duration: 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//     parentId: 11,
//   },
//   {
//     id: 13,
//     label: "test task",
//     user: "Johnattan Owens",
//     start: getDate(24 * 8),
//     duration: 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//   },
//   {
//     id: 14,
//     label: "test task",
//     user: "Johnattan Owens",
//     start: getDate(24 * 9),
//     duration: 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//   },
//   {
//     id: 15,
//     label: "test task",
//     user: "Johnattan Owens",
//     start: getDate(24 * 16),
//     duration: 24 * 60 * 60 * 1000,
//     percent: 0,
//     type: "task",
//   },
// ];