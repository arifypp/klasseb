<template>
    <div id="appCapsule">
        <div class="section mt-3 mb-3">
            <div class="header-large-title mb-1 bg-primary ml-0 p-1 rounded">
                <h4 class="subtitle text-white">This is school page</h4>
            </div>
        </div>
        <div v-if="loading">
            <Loader />
        </div>
        <div class="section mt-3 mb-3" v-for="(post, index) in posts" :key="index">
            <router-link :to="{ name: 'singleSchool', params: { id : post.id }}">
            <div class="card" v-bind:id="'post-' + post.id">
                <img :src="post.featured_image"  class="card-img-top" alt="image">
                <div class="card-body align-items-end">
                    <div class="school-content d-flex justify-content-between">
                        <div>
                            <h5 class="card-title d-flex align-items-center justify-content-between">
                                {{ post.title }}
                            </h5>
                            <h6 class="card-subtitle">{{ post._cth_address }}</h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center mb-0 pb-0">
                        <div class="reviews">
                            <span><img src="../assets/img/reviews.png" alt="img"> 152 Reviews</span>
                        </div>
                        <div class="school-price">
                            <span><img src="../assets/img/price.png" alt="img"> kjøretime Kr: {{ post._price }}</span>
                        </div>
                    </div>
                </div>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Loader from '@/components/Loader.vue';

export default {
    name: "School",
    data() {
        return {
            // Wordpress Posts Endpoint
            postsUrl: "https://ssssourcingbd.com/wp-json/wp/v2/listPost",
            loading: true,
            // Returned Posts in an Array
            posts: []
        };
    },
    mounted: function () {
        axios
            .get(`${process.env.VUE_APP_API_URL}/wp/v2/listPost`)
            .then(response => {
            this.posts = response.data;
            this.loading = false;
            console.log("Posts retrieved!");
        })
            .catch(error => {
            console.log(error);
        });
    },
    components: { Loader }
}
    </script>