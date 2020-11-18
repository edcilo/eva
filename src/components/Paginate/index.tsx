import VeButton from "@/components/Button";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./styles.scss";
import { VNode } from "vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { validatorTypes, validatorStyles } from "@/components/Button/types";

library.add(faAngleLeft, faAngleRight);

@Component({
  name: "VePaginate",
  components: {
    FontAwesomeIcon,
    VeButton
  }
})
export default class VePaginate extends Vue {
  @Prop({ default: "primary", validator: validatorTypes })
  protected btnType!: string;

  @Prop({ default: "", validator: validatorStyles })
  protected btnStyle!: string;

  @Prop({ type: Number, default: 1 })
  protected value!: string | null;

  @Prop({ type: Number, default: 3 })
  protected limit!: number;

  @Prop({ type: Number, default: 10 })
  protected perPage!: number;

  @Prop({ type: Boolean, default: true })
  protected simple!: boolean;

  @Prop({ type: Number, required: true })
  protected total!: number;

  public cn = "ve-paginate";
  public currentPage = 1;
  public tokenId = "";

  @Watch("value", { immediate: true })
  onValueChanged(page: number): void {
    this.currentPage = page;
  }

  @Watch("currentPage")
  onCurrentPageChanged(page: number): void {
    this.$emit("input", page);
  }

  @Watch("limit")
  onLimitChanged() {
    this.tokenId = this.generateToken();
  }

  @Watch("perPage")
  onPerPageChanged() {
    this.tokenId = this.generateToken();
  }

  get buttons(): Array<VNode> {
    const btns: Array<VNode> = [];
    const list: Array<VNode | boolean> = [];

    if (this.simple) {
      return btns;
    }

    for (let page = 0; page < this.pages; page++) {
      const currentPage = page + 1;

      if (this.visible(currentPage)) {
        list.push(this.pageButton(currentPage));
      } else if (list[list.length - 1] !== false) {
        list.push(false);
      }
    }

    list.forEach((item: VNode | boolean) => {
      if (typeof item === "boolean") {
        btns.push(this.ellipsisBtn);
      } else {
        btns.push(item);
      }
    });

    return btns;
  }

  get ellipsisBtn(): VNode {
    return (
      <ve-button
        btn-style={this.btnStyle}
        class={`${this.cn}__btn ${this.cn}__btn-left-arrow`}
        disabled={true}
        type={this.btnType}
      >
        ...
      </ve-button>
    );
  }

  get leftButton(): VNode {
    return (
      <ve-button
        btn-style={this.btnStyle}
        class={`${this.cn}__btn ${this.cn}__btn-left-arrow`}
        id={this.tokenId}
        type={this.btnType}
        onClick={this.onRestPage}
      >
        {this.$slots.leftArrow !== undefined ? (
          this.$slots.leftArrow
        ) : (
          <font-awesome-icon icon="angle-left" />
        )}
      </ve-button>
    );
  }

  get pages(): number {
    return Math.ceil(this.total / this.perPage);
  }

  get rightButton(): VNode {
    return (
      <ve-button
        btn-style={this.btnStyle}
        class={`${this.cn}__btn ${this.cn}__btn-right-arrow`}
        id={this.tokenId}
        type={this.btnType}
        onClick={this.onAddPage}
      >
        {this.$slots.rightArrow !== undefined ? (
          this.$slots.rightArrow
        ) : (
          <font-awesome-icon icon="angle-right" />
        )}
      </ve-button>
    );
  }

  generateToken(length = 18): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  onAddPage(): void {
    if (this.currentPage < this.pages) {
      this.currentPage += 1;
      this.tokenId = this.generateToken();
    } else {
      this.$emit("edgeRight");
    }

    this.$emit("nextClick", this.currentPage);
  }

  onPageClicked(page: number): void {
    this.currentPage = page;

    this.$emit("click", this.currentPage);
  }

  onRestPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.tokenId = this.generateToken();
    } else {
      this.$emit("edgeLeft");
    }

    this.$emit("previousClick", this.currentPage);
  }

  pageButton(page: number): VNode {
    const state = this.currentPage === page ? "active" : null;

    return (
      <ve-button
        btn-style={this.btnStyle}
        class={`${this.cn}__btn`}
        state={state}
        type={this.btnType}
        onClick={() => this.onPageClicked(page)}
      >
        {page}
      </ve-button>
    );
  }

  visible(page: number): boolean {
    let rightBtns = 0;
    let leftBtns = 0;

    if (this.limit % 2) {
      rightBtns = Math.floor(this.limit / 2);
      leftBtns = rightBtns;
    } else {
      rightBtns = Math.floor(this.limit / 2);
      leftBtns = rightBtns - 1;
    }

    return (
      page === 1 ||
      this.pages === 1 ||
      page === this.pages ||
      (page >= this.currentPage - leftBtns &&
        page <= this.currentPage + rightBtns)
    );
  }

  render(): VNode {
    return (
      <div class={this.cn}>
        {this.leftButton}

        {this.buttons}

        {this.rightButton}
      </div>
    );
  }
}
