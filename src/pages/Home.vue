<template>
    <!-- App Capsule -->
    <div id="appCapsule">

    <div class="header-large-title">
        <h3 class="title">Hello</h3>
        <h4 class="subtitle">{{UserDisplayName}}</h4>
    </div>

      <div class="section full mt-3 mb-3">
        <split-carousel :display-amount="6">

            <split-carousel-item v-for="(city, index) in cities" :key="index">
                <router-link :to="{ name: 'catSchool', params: { id : city.term_id }}" >
                    <div class="card_location">
                        <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                        <h4 class="mb-0">{{city.name}}</h4>
                    </div>
                </router-link>
            </split-carousel-item>
    
        </split-carousel>
      </div>


    <div class="section mt-3 mb-3">
        <div class="header-large-title mb-1 bg-primary ml-0 p-1 rounded">
            <h4 class="subtitle text-white">Today: Best Prices School</h4>
        </div>
    </div>
    <div v-if="loading">
        <Loader />
    </div>
    <div class="section mt-3 mb-3" v-for="(post, index) in posts" :key="index">
        <router-link :to="{ name: 'singleSchool', params: { id : post.id }}">
        <div class="card">
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
<!-- * App Capsule -->
</template>

<script>
import { SplitCarousel, SplitCarouselItem } from "vue-split-carousel";
import axios from 'axios';
import Loader from "@/components/Loader.vue";

export default {
    name: 'Home',
        data() {
            return {
                UserDisplayName: localStorage.getItem('displayName'),
                // Wordpress Posts Endpoint
                postsUrl: "http://combrokers.co/klasseb/wp-json/wp/v2/listPost",
                LocationUrl: "http://combrokers.co/klasseb/wp-json/wp/v2/listingLocation",
                queryOptions: {
                    per_page: 6, // Only retrieve the 10 most recent blog posts.
                    page: 1, // Current page of the collection.
                    _embed: true //Response should include embedded resources.
                },
                loading: true,
                // Returned Posts in an Array
                posts: [],
                cities: [],
            };
        },
    components: {
        SplitCarousel,
        SplitCarouselItem,
        Loader
    },
    methods: {},
    mounted: function () {
        axios
        .get(this.postsUrl)
        .then(response => {
            this.posts = response.data;
            console.log("Posts retrieved!");
            this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });

        // Location
        axios
        .get(this.LocationUrl)
        .then(response => {
            this.cities = response.data;
            console.log(response.data[0]);
            this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
}
</script>

<style>
    .split-carousel {
        padding: 0px 10px !important;
    }
</style>