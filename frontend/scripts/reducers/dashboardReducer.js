const defaltDashboardState = {
     
}

export const dashboardReducer = (state, action) => {
    switch (action.type) {
        case "GET_MESSAGES":
            return {...this.state, messages:action.messages}
        case "GET_SCHEDULE":
            return {...this.state, messages:action.messages}
        case "GET_DUTY":
            return {...this.state, messages:action.messages}
        case "GET_POSTS":
            return {...this.state, messages:action.messages}
        default:
            break;
    }
}