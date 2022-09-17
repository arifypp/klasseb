<template>
    <!-- App Capsule -->
    <div id="appCapsule">

    <div class="header-large-title">
        <h3 class="title">Hello</h3>
        <h4 class="subtitle">Espen Holmstrand</h4>
    </div>

      <div class="section full mt-3 mb-3">
        <split-carousel :display-amount="6">
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
            <split-carousel-item>
                <div class="card_location">
                    <img src="../assets/img/location.png" class="img-fluid" alt="image" width="20px">
                    <h4 class="mb-0">Rogaland</h4>
                </div>
            </split-carousel-item>
        </split-carousel>
      </div>


    <div class="section mt-3 mb-3">
        <div class="header-large-title mb-1 bg-primary ml-0 p-1 rounded">
            <h4 class="subtitle text-white">Near School</h4>
        </div>
        
        <div class="card">
            <img src="../assets/img/featured.png" class="card-img-top" alt="image">
            <div class="card-body align-items-end">
                <div class="school-content d-flex justify-content-between">
                    <div>
                        <h5 class="card-title d-flex align-items-center justify-content-between">
                            Abc TraffikSkole AS
                        </h5>
                        <h6 class="card-subtitle">287 Parking Slot, Oslo, Norway</h6>
                    </div>
                    <div class="location-image">
                        <img src="../assets/img/location.png" alt="img" width="50px"> 1.5Km
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center mb-0 pb-0">
                    <div class="reviews">
                        <span><img src="../assets/img/reviews.png" alt="img"> 152 Reviews</span>
                    </div>
                    <div class="school-price">
                        <span><img src="../assets/img/price.png" alt="img"> kjøretime Kr: 570.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section mt-3 mb-3">
        <div class="card">
            <img src="../assets/img/featured.png" class="card-img-top" alt="image">
            <div class="card-body align-items-end">
                <div class="school-content d-flex justify-content-between">
                    <div>
                        <h5 class="card-title d-flex align-items-center justify-content-between">
                            Abc TraffikSkole AS
                        </h5>
                        <h6 class="card-subtitle">287 Parking Slot, Oslo, Norway</h6>
                    </div>
                    <div class="location-image">
                        <img src="../assets/img/location.png" alt="img" width="50px"> 1.5Km
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center mb-0 pb-0">
                    <div class="reviews">
                        <span><img src="../assets/img/reviews.png" alt="img"> 152 Reviews</span>
                    </div>
                    <div class="school-price">
                        <span><img src="../assets/img/price.png" alt="img"> kjøretime Kr: 570.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section mt-3 mb-3">
        <div class="card">
            <img src="../assets/img/featured.png" class="card-img-top" alt="image">
            <div class="card-body align-items-end">
                <div class="school-content d-flex justify-content-between">
                    <div>
                        <h5 class="card-title d-flex align-items-center justify-content-between">
                            Abc TraffikSkole AS
                        </h5>
                        <h6 class="card-subtitle">287 Parking Slot, Oslo, Norway</h6>
                    </div>
                    <div class="location-image">
                        <img src="../assets/img/location.png" alt="img" width="50px"> 1.5Km
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center mb-0 pb-0">
                    <div class="reviews">
                        <span><img src="../assets/img/reviews.png" alt="img"> 152 Reviews</span>
                    </div>
                    <div class="school-price">
                        <span><img src="../assets/img/price.png" alt="img"> kjøretime Kr: 570.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
<!-- * App Capsule -->
</template>

<script>
import { SplitCarousel, SplitCarouselItem } from "vue-split-carousel";
export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
      SplitCarousel,
      SplitCarouselItem
    },
  mounted: function () {
    jQuery(document).ready( function() {
        // jQuery(".carousel-multiple").owlCarousel({
        //     navigation : true
        // });
        // var owl = $('.carousel-multiple');

        // if (owl.length) { 
        //     owl.owlCarousel({
        //         stagePadding: 32,
        //         loop: true,
        //         margin: 16,
        //         nav: false,
        //         items: 2,
        //         dots: false,
        //         responsiveClass: true,
        //         responsive: {
        //             0: {
        //                 items: 2,
        //             },
        //             768: {
        //                 items: 4,
        //             }
        //         }
        //     });
        // } 
    });
  }
}
</script>

<style>
    .split-carousel {
        padding: 0px 10px !important;
    }
</style>