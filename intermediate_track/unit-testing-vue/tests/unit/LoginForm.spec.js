import LoginForm from "@/components/LoginForm";
import { mount } from "@vue/test-utils";

describe("LoginForm", () => {
  it("emites an event with a user data payload", () => {
    const wrapper = mount(LoginForm);
    // using a custom data- attribute future proofs the app in case a css class
    // changes, therefore we are always grabbing this specific component
    const input = wrapper.find("[data-testid='login-input']");
    input.setValue("Test User");
    // triggering the submit event directly vs through the button click helps
    // us decouple our component from the test and if the button is ever removed this test
    // will still pass
    wrapper.trigger("submit");
    // results in an array of all of the "formSubmmited" emitted events
    const formSubmmitedCalls = wrapper.emitted("formSubmitted");
    expect(formSubmmitedCalls).toHaveLength(1);

    const expectedPayload = { name: "Test User" };
    expect(formSubmmitedCalls[0][0]).toMatchObject(expectedPayload);
  });
});
