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
            senderFirstName: 'Jen',
            senderLastName: 'Smith',
            senderEmail: 'jen@example.com',
            senderPhone: '312.555.1234',
            cardNumber: '4111111111111111',
            carHolder: 'Jen Smith',
            expirationDate: '06/2022',
            cvv: '100',
            amount: '12'
        }
    }

    submitPayment(){
        axios.post('/checkout', {
            payment: this.state
          }).then((response) => {
            console.log(response.data.transaction.id);
            console.log(response);

            /*axios.post('/sendmail', {
                id: response.data.transaction.id,
                senderEmail: this.state.senderEmail
              }).then((sendmailResponse) => {
                console.log(sendmailResponse);
            });*/

            scroller.scrollTo('payment-confirm', {
              duration: 800,
              delay: 0,
              offset: -25,
              smooth: 'easeInOutQuart'
            });
        });
    }

    setFields(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    scrollTo() {
      scroller.scrollTo('payment-page', {
        duration: 800,
        delay: 0,
        offset: -25,
        smooth: 'easeInOutQuart'
      })
    }

    render() {
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

                    <form>
                        <div className="form-group clr">
                            <h4>Select the mode of Payment</h4>
                            <div className="form-control">
                                <div className="toggleswitch">
                                    <input id="opt_a" name="option" type="radio" value="opt_a"/>
                                    <label for="opt_a"><i class="fa fa-credit-card" aria-hidden="true"></i> Credit Card</label>
                                    <input id="opt_b" name="option" type="radio" value="opt_b"/>
                                    <label for="opt_b"><i class="fa fa-paypal" aria-hidden="true"></i> Paypal</label>
                                    <input id="opt_c" name="option" type="radio" value="opt_c"/>
                                    <label for="opt_c"><i class="fa fa-btc" aria-hidden="true"></i> Bitcoin</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group personel-form clr">
                            <h4>Your Personel Information</h4>
                            <div className="form-control">
                                <label for="firstname">First Name</label>
                                <input id="firstname" name="senderFirstName" type="text" onChange={this.setFields.bind(this)}/>
                            </div>
                            <div className="form-control">
                                <label for="lastname">Last Name</label>
                                <input id="lastname" name="senderLastName" type="text" onChange={this.setFields.bind(this)}/>
                            </div>
                            <div className="form-control">
                                <label for="email">Email</label>
                                <input id="email" name="senderEmail" type="text" onChange={this.setFields.bind(this)}/>
                            </div>
                            <div className="form-control">
                                <label for="phone">Phone</label>
                                <input id="phone" name="senderPhone" type="text" onChange={this.setFields.bind(this)}/>
                            </div>
                        </div>

                        <div className="form-group card-information clr">
                            <h4>Card Information</h4>
                            <div className="form-control">
                                <label for="cardnumber">Card Number</label>
                                <input id="cardnumber" name="cardNumber" type="text" placeholder="Card Number" onChange={this.setFields.bind(this)}/>
                            </div>
                            <div className="form-control">
                                <label for="cardholder">Card Holder</label>
                                <input id="cardholder" name="carHolder" type="text" placeholder="Name" onChange={this.setFields.bind(this)}/>
                            </div>
                            <div className="form-control">
                                <label for="expdate">Exp Date</label>
                                <input id="expdate" name="expirationDate" type="text" placeholder="MM/YYYY" onChange={this.setFields.bind(this)}/>
                            </div>
                            <div className="form-control">
                                <label for="cvc">CVC</label>
                                <input id="cvc" name="cvv" type="text" placeholder="XXX" onChange={this.setFields.bind(this)}/>
                            </div>
                        </div>

                        <div className="form-group clr">
                            <div className="form-control">
                                <button className="btn" type="button" onClick={this.submitPayment.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </section>
            <section className="section-page">
                <Element name="payment-confirm" className="element"></Element>
                Home
            </section>
            <section className="section-page">
                Home
            </section>
        </div>
      );
    }
}
