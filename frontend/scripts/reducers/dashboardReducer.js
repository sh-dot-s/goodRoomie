const defaltDashboardState = {
     
}

export const dashboardReducer = (state, action) => {
    switch (action.type) {
        case "GET_MESSAGES":
            return {...state, messages:action.messages}
        case "GET_SCHEDULE":
            return {...state, schedule:action.schedule}
        case "GET_DUTY":
            return {...state, duty:action.duty}
        case "GET_POSTS":
            return {...state, posts:action.posts}
        default:
            return state
    }
}