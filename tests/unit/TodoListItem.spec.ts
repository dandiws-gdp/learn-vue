import { mount } from "@vue/test-utils";
import TodoListItem from "@/components/TodoListItem.vue";
import { Todo } from "@/store/types";
describe("TodoListItem.vue", () => {
  let wrapper: any;

  const todo: Todo = {
    id: 1,
    text: "Cooking",
    done: false,
  };

  beforeEach(() => {
    wrapper = mount(TodoListItem, {
      propsData: {
        todo,
      },
    });
  });

  it("Display todo text", () => {
    expect(wrapper.find("[aria-roledescription='todo-text']").text()).toBe(
      "Cooking"
    );
  });

  it("Emit finish event", (done) => {
    wrapper.trigger("click").then(() => {
      expect(wrapper.emitted().finish).toBeTruthy();
      done();
    });
  });

  it("Emit remove event", (done) => {
    wrapper
      .find("button")
      .trigger("click")
      .then(() => {
        expect(wrapper.emitted().remove).toBeTruthy();
        done();
      });
  });

  it("Has data-todo-done attribute", () => {
    expect(wrapper.attributes()["data-todo-done"]).toBe(
      String(wrapper.props().todo.done)
    );
  });
});
