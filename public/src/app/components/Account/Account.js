import React from "react";
import { connect } from "react-redux"
import axios from "axios";

export default class Account extends React.Component {

  constructor() {
      super();
      this.state = {
          userName: '',
          userId: '',
          userEmail: ''
      }
  }

  componentDidMount() {
    var _this = this;
    axios.get('/getuser')
    .then(function (response) {
        if(response.data != ''){
            _this.setState({
                userName: response.data.displayName,
                userId: response.data.id,
                userEmail : response.data.emails[0].value
            })
        }
        console.log(_this.state);
    });
  }

  render() {

    let renderAccount;
    let login = (
        <div className='login'>
          <div className='login_title'>
            <span>Login to your account</span>
          </div>
          <div className='login_fields'>
            <div className='login_fields__user'>
              <div className='icon'>
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png'/>
              </div>
              <input placeholder='Username' type='text'/>
            </div>
            <div className='login_fields__password'>
              <div className='icon'>
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png'/>
              </div>
              <input placeholder='Password' type='password'/>
              <div className='validation'>
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'/>
              </div>
            </div>
            <div className='login_fields__submit clr'>
                <a href="#" className="btn">Login</a>
            </div>
            <div className='login_fields__social clr'>
                <a href="/auth/google" className="btn">Google</a>
                <a href="#" className="btn">Facebook</a>
            </div>
          </div>
        </div>
    )

    let account = (
        <div className=''></div>
    )

    if(this.state.userId == ''){
        renderAccount = login
    }

    return (
          <div className="main-container">
              {renderAccount}
          </div>
    );
  }
}
