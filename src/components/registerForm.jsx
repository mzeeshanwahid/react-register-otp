import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import userService from "../services/userService";
import otpService from "../services/otpService";
import { toast, ToastContainer } from "react-toastify";
import Input from "./input";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", phone: "" },
    errors: {},
    otpFieldIsShown: false,
    sendOtP: "",
    otp: ""
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    phone: Joi.string()
      .required()
      .min(11)
      .label("Phone")
  };

  doSubmit = async () => {
    // Call the server
    if (!this.state.otpFieldIsShown) {
      await userService
        .alreadyExist({
          phone: this.state.data.phone
        })
        .then(() => toast.info("User Already Exists!"))
        .catch(async () => {
          this.setState({ otpFieldIsShown: true });
          const otpResponse = await otpService();
          this.setState({ sendOtP: otpResponse.data.otp });
          toast.info("Your OTP is " + otpResponse.data.otp);
        });
    } else if (
      this.state.otpFieldIsShown &&
      parseInt(this.state.sendOtP) === parseInt(this.state.otp)
    ) {
      const user = this.state.data;
      console.log(user.email);
      await userService
        .register({ name: user.name, email: user.email, phone: user.phone })
        .then(() => {
          toast.success("User Registered!");
        })
        .catch(err => {
          console.log("Error: ", err.message);
        });
    } else toast.error("Invalid OTP!");
  };

  handleOTPChange = ({ currentTarget: input }) => {
    this.setState({ otp: input.value });
  };

  render() {
    return (
      <div>
        <div className="float-right">
          <ToastContainer />
        </div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("phone", "Phone", "number")}
          {this.state.otpFieldIsShown ? (
            <Input
              type="number"
              name="otp"
              label="OTP"
              onChange={this.handleOTPChange}
            />
          ) : null}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
