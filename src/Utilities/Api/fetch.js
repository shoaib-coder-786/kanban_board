import axios from "axios";
import { cancelLoading, onSuccess, onFailure, clearError, startLoading } from "../Redux/Data";
import { baseUrl } from "./baseUrl";

const urlPath = process.env.REACT_APP_GET_ASSIGNMENT_DATA; // Correct assignment of URL

export const getData = async (dispatch, type) => {
    try {
        dispatch(startLoading());
        const { data: { tickets, users } } = await axios.get(`${baseUrl}${urlPath}`);
        const userMap = {};
        const obj = { tickets: tickets.length, users: users.length };
        users.forEach(user => {
            if (!userMap[user.id]) {
                userMap[user.id] = user;
            }
        })
        if (!needToProcess(tickets.length, users.length)) {
            dispatch(cancelLoading());
        } else {
            switch (type) {
                case "byUser":
                    await fetchByUser(dispatch, tickets, userMap);
                    break;
                case "byPriority":
                    await fetchByPriority(dispatch, tickets, userMap);
                    break;
                default:
                    await fetchByStatus(dispatch, tickets, userMap);
                    break;
            }
        }
        // localStorage.setItem("datalen",JSON.stringify(obj));

    } catch (error) {
        dispatch(onFailure("Something went wrong. Please refresh the page."));
        setTimeout(() => {
            dispatch(clearError());
        }, 6000);
    }
};

function needToProcess(ticketLen, userLen) {
    const { tickets, users } = JSON.parse(localStorage.getItem("datalen")) || {};
    return !(ticketLen === tickets && userLen === users);
}

async function fetchByStatus(dispatch, tickets, users) {

    const hashMap = { Backlog: [], Todo: [], "In progress": [], Done: [], Canceled: [] };
    tickets.forEach(ticket => {
        const { status, userId } = ticket;
        const username = users[userId].name;

        if (!hashMap[status]) {
            hashMap[status] = [];
        }
        hashMap[status].push({ ...ticket, username });
    });
    const arr = [];
    for (let key in hashMap) {
        arr.push({ name: key, data: hashMap[key] })
    }
    dispatch(onSuccess({ data: arr, type: "byStatus" }));
    sortData(dispatch, localStorage.getItem("getOrder"), "byStatus", arr)

}


async function fetchByUser(dispatch, tickets, users) {
    const hashMap = {};
    tickets.forEach(ticket => {
        const { status, userId } = ticket;
        const username = users[userId].name;


        if (!hashMap[username]) {
            hashMap[username] = [];
        }
        hashMap[username].push({ ...ticket, username });
    });
    let arr = [];
    for (let key in hashMap) {
        arr.push({ name: key, data: hashMap[key] })
    }
    arr = arr.sort((a, b) => a.name.localeCompare(b.name))
    dispatch(onSuccess({ data: arr, type: "byUser" }));
    sortData(dispatch, localStorage.getItem("getOrder"), "byUser", arr)

}

async function fetchByPriority(dispatch, tickets, users) {
    const obj = {
        "0": "No priority",
        "1": "Low",
        "2": "Medium",
        "3": "High",
        "4": "Urgent"
    }
    const hashMap = {
        "No priority": [],
        "Urgent": [],
        "High": [],
        "Medium": [],
        "Low": []
    };
    tickets.forEach(ticket => {
        const { priority, userId } = ticket;
        const username = users[userId].name;
        if (!hashMap[obj[priority]]) {
            hashMap[obj[priority]] = [];
        }
        hashMap[obj[priority]].push({ ...ticket, username });
    });
    const arr = [];
    for (let key in hashMap) {
        arr.push({ name: key, data: hashMap[key] })
    }
    dispatch(onSuccess({ data: arr, type: "byPriority" }));
    sortData(dispatch, localStorage.getItem("getOrder"), "byPriority", arr)
}

export function sortData(dis, orderType, groupType, data) {
    try {
        let arr = [];
        dis(startLoading());
        if (orderType === "Title") {
            arr = data.map(item => {
                return {
                    ...item, data: item.data.slice().sort((a, b) => {
                        const titleA = a.title.toLowerCase();
                        const titleB = b.title.toLowerCase();

                        if (titleA < titleB) {
                            return -1;
                        }
                        if (titleA > titleB) {
                            return 1;
                        }
                        return 0;
                    })
                }
            });
        }
        else {
            arr = data.map(item => {
                return {
                    ...item, data: item.data.slice().sort((a, b) => b.priority - a.priority)
                }
            })
        }
        dis(onSuccess({ data: arr, type: groupType }))

    } catch (error) {
        dis(onFailure("Something went wrong. Please refresh the page."));
        dis(clearError());
    }


}