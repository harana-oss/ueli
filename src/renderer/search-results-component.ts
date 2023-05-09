import Vue from "vue";
import { ResultsItemsViewModel } from "../common/search-result-item";

export const searchResultsComponent = Vue.extend({
    data() {
        return {
            containerId: "search-result-container",
            isLoading: false,
            currentSelectedScreen: 'category',
            // searchResults: [
            //     {
            //         itemId: '1',
            //         active: false,
            //         iconUrl: {type: "URL", parameter : 'https://icon-library.com/images/facebook-icon-50x50/facebook-icon-50x50-2.jpg'},
            //         title: 'Article One',
            //         description: `It is a long eastablished fact that a reader will be distracted
            //         by the readable content of a page when looking at it's layout.`
            //     },
            //     {
            //         itemId: '2',
            //         active: false,
            //         iconUrl: {type: "URL", parameter : 'https://icon-library.com/images/facebook-icon-50x50/facebook-icon-50x50-2.jpg'},
            //         title: 'Article One',
            //         description: `It is a long eastablished fact that a reader will be distracted
            //         by the readable content of a page when looking at it's layout.`
            //     },
            //     {
            //         itemId: '3',
            //         active: false,
            //         iconUrl: {type: "URL", parameter : 'https://icon-library.com/images/facebook-icon-50x50/facebook-icon-50x50-2.jpg'},
            //         title: 'Article One',
            //         description: `It is a long eastablished fact that a reader will be distracted
            //         by the readable content of a page when looking at it's layout.`
            //     },
            //     {
            //         itemId: '4',
            //         active: false,
            //         iconUrl: {type: "URL", parameter : 'https://icon-library.com/images/facebook-icon-50x50/facebook-icon-50x50-2.jpg'},
            //         title: 'Article One',
            //         description: `It is a long eastablished fact that a reader will be distracted
            //         by the readable content of a page when looking at it's layout.`
            //     },
            //     {
            //         itemId: '5',
            //         active: false,
            //         iconUrl: {type: "URL", parameter : 'https://icon-library.com/images/facebook-icon-50x50/facebook-icon-50x50-2.jpg'},
            //         title: 'Article One',
            //         description: `It is a long eastablished fact that a reader will be distracted
            //         by the readable content of a page when looking at it's layout.`
            //     },
            //     {
            //         itemId: '6',
            //         active: false,
            //         iconUrl: {type: "URL", parameter : 'https://icon-library.com/images/facebook-icon-50x50/facebook-icon-50x50-2.jpg'},
            //         title: 'Article One',
            //         description: `It is a long eastablished fact that a reader will be distracted
            //         by the readable content of a page when looking at it's layout.`
            //     }
            // ],
            searchResults: [],
            showPreview: true,
        };
    },
    methods: {
        setIsLoading(value: boolean) {
            this.isLoading = value;
        },
        changeView(screenToSwitch: string) {
            this.currentSelectedScreen = screenToSwitch
        },
        setDefaultState() {
            this.searchResults.forEach((result: ResultsItemsViewModel) => {
                result.active = false
            })
        }
    }, 
    props: ["appearance"],
    template: `
        <div class="search-results" :class="{ 'scroll-disabled' : isLoading }" :id="containerId">
            <div class="search-results__container">
                <search-categories @changeFocusToSearchResults="changeView" :selectedScreen="currentSelectedScreen" :appearance="appearance" @setLoading="setIsLoading" :searchingResultsLength="searchResults.length"></search-categories>
                <search-results-panel @focustocategory="changeView" @setDefault="setDefaultState" :selectedScreen="currentSelectedScreen" :searchingResults="searchResults" v-if="searchResults.length"/>
                <search-preview v-if="showPreview"/>
            </div>
            <div v-if="isLoading" class="search-results__overlay"></div>
        </div>
    `,
});
