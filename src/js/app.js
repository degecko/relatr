import _debounce from 'lodash/debounce';

let app = new Vue({
    el: '#app',

    data: {
        terms: null,
        results: [],
        searching: false,
    },

    methods: {
        search () {
            this.searching = true;

            const that = this;
            const xhr = new XMLHttpRequest;

            this.results = [];

            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText) {
                        that.results = JSON.parse(this.responseText);
                    }
                }

                that.searching = false;
            };

            xhr.open('GET', '//api.datamuse.com/words?ml=' + encodeURIComponent(this.terms));
            xhr.send();
        },
    },

    watch: {
        terms: _debounce(() => app.search(), 500),
    },
});