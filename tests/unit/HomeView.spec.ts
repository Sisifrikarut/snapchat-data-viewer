import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView.vue", () => {
  it("properly mounts template", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.classes()).toContain("home");
  });
});
