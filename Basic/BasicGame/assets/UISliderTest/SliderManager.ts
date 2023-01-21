import { _decorator, Component, Node, ScrollView, Slider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SliderManager')
export class SliderManager extends Component {
    @property(ScrollView) scrollViewTest : ScrollView = null!;
    @property(Slider) sliderTest : Slider = null!;

    onSliderTest() {
        this.scrollViewTest.scrollToPercentVertical(this.sliderTest.progress, 0.1);
    }

    onScrollviewTest() {
        this.sliderTest.progress = Math.min(1, Math.max(0, 1-(this.scrollViewTest.getScrollOffset().y / this.scrollViewTest.getMaxScrollOffset().y)));
    }
}


