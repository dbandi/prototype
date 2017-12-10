import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import * as Scroll from 'react-scroll';
import { DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            senderFirstName: '',
            senderLastName: '',
            senderEmail: '',
            senderPhone: '',
            cardNumber: '',
            carHolder: '',
            expirationDate: '',
            cvv: '',
            amount: '',
            transactionId: '',
            senderAddress: '',
            senderZipCode: '',
            senderCity: '',
            senderCountry: '',
            send_type: 'find_friend',
            friend: '',
            link: '',
            recieverFirstName: '',
            recieverLastName: '',
            recieverEmail: '',
            recieverPhone: '',
            recieverUserId: '',
            transId: '',
            transSenderId: '',
            transPaymentType: '',
            transResponseType: ''
        }
    }

    submitPayment(){
        var _this = this;
        axios.post('/checkout', {
            payment: this.state
          }).then((response) => {
            _this.setState({transactionId: response.data.transaction.id});
            console.log(response.data.transaction.id);
            console.log(response);

            /*axios.post('/sendmail', {
                id: response.data.transaction.id,
                senderEmail: this.state.senderEmail
              }).then((sendmailResponse) => {
                console.log(sendmailResponse);
            });*/
            if(response.data.success){
                axios.post('/transaction', {
                      amount: response.data.transaction.amount,
                      transId: response.data.transaction.id,
                      userId: this.state.recieverUserId,
                      paymentType: response.data.transaction.paymentInstrumentType,
                      senderId: response.data.transaction.customer.id,
                      senderEmail: response.data.transaction.customer.email,
                      firstName: response.data.transaction.customer.firstName,
                      lastName: response.data.transaction.customer.lastName,
                      phone: response.data.transaction.customer.phone,
                      response: response.data.transaction.processorResponseText,
                      status: response.data.success
                  }).then((sendmailResponse) => {
                    console.log(sendmailResponse);
                });

                _this.setState({
                    transId: response.data.transaction.id,
                    transSenderId: response.data.transaction.customer.id,
                    transPaymentType: response.data.transaction.processorResponseText,
                    transResponseType: response.data.success
                });
            }


            scroller.scrollTo('payment-confirm', {
              duration: 800,
              delay: 0,
              offset: -25,
              smooth: 'easeInOutQuart'
            });
        });
    }

    setFields(event){
        if(event.target.name == 'cardNumber'){
            event.target.value = event.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        }
        this.setState({ [event.target.name]: event.target.value });
    }

    clearFields(event){
        this.setState({ friend: '', link: '' });
    }

    scrollTo() {
      scroller.scrollTo('payment-page', {
        duration: 800,
        delay: 0,
        offset: -25,
        smooth: 'easeInOutQuart'
      })
    }

    findUser(event) {
        this.setState({ [event.target.name]: event.target.value });
        var _this = this;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(event.target.value)){
          axios.get('/finduser', {
            params: {
                friend: event.target.value
            }
          }).then((response) => {
              if(response.data.length > 0){
                  _this.setState({
                    recieverFirstName: response.data[0].firstname,
                    recieverLastName: response.data[0].lastname,
                    recieverEmail: response.data[0].email,
                    recieverUserId: response.data[0].userId
                  })
              }
          });
        }
    }

    findLink(event) {
        var _this = this;
        console.log(this.state);
        this.setState({ [event.target.name]: event.target.value });
        if(event.target.value.split('/').length > 2){

            axios.get('/findlink', {
              params: {
                  link: event.target.value.split('/')[2]
              }
            }).then((response) => {
              if(response.data.length > 0){
                  _this.setState({
                    recieverFirstName: response.data[0].firstname,
                    recieverLastName: response.data[0].lastname,
                    recieverEmail: response.data[0].email,
                    recieverUserId: response.data[0].userId
                  })
              }
            });
        }
    }

    render() {

      let sendType;
      let sendTypeSearch = (<div className="form-control find-friend">
          <label for="friend">Search a User</label>
          <input id="friend" name="friend" type="text" value={this.state.friend} onChange={this.findUser.bind(this)}/>
      </div>);

      let sendTypeLink = (<div className="form-control have-link">
          <label for="link">Paste the Link</label>
          <input id="link" name="link" type="text" value={this.state.link} onChange={this.findLink.bind(this)}/>
      </div>);

      if(this.state.send_type == 'find_friend'){
          sendType = sendTypeSearch;
      }
      else{
          sendType = sendTypeLink;
      }

      return (
        <div>
            <section className="section-page home">
                <div className="intro-section">
                    <h1>Having a hard time buying the perfect gift?</h1>
                    <h4>It only takes a minute to give an investment that can last a lifetime.</h4>
                    <a onClick={this.scrollTo.bind(this)} className="btn">Get Started</a>
                </div>
            </section>
            <section className="section-page">
                <Element name="payment-page" className="element"></Element>
                <div className="payment-section">
                  <h2>Lets give an Life Time Investment</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <form>
                        <div className="user-info">
                            <div className="form-group personel-form clr">
                                <h4>Your Personel Information</h4>
                                <div className="form-split">
                                    <div className="form-control">
                                        <label for="firstname">First Name</label>
                                        <input id="firstname" name="senderFirstName" type="text" onChange={this.setFields.bind(this)}/>
                                    </div>
                                    <div className="form-control">
                                        <label for="lastname">Last Name</label>
                                        <input id="lastname" name="senderLastName" type="text" onChange={this.setFields.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label for="email">Email</label>
                                    <input id="email" name="senderEmail" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                                <div className="form-control">
                                    <label for="phone">Phone</label>
                                    <input id="phone" name="senderPhone" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                                <div className="form-control">
                                    <label for="phone">Address</label>
                                    <input id="phone" name="senderAddress" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                                <div className="form-split">
                                    <div className="form-control">
                                        <label for="phone">Zip Code</label>
                                        <input id="phone" name="senderZipCode" type="text" onChange={this.setFields.bind(this)}/>
                                    </div>
                                    <div className="form-control">
                                        <label for="phone">City</label>
                                        <input id="phone" name="senderCity" type="text" onChange={this.setFields.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label for="phone">Country</label>
                                    <input id="phone" name="senderCountry" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="user-info">
                            <div className="form-group personel-form clr">
                                <h4>Send To</h4>
                                <div className="form-control send-to">
                                    <div className="toggleswitch">
                                        <input id="find_friend" name="send_type" type="radio" value="find_friend" checked={this.state.send_type === 'find_friend'} onChange={this.setFields.bind(this)} onClick={this.clearFields.bind(this)}/>
                                        <label for="find_friend"><i class="fa fa-search" aria-hidden="true"></i> Find Friend</label>
                                        <input id="use_link" name="send_type" type="radio" value="use_link" checked={this.state.send_type === 'use_link'} onChange={this.setFields.bind(this)} onClick={this.clearFields.bind(this)}/>
                                        <label for="use_link"><i class="fa fa-link" aria-hidden="true"></i> Have a Link</label>
                                    </div>
                                </div>

                                {sendType}

                                <div className="form-split">
                                    <div className="form-control">
                                        <label for="recieverFirstName">First Name</label>
                                        <input id="recieverFirstName" name="recieverFirstName" type="text" value={this.state.recieverFirstName} onChange={this.setFields.bind(this)}/>
                                    </div>
                                    <div className="form-control">
                                        <label for="recieverLastName">Last Name</label>
                                        <input id="recieverLastName" name="recieverLastName" type="text" value={this.state.recieverLastName} onChange={this.setFields.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label for="recieverEmail">Email</label>
                                    <input id="recieverEmail" name="recieverEmail" type="text" value={this.state.recieverEmail} onChange={this.setFields.bind(this)}/>
                                </div>
                                <div className="form-control">
                                    <label for="recieverPhone">Phone</label>
                                    <input id="recieverPhone" name="recieverPhone" type="text" value={this.state.recieverPhone} onChange={this.setFields.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="payment-info">
                            <div className="form-group clr">
                                <h4>Select the mode of Payment</h4>
                                <div className="form-control">
                                    <div className="toggleswitch">
                                        <input id="opt_a" name="option" type="radio" value="opt_a" checked={true} onChange={this.setFields.bind(this)}/>
                                        <label for="opt_a"><i class="fa fa-credit-card" aria-hidden="true"></i> Credit Card</label>
                                        <input id="opt_b" name="option" type="radio" value="opt_b"/>
                                        <label for="opt_b"><i class="fa fa-paypal" aria-hidden="true"></i> Paypal</label>
                                        <input id="opt_c" name="option" type="radio" value="opt_c"/>
                                        <label for="opt_c"><i class="fa fa-btc" aria-hidden="true"></i> Bitcoin</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group amount-information clr">
                                <div className="form-control">
                                    <label for="amount">Amount in ($)</label>
                                    <input id="amount" name="amount" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group card-information clr">
                                <h4>Card Information</h4>
                                <div className="form-control">
                                    <label for="cardnumber">Card Number</label>
                                    <input id="cardnumber" name="cardNumber" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                                <div className="form-control">
                                    <label for="cardholder">Card Holder</label>
                                    <input id="cardholder" name="carHolder" type="text" onChange={this.setFields.bind(this)}/>
                                </div>
                                <div className="form-split">
                                    <div className="form-control">
                                        <label for="expdate">Exp Date</label>
                                        <input id="expdate" name="expirationDate" type="text" onChange={this.setFields.bind(this)}/>
                                    </div>
                                    <div className="form-control">
                                        <label for="cvc">CVC</label>
                                        <input id="cvc" name="cvv" type="text" placeholder="XXX" onChange={this.setFields.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="form-submit">
                        <button className="btn" type="button" onClick={this.submitPayment.bind(this)}>Submit</button>
                    </div>
                </div>
            </section>
            <section className="section-page thanks">
                <Element name="payment-confirm" className="element"></Element>
                <div className="thanks-section">
                    <h1>Thank you</h1>
                    <h4>Your transaction is successful</h4>
                    <p>An Email has been sent to you about your transaction.</p>
                    <div className="thanks-info">
                        <span>Transaction Id</span>
                        <a href="#">{this.state.transId}</a>
                    </div>
                </div>
            </section>
        </div>
      );
    }
}
