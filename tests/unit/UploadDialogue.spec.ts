import { shallowMount } from "@vue/test-utils";
import UploadDialogue from "@/components/UploadDialogue.vue";

describe("UploadDialogue.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(UploadDialogue, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
