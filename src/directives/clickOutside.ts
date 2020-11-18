import { DirectiveOptions, VNodeDirective, VNode } from "vue";

interface HTMLElementCustom extends HTMLElement {
  clickOutsideEvent?: any;
}

const ClickOutside: DirectiveOptions = {
  // TODO: fix vnode: any
  bind(el: HTMLElementCustom, binding: VNodeDirective, vnode: any): void {
    el.clickOutsideEvent = function(event: MouseEvent) {
      // here I check that click was outside the el and his childrens
      if (
        !(
          el === event.target ||
          (event.target instanceof Node && el.contains(event.target))
        )
      ) {
        // and if it did, call method provided in attribute value
        binding.value(event);
      }
    };

    document.body.addEventListener("click", el.clickOutsideEvent);
  },

  unbind(el: HTMLElementCustom): void {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  }
};

export default ClickOutside;
