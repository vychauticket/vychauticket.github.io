import { Component, Vue, Prop } from "vue-property-decorator";
import "./renderless-tags-input.scss";

@Component({
    template: require("./renderless-tags-input.html")
})
export class RenderlessTagsInputComponent extends Vue {
    @Prop() public value : Array<any>;
    newTag: string = "";
    constructor(){
        super();
    }

    render() {
        return this.$scopedSlots.default({
            tags: this.value,
            removeTag: this.removeTag,
            addTag: this.addTag,
            inputAttrs: {
                value: this.newTag,
            },
            inputEvents: {
                input: (e) => {this.newTag = e.target.value},
                keydown: (e) => {
                    if(e.keyCode === 13){
                        e.preventDefault();
                        this.addTag();
                    }
                }
            }
        })
    }

    removeTag(tag){
        this.$emit("input", this.value.filter(t => t !== tag));
    }

    addTag(){
        if(this.newTag.trim().length === 0 || this.value.find(t=> t.includes(this.newTag.trim()))){
            this.newTag = "tag";
        }
        
        this.$emit("input", [...this.value, this.newTag.trim()]);
        this.newTag = "";
    }
}