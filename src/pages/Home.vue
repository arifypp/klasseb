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
        <router-link :to="{ name: 'singleSchool', params: { id : featureposts.id }}">
            <div class="feature-school d-inline-block align-self-middle justify-content-center align-middle">
                <div class="feature-school-img d-inline-block pl-2">
                    <img :src="featureposts.featured_image" alt="img" class="img-fluid img-circle" width="80">
                </div>
                <div class="feature-school-content d-inline-block">
                    <h4>{{ featureposts.title }} </h4>
                    <address>{{ featureposts._cth_address }}</address>
                </div>
                <div class="feature-school-footer">
                    <ul>
                        <li><span><img src="../assets/img/reviews.png" alt="img"> {{ featureposts._cth_reviews }} Anmeldelser</span></li>
                        <li><span><img src="../assets/img/price.png" alt="img"> kjøretime Kr: {{ featureposts._price }}</span></li>
                    </ul>
                </div>
            </div>
        </router-link>
        </div>
    </div>
    <div class="section mt-3 mb-3">
        <div class="header-large-title mb-1 bg-primary ml-0 p-1 rounded">
            <h4 class="subtitle text-white">I dag: Beste Pris skolen</h4>
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
                            {{ post.title.substring(0,24) }}
                        </h5>
                        <h6 class="card-subtitle">{{ post._cth_address.substring(0,50) }}</h6>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center mb-0 pb-0">
                    <div class="reviews">
                        <span>{{ post._cth_reviews }} Anmeldelser</span>
                    </div>
                    <div class="school-price">
                        <span>kjøretime Kr: {{ post._price }}</span>
                    </div>
                </div>
            </div>
        </div>
        </router-link>
    </div>

    <!-- Modal Open -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body p-0">
            <router-link :to="{ name: 'singleSchool', params: { id : featureposts.id }}">
                <div class="section p-0 m-0">
                    <img :src="featureposts.featured_image" class="img-fluid" alt="image" width="100%">
                    <div class="school-content d-flex justify-content-between">
                        <div class="p-3">
                            <h2 class="card-title align-items-center justify-content-between">
                                {{ featureposts.title }}
                            </h2>
                            <h6 class="card-subtitle">{{ featureposts._cth_address }}</h6>
                        </div>
                    </div>
                </div>
            </router-link>
            </div>
            <div class="modal-footer d-flex justify-content-between align-items-center mb-0 pb-0">
                <div class="reviews">
                    <span><img src="../assets/img/reviews.png" alt="img"> {{ featureposts._cth_reviews }} Anmeldelser</span>
                </div>
                <div class="school-price">
                    <span><img src="../assets/img/price.png" alt="img"> kjøretime Kr: {{ featureposts._price }}</span>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>
          </div> 
        </div>
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
                postsUrl: "https://ssssourcingbd.com/wp-json/wp/v2/listPost",
                LocationUrl: "https://ssssourcingbd.com/wp-json/wp/v2/listingLocation",
                queryOptions: {
                    per_page: 6, // Only retrieve the 10 most recent blog posts.
                    page: 1, // Current page of the collection.
                    _embed: true //Response should include embedded resources.
                },
                loading: true,
                // Returned Posts in an Array
                posts: [],
                featureposts: [],
                cities: [],
                location:null,
                gettingLocation: false,
                errorStr:null,
            };
        },
    components: {
        SplitCarousel,
        SplitCarouselItem,
        Loader
    },
    methods: {
        openModal () {
            setTimeout(function() {
                $('#myModal').modal('show');
            }, 2000);
        },
    },
    mounted: function () {
        // Location
        axios
        .get(`${process.env.VUE_APP_API_URL}/wp/v2/listingLocation`)
        .then(response => {
            this.cities = response.data;
            // console.log(response.data[0]);
            this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });

        // Featured School
        axios
        .get(`${process.env.VUE_APP_API_URL}/wp/v2/featuredList`)
        .then(response => {
            this.featureposts = response.data[0];
            this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });

        this.openModal();
    },
    created() {
        //do we support geolocation
        if(!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
        }

        this.gettingLocation = true;
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
        // console.log(this.location.coords.latitude)
        // console.log(this.location.coords.longitude)     
               
        const apidatalocation =  axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        this.location.coords.latitude +
        "," +
        this.location.coords.longitude +
        "&key=APIKEY"
        ).then(res => {
            const mycity = res.data.results[0].address_components[3].long_name;

            axios
            .get(`${process.env.VUE_APP_API_URL}/wp/v2/Listfilter?filter=`+mycity)
            .then(response => {
                this.posts = response.data;
            }).catch(function (e) {
              console.log("Error" + e);
            });

        })
        .catch(error => {
          console.log(error);
        });

        }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
        })
    },
}
</script>

<style>
    .split-carousel {
        padding: 0px 10px !important;
    }
</style>