import Vue from "vue";

export const searchResultsComponent = Vue.extend({
    data() {
        return {
            containerId: "search-result-container",
            isLoading: false,
        };
    },
    methods: {
        setIsLoading(value: Boolean) {
            this.isLoading = value;
        }
    },
    props: ["appearance"],
    mounted() {
    },
    template: `
        <div class="search-results" :class="{ 'scroll-disabled' : isLoading }" :id="containerId">
            <div class="search-results__container">
                <search-categories :appearance="appearance" @setLoading="setIsLoading"></search-categories>
                <div class="search-results-pannel">
                </div>
                <div class="search-preview-pannel"></div>
            </div>
            <div v-if="isLoading" class="search-results__overlay"></div>
        </div>
    `,
});
