import Vue from "vue";
import { Icon } from "../common/icon/icon";
import { IconType } from "../common/icon/icon-type";
import { vueEventDispatcher } from "./vue-event-dispatcher";
import { VueEventChannels } from "./vue-event-channels";
import { ResultsItemsViewModel } from "../common/search-result-item";

enum BrowseDirection {
    Next = "next",
    Previous = "previous",
}

export const searchResultsPanel = Vue.extend({
    props: ["searchingResults", "selectedScreen"],
    data() {
        return {
            containerId: "search-results-id",
            isLoading: false,
        };
    },
    methods: {
        getIcon(icon: Icon, active: boolean) {
            const activeClass = active ? "active" : "";
            switch (icon.type) {
                case IconType.URL:
                    return `<img class="search-categories__item-icon--url ${activeClass}" src="${icon.parameter}">`;
                case IconType.SVG:
                    return `<div class="search-categories__item-icon--svg ${activeClass}">${icon.parameter}</div>`;
                case IconType.Color:
                    return `<div class="search-categories__item-icon--color" style="background-color: ${icon.parameter};"></div>`;
            }
        },
        handleResultsBrowsing(direction: BrowseDirection): void {
            const searchingResults: ResultsItemsViewModel[] = this.searchingResults;
            if (searchingResults.length === 0) {
                return;
            }
            let nextActiveIndex = 0;
    
            for (let i = 0; i < searchingResults.length; i++) {
                if (searchingResults[i].active) {
                    if (direction === BrowseDirection.Next) {
                        nextActiveIndex = i === searchingResults.length - 1 ? 0 : i + 1;
                    } else {
                        nextActiveIndex = i === 0 ? searchingResults.length - 1 : i - 1;
                    }
                    searchingResults[i].active = false;
                    break;
                }
            }
    
            searchingResults[nextActiveIndex].active = true;
            this.scrollIntoView(searchingResults[nextActiveIndex].itemId);
        },
        scrollIntoView(elementId: string) {
            const htmlElement = document.getElementById(elementId);
            const searchResultsContainer = document.getElementById(this.containerId);
            if (!htmlElement || !searchResultsContainer) return;
    
            const elementIsOutOfViewBottom =
                htmlElement.offsetTop + htmlElement.clientHeight >
                searchResultsContainer.scrollTop + searchResultsContainer.clientHeight;
            const elementIsOutOfViewTop = htmlElement.offsetTop < searchResultsContainer.scrollTop;
            if (elementIsOutOfViewBottom || elementIsOutOfViewTop) {
                const scrollTo =
                    Math.floor(htmlElement.offsetTop / searchResultsContainer.clientHeight) *
                    searchResultsContainer.clientHeight;
                searchResultsContainer.scrollTo({ top: scrollTo, behavior: 'smooth' });
            }
        },
        setDefault() {
            this.$emit("setDefault")
        }
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.selectNextItem, () => {
            if(this.selectedScreen === 'results') {
                this.handleResultsBrowsing(BrowseDirection.Next);
            }
        });
        vueEventDispatcher.$on(VueEventChannels.selectPreviousItem, () => {
            if(this.selectedScreen === 'results') {
                this.handleResultsBrowsing(BrowseDirection.Previous);
            }
        });
        vueEventDispatcher.$on(VueEventChannels.moveToCategories, () => {
            this.$emit('focustocategory', 'category')
            this.setDefault()
            this.scrollIntoView(this.searchingResults[0].itemId)
        });
    },
    template: `
                <div class="search-results-pannel" :class="{'result-empty' : !searchingResults.length}" :id="containerId">
                    <div class="search-results__item" :class="{ 'active' : result.active }" v-for="(result, index) in searchingResults" :key="index" :id="result.itemId">
                        <div class="search-results-item-icon-container" :class="{ 'active' : result.active }">
                            <div class="search-results__item-icon" v-html="getIcon(result.iconUrl, result.active)"></div>
                        </div>
                        <div class="search-results-item-info-container">
                            <div class="search-results__item-title" :class="{ 'active' : result.active }">{{result.title}}</div>
                            <div class="search-results__item-description" :class="{ 'active' : result.active }">
                                {{result.description}}
                            </div>
                        </div>
                    </div>
                    <div class="search-result__empty" v-if="!searchingResults.length">
                        <p class="search-result__empty-text">No Search Result Found</p>
                    </div>
                </div>
    `,
});
