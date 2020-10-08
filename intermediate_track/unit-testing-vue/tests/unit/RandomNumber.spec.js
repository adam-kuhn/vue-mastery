import RandomNumber from "@/components/RandomNumber";
import { mount } from "@vue/test-utils";

describe("RandomNumber", () => {
  test("By default, randomNumber data value should be 0", () => {
    const wrapper = mount(RandomNumber);

    expect(wrapper.html()).toContain("<span>0</span>");
  });
  test("If button is clicked, randomNumber should be between 1-10", async () => {
    const wrapper = mount(RandomNumber);
    // this works because we only have 1 button. If we had more we'd need to use different css selectors
    wrapper.find("button").trigger("click");
    // await DOM change
    await wrapper.vm.$nextTick();
    // access the outputed values from the span element
    const randomNumber = parseInt(wrapper.find("span").element.textContent);

    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(10);
  });
  test("If button is clicked, randomNumber data value should be between 200-300", async () => {
    const wrapper = mount(RandomNumber, {
      propsData: {
        min: 200,
        max: 300
      }
    });
    wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();
    const randomNumber = parseInt(wrapper.find("span").element.textContent);

    expect(randomNumber).toBeGreaterThanOrEqual(200);
    expect(randomNumber).toBeLessThanOrEqual(300);
  });
});
