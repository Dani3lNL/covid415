import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Row, Col, Button, Card, Container, Alert } from 'react-bootstrap';

import '../../styles/session_form.scss'
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, firstName, lastName, password, password2 } = this.state
    const user = {
      email,
      firstName,
      lastName,
      password,
      password2,
    };

    // clarify this.props.history
    this.props.signup(user, this.props.history);
  }

  demoLogin(e) {
    e.preventDefault();

    let user = {
      email: 'rayleensharp@gmail.com',
      password: 'password',
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li>
            <Alert key={`error-${i}`} variant='warning'>
              {this.state.errors[error]}
            </Alert>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
              <Card className='session signup'>
                <Card.Title className='session'>
                  <strong>Sign up.</strong>
                </Card.Title>
                {this.renderErrors()}
                {/*  */}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.update('email')}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={this.update('firstName')}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          placeholder="Last Name"
                          value={this.state.lastName}
                          onChange={this.update('lastName')}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Row>
                      <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.update('password')}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                          placeholder="Confirm Password"
                          onChange={this.update('password2')}
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I agree to be a good neighbor" />
                  </Form.Group>


                </Form>
                <Button
                  className='session-btn'
                  type="submit"
                  onClick={this.handleSubmit}>
                  Create My Account
                </Button>
                <Button
                  className='demo-btn'
                  type="submit"
                  onClick={this.demoLogin}>
                  Just demo for now
                </Button>
              </Card>
    );
  }
}

export default withRouter(SignupForm);