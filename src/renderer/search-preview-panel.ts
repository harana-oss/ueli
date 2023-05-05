import Vue from "vue";
import { Icon } from "../common/icon/icon";
import { IconType } from "../common/icon/icon-type";

export const searchPreviewPanel = Vue.extend({
    props: ["searchingResults"],
    data() {
        return {
            containerId: "search-result-container",
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
    },
    template: `
                <div v-if="true" class="search-preview-pannel">
                    <div class="search-preview__thumbnail"></div>
                    <div class="search-preview__det">
                        <div class="search-preview__action">
                            <button class="search-preview__action--button">
                                <span>open</span>
                            </button>
                        </div>
                        <div class="search-preview__detail">
                            <div class="search-preview__detail-name">
                                <div class="search-preview__detail-name-title">Name</div>
                                <div class="search-preview__detail-name-value">Article Two</div>
                            </div>
                            <div class="search-preview__detail-author">
                                <div class="search-preview__detail-author-title">Author</div>
                                <div class="search-preview__detail-author-value">Michael Thomson</div>
                            </div>
                            <div class="search-preview__detail-category">
                                <div class="search-preview__detail-category-title">Space</div>
                                <div class="search-preview__detail-category-value">Marketing</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="search-preview-pannel">
                    <div class="search-result__empty">
                        <p class="search-result__empty-text">No Preview Available</p>
                    </div>
                </div>
    `,
});
