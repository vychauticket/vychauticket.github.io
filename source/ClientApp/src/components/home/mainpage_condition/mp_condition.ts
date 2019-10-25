import { Component, Vue } from "vue-property-decorator";
import { Logger } from "../../../util/log";
import "./mp_condition.scss";

@Component({
    template: require("./mp_condition.html")
})
export class MPConditionComponent extends Vue {

    repo: string = "https://github.com/ducksoupdev/vue-webpack-typescript";
    sortProcessActive: number = 1;
    searchContent: string = "";
    emitCount: number = 1;
    isExplore: boolean = false;
    exploreText: string = "Explore";

    protected logger: Logger;
    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info("about is ready!"));
    }

    sortby(event) {
        switch (event.currentTarget.id) {
            case "sort-process-all-id": {
                this.sortProcessActive = 1;
                break;
            }
            case "sort-process-triggered-id": {
                this.sortProcessActive = 2;
                break;
            }
            case "sort-process-scheduled-id": {
                this.sortProcessActive = 3;
                break;
            }
        }

        this.$emit("sort-by", this.sortProcessActive);
    }

    refresh_click(event) {
        this.$emit("refresh-click");
    }

    explore_click(event) {
        this.isExplore = !this.isExplore;
        this.exploreText = this.isExplore ? "Back to my processes" : "Explore";
        this.$emit("explore-click", this.isExplore);
    }
    createprocess_click(event) {
        this.$emit("create-process-click");
    }

    txtSearch_input(event) {
        if (this.emitCount === 1) {
            this.$emit("txtsearch-input", this.searchContent);
        } else {
            this.emitCount = 1;
        }
    }
}
