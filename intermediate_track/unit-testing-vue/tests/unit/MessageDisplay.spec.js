import MessageDisplay from "@/components/MessageDisplay";
import { mount } from "@vue/test-utils";
import { getMessage } from "@/services/axios";
import flushPromises from "flush-promises";

// pass the module we need to mock to jest
jest.mock("@/services/axios");
beforeEach(() => {
  jest.clearAllMocks(); // clears all mock calls from previous tests
});

describe("MessageDisplay", () => {
  it("Calls getMessage and dsiplays message", async () => {
    // mock the API call, by setting the value of the resolved response
    const mockMessage = "Hello from the db!";
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);
    // awaits all promises (even those in life cycle hooks), before moving on to the assertion
    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);

    const message = wrapper.find("[data-testid='message']").element.textContent;
    expect(message).toBe(mockMessage);
  });
  it("Displays an error when getMessage call fails", async () => {
    const mockError = "Oops! Something went wrong.";
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    expect(getMessage).toHaveBeenCalledTimes(1);
    const message = wrapper.find("[data-testid='message-error']").element
      .textContent;
    expect(message).toBe(mockError);
  });
});
