// const initialData = {
//     columns: {
//         "column-1": {
//             id: "column-1",
//             title: "To do",
//             taskIds: [
//                 { id: "task-1", content: "Take out the garbage" },
//                 { id: "task-2", content: "Watch my favorite show" },
//                 { id: "task-3", content: "Charge my phone" },
//                 { id: "task-4", content: "Cook dinner" },
//             ],
//         },
//         "column-2": {
//             id: "column-2",
//             title: "In progress",
//             taskIds: [{ id: "task-11", content: "컬럼2" }],
//         },
//         "column-3": {
//             id: "column-3",
//             title: "Done",
//             taskIds: [{ id: "task-111", content: "컬럼3" }],
//         },
//     },

//     columnOrder: ["column-1", "column-2", "column-3"],
// };

// export default initialData;

const initialData = [
    {
        id: "column-1",
        title: "To do",
        taskIds: [
            { id: "task-1", content: "Take out the garbage" },
            { id: "task-2", content: "Watch my favorite show" },
            { id: "task-3", content: "Charge my phone" },
            { id: "task-4", content: "Cook dinner" },
        ],
    },
    {
        id: "column-2",
        title: "In progress",
        taskIds: [{ id: "task-11", content: "컬럼2" }],
    },
    {
        id: "column-3",
        title: "Done",
        taskIds: [{ id: "task-111", content: "컬럼3" }],
    },
];

export default initialData;
