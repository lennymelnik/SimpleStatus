import Login from "./Login"

export default {
    title :  "Pages/Auth/Login",
    component : Login
}


const Template = (args) => <Login {...args} />

export const Primary = Template.bind({})
Primary.args = {
    token : "12313",
    questions: []
}

