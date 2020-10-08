import MessageContainer from "@/components/MessageContainer";
import { mount } from "@vue/test-utils";

describe("MessageContainer", () => {
  it("Wraps Message Display component", () => {
    const wrapper = mount(MessageContainer, {
      // creating a stub is the same as shallowMount
      // shallowMount is not supported in all testing libraries
      stubs: {
        MessageDisplay: "<p data-testid='message'>Hello from the db!</p>"
      }
    });
    const message = wrapper.find('[data-testid="message"]').element.textContent;
    expect(message).toEqual("Hello from the db!");
  });
});
