import AppHeader from "@/components/AppHeader";
import { mount } from "@vue/test-utils";

describe("AppHeader", () => {
  // describe defines a code block of tests
  // test() is the same as it()
  test("If user is not logged in, do not show logout button", () => {
    // wrapper gives us access to functions to help us test the app
    const wrapper = mount(AppHeader); // need to render the App
    expect(wrapper.find("button").isVisible()).toBe(false);
  });
  test("If user is logged in, show logout button", async () => {
    const wrapper = mount(AppHeader);
    wrapper.setData({ loggedIn: true });
    // because our DOM changes with the state we need to await these
    // changes before making our assertion. To await DOM changes
    // we need to use the below code
    await wrapper.vm.$nextTick();
    expect(wrapper.find("button").isVisible()).toBe(true);
  });
});