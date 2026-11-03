function GetMenuComponents(status, actions = {}) {
    const fucapi_logo = require("../../assets/logo.png")
    const MenuComponents = {
        naologado: {
            logoImg: fucapi_logo,
            itens: [
                {
                    label: "HOME",
                    onPress: actions.home || (() => { }),
                    type: "text",
                },
                {
                    label: "Sign UP",
                    onPress: actions.signUp || (() => { }),
                    type: "text",
                },
                {
                    onPress: actions.signIn || (() => { }),
                    type: "icon",
                    icon: require("../../assets/signin_icon.png"),
                },
            ],
        },
        logado: {
            logoImg: fucapi_logo,
            itens: [
                {
                    label: "Profile",
                    onPress: actions.profile || (() => { }),
                    type: "text",
                },
            ],
        },
    };

    return MenuComponents[status];
}

export default GetMenuComponents