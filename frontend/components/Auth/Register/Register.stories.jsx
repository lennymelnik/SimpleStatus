import Register from "./Register"

export default {
    title :  "Pages/Auth/Register",
    component : Register
}


const Template = (args) => <Register {...args} />

export const Primary = Template.bind({})
Primary.args = {
    token : "12313",
    questions: []
}

