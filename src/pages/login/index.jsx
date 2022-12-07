import {Button} from "antd";

function Login() {
    return (
        <div>
            <h1>Login</h1>
            <div>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
            </div>
        </div>
    );
}

export default Login;
