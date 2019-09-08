import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div className='container mt-5'>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail" hidden>Email</Label>
                        <Input type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="examplePassword" hidden>Password</Label>
                        <Input type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    {' '}
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}